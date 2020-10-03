// pages/me/merchant/merchant.js
const app = getApp();
const http = app.globalData.http;
const baseUrl = app.globalData.baseUrl;
Page({

  /**
   * 页面的初始数据
   */
  data: {

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
    if (!gerxinx) { return false; }
    let url = baseUrl + "wxpay/topay"
    var datas = {
      openid: gerxinx.open_id,
      totalfee: app.globalData.jiage,
      userid: gerxinx.id,
      storeusername,
      brandid: '1'
      // classusername: xinx.wx_name
    }
    var p = new Promise(function (resolve, reject) {
      http.promisServer(url, datas).then(res => {
        console.log(res, '现金购买调起前')
        wx.requestPayment({
          timeStamp: res.data.returncode.timeStamp,
          nonceStr: res.data.returncode.nonceStr,
          package: res.data.returncode.package,
          signType: 'MD5',
          paySign: res.data.returncode.paySign,
          success: res => {
            console.log(res, '支付成功后结果')
            resolve(true)
          },
          fail: () => { console.log(res); },
          complete: () => { console.log(res); }
        })

      })
    })
    return p;
  },

  //提交内容
  tijiaoform(e) {
    var tha = this
    var sjzt = this.data.sjzt
    var gerxinx = this.data.gerxinx
    var tjnr = e.detail.value
    var addresstwo = this.data.addresstwo
    var userid = gerxinx.id
    var brandid = '1'
    var opentime = tjnr.kais + "-" + tjnr.jies
    var wxhao = this.data.erwm[0]
    var logo = this.data.tupian[0]
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    tjnr.logo = logo
    tjnr.addresstwo = addresstwo
    var pdjieg = this.pdtjnr(tjnr)
    if (!pdjieg) { return false }

    tjnr.status = 1
    tjnr.userid = userid
    tjnr.brandid = brandid
    tjnr.opentime = opentime
    console.log(tjnr, '提交之前的结果')



    if (sjzt && sjzt.record && sjzt.record.id) {
      console.log(sjzt, '商家状态')
      if (sjzt.record.status == 1) {
        tjnr.status = 1
      }
      if (sjzt.record.status == 2) {
        tjnr.status = 2
      }
      tjnr.id = sjzt.record.id
      tha.formtij(tjnr)
      return false
    }
    //支付现金
    this.qianzhif(tjnr.shopowner).then(res => {
      if (res) {
        // 提交
        tha.formtij(tjnr)
      }
    })

  },
  //真正向服务器提交内容
  // shenq(tjnr) {
  //   var tha = this
  //   var url = baseUrl + "store/storeJoin"
  //   http.promisServer(url, tjnr).then(resc => {
  //     console.log(resc.status, '提交内容后结果')
  //     if (resc.status == '000') {
  //       tha.tis('提交成功')
  //       if (tjnr.status == 2) {
  //         tha.hqshangzt(tjnr.userid)
  //         return false
  //       }
  //       setTimeout(function () {
  //         app.Jumps('me/me')
  //       }, 1000)
  //     }
  //   })
  // },
  // shenq: function () {
  //   wx.navigateTo({
  //     url: 'pages/me/guanli/manage/store',
  //   })
  // },
  shenq:function(){
    app.Jump('me/guanli/manage/store')
   
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