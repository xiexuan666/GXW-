// pages/me/merchant/merchant.js
const app = getApp();
const http = app.globalData.http;
const baseUrl = app.globalData.baseUrl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
<<<<<<< HEAD
    status: null,

=======
    status:0,
    text:null
>>>>>>> f18b3e4711d7bf89bb5c53bd2154981f0aba8052
  },
  /**
   * 生命周期函数--监听页面加载
   * 获取用户商家状态显示不同页面
   */
  onLoad: function (options) {
    var that = this;
    // 商家状态
    let status = wx.getStorageSync('sjzt').status;
    // 后台返回文字信息
    let content = wx.getStorageSync("sjzt").message
    if(status == 0){
      console.log('你还没有申请入驻');
      that.setData({
        status:0,
        text:''
      })
    }else if(status == 1){
      console.log('你已经缴费并申请入驻了，请等待审核');
      that.setData({
        status:1,
        text:content
      })
    }else if(status == 2){
      console.log('你已审核通过');
      wx.navigateTo({
        url: '/pages/me/guanli/guanli',
      })
      that.setData({
        status:2,
        text:content
      })
    }else if(status == 3){
      console.log('你提交的信息有误，请重新提交');
      that.setData({
        status:3,
        text:content
      })
    }
  },
<<<<<<< HEAD
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
  shenq: function () {
    if(this.data.status == 2){
      wx.showToast({
        title: '已入驻成功',
        icon: 'success',
        duration: 1000
      })
      return false;
    }
    app.Jump('me/guanli/manage/store')

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {


  },
=======
  // 同意协议跳转页面
  shenq:function(){
    app.Jump('me/guanli/manage/store')
  },

>>>>>>> f18b3e4711d7bf89bb5c53bd2154981f0aba8052

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log('商家状态：',wx.getStorageSync('sjzt'));
    let status = wx.getStorageSync('sjzt');
    console.log('状态啊',status.status);
    this.setData({
      status:status.status
    })

    if (status.status == 2) {
      var that = this
      wx.showModal({
        title: '提示',
        content: '恭喜你入驻成功',
        success: function (res) {
          if (res.confirm) {
            setTimeout(function () {
              wx.reLaunch({
                url: '/pages/me/me',
              })
            }, 1000);
          } else if (res.cancel) {
            console.log('用户点击了取消');

          }

        }
      })

    }
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