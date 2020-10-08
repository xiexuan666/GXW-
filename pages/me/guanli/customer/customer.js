const app = getApp();
const http = app.globalData.http;
const baseUrl = app.globalData.baseUrl;
const getInformation = app.globalData.getInformation;
Page({

  /**
   * 页面的初始数据
   */

  data: {
    cpxqzt: 1,
    hiddenstrategy: 3,
  },


  //产品详情导航选择
  cpxzxz: function (e) {
    var that = this;
    var ind = app.hdindex(e, 'ind')
    var cpxqzt = this.data.cpxqzt;
    if (ind == cpxqzt) { return false };
    switch (ind) {

    }
    if (ind == 1) {
      cpxqzt = 1
      wx.setNavigationBarTitle({ title: '导购管理' });
      // 查找出现次数

      that.setData({
        hiddenstrategy: 3
      })
    }
    if (ind == 2) {
      cpxqzt = 2
      wx.setNavigationBarTitle({ title: '我的客户' });
      var sum = that.data.strategy;
      // that.query(1, sum);
      // console.log(sum.map)
      that.setData({
        hiddenstrategy: 1
      })
    }
    if (ind == 3) {
      cpxqzt = 3
      wx.setNavigationBarTitle({ title: '群发助手' });
      var sum = that.data.strategy;
      // that.query(2, sum);
      that.setData({
        hiddenstrategy: 2
      })

    }
 
    this.setData({ cpxqzt: cpxqzt })
  },















  // 跳转到导购管理
  daog: function () {
    wx.navigateTo({
      url: '/pages/me/guanli/shoppers/shoppers',
    })
  },
  fasong: function () {
    wx.navigateTo({
      url: '/pages/me/guanli/information/information',
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

  },
  onShareTimeline: function () { },

  //   query: function (type, arry) {
  //     var that = this;
  //     console.log(type, arry);
  //     arry.forEach(item => {
  //       console.log(item)
  //       let num;
  //       if (item.type == type) {
  //         num++
  //         console.log('xxx', num);
  //       }
  //     });
  //   }
  // })
})