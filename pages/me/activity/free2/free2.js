// pages/me/activity/free2/free2.js
const app = getApp();
const http = app.globalData.http;
const baseUrl = app.globalData.baseUrl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    user:[],
    // 圖片
    images:null
    // 二維碼
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 判断用户有没有登录
    if(wx.getStorageSync('gerxinx')){

    }else{

      console.log('唤起登录');
      wx.showModal({
        title: '提示',
        content: '授权登录',
        success (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }



    console.log(options.arr);
    this.setData({
      list:JSON.parse(options.arr)
    })
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
    let url = baseUrl + 'activity/free/free';
    let data = {
      brandId:app.globalData.brandid,
      userId:wx.getStorageSync('gerxinx').id,
      storeId:1,
      freeId:this.data.list.id
    }
    console.log(data,url)
    http.promisServer(url,data).then(res=>{
      console.log(res);
      this.setData({
        user:res.data
      })
  })
  // wx.getImageInfo({
  //   src: 'https://cdn.juesedao.cn/gxw/50bfb43c49794b409747bb6626504a66',
  //   success:res=>{
  //     console.log(res.path);
  //     this.setData({
  //       images:res.path
  //     })
  //   }
  // })

  // const ctx = wx.createCanvasContext('mycanvas');
  // ctx.rect(0, 0,350,470)
  // ctx.setFillStyle('red')
  // ctx.fill()
  // ctx.drawImage(this.data.images, 0, 0, 150, 100)
  // ctx.drawImage()
  // ctx.draw()

},
yaoqin:function(){
  let url = baseUrl + 'activity/free/addFreeFriend';
  let data = {
    userId:wx.getStorageSync('gerxinx').id,
    storeId:1,
    freeId:this.data.list.id
  }
  http.promisServer(url,data).then(res=>{
    console.log(res);
    this.setData({
      images:res.data.url
    })
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