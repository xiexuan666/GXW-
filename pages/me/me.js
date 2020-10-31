// pages/me/me.js
const app = getApp();
const http = app.globalData.http;
const baseUrl = app.globalData.baseUrl;
const global = app.globalData.global;
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
<<<<<<< HEAD
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

=======
    //商家状态
    sjzt: { status: 0 },
    //当前状态
    status: 0,
<<<<<<< HEAD
    //管理页面的控制
    ment: 0,
  },

  // 一键拨打
  calling: function () {
    wx.makePhoneCall({
      phoneNumber: '0757-85396681', //此号码并非真实电话号码，仅用于测试
      success: function () {
        console.log("拨打电话成功！")
      },
      fail: function () {
        console.log("拨打电话失败！")
      }
    })
  },
// 导航
  daohan: function () {
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        wx.openLocation({//​使用微信内置地图查看位置。
          latitude: 23.014746,//要去的纬度-地址
          longitude: 113.168396,//要去的经度-地址
          name: "广东省佛山市南海区季华东路31号",
          address: '广东省佛山市南海区季华东路31号'
        })
      }
    })
  },


=======
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 7c1c0e3919fad4bfaed76d5d78733405b080bbc8
    //管理页面的控制
    ment:0,
  },
>>>>>>> fad09a589a83aee28003e1456ea874447a43011d
>>>>>>> f18b3e4711d7bf89bb5c53bd2154981f0aba8052
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
=======
    ruzhu:false,
    // 扫码获取到的值和是否绑定商家的值
    wxLogin:'',
    store_status:'',
  },
//个人列表跳转
melisttz: function (e) {
  var ind = app.hdindex(e, 'ind')
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
>>>>>>> e8e55f3a9c319a6878579450c3c18e28b346fd04

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
  console.log(app.globalData.wxLogin);
  console.log(app.globalData.store_status);
  var that = this;
  that.setData({
    store_status:app.globalData.store_status,
    wxLogin:app.globalData.wxLogin
  })
  // 判断版本状态，是否显示商家信息
  if(app.globalData.status == 1){
    that.setData({
      ruzhu:true
    })
    // 版本显示时才去请求商家信息
    global.getmerchants();
  }else{
    that.setData({
      ruzhu:false
    })
<<<<<<< HEAD
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
<<<<<<< HEAD
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
=======
=======
  }
},
>>>>>>> fad09a589a83aee28003e1456ea874447a43011d

/**
 * 生命周期函数--监听页面初次渲染完成
 */
onReady: function () {

},

<<<<<<< HEAD
>>>>>>> f18b3e4711d7bf89bb5c53bd2154981f0aba8052
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
<<<<<<< HEAD
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
=======
    // 查询版本
    if (!app.globalData.status) {
      app.banbzt().then(resc => {
        this.setData({ status: app.globalData.status })
      })
    } else {
=======
/**
 * 生命周期函数--监听页面显示
 */
onShow: function () {
  if (!app.globalData.status) {
    app.banbzt().then(resc => {
>>>>>>> e8e55f3a9c319a6878579450c3c18e28b346fd04
      this.setData({ status: app.globalData.status })
    })
  } else {
    this.setData({ status: app.globalData.status })
  }
  //获取缓存信息
  this.huqhcgrxin()
},

<<<<<<< HEAD



    //获取缓存信息
    this.huqhcgrxin()
  },
=======
/**
 * 生命周期函数--监听页面隐藏
 */
onHide: function () {
>>>>>>> e8e55f3a9c319a6878579450c3c18e28b346fd04

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

<<<<<<< HEAD
  },
>>>>>>> f18b3e4711d7bf89bb5c53bd2154981f0aba8052
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
<<<<<<< HEAD
      // 使用用户信息，查询其商家状态
=======
      // 使用用户信息，查询其商家信息
>>>>>>> f18b3e4711d7bf89bb5c53bd2154981f0aba8052
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
<<<<<<< HEAD
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
=======
        console.log(resc, '商家状态');
