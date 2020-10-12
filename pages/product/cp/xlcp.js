// pages/product/cp/xlcp.js
// const {cpshuj} = require('../jia.js');
const app = getApp();
const http = app.globalData.http;
const baseUrl = app.globalData.baseUrl;
Page({

  /** 
   * 页面的初始数据
   */
  data: {
    cp:[],
    titile:''
  },
  //跳转产品详情
  tzcpxq:function(e){
    var ind=app.hdindex(e,'ind')
    var inds=app.hdindex(e,'inds')
    var cp=this.data.cp
    // console.log(annrshuz[ind],'案例详情')
    app.globalData.cpxiaqs=cp[ind].productList[inds]
    app.Jump('product/cp/cpxq')
  },

   //请求所有收藏
   qinsouc:function(cp){
    var tha=this
    var gerxinx = wx.getStorageSync('gerxinx')
    if(!gerxinx){
      return false
    }
    var url = baseUrl + "production/findproductCollectionByUserId"
    var dat={
      brandid:'1',
      userid:gerxinx.id
    }
    http.promisServer(url, dat).then(resc=>{
      var sclist=resc.data.productCollectionList
      cp.forEach(el1 => {
        console.log(el1.productList,99)
        el1.productList.forEach(el2 => {
          sclist.forEach(el3 => {
            if(el2.id==el3.id){
              el2.sczt=true
            }
          });
        });  
      });
      this.setData({cp})
      console.log(resc.data.productCollectionList,'收藏列表')
    })
    
  },
  //收藏产品 
  sccp:function(e){
    var tha=this
    var gerxinx = wx.getStorageSync('gerxinx')
    var cp=this.data.cp
    var ind=app.hdindex(e,'ind')
    var inds=app.hdindex(e,'inds')
    if(!gerxinx){
      wx.showToast({title: '没有登录',icon: 'none',duration: 700})
      return false
    }
    var url = baseUrl + "production/productCollectionSaves"
    var dat={
      brandid:app.globalData.brandid,
      userid:gerxinx.id,
      productid:cp[ind].productList[inds].id
    }
    console.log(dat,"收藏状态改变前")
    http.promisServer(url, dat).then(resc=>{
      if(resc.status==0){
        cp[ind].productList[inds].sczt=false
        this.setData({cp})
        wx.showToast({title: '取消收藏',icon: 'none',duration: 800})
      }
      if(resc.status==1){
        cp[ind].productList[inds].sczt=true
        this.setData({cp})
        wx.showToast({title: '收藏成功',icon: 'none',duration: 800})
      }
      console.log(resc,'收藏状态改变')
      
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var titile=app.globalData.xiliexqs
    var cp=app.globalData.xiliexqs.allproductsList
    this.qingqcp(titile)
    console.log(cp,'系列详情')
    this.setData({titile})
  },
  //请求产品
  qingqcp:function(cps){
    var tha=this
    var url = baseUrl + "series/selectSeriesTypeByguige"
    var dat={
      brandid:app.globalData.brandid,
      productIdList:cps.cdid,
      guigeIdList:cps.geid
    }
    console.log(dat,9999)
    http.promisServer(url, dat).then(resc=>{
      if(resc.status=='000'){
        var cp=resc.data.allguigeProductLists
        this.qinsouc(cp)
        this.setData({cp})
      }
      
      console.log(cp,'获得产品')
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
    app.globalData.cpxiaqs=''
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