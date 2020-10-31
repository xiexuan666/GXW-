/**
 * 多用性较高的数据会被存入全局变量/全局缓存，提供给各个页面使用
 * 作用：
 * 避免重复的用户或信息的请求
 * 标准：
 * 三个页面及以上的页面所需要的变量会被添加为全局变量
 * 小程序每次登录需要随机秘钥才能获取的信息会被添加到全局缓存 
 * 目前支持：
 * 用户信息、商家信息、地址经纬度、根据地址搜索出的本地经销商已添加到全局缓存
 */
/* 
商家信息--暂定为全局缓存
此方法会在我的页面被调用
*/
function getmerchants(){
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> e8e55f3a9c319a6878579450c3c18e28b346fd04
>>>>>>> 7c1c0e3919fad4bfaed76d5d78733405b080bbc8
>>>>>>> fad09a589a83aee28003e1456ea874447a43011d
>>>>>>> f18b3e4711d7bf89bb5c53bd2154981f0aba8052
  let app = getApp();
  var http = require('./http');
  // 用户id
  let user = wx.getStorageSync('gerxinx');
  // 判断有没有用户信息/用户是否已登录
  if(user){
    // 获取版本id 
    let brandid = app.globalData.brandid;
    let data = {userid:user.id, brandid:brandid};
    console.log(data);
    let url = app.globalData.baseUrl + 'store/storestatus';
    http.promisServer(url, data).then(function (res) {
      console.log('商家信息',res.data.record);
      wx.setStorageSync('MC',res.data.record);
    })
  }else{
    return false;
  }
  // let data = {userid:,brandid:''};

  // 将商家信息存储到全局缓存 
  // MC:merchants
  // wx.setStorageSync('MC',);
}

/*
*登录接口

*/
function login(){
  var that = this;
  var app = getApp();
  var http = require('./http');
  // 去除本地缓存
  wx.clearStorage();
  // 弹框请求授权
  wx.showToast({
    title: '获取用户授权',
    icon:'loading',
    duration:3000
  })
}

module.exports={
  //获取商家信息
  getmerchants,getmerchants,
  login:login
}
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
=======
    let app = getApp();
    var http = require('./http');
    // 用户id
    let user = wx.getStorageSync('gerxinx');
    // 判断有没有用户信息/用户是否已登录
    if(user){
      // 获取版本id 
      let brandid = app.globalData.brandid;
      let data = {userid:user.id, brandid:brandid};
      console.log(data);
      let url = app.globalData.baseUrl + 'store/storestatus';
      http.promisServer(url, data).then(function (res) {
        console.log('商家信息',res.data.record);
        wx.setStorageSync('MC',res.data.record);
      })
    }else{
      return false;
    }
    // let data = {userid:,brandid:''};

    // 将商家信息存储到全局缓存 
    // MC:merchants
    // wx.setStorageSync('MC',);
}

/*
  *登录接口

*/
  function login(){
    var that = this;
    var app = getApp();
    var http = require('./http');
    // 去除本地缓存
    wx.clearStorage();
    // 弹框请求授权
    wx.showToast({
      title: '获取用户授权',
      icon:'loading',
      duration:3000
    })
  }

  module.exports={
    //获取商家信息
    getmerchants,getmerchants,
    login:login
  }
>>>>>>> c2d852eb919299f0777236b9e73da89733498f14
>>>>>>> e8e55f3a9c319a6878579450c3c18e28b346fd04
>>>>>>> 7c1c0e3919fad4bfaed76d5d78733405b080bbc8
>>>>>>> fad09a589a83aee28003e1456ea874447a43011d
>>>>>>> f18b3e4711d7bf89bb5c53bd2154981f0aba8052




