// pages/product/sousuo.js
const app = getApp();
const http = app.globalData.http;
const baseUrl = app.globalData.baseUrl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    zhi:'',
    cp:[]
  },
  cpsous:function(e){
    var tha=this
    var zhi=e.detail.value
    this.setData({zhi})
  },
  sousjier:function(){
    var tha=this
    var zhi=this.data.zhi
    
    var url = baseUrl + "production/souSuoProductPage"
    var dat={
      brandid:'1',
      name:zhi
    }
    console.log(dat)
    http.promisServer(url, dat).then(resc=>{
      
      var sclist=resc.data.souSuoProductList
      var cp=sclist
      if(cp.length==0){
        wx.showToast({title: '没有相关结果',icon: 'none',duration: 700})
      }
      this.setData({cp})
      tha.qinsouc(cp)
      console.log(resc,'搜索结果')
    })
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
        console.log(cp,resc.data.productCollectionList)
      var sclist=resc.data.productCollectionList
      cp.forEach(el1 => {
        sclist.forEach(el2 => {
          if(el1.id==el2.id){
            el1.sczt=true
          }
        });
      });
      
      this.setData({cp})
      console.log(resc.data.productCollectionList,'搜索收藏列表')
    })
    
  },
  //收藏产品
  sccp:function(e){
    var tha=this
    var gerxinx = wx.getStorageSync('gerxinx')
    var cp=this.data.cp
    var ind=app.hdindex(e,'ind')
    if(!gerxinx){
      wx.showToast({title: '没有登录',icon: 'none',duration: 700})
      return false
    }
    var url = baseUrl + "production/productCollectionSaves"
    var dat={
      brandid:'1',
      userid:gerxinx.id,
      productid:cp[ind].id
    }
    console.log(dat,"收藏状态改变前")
    http.promisServer(url, dat).then(resc=>{
      if(resc.status==0){
        cp[ind].sczt=false
        this.setData({cp})
        wx.showToast({title: '取消收藏',icon: 'none',duration: 800})
      }
      if(resc.status==1){
        cp[ind].sczt=true
        this.setData({cp})
        wx.showToast({title: '收藏成功',icon: 'none',duration: 800})
      }
      console.log(resc,'收藏状态改变')
    })
  },
   //跳转产品详情
   tzcpxq:function(e){
    var ind=app.hdindex(e,'ind')
    app.Jump('product/cp/cpxq')
    var cp=this.data.cp
    // console.log(annrshuz[ind],'案例详情')
    app.globalData.cpxiaqs=cp[ind]
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
    // this.qinsouc()
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