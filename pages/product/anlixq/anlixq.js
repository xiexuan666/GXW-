// pages/product/anlixq/anlixq.js
const app = getApp();
const http = app.globalData.http;
const baseUrl = app.globalData.baseUrl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  
  },
  

  //点击打开图片
  dakerw:function(e){
    console.log(e)
    var img=app.hdindex(e,'img')
    console.log(img)
    wx.previewImage({
      current: img, // 当前显示图片的http链接 
      urls: [img]
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
  loadFontFace() {
    wx.loadFontFace({
      family: 'Bitstream Vera Serif Bold',
      source: 'url("https://sungd.github.io/Pacifico.ttf")',
      success(res) {
      },
      fail: function(res) {
      },
      complete: function(res) {
      }
    });
  },
  /**
   * 生命周期函数--监听页面显示
   */
  isString:function (str){ 
    return (typeof str=='string')&&str.constructor==String; 
    },
  onShow: function () {
    var anlixiaq =app.globalData.anlixiaq
    console.log(anlixiaq,'案例详情')
    if(anlixiaq.images&&this.isString(anlixiaq.images)){
      anlixiaq.images=JSON.parse(anlixiaq.images)
    }
    this.setData({anlixiaq})
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