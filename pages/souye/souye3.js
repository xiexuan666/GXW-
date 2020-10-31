// pages/souye/souye3.js

const app = getApp();
const qqmapsdk = app.globalData.qqmapsdk;
const http = app.globalData.http;
const baseUrl = app.globalData.baseUrl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //选择的地址
    address: '',
    //手机号码
    phone: '',
    //选择日期
    date: '',
    //联系人
    shopowner: '',
    //实时省市区
    addresstwo: '',
    isSubmit: false,
  },


  // // 预约成功
  // yuyue: function () {
  //   wx.showModal({
  //     title: '提示',
  //     content: '预约成功'
  //   })
  // },
  //渲染内容
  xuanr: function (sjzt) {
    if (sjzt.status == 3 || sjzt.status == 2) {
      var record = sjzt.record
      var open_time = record.open_time
      open_time = open_time.split("-")
      var tupian = []
      tupian[0] = record.logo
      var erwm = []
      erwm[0] = record.wxhao
      this.setData({
        storename: record.store_name,
        type: record.type,
        shopowner: record.shopowner,
        phone: record.phone,
        address: record.address,
        date: record.date,
      })
    }
  },

  //位置选择
  wzxuanz: function () {
    var tha = this
    //获得当前经纬度
    app.huodjwd().then(rec => {
      wx.chooseLocation({
        latitude: rec.latitude,
        longitude: rec.longitude,
        success(res) {
          console.log(res, 'hdnr')
          tha.formSubmit(res.latitude, res.longitude)
          tha.setData({
            address: res.address,
            latitude: res.latitude,
            longitude: res.longitude
          })
        }
      }
      )
    })
  },
  //根据经纬度得到地区
  formSubmit(latitude, longitude) {
    var tha = this;
    console.log(latitude, longitude)
    qqmapsdk.reverseGeocoder({
      location: {
        latitude: latitude,
        longitude: longitude
      },
      success: function (res) {//成功后的回调
        var rec = res.result.address_component
        var addresstwo = rec.province + rec.city + rec.district
        console.log(addresstwo, "地址获得地区")
        tha.setData({ addresstwo })
      },
    })
  },


  // 预约日期
  datePickerBindchange: function (e) {
    this.setData({
      dateValue: e.detail.value
    })
  },
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },

  // 客户提交预约量房信息
  yuyue: function() {
    let userid = wx.getStorageSync('gerxinx').id;
    let brand_id = app.globalData.brandid;
    var shopowner = this.data.shopowner;
    var phone = this.data.phone;
    var address = this.data.address;
    var date = this.data.date;
    console.log(phone);
    console.log(address);
    console.log(date);
    
    console.log(shopowner+'11111111111111111111');
   
    // 判断用户是否有输入值
    if (shopowner == "") {
      wx.showModal({
        title: '提示',
       content: '请输入姓名',
      })
      return false
    }
    else if (phone == "") {
       wx.showModal({
        title: '提示',
       content: '请输入手机号码',
      })
      return false
    }
    else if (address == "") {
       wx.showModal({
        title: '提示',
        content: '请选择所在地区',
      })
      return false
    }
    else if (date == "") {
       wx.showModal({
        title: '提示',
       content: '请选择上门时间',
      })
      return false
    }else {
      // 信息无误，发送请求并跳转页面
 
    let data ={
    brandId:brand_id,
    userId:userid,
    phone:phone,
    name:shopowner,
    date:date,
    address:address,
    storeId:wx.getStorageSync('bendijxs').id,
  }
    // 在这里判断值，是否是修改
    if(this.data.judge){
    data.addressId=this.data.judge
    }else{

    }
    let url = baseUrl + 'activity/yuyue/client/save';
    console.log(data,url);
    http.promisServer(url,data).then(res=>{
      console.log(res);
      wx.showModal({
        title: '提示',
        content:'预约成功',
      })
      setTimeout(function(){ 
        wx.navigateBack()
      }, 500);
      
    })

  }
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