// pages/me/coupon/coupon.js
const app = getApp();
const http = app.globalData.http;
const baseUrl = app.globalData.baseUrl;
const getInformation = app.globalData.getInformation;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    coupon:[]
  },
  // 跳转到优惠券活动
  containe: function (e) {
    let index = app.hdindex(e,'index');
    console.log(index);
    let coupon = this.data.coupon;
    console.log(coupon[index].c_id)
    let data = JSON.stringify([
      coupon[index].c_id,
      coupon[index].usercode,
      coupon[index].id,
    ])
   

    
    wx.navigateTo({
      url: '/pages/me/containe/containe?data=' + data,
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
    console.log('显示')
    let url = baseUrl + 'coupon/queryUserAllCoupon';
    let data ={
      userId:'32',
      brandId:app.globalData.brandid
    }
    console.log(url,data)
    http.promisServer(url,data).then(res=>{
      console.log(res);
      for(let i=0;i<res.data.length;i++){
        console.log(i)
        let card = /\d{4}-\d{1,2}-\d{1,2}/g.exec(res.data[i].create_time);
        let end = /\d{4}-\d{1,2}-\d{1,2}/g.exec(res.data[i].end_time);
        console.log(card[0].slice(5));
        res.data[i].create_time = card[0].replace('-','.').replace('-','.');
        res.data[i].end_time = end[0].slice(5).replace('-','.');
      }
      this.setData({
        coupon:res.data
      })
      console.log(res.data[0].id);
      console.log(this.data.coupon);
    })
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