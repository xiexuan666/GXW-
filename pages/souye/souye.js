// pages/souye/souye.js
const app = getApp();
var http = require("../../utils/http");
const baseUrl = app.globalData.baseUrl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lunb:[],
    lunbs:[]
  //   lunbs:[{
  //     url:"/images/shouye/11.png"
  //   }, {
  //     url:"/images/shouye/12.png"
  //   }
  // ]
  },
  
 //请求轮播
 handlelun:function() {
    var tha=this
    var url=baseUrl+'banner/index'
    console.log(url);
    http.promisServer(url).then(res=>{
    // tha.setData({lunb:res.data.allbannerList})
      console.log(res.data.allbannerList,'请求轮播图')
    })
    
 },
  //请求轮播 视频
  requestlunb:function(){
    var tha=this
    var url=baseUrl+'banner/index'
    http.promisServer(url).then(res=>{
    tha.setData({lunb:res.data.allbannerList})
       console.log(res.data.allbannerList,'请求轮播图')
    })
    // var url2=baseUrl+'banner/indexVideo'
    // http.promisServer(url2).then(resc=>{
    //   console.log(resc)
    //   var luns=resc.data.indexVideoList[0]
    //   console.log(luns,999)
    //   var sp=[{src:luns.link,fm:luns.url}]
    //   console.log(sp)
    //   tha.setData({videolist:sp})
    // })
  },
   //请求推荐系列
   qingqtuijxili:function(){
    var tha=this
    var url=baseUrl+'series/tuijianSeriesPage'
    http.promisServer(url,{brandid:'1'}).then(res=>{
      tha.setData({xilie:res.data.allseriessLists})
      console.log(res,'推荐系列')
    })
  },
   //请求推荐案例
   qingqtuianli:function(){
    var tha=this
    var url=baseUrl+'case/tuijianCasePage'
    http.promisServer(url,{brandid:'2'}).then(res=>{
      tha.setData({lunbs:res.data.tuijianCaseList})
      console.log(res,"推荐案例")
    })
  },
    
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
 //请求轮播
 this.requestlunb()
 //推荐系列
//  this.qingqtuijxili()
 //推荐案例
 this.qingqtuianli()
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
  onShareTimeline: function (){}
 
 
})