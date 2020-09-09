// pages/me/pyquan/pyquan.js
const app = getApp();
const http = app.globalData.http;
const baseUrl = app.globalData.baseUrl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pyqt:[]
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
  //请求朋友圈图
  rqpyq:function(){
    var tha=this

    var url = baseUrl + "haibao/findAllHaibao"
    var dat={
      brandid:'1',
    }
    http.promisServer(url, dat).then(resc=>{
      var pyqlist=resc.data.haibao
      var pyqt=[]
      pyqlist.forEach(el => {
        if(el.material_url){
          console.log(JSON.parse(el.material_url),99)
          var luns=JSON.parse(el.material_url)
          pyqt=pyqt.concat(luns)
        }
      });
      this.setData({pyqt})
      console.log(pyqlist,'朋友圈图')
      console.log(pyqt,'朋友圈图处理好')
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.rqpyq()
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