const app = getApp();
const http = app.globalData.http;
var WxParse = require('../../../wxParse/wxParse.js');
const baseUrl = app.globalData.baseUrl;
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.id, '123456789');
     this.gonglue(options)
  },


  gonglue: function (req) {
    // var tha = this
    // var url = baseUrl + 'banner/index'
    // console.log(url,'这里1！！！！');
    // console.log(req.id, '这里1！！！！');
    // http.promisServer(url,{id:req.id}).then(res => {
    //   // tha.setData({lunb:res.data.allbannerList})
    //   console.log(res.data.allbannerList, '请求轮播图')
    // })

    var article = '<p style="text-align:center;"><strong><span style="font-size:24px;">概述：</span></strong> </p><p class="p" style="margin-left:0.0000pt;"><span style="font-size:18px;">小伙伴们都知道我们的品牌叫</span><span style="font-size:18px;">YOU&amp;ME</span><span style="font-size:18px;">尧铭现代砖，但是大家知不知道为什么要叫</span><span style="font-size:18px;">YOU&amp;ME</span><span style="font-size:18px;">尧铭这个名字呢？这个名字有什么意义？背后又藏着怎样的故事呢？今天尧小铭来给大家揭开</span><span style="font-size:18px;">YOU&amp;ME</span><span style="font-size:18px;">尧铭的神秘面纱。</span> </p><p><br /></p><p style="text-align:center;"><img src="https://cdn.xhcxcn.com/7897171127816863f3ccdd27d2000e3f9255a7e3e2c48800" alt="" /> </p><p style="text-align:center;"><br /></p>';
    /**
    * WxParse.wxParse(bindName , type, data, target,imagePadding)
    * 1.bindName绑定的数据名(必填)
    * 2.type可以为html或者md(必填)
    * 3.data为传入的具体数据(必填)
    * 4.target为Page对象,一般为this(必填)
    * 5.imagePadding为当图片自适应是左右的单一padding(默认为0,可选)
    */
    var that = this;
    WxParse.wxParse('article', 'html', article, that);

  },
  
  // 跳转到海报
  handleToTop:function(){
    wx.navigateTo({
      url: '/pages/souye/poster/poster',
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