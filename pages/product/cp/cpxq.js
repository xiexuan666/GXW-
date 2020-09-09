// pages/product/cp/cpxq.js
const app = getApp();
const http = app.globalData.http;
const baseUrl = app.globalData.baseUrl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //产品详情状态
     cpxqzt:1,
     cpxiaqs:''
  },
  //产品详情导航选择
  cpxzxz:function(e){
    var ind=app.hdindex(e,'ind')

   var cpxqzt=this.data.cpxqzt;
   if(ind==cpxqzt){return false}
   if(ind==1){
    cpxqzt=1
    wx.setNavigationBarTitle({ title: '产品故事'})
   }
   if(ind==2){
    cpxqzt=2
    wx.setNavigationBarTitle({ title: '空间效果'})
   }
   if(ind==3){
    cpxqzt=2
    // wx.setNavigationBarTitle({ title: '全景体验'})
    var url=this.data.cpxiaqs.product_vr
    
    app.Jump('souye/webwei/weibwei',{'url':url})
    
   }
   this.setData({cpxqzt:cpxqzt})
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
   //请求价格
   qingqjiage:function(cpxiaqs){
    
    var tha=this
    var bendijxs = wx.getStorageSync('bendijxs')
    if(!bendijxs||!bendijxs.id){
      return false
    }
    var nr=cpxiaqs.product_guige
    
    
    var url = baseUrl + "production/findproductPriceById"
    var dat={
      storeid:bendijxs.id,
      brandid:'1',
      productid:cpxiaqs.id
    }
    console.log(dat,'data')
    http.promisServer(url, dat).then(resc=>{
      console.log(resc,'价格1111111111111')
      if(!resc.data.productprice){
        console.log(7777777)
        nr.forEach(el => {
          el.jiage=''
        });
      }else{

        var productprice=resc.data.productprice.product_price
        productprice=JSON.parse(productprice)
        console.log(productprice,nr,666)
        nr.forEach((el,ind) => {
          productprice.forEach(el2 => {

            if(el.weiyi==el2.weiyi){
              
              el.jiage=el2.jiage
            }
          });
        });
         
      }
      cpxiaqs.product_guige=nr
      console.log( cpxiaqs.product_guige,"价格")
      tha.setData({cpxiaqs})
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  isString:function (str){ 
    return (typeof str=='string')&&str.constructor==String; 
    },
  onLoad: function (options) {
    console.log(app.globalData.cpxiaqs,'执行了吗')
    var cpxiaqs=app.globalData.cpxiaqs
    if(cpxiaqs.product_guige&&this.isString(cpxiaqs.product_guige)){
      cpxiaqs.product_guige=JSON.parse(cpxiaqs.product_guige)
    
    }
    if(cpxiaqs.product_images&&this.isString(cpxiaqs.product_images)){
      cpxiaqs.product_images=JSON.parse(cpxiaqs.product_images)
    }
    
    

    if(cpxiaqs){
      this.qingqjiage(cpxiaqs)
    }
    this.setData({cpxiaqs})
    console.log(cpxiaqs,'案例详情')
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