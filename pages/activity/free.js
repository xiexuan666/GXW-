// pages/activity/free.js
const app = getApp();
const qqmapsdk = app.globalData.qqmapsdk;
const http = app.globalData.http;
const baseUrl = app.globalData.baseUrl;
Page({
  /**
   * 页面的初始数据
   */
  data: {
// .js
array: ['美国', '中国', '巴西', '日本'],
  // pick选项卡
  index: 0,
  time: '12:01',
  date:(new Date().toLocaleDateString()).replace(/\//g,"-"),
  addresstwo:'-请选择-',
  dates:'-请选择-'
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },  
  /**
   * pick选项事件--更改下标
   * 普通选择器
   * 日期选择器
   */
  pickOpen:function(e){
    console.log('更改下标',e.detail.value);
    this.setData({
      index:e.detail.value
    })
  },
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date:e.detail.value
    })
  },
  /**
   * 获取地址
   */
  getaddress:function(){
    var that = this;
    // 调用app中的地址方法，获取经纬度
    app.huodjwd().then(rec => {
      wx.chooseLocation({
        latitude: rec.latitude,
        longitude: rec.longitude,
        success(res) {
          console.log(res, 'hdnr')
          app.formSubmit(res.latitude, res.longitude).then(res=>{
            console.log(res);
            that.setData({
              addresstwo:res.address
            })
          })
        }
      }
      )
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