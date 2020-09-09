// pages/me/shouc/shouc.js
const {cpshuj} = require('../../product/jia.js');
const app = getApp();
const http = app.globalData.http;
const baseUrl = app.globalData.baseUrl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //产品或案例收藏
    cactiv:1,
    //产品假数据
    cp:[]
  },
  //跳转产品详情
  tzcpxq:function(e){
    var ind=app.hdindex(e,'ind')
    var cp=this.data.cp
    app.globalData.cpxiaqs=cp[ind]
    app.Jump('product/cp/cpxq')
  },
  //收藏产品
  sccp:function(e){
    var ind=app.hdindex(e,'ind')
    var cp=this.data.cp
    cp[ind].sczt=!cp[ind].sczt
    this.setData({cp})
  },
   //产品或案例选择
   canpiqieh:function(e){
    var ind=app.hdindex(e,'ind')
    console.log(ind)
    var cactiv=this.data.cactiv;
    if(ind==cactiv){
      return false
    }
    if(ind==1){
     cactiv=1
     wx.setNavigationBarTitle({ title: '产品收藏'})
    }
    if(ind==2){
     cactiv=2
     wx.setNavigationBarTitle({ title: '案例收藏'})
    }
    console.log(cactiv)
    this.setData({cactiv:cactiv})
   },
  
  //请求所有收藏
  qinsouc:function(){
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
        sclist.forEach(el2 => {
            if(!el2){
              return false
            }
            el2.sczt=true
        });
      this.setData({cp:sclist})
      console.log(resc,'收藏列表')
    })
    
  },
  //收藏产品
  sccp:function(e){
    var tha=this
    var gerxinx = wx.getStorageSync('gerxinx')
    var cp=this.data.cp
    var ind=app.hdindex(e,'ind')
    if(!gerxinx){
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //请求收藏
    this.qinsouc()
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