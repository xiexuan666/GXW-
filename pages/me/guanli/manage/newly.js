const app = getApp();
const http = app.globalData.http;
const qqmapsdk = app.globalData.qqmapsdk;
const baseUrl = app.globalData.baseUrl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //开始日期
    date: '',
    // 结束日期
    date2: '',
    // 地址
    address: '',
    // 佣金
    number: '',
    // 标题
    title: '',
    neirong: '',
    commission: '',
    //图像数组
    tupian: [],
  },

  // 预约日期
  datePickerBindchange: function (e) {
    this.setData({
      dateValue: e.detail.value,

    })
  },
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  //  点击结束日期组件确定事件
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
  // 活动预览
  activities: function () {
    let date = new Date()
    let tha = this
    let url = baseUrl + 'activity/free/saveFreeActivity'
    let data = {
      brandId: app.globalData.brandid,
      storeId: 1,
      title: this.data.title,
      rule: this.data.neirong,
      startTime: this.data.date + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds(),
      stopTime: this.data.date2 + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds(),
      storeAddress: this.data.address,
      people: this.data.number,
      activityImage: this.data.tupian[0]
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
  bindKeyInput: function (e) {
    this.setData({
      address: e.detail.value
    })
  },
  bindKeyperson: function (e) {
    this.setData({
      number: e.detail.value
    })
  },
  bindKeycommission: function (e) {
    this.setData({
      commission: e.detail.value
    })
  },
  bindKeyrule: function (e) {
    this.setData({
      neirong: e.detail.value
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