// pages/product/sousuo2.js
const app = getApp();
const http = app.globalData.http;
const baseUrl = app.globalData.baseUrl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    zhi:'',
    annrshuz:[]
  },
  ansous:function(e){
    var tha=this
    var zhi=e.detail.value
    this.setData({zhi})
  },
  anlijier:function(){
    var tha=this
    var zhi=this.data.zhi
    
    var url = baseUrl + "case/souSuoCasePage"
    var dat={
      brandid:'2',
      name:zhi
    }
    console.log(dat)
    http.promisServer(url, dat).then(resc=>{
      
      var annrshuz=resc.data.souSuoCaseList
      if(annrshuz.length==0){
        wx.showToast({title: '没有相关结果',icon: 'none',duration: 700})
      }
      this.setData({annrshuz})
      console.log(resc,annrshuz,'搜索案例结果')
    })
  },
    //跳转到案例详情
    anlitz:function(e){
      var ind=app.hdindex(e,'ind')
      var annrshuz=this.data.annrshuz
      // console.log(annrshuz[ind],'案例详情')
      app.globalData.anlixiaq=annrshuz[ind]
      app.Jump('product/anlixq/anlixq')
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