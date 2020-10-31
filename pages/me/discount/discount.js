// pages/me/discount/discount.js
const app = getApp();
const http = app.globalData.http;
const baseUrl = app.globalData.baseUrl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shanjia:['sadlsalkdjlaskjd'],
    AllCoupon:[],
   },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    let shanjia = JSON.parse(options.data);
    let list = {
      logo:shanjia[0],
      name:shanjia[1],
      id:shanjia[2]
    }
    that.setData({
      shanjia:list
    })
    this.open();
  },
  open:function(){
    var that = this;
    let sahngjia = that.data.shanjia;
    console.log('商家id:',sahngjia);
    // 请求该店铺优惠券
    let url = baseUrl + 'coupon/queryActivityAllCoupon';
    let data = {
      userId:wx.getStorageSync('gerxinx').id,
      brandId:app.globalData.brandid,
      state:2,
      storeId:sahngjia.id
    }
    http.promisServer(url,data).then(res=>{
      for(let i=0;i<res.data.length;i++){
        let card = /\d{4}-\d{1,2}-\d{1,2}/g.exec(res.data[i].create_time);
        let end = /\d{4}-\d{1,2}-\d{1,2}/g.exec(res.data[i].end_time);
        res.data[i].create_time = card[0].replace('-','.').replace('-','.');
        res.data[i].end_time = end[0].slice(5).replace('-','.');
      }
      that.setData({
        AllCoupon:res.data
      })
    })
  },
  // 领取优惠券
// coupon/getCoupons
// userId用户Id
// couponId卡券c_id
// status是否核销  必须为1      1未核销 2核销
  containe:function(e){
    var that = this;
    let index = app.hdindex(e,'index');
    let url = baseUrl + 'coupon/getCoupons';
    let data = {
      userId:wx.getStorageSync('gerxinx').id,
      brandId:app.globalData.brandid,
      status:1,
      couponId:this.data.AllCoupon[index].c_id,
      storeId:this.data.AllCoupon[index].store_id,
    }
    console.log(this.data.AllCoupon);
    console.log(data);
    http.promisServer(url,data).then(res=>{
      console.log(res);
      that.open();
      wx.showToast({
        title: '领取成功',
        icon: 'none',
        duration:800
      })
    })
  },
  // 
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