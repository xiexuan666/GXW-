// pages/me/containe/containe.js
const app = getApp();
const http = app.globalData.http;
const baseUrl = app.globalData.baseUrl;
const getInformation = app.globalData.getInformation;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Details:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.data);
    let arry = JSON.parse(options.data);
    let url = baseUrl + 'coupon/CoupoDetails';
    let data ={
      couponId:arry[0],
      brandId:app.globalData.brandid,
      id:arry[2]
    }
    http.promisServer(url,data).then(res=>{
      let card = /\d{4}-\d{1,2}-\d{1,2}/g.exec(res.data[0].create_time);
      let end = /\d{4}-\d{1,2}-\d{1,2}/g.exec(res.data[0].end_time);
      // console.log(card,end)
      res.data[0].create_time = card[0].replace('-','.');
      res.data[0].end_time = end[0].slice(5).replace('-','.');
      this.setData({
        Details:res.data[0]
      });
      console.log(this.data.Details)
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