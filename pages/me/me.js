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
    //商家状态
    sjzt: { status: 0 },
    //当前状态
    status: 0,

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
  merchant:function(){
    wx.navigateTo({
      url: '/pages/me/merchant/merchant',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (!app.globalData.status) {
      console.log('你进来了')
      app.banbzt().then(resc => {
        this.setData({ status: app.globalData.status })
      })
    } else {
      console.log('你没进来')
      this.setData({ status: app.globalData.status })
    }


    //获取缓存信息
    this.huqhcgrxin()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {




  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
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
    var gerxinx = wx.getStorageSync('gerxinx')
    if (gerxinx) {
      tha.hqshangzt(gerxinx)
      this.setData({ gerxinx })
      return false
    }
    app.huoqopenid()
      .then((openid) => app.cuncgerxinx(openid))
      .then(gerxinx => {
        tha.hqshangzt(gerxinx)
        tha.setData({ gerxinx })
      })
  },
  //获取当前商家状态
  hqshangzt(gerxinx) {
    var tha = this
    var dat = { userid: gerxinx.id, brandid: '2' }
    var url = baseUrl + 'store/storestatus'
    http.promisServer(url, dat).then(function (resc) {
      if (resc.status == "000") {
        console.log(resc, '商家状态')
        var sjzt = resc.data
        wx.setStorage({ key: "sjzt", data: sjzt })
        tha.setData({ sjzt: sjzt })
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
})