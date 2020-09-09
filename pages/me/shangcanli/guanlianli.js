// pages/me/shangcanli/guanlianli.js
const app = getApp();
const http = app.globalData.http;
const baseUrl = app.globalData.baseUrl;
Page({
  /**
   * 页面的初始数据
   */ 
  data: {
    caselist:[]
  },

  
  //案例删除页面跳转
  anlisc:function(){
    app.Jump('me/shangcanli/anlishanc')
  },
  //案例新增页面跳转
  anlixingzeng:function(){
    app.Jump('me/shangcanli/xingzeng')
  },
  //案例修改页面跳转ind
  anlitz:function(e){
    var ind=app.hdindex(e,'ind')
    var caselist=this.data.caselist
    app.globalData.anlinr=caselist[ind]
    app.Jump('me/shangcanli/xingzeng')
  },

  //请求案例列表
  rqcase:function(){
    var tha=this
    var gerxinx=this.data.gerxinx
    var sjzt=this.data.sjzt
    var storeid=''
    if(sjzt&&sjzt.record&&sjzt.record.id){
      storeid=sjzt.record.id
    }
    var url = baseUrl + "case/bendiCaseindex"
    var dat={
      userid:gerxinx.id,
      brandid:'1',
      storeid
    }
    http.promisServer(url, dat).then(resc=>{
      var caselist=resc.data.localCaseList
      this.setData({caselist})
      console.log(caselist,'案例列表')
    })
  },
  // 初始化
  init:function(){
    var gerxinx = wx.getStorageSync('gerxinx')
    var sjzt = wx.getStorageSync('sjzt')
    if(!gerxinx||!sjzt){
      app.Jumps('me/me')
      return false
    }
    this.setData({gerxinx,sjzt})
    this.rqcase()
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
    this.init()
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