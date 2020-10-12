// pages/me/update/shoppersupdate/shoppersupdate.js
const app = getApp();
const http = app.globalData.http;
const baseUrl = app.globalData.baseUrl;
const getInformation = app.globalData.getInformation;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[
      {value:'姓名',prompt:''},
      {value:'注册类别',prompt:''},
      {value:'联系电话',prompt:''},
      {value:'微信号',prompt:''},
      {value:'现居地',prompt:''},
      {value:'性别',prompt:''},
      {value:'籍贯',prompt:''},
      {value:'生日',prompt:''},
      {value:'爱好',prompt:''},
      {value:'备注',prompt:''},
    ],
    // 传递过来的数组
    arry:[],
    // user 用户信息
    user:[],
    // 男女选择
    sex:['男','女'],
    value:0,
    user:[],
    data:'-请选择-',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.arry);
    JSON.parse(options.arry);
    this.setData({
      arry:JSON.parse(options.arry)
    })
    console.log(this.data.arry);
    let lists = this.data.arry;
    let list = this.data.list;
    list[0].prompt =lists.waiter_name;
    list[1].prompt ='';
    list[2].prompt =lists.waiter_phone;
    list[3].prompt =lists.wx_code;
    list[4].prompt =lists.address;
    // list[5].prompt =lists.waiter_name;
    list[6].prompt =lists.remark;
    list[7].prompt = lists.birthday;
    list[8].prompt = lists.native_place;
    list[9].prompt = lists.hobby;
    if(lists.sex == '男'){
      this.setData({
        value:0
      })
    }else{
      this.setData({
        value:1
      })
    }
    this.setData({
      list:list,
      user:list
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  // 实时添加用户输入的信息
  xueliinput:function(e){
    var that = this;
    let index =app.hdindex(e,'index');
    let data = that.data.list;
    data[index].prompt = e.detail.value;
    that.setData({
      list:data
    })
    console.log(that.data.list);
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
  // 提交时将数据整合
  subscribe:function(e){
    var that = this;
    var user = that.data.user;
    var storeRecord = that.data.arry;
    let data = {
      // 动态参数
      user_id:wx.getStorageSync('gerxinx').id,
      id:storeRecord.id, 
      // 表单数据
      waiter_name:user[0].prompt,//用户名
      //注册类别user[1]
      waiter_phone:user[2].prompt,//联系电话
      wx_code:user[3].prompt,//微信号
      address:user[4].prompt,//地址
      sex:user[5].prompt,//性别
      native_place:user[6].prompt,//籍贯
      birthday:user[7].prompt,//生日
      hobby:user[8].prompt,//爱好
      remark:user[9].prompt,//备注
      // 默认值
      status:0        
    }

    // 发起保存
    console.log(data);
    getInformation.save(data).then(res=>{
      console.log(res);
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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