// pages/me/address/address.js
const app = getApp();
const http = app.globalData.http;
const baseUrl = app.globalData.baseUrl;
const getInformation = app.globalData.getInformation;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
  },

  // 跳转到新增收货地址
  address:function(){
  wx.navigateTo({
    url: '/pages/me/take/take',
  })
  },

  // 修改地址，带参数跳转
  Modify:function(e){
  let index = app.hdindex(e,'index')
    // let index = app.
    console.log(index);
  console.log();
    let arry = JSON.stringify(this.data.list[index]);
    wx.navigateTo({
      url: '/pages/me/take/take?arry='+arry,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  // 删除
list:function(){},
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let data={
      brandId :app.globalData.brandid,
      userId:wx.getStorageSync('gerxinx').id,
    }
    console.log(wx.getStorageSync('gerxinx').id);
    let url = baseUrl + 'activity/address/showAllAddress';
    http.promisServer(url,data).then(res=>{
      console.log(res.data)
      this.setData({
         list:res.data
      })
    })
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