<<<<<<< HEAD
        console.log(resc.data.message, resc.data.status);
        if (resc.data.status == 2) {
          tha.setData({
            ment: 1
          })
        }
=======
        console.log(resc.data.message,resc.data.status);
        if(resc.data.status == 2){
          tha.setData({
            ment:1
          })
        } 
>>>>>>> fad09a589a83aee28003e1456ea874447a43011d
        var sjzt = resc.data
        wx.setStorage({ key: "sjzt", data: sjzt })
        tha.setData({ sjzt: sjzt })
>>>>>>> f18b3e4711d7bf89bb5c53bd2154981f0aba8052
      }
=======
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
//获取个人缓存信息
huqhcgrxin() {
  var tha = this
  var gerxinx = wx.getStorageSync('gerxinx')
  if (gerxinx) {
    tha.hqshangzt(gerxinx)
    this.setData({ gerxinx })
    return false
  }
  // 调用app的登录注册用户信息
  app.huoqopenid()
    .then((openid) => app.cuncgerxinx(openid))
    .then(gerxinx => {
      tha.hqshangzt(gerxinx)
      tha.setData({ gerxinx })
>>>>>>> e8e55f3a9c319a6878579450c3c18e28b346fd04
    })
},
//获取当前商家状态
hqshangzt(gerxinx) {
  var tha = this
  var dat = { userid: gerxinx.id, brandid: '2' }
  var url = baseUrl + 'store/storestatus';
  http.promisServer(url, dat).then(function (resc) {
    if (resc.status == "000") {
      console.log(resc, '商家状态');
      var sjzt = resc.data;
      wx.setStorage({ key: "sjzt", data: sjzt });
      tha.setData({ sjzt: sjzt });
    }
  })
},

<<<<<<< HEAD
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
=======
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
  // 判断用户登录状态
  wx.clearStorage()
  // 获得当前地址
  app.dtxx()
  // 确定同意
  if (e.detail.userInfo) {
    wx.showToast({ title: '获取用户授权中', icon: 'loading', duration: 3000 })
    // 调用首页登录
    app.denlus()
      .then(res => {
        tha.setData({ souq: true, sj: false, gerxinx: res })
        wx.hideToast()
      })
  } else {
    // 不同意
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

openCamera:function(){
  console.log('打开相机');
  wx.scanCode({
    onlyFromCamera:true,
    success (res) {
      console.log(res)
      console.log(res.path);
      wx.navigateTo({
        url:'/'+res.path,
      })
      
    },
    fail(e){
      console.log(e);
>>>>>>> f18b3e4711d7bf89bb5c53bd2154981f0aba8052
    }
  })
  
}
/*   // 唤起登录弹窗
  dianjidl:function(){
    this.setData({souq:false});
  },
<<<<<<< HEAD
  // 相机扫一扫跳转到对应页面
  sweep:function(){
    wx.scanCode({
      success (res) {
        console.log(res.path);
        wx.navigateTo({
          url: '/' + res.path,
        })
      }
    })
<<<<<<< HEAD
  },
  // 相机扫一扫跳转到对应页面
<<<<<<< HEAD
  sweep: function () {
    wx.scanCode({
      success(res) {
=======
<<<<<<< HEAD
  sweep: function () {
    wx.scanCode({
      success(res) {
=======
  sweep:function(){
    wx.scanCode({
      success (res) {
>>>>>>> fad09a589a83aee28003e1456ea874447a43011d
>>>>>>> f18b3e4711d7bf89bb5c53bd2154981f0aba8052
        console.log(res.path);
        wx.navigateTo({
          url: '/' + res.path,
        })
      }
    })
  }
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
=======
  }
=======
  // 阻止冒泡
  
  bindGetUserInfo:function(e){
    var that = this;
  } */
>>>>>>> e8e55f3a9c319a6878579450c3c18e28b346fd04
>>>>>>> 7c1c0e3919fad4bfaed76d5d78733405b080bbc8
>>>>>>> fad09a589a83aee28003e1456ea874447a43011d
>>>>>>> f18b3e4711d7bf89bb5c53bd2154981f0aba8052
})