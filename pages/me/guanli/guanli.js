// pages/me/guanli/guanli.js
const app = getApp();
const http = app.globalData.http;
const baseUrl = app.globalData.baseUrl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    gerxinx:{},
    sjzts:{}
  },
  //导航跳转
  dhtz: function (e) {
    console.log(e)
    var index = app.hdindex(e,'ind')
    console.log(index)
    switch(index) {
      case "0":
        app.Jump('me/zb/zb')
        break;
      case "1":
        console.log(6)
        app.Jump('me/guanli/kejian')
        break;     
      case "2":
        app.Jump('me/xiugaijiage/xiugaijiage')
        break;
      case "3":
        app.Jump('me/shangcanli/guanlianli')
        break;
      case "4":
        app.Jump('me/ruzhu/ruzhu')
        break;
      case "5":
        app.Jump('me/pyquan/pyquan')
        break;    
      default:
    }
  },
  // 初始化
  init:function(){
    var gerxinx = wx.getStorageSync('gerxinx')
    var sjzt = wx.getStorageSync('sjzt')
    if(!gerxinx||!sjzt||!sjzt.record){
      app.Jumps('me/me')
      return false
    }
    var sjzts=sjzt.record
    this.setData({gerxinx,sjzts})
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
    this.init()
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

  }
})