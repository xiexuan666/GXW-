// pages/customers/shopper/shopper.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nav:[
      {value:'头像',select:false},
      {value:'导购',select:false},
      // {value:'工号',select:false},
      // {value:'电话',select:false},
      {value:'会员数',select:false},
    ],
    selctstatus:['分配',1]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  // 选中状态
  select:function(e){
    console.log('选中',app.hdindex(e,'index'));
    let index = app.hdindex(e,'index');
    let select = this.data.nav;
    select[index].select = !select[index].select;
    this.setData({
      nav:select
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