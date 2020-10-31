// pages/souye/webwei/weibwei.js
const app = getApp();
const http = app.globalData.http;
const baseUrl = app.globalData.baseUrl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: ''
  },

  /**
 * 生命周期函数--监听页面加载
 */
  onLoad: function (options) {
    var tha = this
    console.log(options, 1121212)
    var url = baseUrl + "production/findproductById"
    var dat = {
      productid: options.id
    }
    // console.log(dat,'data')
    http.promisServer(url, dat).then(resc => {
      console.log(resc.data.productRecord.product_vr, '222')
      tha.setData({ url: resc.data.productRecord.product_vr })
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