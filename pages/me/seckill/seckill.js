const app = getApp();
const http = app.globalData.http;
const qqmapsdk = app.globalData.qqmapsdk;
const baseUrl = app.globalData.baseUrl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //选择日期
    date: '',
    date2: '',
    //图像数组
    tupian: [],
    // 规则
    neirong: '',
    // 门店地址
    address: '',
    // 产品名称
    name: '',
    // 产品简介
    neirongs: '',
    // 产品原价
    product: '',
    // 秒杀价格
    seckill: '',
    // 限购数量
    quantity: '',
    // 规格
    specification: '',
    picture: [],
    // 判断接口的切换
    arry: undefined,
  },

  // 预约日期
  datePickerBindchange: function (e) {
    this.setData({
      dateValue: e.detail.value,

    })
  },
  // 开始时间
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  // 结束时间
  bindDateEndChange: function (e) {
    var that = this;
    that.setData({
      date2: e.detail.value
    })
  },
  //点击打开图片
  dakerw: function (e) {
    var longzt = this.data.longzt
    if (!longzt) { return false }
    var img = app.hdindex(e, 'img')
    wx.previewImage({
      current: img, // 当前显示图片的http链接 
      urls: [img]
    })
  },
  // 删除头像图片
  shanc: function (e) {
    var tha = this
    var tupian = tha.data.tupian
    var ind = app.hdindex(e, 'ind')
    this.setData({ longzt: false })
    wx.showModal({
      title: '删除图片',
      content: '是否要删除图片',
      success(res) {
        if (res.confirm) { tupian.splice(ind, 1) }
      },
      complete() { tha.setData({ longzt: true, tupian }) }
    })
  },
  //上传头像图片
  shangctup: function () {
    var shul = 1
    app.xuanzup(shul).then(rec => {
      rec.forEach(filePath => {
        var tupian = this.data.tupian
        app.shangctup(filePath).then(res => {
          tupian.unshift(res)
          if (tupian.length < shul + 1) {
            this.setData({ tupian })
          } else {
            console.log(tupian)
            tupian.splice(shul)
            this.setData({ tupian })
          }
        })
      });
    })
  },
  //点击打开图片
  dakerw: function (e) {
    var longzt = this.data.longzt
    if (!longzt) { return false }
    var img = app.hdindex(e, 'img')
    wx.previewImage({
      current: img, // 当前显示图片的http链接 
      urls: [img]
    })
  },
  // 删除头像图片
  shanc: function (e) {
    var tha = this
    var picture = tha.data.picture
    var ind = app.hdindex(e, 'ind')
    this.setData({ longzt: false })
    wx.showModal({
      title: '删除图片',
      content: '是否要删除图片',
      success(res) {
        if (res.confirm) { picture.splice(ind, 1) }
      },
      complete() { tha.setData({ longzt: true, picture }) }
    })
  },
  //上传头像图片
  shangcerw: function () {
    var shul = 1
    app.xuanzup(shul).then(rec => {
      rec.forEach(filePath => {
        var picture = this.data.picture
        app.shangctup(filePath).then(res => {
          console.log(res);
          
          picture.unshift(res)
          if (picture.length < shul + 1) {
            this.setData({ picture })
          } else {
            console.log(picture)
            picture.splice(shul)
            this.setData({ picture })
          }
        })
      });
    })
  },
  /** 生命周期函数--监听页面加载*/
  onLoad: function (options) {
    if (options.arry) {
      console.log('进入修改秒杀');
      console.log(JSON.parse(options.arry));
      let arry = JSON.parse(options.arry);
      console.log(arry.product_image,arry.activity_image);
      // let pic = [arr]
      this.setData({
        arry: arry,
        date: arry.start_time.replace('.', '-').replace('.', '-'),
        date2: arry.stop_time.replace('.', '-').replace('.', '-'),
        title: arry.title,
        neirong: arry.rule,
        address: arry.store_address,
        name: arry.product_name,
        neirongs: arry.product_detail,
        product: arry.product_yuanjia,
        seckill: arry.seckill_jiage,
        quantity: arry.seckill_number,
        specification: arry.guige,
        picture:[arry.product_image],
        tupian:[arry.activity_image],
       

      })
    } else {
      console.log('修改秒杀哦');
    }

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
  activities: function () {
    let arr = this.data.arry;
    console.log(arr);
    
    let date = new Date()
    let url;
    // let data;
    url = baseUrl + 'activity/seckill/saveSeckill'
    let data = {
      brandId: app.globalData.brandid,
      storeId: 1,
      productName: this.data.name,
      title: this.data.title,
      rule: this.data.neirong,
      startTime: this.data.date + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds(),
      stopTime: this.data.date2 + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds(),
      storeAddress: this.data.address,
      productDetail: this.data.neirongs,
      productYuanjia: this.data.product,
      seckillJiage: this.data.seckill,
      seckillNumber: this.data.quantity,
      productImage: this.data.tupian[0],
      activityImage: this.data.picture[0],
      guige: this.data.specification,
      state:0,
    }
    if (this.data.arry) {
      data.seckillId = arr.id
    }
    console.log(data);



    // 限定日期输入
    let relust = data.startTime < data.stopTime;
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
  // 规则
  handleneirong: function (e) {
    this.setData({
      neirong: e.detail.value
    })
  },
  // 地址
  hangldaddress: function (e) {
    this.setData({
      address: e.detail.value
    })
  },
  // 名称
  hanglename: function (e) {
    this.setData({
      name: e.detail.value
    })
  },
  // 简介
  hangleneirongs: function (e) {
    this.setData({
      neirongs: e.detail.value
    })
  },
  // 产品原价
  hangleproduct: function (e) {
    this.setData({
      product: e.detail.value
    })
  },
  // 秒杀
  hangleseckill: function (e) {
    this.setData({
      seckill: e.detail.value
    })
  },
  // 限购数量
  hanglequantity: function (e) {
    this.setData({
      quantity: e.detail.value
    })
  },
  // 规格
  hanglespecification: function (e) {
    this.setData({
      specification: e.detail.value
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