// pages/video/video.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    comments:false,
    functionlist:[
      {imagurl:'/images/tubiao/wechat.png'},
      {imagurl:'/images/tubiao/12-12.png'},
      {imagurl:'/images/tubiao/common.png'},
      {imagurl:'/images/tubiao/fx.png'},
      {imagurl:'/images/tubiao/download.png'},
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(JSON.parse(options.value));
    let photo = JSON.parse(options.value).wx_photo
    this.setData({
      list:JSON.parse(options.value),
      ['functionlist['+0+'].imagurl']:photo
    })
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