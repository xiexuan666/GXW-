// pages/me/issue/issue.js

const app = getApp();
const qqmapsdk = app.globalData.qqmapsdk;
const http = app.globalData.http;
const baseUrl = app.globalData.baseUrl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    money: '',
    man: '',
    jian: '',
    date: '-请选择-',
    dates: '-请选择-',
    // 判断接口的切换
    arry: undefined,
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.arry) {
      console.log('修改吧');
      console.log(JSON.parse(options.arry));
      let arry = JSON.parse(options.arry)
      this.setData({
        arry: arry,
        date: arry.create_time.replace('.', '-').replace('.', '-'),
        dates: arry.end_time.replace('.', '-').replace('.', '-'),
        money: arry.money,
        man: arry.man,
        jian: arry.jian,
      })
    } else {
      console.log('修改个的')
    }
  },
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  bindDateChanges: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      dates: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  //   arry: arry,
  //   date: arry.start_time.replace('.', '-').replace('.', '-'),
  //   dates: arry.stop_time.replace('.', '-').replace('.', '-'),
  //   neirong: arry.rule,
  //   address: arry.address,
  //   name: arry.product_name,
  //   neirongs: arry.product_detail,
  //   product: arry.product_yuanjia,
  //   seckill: arry.seckill_jiage,
  //   quantity: arry.seckill_number,
  //   specification: arry.guige,
  //   picture: arry.activity_image,
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  // 发布release
  release: function () {
    console.log(this.data.money, this.data.man, this.data.jian);
    //   coupon/saveCoupo
    // brandId
    // storeId
    // money面额
    // man满
    // jian 减
    // startTime活动开始时间
    // endTime活动结束时间
    // state状态为1未发布
    // issuer发布人Id
    console.log(this.data.arry);
    let arr = this.data.arry;
    let url;
    let data;
    if (this.data.arry) {
      //修改
      url = baseUrl + 'coupon/updateCoupon';
      data = {
        couponId: arr.c_id,
        money: this.data.money,
        man: this.data.man,
        jian: this.data.jian,
        startTime: this.data.date,
        endTime: this.data.dates,
        state: 1,
      }
    } else {
      //新增
      url = baseUrl + 'coupon/saveCoupo';
      data = {
        brandId: app.globalData.brandid,
        storeId: wx.getStorageSync('sjid'),
        money: this.data.money,
        man: this.data.man,
        jian: this.data.jian,
        startTime: this.data.date,
        endTime: this.data.dates,
        state: 1,
        issuer: 1
      }
    }

    // 限定金额输入
    if (Number.isFinite(Number(data.money))) {

    } else {
      wx.showToast({
        title: '面额必须是数字',
        icon: 'none',
        duration: 800
      })
      return false
    }
    if (Number.isFinite(Number(data.man))) {

    } else {
      wx.showToast({
        title: '金额必须是数字',
        icon: 'none',
        duration: 800
      })
      return false
    }
    if (Number.isFinite(Number(data.jian))) {

    } else {
      wx.showToast({
        title: '金额必须是数字',
        icon: 'none',
        duration: 800
      })
      return false
    }
    // 限定日期输入
    if (data.startTime == "-请选择-" || data.endTime == "-请选择-") {
      wx.showToast({
        title: '请选择优惠券有效期',
        icon: 'none',
        duration: 800
      })
      return false
    }
    let relust = data.startTime < data.endTime;
    if (relust) {

    } else {
      wx.showToast({
        title: '结束时间不能早于开始时间',
        icon: 'none',
        duration: 800
      })
      return false
    }
    console.log(data, url);
    http.promisServer(url, data).then(res => {
      console.log(res);
      wx.navigateBack()
    })
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