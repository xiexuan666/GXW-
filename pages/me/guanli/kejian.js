// pages/me/guanli/kejian.js
const app = getApp();
const http = app.globalData.http;
const baseUrl = app.globalData.baseUrl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pdflist:[]
  },
  pdf:function(e){
    var pdf = app.hdindex(e,'url')
    wx.showLoading({title: '加载中'})
    wx.downloadFile({
      // 示例 url，并非真实存在
      url: pdf,
      success: function (res) {
        const filePath = res.tempFilePath
        wx.openDocument({
          filePath: filePath,
          success: function (res) {
            console.log('打开文档成功')
          }
        })
      },
      complete(){
        wx.hideLoading()
      }
    })
  },
  pdfs: function (e) {
    wx.hideLoading()
    wx.showLoading({title: '加载中'})
    var pdf = app.hdindex(e,'url')
    var name = app.hdindex(e,'name')
    var pdfsrc = wx.getStorageSync('pdfsrc')
    var src= wx.env.USER_DATA_PATH + '/'+name+'.pdf'
    if(pdfsrc!=src&&pdfsrc){
      console.log(666)
      wx.getFileSystemManager().unlink({filePath:pdfsrc})
    }
    wx.downloadFile({
      url: pdf,
      filePath: src,
      success: function (rec) {
       console.log(rec)
        wx.openDocument({
          filePath: rec.filePath,
          showMenu:true,
          success: function (res) {
            console.log('打开文档成功',res)
            wx.setStorageSync('pdfsrc', rec.filePath)
          }
        })
      },
      fail(e){
        console.log(e)
      },
      complete(){
       
        wx.hideLoading()
      }
    })
  },
  //请求pdf
  qinpdf:function(){
    var tha=this
    var url = baseUrl + "download/findAllMaterial"
    var dat={
      brandid:'1'
    }
    http.promisServer(url, dat).then(resc=>{
      var pdflist = resc.data.materials
			tha.setData({pdflist})
      console.log(resc,'pdf列表')
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.qinpdf()
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