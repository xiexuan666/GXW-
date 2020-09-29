// pages/me/order/order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //本地商品列表
    goods: [],
  },
  //数量加1
  handleJian(e) {

    wx.showModal({
      title: '提示',
      content: '是否删除商品',
      success: (res) => {
        //确认删除
        if (res.confirm) {
          //删除商品
          this.data.goods.splice(index, 1)
        } else {
          //如果点击取消的话就重新加1
          this.data.goods[index].number += 1;
        }
        //重新data的goods的值
        this.setData({
          goods: this.data.goods
        })
      }
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