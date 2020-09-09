// pages/jinxs/jinxs.js

const app = getApp();
const qqmapsdk=app .globalData.qqmapsdk;
const http = app.globalData.http;
const baseUrl = app.globalData.baseUrl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //地图
    dt:{},
    //本地信息
    bendijxs:{}
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

  //拨打电话
  calling: function () {
    var bendijxs=this.data.bendijxs
    if(!bendijxs){
      return false
    }
    wx.makePhoneCall({
      phoneNumber: bendijxs.phone, //此号码并非真实电话号码，仅用于测试
      success: function () {
        console.log("拨打电话成功！")
      },
      fail: function () {
        console.log("拨打电话失败！")
      }
    })
  },
  //  导航
 daohan:function(e){
   var dt=this.data.dt
   var bendijxs=this.data.bendijxs
    if(!bendijxs){return false}
    wx.openLocation({
      latitude:parseFloat(bendijxs.position_latitude),
      longitude:parseFloat(bendijxs.position_longitude),
      scale: 16,
      name:bendijxs.store_name,
      address:bendijxs.address
    })
    
},
  //获得最近的经销商
  hdzuij:function(){
    var tha=this;
    var dizdenlu = wx.getStorageSync('dizdenlu')
    var bendijxs= wx.getStorageSync('bendijxs')
    if(bendijxs){
      this.setData({bendijxs})
      this.shencdt(bendijxs)
      return false
    }
    wx.getSetting({
      success: res => {
        if (!res.authSetting['scope.userLocation']) {
          wx.showToast({title: '没有授权开启定位',icon: 'none',duration: 700})
          tha.qingqzong()
        }else{
            app.huodjwds()
            .then(rec=>app.formSubmit(rec.latitude,rec.longitude))
            .then(resc=>{
             
            var address=resc.address_component.province+resc.address_component.city
            app.hdbdjxs(address)
            .then(jxsxinx=>{
              console.log('复杂',jxsxinx)
              tha.setData({bendijxs:jxsxinx})
              tha.shencdt(jxsxinx)
            })
            })
        }
      }
    })
    
  },
  //请求总经销商
  qingqzong:function(address){
    var tha=this
    var addressc=null
    if(address){addressc=address}
    var url = baseUrl + "store/findstoreByAddress"
    var dat={
      addressc,
      brandid:'1'
    }
    http.promisServer(url, dat).then(resc=>{
      var benjxslist=resc.data.storeList
      console.log(benjxslist,'请求总经销商')
      tha.setData({bendijxs:benjxslist[0]})
      tha.shencdt(benjxslist[0])
      if(benjxslist.length==1){
        wx.setStorageSync('bendijxs', benjxslist[0])
        return false
      }
    })
  },
  //生成dt
  shencdt:function(bendijxs){
    console.log(bendijxs,'当前经销商')
    var dt={
      longitude:bendijxs.position_longitude,
      latitude:bendijxs.position_latitude,
      scale:"12",
      markers:[
        {
          id:1,
          longitude:bendijxs.position_longitude,
          latitude:bendijxs.position_latitude,
          title:bendijxs.address,
          iconPath:"../../images/tubiao/dt0.png",
          width: 20,
          height: 30,
          callout:{
            display:'ALWAYS',
            content:bendijxs.address,
            padding:8,
            fontSize:15
          }
        }
      ]
    }
    this.setData({dt})
  },
  // 初始化
  init:function(){
    // var dizdenlu = wx.getStorageSync('dizdenlu')
    // if(dizdenlu){return false}
    // app.huodjwd()
    // .then(rec=>app.formSubmit(rec.latitude,rec.longitude))
    // .then(res=>{
    //   console.log(res.result.address_component,'666')
    // })
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
    this.hdzuij()
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