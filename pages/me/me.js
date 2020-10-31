// pages/me/me.js
const app = getApp();
const http = app.globalData.http;
const baseUrl = app.globalData.baseUrl;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    //授权登录状态
    souq: true,
    //  手机授权状态
    sj: true,
    //申请模态框
    mtkzt: false,
    // 个信息
    gerxinx: null,
    //当前版本状态
    status: app.globalData.status,
    //管理页面的控制 //商家状态
    ment:0,
  },
  // 一键拨打
  calling: function () {
    wx.makePhoneCall({
      phoneNumber: '0757-85396681'
    }) //此号码并非真实电话号码，仅用于测试
  },

  //个人列表跳转
  melisttz: function (e) {
    console.log(e)
    var ind = app.hdindex(e, 'ind')
    console.log(ind)
    switch (ind) {
      case '0':
        var gerxinx = wx.getStorageSync('gerxinx')
        if (!gerxinx) {
          this.setData({ souq: false })
          return false
        }
        app.Jump('me/shouc/shouc')
        break;
    }

  },
  //申请
  shenq: function () {
    app.Jump('me/ruzhu/ruzhu')
    this.setData({ mtkzt: false })
  },
  //取消模态框了
  quxiaomtk: function () {
    this.setData({ mtkzt: false })
  },
  //阻止冒泡
  zhuzi: function () {
    return false;
  },
  // 跳转到注册页面
  handlezhuc: function () {
    app.Jump('me/zhuc/zhuc')
  },
  // 跳转到管理
  manage: function () {
    wx.navigateTo({
      url: '/pages/me/guanli/guanli',
    })
  },
  // 跳转到我的订单
  myorder: function () {
    wx.navigateTo({
      url: '/pages/me/order/order',
    })
  },
  // 跳转到收货地址
  address: function () {
    wx.navigateTo({
      url: '/pages/me/address/address',
    })
  },
  // 跳转到个人钱包
  wallet: function () {
    wx.navigateTo({
      url: '/pages/me/wallet/wallet',
    })
  },
  // 跳转到活动参与
  activity: function () {
    wx.navigateTo({
      url: '/pages/me/activity/activity',
    })
  },
  // 跳转到信息活动
  message: function () {
    wx.navigateTo({
      url: '/pages/me/message/message',
    })
  },
  // 跳转到我的卡券
  coupon: function () {
    wx.navigateTo({
      url: '/pages/me/coupon/coupon',
    })
  },
  // 跳转到商家入驻
  merchant: function () {
    wx.navigateTo({
      url: '/pages/me/merchant/merchant',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //判断用户是否已登录
    var gerxinx = wx.getStorageSync('gerxinx');
    // 强制用户登录
    if(gerxinx){
        // 查询商家状态
        this.huqhcgrxin();
         // 用户进入的方式
        console.log('用户进入的渠道',app.globalData.Scene);
    }else{
       // 调起登录事件
       console.log('用户未登陆')
       this.dianjidl();
    }
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // this.dianjidl();
    // 更新版本状态
    this.setData({
      status: app.globalData.status
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
  onShareTimeline: function () { },
  //关闭弹窗
  tancxiaos: function (e) {
    this.setData({
      souq: true
    })
    this.setData({
      sj: true
    })
  },
  //获取缓存信息
  huqhcgrxin() {
    var tha = this
    var gerxinx = wx.getStorageSync('gerxinx');
    console.log('个人信息：',gerxinx);
    if (gerxinx) {
      // 使用用户信息，查询其商家状态
      tha.hqshangzt(gerxinx)
      this.setData({ gerxinx })
      return false
    }else{
      // 调起登录事件
      app.huoqopenid()
        .then((openid) => app.cuncgerxinx(openid))
        .then(gerxinx => {
          tha.hqshangzt(gerxinx)
          tha.setData({ gerxinx })
        })
    } 
    console.log('商家id：',wx.getStorageSync('sjid')); 
  },
  //获取当前商家状态
  hqshangzt(gerxinx) {
    var tha = this
    var dat = { userid: gerxinx.id, brandid:app.globalData.brandid}
    var url = baseUrl + 'store/storestatus';
    http.promisServer(url, dat).then(function (resc) {
      // 判断商家状态
      console.log('商家状态：',resc);
      if (resc.status == "000") {
        if (resc.data.status == 2) {
          tha.setData({
            ment: 1,
          })
          var sjzt = resc.data;
          wx.setStorage({ key: "sjzt", data: sjzt })
          wx.setStorage({ key: "sjid", data: resc.data.record.id })
          tha.setData({ sjzt: sjzt });
          console.log('商家id',resc.data.record.id)
        }else{
          console.log('该用户还不是商家');
          var sjzt = resc.data;
          wx.setStorage({ key: "sjzt", data: sjzt });
          wx.setStorage({ key: "sjid", data:null});
          console.log('商家id',wx.getStorageSync('sjid'));
        }
      }
    })
  },

  //没有用防止事件传给父元素
  meiy: function () {
  },
  //点击弹出登录
  dianjidl: function () {
    this.setData({ souq: false })
  },
  //登录
  bindGetUserInfo: function (e) {
    var tha = this;
    wx.clearStorage()
    // 获得当前地址
    app.dtxx()
    if (e.detail.userInfo) {
      wx.showToast({ title: '获取用户授权中', icon: 'loading', duration: 3000 })
      app.denlus()
        .then(res => {
          tha.setData({ souq: true, sj: false, gerxinx: res })
          wx.hideToast()
        })
    } else {
      this.setData({ souq: true })
    }
  },
  //手机授权
  getPhoneNumber(e) {
    var tha = this
    //获取手机号
    var gerxinx = wx.getStorageSync('gerxinx')
    if (gerxinx && gerxinx.phone) {
      tha.setData({ sj: true })
      return false
    }
    var openid = gerxinx.open_id
    app.getphone(e, openid).then(res => {
      tha.setData({ sj: true, gerxinx: res })
    })
  },
  // 相机扫一扫跳转到对应页面
  sweep: function () {
    wx.scanCode({
      success(res) {
        console.log(res.path);
        wx.navigateTo({
          url: '/' + res.path,
        })
      }
    })
  }
})