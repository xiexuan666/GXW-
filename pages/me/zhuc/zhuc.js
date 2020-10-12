// pages/me/me.js
const app = getApp();
const http = app.globalData.http;
const baseUrl = app.globalData.baseUrl;
const getInformation = app.globalData.getInformation;
Page({

  /**
   * 页面的初始数据
   */
  
  data: {
    //授权登录状态
    souq:true,
    //  手机授权状态
    sj:true,
    //申请模态框
    mtkzt:false,
    // 个信息
    gerxinx:null,
    //商家状态
    sjzt:{status:0},
    //当前状态
    status:0,
<<<<<<< HEAD
   
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
    
=======
    // 扫二维码获取到的id
    scene:null,
    // 商户信息：
    storeRecord:[],
    // 渲染input框的数组
    list:[
      {value:'姓名',prompt:'请输入真实姓名'},
      {value:'注册类别',prompt:''},
      {value:'联系电话',prompt:''},
      {value:'微信号',prompt:''},
      {value:'现居地',prompt:''},
      {value:'性别',prompt:'请选择'},
      {value:'籍贯',prompt:'请选择'},
      {value:'生日',prompt:'请选择'},
      {value:'爱好',prompt:''},
      {value:'备注',prompt:''},
    ],
    // 男女选择
    sex:['男','女'],
    value:0,
    user:[],
    data:'-请选择-',
  },
  //个人列表跳转
  // 实时添加用户输入的信息
  xueliinput:function(e){
    var that = this;
    let index =app.hdindex(e,'index');
    let data = that.data.user;
    data[index] = e.detail.value;
    that.setData({
      user:data
    })
    console.log(that.data.user);
  },
// 实时获取生日
bindDateChange: function (e) {
  let index = app.hdindex(e,'index');
  let data = this.data.user;
  data[index] = e.detail.value;
  this.setData({
    date:e.detail.value,
    user:data
  })
},
  // 提交时将数据整合
  subscribe:function(e){
    var that = this;
    var user = that.data.user;
    // 传过来的商家信息
    var storeRecord = that.data.storeRecord;
    let data = {
      // 动态参数
      user_id:wx.getStorageSync('gerxinx').id,
      brand_id:'2',
      store_id:storeRecord.id,
      shopowner_id:storeRecord.userid,
      superior_id:storeRecord.userid,
      // 表单数据
      waiter_name:user[0],//用户名
      //注册类别user[1]
      waiter_phone:user[2],//联系电话
      wx_code:user[3],//微信号
      address:user[4],//地址
      sex:'',//性别
      native_place:user[6],//籍贯
      birthday:user[7],//生日
      hobby:user[8],//爱好
      remark:user[9],//备注
      // 默认值
      status:0        
    }
    if(that.data.value){
      console.log(that.data.value)
      data.sex = '女';
    }else{
      console.log(that.data.value)
      data.sex = '男';
    }
    // 发起保存
    console.log(data);
    getInformation.save(data).then(res=>{
      console.log(res);
    })
>>>>>>> d24e5d68f2511ff808d7dd102607e5500bf4b225
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
    
  }
  ,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
<<<<<<< HEAD
    
=======
    console.log(options.scene);
    // 拿到第一个参数请求商家信息
      if(options.scene){
        // 调用parameter获取商家信息
        getInformation.parameter(options.scene).then(res=>{
          console.log(res.data.storeRecord);
          this.setData({
            storeRecord:res.data.storeRecord
          });
          console.log(this.data.storeRecord);
        })
      }else{
        return false
      }
>>>>>>> d24e5d68f2511ff808d7dd102607e5500bf4b225
  },
  // 性别选项选择器
  sexCheck:function(e){
    this.setData({
      value: e.detail.value,
    })
  },
  // 日期选择器
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
/**
 * 获取用户输入的信息
 */ 


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
<<<<<<< HEAD
    
    
    //获取缓存信息
=======
    //获取缓存信息、商家状态
>>>>>>> d24e5d68f2511ff808d7dd102607e5500bf4b225
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
<<<<<<< HEAD
    var dat={userid:gerxinx.id,brandid:'1'}
=======
    var dat={userid:gerxinx.id,brandid:app.globalData.brandid}
>>>>>>> d24e5d68f2511ff808d7dd102607e5500bf4b225
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