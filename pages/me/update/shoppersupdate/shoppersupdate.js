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
      {value:'姓名'},
      {value:'注册类别'},
      {value:'联系电话'},
      {value:'微信号'},
      {value:'现居地'},
      {value:'性别'},
      {value:'籍贯'},
      {value:'生日'},
      {value:'爱好'},
      {value:'备注'},
    ],
    // 传递过来的数组
    arry:[],
    // user 用户信息
    user:[]
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
    let data = that.data.user;
    data[index] = e.detail.value;
    that.setData({
      user:data
    })
    console.log(that.data.user);
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
      waiter_name:user[0],//用户名
      //注册类别user[1]
      waiter_phone:user[2],//联系电话
      wx_code:user[3],//微信号
      address:user[4],//地址
      sex:user[5],//性别
      native_place:user[6],//籍贯
      birthday:user[7],//生日
      hobby:user[8],//爱好
      remark:user[9],//备注
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