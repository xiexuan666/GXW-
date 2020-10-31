// pages/me/guanli/manage/yuyue.js
<<<<<<< HEAD
const app = getApp();
const http = app.globalData.http;
const baseUrl = app.globalData.baseUrl;
const getInformation = app.globalData.getInformation;
=======
>>>>>>> f18b3e4711d7bf89bb5c53bd2154981f0aba8052
Page({

  /**
   * 页面的初始数据
   */
  data: {
<<<<<<< HEAD
    list:[],
=======

>>>>>>> f18b3e4711d7bf89bb5c53bd2154981f0aba8052
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
<<<<<<< HEAD
  // 一键拨打
  calling: function (e) {
    wx.makePhoneCall({
      phoneNumber: app.hdindex(e,'index'), //此号码并非真实电话号码，仅用于测试
      success: function () {
        console.log("拨打电话成功！")
      },
      fail: function () {
        console.log("拨打电话失败！")
      }
    })
  },
=======

>>>>>>> f18b3e4711d7bf89bb5c53bd2154981f0aba8052
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
<<<<<<< HEAD
    let data={
      brandId :app.globalData.brandid,
      storeId:1,
    }
    console.log(app.globalData.brandid);
    let url = baseUrl + 'activity/yuyue/client/findAllYuyueClient';
    http.promisServer(url,data).then(res=>{
      console.log(res)
      this.setData({
         list:res.data
      })
      console.log(this.data.list);
      
    })
=======

>>>>>>> f18b3e4711d7bf89bb5c53bd2154981f0aba8052
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