// pages/hotspot/group/group.js
<<<<<<< HEAD

const app = getApp();
const http = app.globalData.http;
const baseUrl = app.globalData.baseUrl;
=======
>>>>>>> f18b3e4711d7bf89bb5c53bd2154981f0aba8052
Page({

  /**
   * 页面的初始数据
   */
  data: {
<<<<<<< HEAD
    booking:[]
  },
=======

  },
<<<<<<< HEAD
>>>>>>> f18b3e4711d7bf89bb5c53bd2154981f0aba8052
  // 跳转到拼团
  share: function () {
    wx.navigateTo({
      url: '/pages/hotspot/booking/booking',
    })
  },
<<<<<<< HEAD
=======
=======

>>>>>>> fad09a589a83aee28003e1456ea874447a43011d
>>>>>>> f18b3e4711d7bf89bb5c53bd2154981f0aba8052
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
<<<<<<< HEAD
    let url = baseUrl + 'activity/pintuan/findByStatusPinTuan'
    let data = {
      brandId: app.globalData.brandid,
      examine: 1,
      storeId: 1,
      status: 3
    }
    console.log(data);
    http.promisServer(url, data).then(res => {
      console.log(res.data[0]);
      this.setData({
        booking:res.data[0]
      })
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