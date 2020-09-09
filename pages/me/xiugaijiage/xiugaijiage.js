// pages/me/xiugaijiage/xiugaijiage.js
const app = getApp();
const http = app.globalData.http;
const baseUrl = app.globalData.baseUrl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    xiugnr:[
      
    ],

    //规格
    product_guige:'',
    //产品id
    cpid:'',
    //所有系列内容
    xilienr:'',
    //产品名字
    cpname:''
  },
  //头部选择
  //选择系列或产品更新内容
  anlitopxuanz:function(e){
    console.log(e,9999)
    var ind=app.hdindex(e,'ind')
    var id=app.hdindex(e,'idc')
    var ids=app.hdindex(e,'ids')
    var xilienr=this.data.xilienr
    var xiugnr=this.data.xiugnr
    var product_guige=''
    var cpid=''
   var cpname=''
    if(ids==0){
      if(!xilienr[ind].allproductsList.length){
        wx.showToast({title: '没有相关产品',icon: 'none',duration: 700})
        return false
      }
      xiugnr=[
        {
          'name': '系列',
          'xuanz': xilienr[ind].id,
          'id': 0,
          'list':xilienr,
          'ind':ind
        },
        {
          'name': '产品名字',
          'xuanz': xilienr[ind].allproductsList[0].id,
          'id': 1,
          'list':xilienr[ind].allproductsList
        }
      ]
         cpid=xilienr[ind].allproductsList[0].id
         cpname=xilienr[ind].allproductsList[0].name
         product_guige=JSON.parse(xilienr[ind].allproductsList[0].product_guige)
    }
    if(ids==1){
      if(!xilienr[xiugnr[0].ind].allproductsList.length){
        wx.showToast({title: '没有相关产品',icon: 'none',duration: 700})
        return false
      }
       xiugnr[1].xuanz=xilienr[xiugnr[0].ind].allproductsList[ind].id
       cpname==xilienr[xiugnr[0].ind].allproductsList[ind].name
       xiugnr[1].list=xilienr[xiugnr[0].ind].allproductsList
       cpid=xilienr[xiugnr[0].ind].allproductsList[ind].id
       product_guige=JSON.parse(xilienr[xiugnr[0].ind].allproductsList[ind].product_guige)
    }
    
    this.qingqjiage(cpid,product_guige)
    this.setData({xiugnr,cpid,product_guige,cpname})
    
    
  },
   //请求系列
   qingvideolist:function(){
    var tha=this
    var url = baseUrl + "series/index"
    var dat={
      seriesBrandId:'1'
    }
    http.promisServer(url, dat).then(resc=>{
      var dt = resc.data.allseriessLists
      if(!dt[0].allproductsList[0]){
        wx.showToast({title: '没有相关产品',icon: 'none',duration: 700})
        return false
      }
      console.log(dt,'系列')
      var xiugnr=[
        {
          'name': '系列',
          'xuanz': dt[0].id,
          'id': 0,
          'list':dt,
          'ind':0
        },
        {
          'name': '产品名字',
          'xuanz': dt[0].allproductsList[0].id,
          'id': 1,
          'list':dt[0].allproductsList
        }
      ]
      var xilienr=dt
      var product_guige=JSON.parse(dt[0].allproductsList[0].product_guige)
      var cpid=dt[0].allproductsList[0].id
      var cpname=dt[0].allproductsList[0].name
      tha.qingqjiage(cpid,product_guige)
      
			tha.setData({xiugnr,product_guige,cpid,xilienr,cpname})
      console.log(resc.data.allseriessLists,product_guige,'系列列表')
    })
  },
  //请求价格
  qingqjiage:function(cpid,nr){
    var tha=this
    var sjzt = wx.getStorageSync('sjzt')
    if(!sjzt&&sjzt.record&&sjzt.record.id){
      return false
    }
    var url = baseUrl + "production/findproductPriceById"
    var dat={
      storeid:sjzt.record.id,
      brandid:'1',
      productid:cpid
    }
    console.log(dat,'data')
    http.promisServer(url, dat).then(resc=>{
      console.log(resc,'价格')
      if(!resc.data.productprice){
        nr.forEach(el => {
          el.jiage=''
        });
      }else{
        var productprice=resc.data.productprice.product_price
        productprice=JSON.parse(productprice)
        console.log(productprice,666)
        nr.forEach((el,ind) => {
          productprice.forEach(el2 => {
            if(el.weiyi==el2.weiyi){
              el.jiage=el2.jiage
            }
          });
        });
        
      }
     
      tha.setData({product_guige:nr})
    })
  },
   //加载
   jiaz:function(name){
    wx.showToast({
      title: name,
      icon: 'none',
      duration: 800
    })
    
  },
  // 保存价格
  baocjiage:function(){
    var tha=this
    var cpid=this.data.cpid
    var sjzt = wx.getStorageSync('sjzt')
    if(!sjzt&&sjzt.record&&sjzt.record.id){
      return false
    }

    var product_guige=JSON.stringify(this.data.product_guige)
    var url = baseUrl + "production/productPriceSave"
    var dat={
      storeid:sjzt.record.id,
      brandid:'1',
      productid:cpid,
      productprice:product_guige
    }
   
    console.log(dat,'data')
    http.promisServer(url, dat).then(resc=>{
      
      console.log(resc.status,'保存')
      
      if(resc.status=='000'){
        tha.jiaz('保存成功')
      }
      
    })
  },
  //键盘发生变化
  fanbianh:function(e){
    var val=e.detail.value
    var ind=app.hdindex(e,"ind")
    var product_guige= this.data.product_guige
    console.log(product_guige,ind)
    product_guige[ind].jiage=val
    this.setData({product_guige})
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.qingvideolist()
    
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