// pages/me/guanli/manage/newly.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //选择日期
    date: '',
    date2:''

  },

  // 预约日期
  datePickerBindchange: function (e) {
    this.setData({
      dateValue: e.detail.value,

    })
  },
  // 开始时间
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  // 结束时间
  //  点击结束日期组件确定事件
  bindDateEndChange: function (e) {
    var that = this;
    that.setData({
      date2: e.detail.value
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