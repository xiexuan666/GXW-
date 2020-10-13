// pages/me/merchant/merchant.js
const app = getApp();
const http = app.globalData.http;
const baseUrl = app.globalData.baseUrl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    status:0,
    text:null
  },
  /**
   * 生命周期函数--监听页面加载
   * 获取用户商家状态显示不同页面
   */
  onLoad: function (options) {
    var that = this;
    // 商家状态
    let status = wx.getStorageSync('sjzt').status;
    // 后台返回文字信息
    let content = wx.getStorageSync("sjzt").message
    if(status == 0){
      console.log('你还没有申请入驻');
      that.setData({
        status:0,
        text:''
      })
    }else if(status == 1){
      console.log('你已经缴费并申请入驻了，请等待审核');
      that.setData({
        status:1,
        text:content
      })
    }else if(status == 2){
      console.log('你已审核通过');
      wx.navigateTo({
        url: '/pages/me/guanli/guanli',
      })
      that.setData({
        status:2,
        text:content
      })
    }else if(status == 3){
      console.log('你提交的信息有误，请重新提交');
      that.setData({
        status:3,
        text:content
      })
    }
  },
  // 同意协议跳转页面
  shenq:function(){
    app.Jump('me/guanli/manage/store')
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