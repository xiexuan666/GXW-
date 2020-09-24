// pages/me/me.js
const app = getApp();
const http = app.globalData.http;
const baseUrl = app.globalData.baseUrl;
Page({

  /**
   * 页面的初始数据
   */
  
  data: {
    //商家状态
    sjzt:{status:0},
    //当前状态
    status:0,
     // 开始时间
     timestar:'09:00',
     //结束时间
     timeend: '18:00',
     //入住时间
     date: '2020-06-01',
     //选择的地址
     address:'',
     //图像数组
     tupian:[],
     //二维码数组
     erwm:[],
     //长按阻止点击
     longzt:true,
     // 纬度
     latitude:'',
     //经度
     longitude:'',
     //手机号码
     phone:'',
     //个人信息
     gerxinx:'',
     //实时省市区
     addresstwo:'',
     
     //从新申请渲染需要的
     //商家名称
     storename:'',
     //地区
     type:'',
     //联系人
     shopowner:'',
     //商家信息
     sjzt:{status:0}
   
  },
  //个人列表跳转

  melisttz:function(e){
    console.log(e)
    var ind=app.hdindex(e,'ind')
    console.log(ind)
    switch (ind) {
      case '0':
        var gerxinx = wx.getStorageSync('gerxinx')
        if (!gerxinx) {
          this.setData({souq: false})
          return false
        }
        app.Jump('me/shouc/shouc')
        break;
      case '1':
        app.Jump('me/guanli/guanli')
        break;
      case '2':
        var gerxinx = wx.getStorageSync('gerxinx')
        if (!gerxinx) {
          this.setData({souq: false})
          return false;
        }
        this.setData({mtkzt:true})
        break;
      case '3':
        app.Jump('me/shenhezt/shenhezt')
        break;  
      default:
        break;
    }
    
  },

  //渲染内容
  xuanr:function(sjzt){
    if(sjzt.status==3||sjzt.status==2){
      var record=sjzt.record
      var open_time=record.open_time
      open_time=open_time.split("-")
      var tupian=[]
      tupian[0]=record.logo
      var erwm=[]
      erwm[0]=record.wxhao
      this.setData({
        storename:record.store_name,
        type:record.type,
        shopowner:record.shopowner,
        phone:record.phone,
        address:record.address,
        addresstwo:record.address_two,
        latitude:record.position_latitude,
        longitude:record.position_longitude,
        timestar:open_time[0],
        timesend:open_time[1],
        tupian:tupian,
        erwm:erwm,

      })
    }
  },

  //现金购买
  qianzhif: function (name) {
    var gerxinx = this.data.gerxinx
    //金额
    // let qian = e.currentTarget.dataset.q * 100;
    //课程id
    // var classid = this.data.classxq.id
    //课程名字
    var storeusername = name
    var that = this
    if (!gerxinx) {return false;}
    let url = baseUrl + "wxpay/topay"
    var datas={
      openid: gerxinx.open_id,
      totalfee:app.globalData.jiage,
      userid: gerxinx.id,
      storeusername,
      brandid:'1'
      // classusername: xinx.wx_name
    }
    var p = new Promise(function(resolve, reject) {
      http.promisServer(url, datas).then(res=>{
        console.log(res,'现金购买调起前')
        wx.requestPayment({
          timeStamp: res.data.returncode.timeStamp,
          nonceStr: res.data.returncode.nonceStr,
          package: res.data.returncode.package,
          signType: 'MD5',
          paySign: res.data.returncode.paySign,
          success: res => { 
            console.log(res,'支付成功后结果')
            resolve(true)
          },
          fail: () => {console.log(res);},
          complete: () => {console.log(res);}
        })
        
      })
    })
    return p;

  },

  //提交内容
  tijiaoform(e) {
    var tha=this
    var sjzt=this.data.sjzt
    var gerxinx=this.data.gerxinx
    var tjnr=e.detail.value
    var addresstwo=this.data.addresstwo
    var userid=gerxinx.id
    var brandid='1'
    var opentime=tjnr.kais+"-"+tjnr.jies
    var wxhao=this.data.erwm[0]
    var logo=this.data.tupian[0]
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    tjnr.logo=logo
    tjnr.addresstwo=addresstwo
    var pdjieg= this.pdtjnr(tjnr)
    if(!pdjieg){return false}
    
    tjnr.status=1
    tjnr.userid=userid
    tjnr.brandid=brandid
    tjnr.opentime=opentime
    console.log(tjnr,'提交之前的结果')
    
    
    
    if(sjzt&&sjzt.record&&sjzt.record.id){
      console.log(sjzt,'商家状态')
      if(sjzt.record.status==1){
        tjnr.status=1
      }
      if(sjzt.record.status==2){
        tjnr.status=2
      }
      tjnr.id=sjzt.record.id
      tha.formtij(tjnr)
      return false
    }
    //支付现金
    this.qianzhif(tjnr.shopowner).then(res=>{
      if(res){
        // 提交
        tha.formtij(tjnr)
      }
    })

  },
  //真正向服务器提交内容
  formtij(tjnr){
    var tha=this
    var url = baseUrl + "store/storeJoin"
    http.promisServer(url, tjnr).then(resc=>{
      console.log(resc.status,'提交内容后结果')
      if(resc.status=='000'){
        tha.tis('提交成功')
        if(tjnr.status==2){
          tha.hqshangzt(tjnr.userid)
          return false
        }
        setTimeout(function(){
          app.Jumps('me/me')
        },1000)
      }
    })
  },

  //判断提交内容
  pdtjnr(tjnr){
    if(!tjnr.storename){this.tis('请输入商户名称') 
    return false}
    if(!tjnr.type){this.tis('请输入地区') 
    return false}
    if(!tjnr.shopowner){this.tis('请输入联系人名称') 
    return false}
    if(!tjnr.phone){this.tis('请输入手机号码') 
    return false}
    if(!tjnr.address){this.tis('请选择地址') 
    return false}
    if(!tjnr.jies){this.tis('请选择地址没经度') 
    return false}
    if(!tjnr.weidu){this.tis('请选择地址没纬度') 
    return false}
    if(!tjnr.addresstwo){this.tis('请选择地址') 
    return false}
    if(!tjnr.kais){this.tis('请选择开始营业时间') 
    return false}
    if(!tjnr.jies){this.tis('请选择结束营业时间') 
    return false}
    if(!tjnr.logo){this.tis('请上传商家LOGO图片') 
    return false}
    
    return true
  },
  //获取当前商家状态
  hqshangzt(id){
    var tha=this
    var dat={userid:id,brandid:'1'}
    var url = baseUrl + 'store/storestatus' 
    http.promisServer(url,dat).then(function(resc){
      if(resc.status=="000"){
        console.log(resc,'商家状态')
        var sjzt=resc.data
        wx.setStorage({ key:"sjzt", data:sjzt})
        setTimeout(function(){
          wx.navigateBack({})
        },100)
      }
    })
  },
  //提示
  tis(name){
    wx.showToast({
      title: name,
      icon: 'none',
      duration: 1800 //持续的时间
    })
  },
  //点击打开图片
  dakerw:function(e){
    var longzt=this.data.longzt
    if(!longzt){return false}
    var img=app.hdindex(e,'img')
    wx.previewImage({
      current: img, // 当前显示图片的http链接 
      urls: [img]
    })
  },
  // 删除头像图片
  shanc:function(e){
    var tha=this
    var tupian=tha.data.tupian
    var ind=app.hdindex(e,'ind')
    this.setData({longzt:false})
    wx.showModal({
      title: '删除图片',
      content: '是否要删除图片',
      success (res) {
        if (res.confirm) {tupian.splice(ind,1)}
      },
      complete(){tha.setData({longzt:true,tupian})}
    })
  },
  //上传头像图片
  shangctup:function(){
   var shul=1
    app.xuanzup(shul).then(rec=>{
        rec.forEach(filePath => {
          var tupian=this.data.tupian
          app.shangctup(filePath).then(res=>{
            tupian.unshift(res)
            if(tupian.length<shul+1){
              this.setData({tupian})
            }else{
              console.log(tupian)
              tupian.splice(shul)
              this.setData({tupian})
            }
          })
        });
    })
  },
  //上传二维码图片
  shangcerw:function(){
    var shul=1
     app.xuanzup(shul).then(rec=>{
         rec.forEach(filePath => {
           var erwm=this.data.erwm
           app.shangctup(filePath).then(res=>{
            erwm.unshift(res)
             if(erwm.length<shul+1){
               this.setData({erwm})
             }else{
              erwm.splice(shul)
               this.setData({erwm})
             }
           })
         });
     })
   },
   // 删除二维图片
  shancer:function(e){
    var tha=this
    var erwm=tha.data.erwm
    var ind=app.hdindex(e,'ind')
    this.setData({longzt:false})
    wx.showModal({
      title: '删除图片',
      content: '是否要删除图片',
      success (res) {
        if (res.confirm) {erwm.splice(ind,1)}
      },
      complete(){tha.setData({longzt:true,erwm})}
    })
  },
  //开始事件
  bindTimeChangestar: function(e) {
    this.setData({timestar: e.detail.value})
  },
  // 结束事件
  bindTimeChangeend: function(e) {
    this.setData({timeend: e.detail.value})
  },
  //入驻事件
  bindDateChange: function(e) {
    this.setData({date: e.detail.value})
  },
  //位置选择
  wzxuanz: function () {
    var tha = this
    //获得当前经纬度
    app.huodjwd().then(rec=>{
        wx.chooseLocation({
          latitude:rec.latitude,
          longitude:rec.longitude,
          success(res) {
            console.log(res,'hdnr')
            tha.formSubmit(res.latitude,res.longitude)
            tha.setData({
              address: res.address,
              latitude:res.latitude,
              longitude:res.longitude
            })
          }
        }
      )
    })
  },
   //根据经纬度得到地区
   formSubmit(latitude, longitude) {
    var tha = this;
     console.log(latitude,longitude)
    qqmapsdk.reverseGeocoder({
      location: {
        latitude: latitude,
        longitude: longitude
      },
      success: function (res) {//成功后的回调
        var rec=res.result.address_component
        var addresstwo=rec.province+rec.city+rec.district
        console.log(addresstwo,"地址获得地区")
        tha.setData({addresstwo})
      },

    })
  },
  //获取缓存信息
  huqhcgrxin(){
    var tha=this
    var gerxinx = wx.getStorageSync('gerxinx')
    if(gerxinx){
      this.setData({gerxinx})
      return false
    }
      app.huoqopenid()
      .then((openid)=>app.cuncgerxinx(openid))
      .then(gerxinx=>{
        tha.setData({gerxinx})
      })
  },
  // 初始化
  init:function(){
    var gerxinx = wx.getStorageSync('gerxinx')
    var sjzt = wx.getStorageSync('sjzt')
    if(!gerxinx){
      app.Jumps('me/me')
      return false
    }
    if(!sjzt){
      app.Jumps('me/me')
      return false
    }
    this.xuanr(sjzt)
    console.log(sjzt,'商家状态')
    this.setData({'phone':gerxinx.phone,gerxinx,sjzt})
  },
  
  //申请
  shenq:function(){
    app.Jump('me/ruzhu/ruzhu')
    this.setData({mtkzt:false})
  },
  //取消模态框了
  quxiaomtk:function(){
    this.setData({mtkzt:false})
  },
  //阻止冒泡
  zhuzi:function(){
    return false;
  },
  // 跳转到注册页面
  handlezhuc:function(){
    app.Jump('me/zhuc/zhuc')
  },
  // 跳转到管理
  manage:function(){
wx.navigateTo({
  url: '/pages/me/guanli/guanli',
})
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
    if(!app.globalData.status){
      app.banbzt().then(resc=>{
        this.setData({status:app.globalData.status})
      })
    }else{
      this.setData({status:app.globalData.status})
    }
    
    
    //获取缓存信息
    this.huqhcgrxin()
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
  onShareTimeline: function (){},
  //关闭弹窗
  tancxiaos: function(e) {
    this.setData({
      souq: true
    })
    this.setData({
      sj: true
    })
  },
  //获取缓存信息
  huqhcgrxin(){
    var tha=this
    var gerxinx = wx.getStorageSync('gerxinx')
    if(gerxinx){
      tha.hqshangzt(gerxinx)
      this.setData({gerxinx})
      return false
    }
      app.huoqopenid()
      .then((openid)=>app.cuncgerxinx(openid))
      .then(gerxinx=>{
        tha.hqshangzt(gerxinx)
        tha.setData({gerxinx})
      })
  },
  //获取当前商家状态
  hqshangzt(gerxinx){
    var tha=this
    var dat={userid:gerxinx.id,brandid:'1'}
    var url = baseUrl + 'store/storestatus' 
    http.promisServer(url,dat).then(function(resc){
      if(resc.status=="000"){
        console.log(resc,'商家状态')
        var sjzt=resc.data
        wx.setStorage({ key:"sjzt", data:sjzt})
        tha.setData({sjzt:sjzt})
      }
    })
  },

  //没有用防止事件传给父元素
  meiy: function() {
  },
  //点击弹出登录
  dianjidl: function () {
    this.setData({souq: false})
  },
  //登录
  bindGetUserInfo: function(e) {
    var tha=this;
    wx.clearStorage()
     // 获得当前地址
    app.dtxx()
    
    if (e.detail.userInfo) {
      wx.showToast({title: '获取用户授权中',icon: 'loading',duration: 3000})
      app.denlus()
      .then(res=>{
        tha.setData({ souq: true,sj:false,gerxinx:res})
        wx.hideToast()
      })
    } else {
      this.setData({souq: true})
    }
  },
  //手机授权
  getPhoneNumber(e) {
    var tha = this
    //获取手机号
    var gerxinx = wx.getStorageSync('gerxinx')
    if(gerxinx&&gerxinx.phone){
      tha.setData({sj: true})
      return false
    }
    var openid=gerxinx.open_id
    app.getphone(e,openid).then(res=>{
      tha.setData({sj: true,gerxinx:res})
    })
  },
})