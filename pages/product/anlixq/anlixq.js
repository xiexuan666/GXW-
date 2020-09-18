// pages/product/anlixq/anlixq.js
const app = getApp();
const http = app.globalData.http;
const baseUrl = app.globalData.baseUrl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
    status: true, //评价框显示隐藏
    content: "",
   
    appraiseList: [
      {
        is_merchant: 0,
        isOpen: false,
        change: false,
        praise: 0,
        reply_list: [
        ],
    
      },
      {
        is_merchant: 0,
        isOpen: false,
        change: false,
        praise: 0,
        reply_list: [
        ],
    
      },
      {
        is_merchant: 0,
        isOpen: false,
        change: false,
        praise: 0,
        reply_list: [
        ],
    
      },
      
    ],
    userpingfen: [          // 天快黑了
      { pingfen: 4 }
    ],

  },
   //失去焦点时获取里面评论内容
   bindTextAreaBlur: function (e) {
    this.setData({
      content: e.detail.value,
    })
  },
  //点击按钮时得到里面的值
  fabiao: function (e) {
    if(this.data.content == '') {
      wx.showToast({
        title: '内容不能为空',
        icon: "none",
        duration: 1500,
      })
    }else {
      this.setData({
        focus: 'false',
        concent1: this.data.content,
      })
      console.log(this.data.content)
    }
  },
  /**
   * 点击回复显示隐藏评价框
   */
  chengeStatusTop: function() {
    let status = this.data.status;
    this.setData({
      status: !status
    })
  },
  // 点赞功能逻辑
  praiseThis: function (e) {
    var index = e.currentTarget.dataset.curindex;
    if (this.data.repotList[index]) {
      var change = this.data.repotList[index].change;
      if (change !== undefined) {
        var num = this.data.repotList[index].praise;
        if (change) {
          this.data.repotList[index].praise = (num - 1);
          this.data.repotList[index].change = false;
        } else {
          this.data.repotList[index].praise = (num + 1);
          this.data.repotList[index].change = true;
        }
        this.setData({
          repotList: this.data.repotList
        })
      }
    }
  },
  // 点击展开
  chooseUnfold: function(e) {
    var key = e.currentTarget.dataset.key;
    var val = e.currentTarget.dataset.value;
    key = key + '.isOpen';
    this.setData({
      [key]: !val
    })
  },
  // 点赞功能逻辑s
  praiseThiss: function (e) {
    var index = e.currentTarget.dataset.curindex;
    if (this.data.appraiseList[index]) {
      var change = this.data.appraiseList[index].change;
      if (change !== undefined) {
        var num = this.data.appraiseList[index].praise;
        if (change) {
          this.data.appraiseList[index].praise = (num - 1);
          this.data.appraiseList[index].change = false;
        } else {
          this.data.appraiseList[index].praise = (num + 1);
          this.data.appraiseList[index].change = true;
        }
        this.setData({
          appraiseList: this.data.appraiseList
        })
      }
    }
  },
  // 点赞内层逻辑
  praiseThisss: function(e) {
    var index = e.currentTarget.dataset.curindex;
    var indexs = e.currentTarget.dataset.curindexs;
    console.log(indexs)
    if (this.data.appraiseList[index].reply_list[indexs]) {
      var change = this.data.appraiseList[index].reply_list[indexs].changes;
      if (change !== undefined) {
        var num = this.data.appraiseList[index].reply_list[indexs].praise;
        if (change) {
          this.data.appraiseList[index].reply_list[indexs].praise = (num - 1);
          this.data.appraiseList[index].reply_list[indexs].changes = false;
        } else {
          this.data.appraiseList[index].reply_list[indexs].praise = (num + 1);
          this.data.appraiseList[index].reply_list[indexs].changes = true;
        }
        this.setData({
          appraiseList: this.data.appraiseList
        })
      }
    }
  },


  //点击打开图片
  dakerw:function(e){
    console.log(e)
    var img=app.hdindex(e,'img')
    console.log(img)
    wx.previewImage({
      current: img, // 当前显示图片的http链接 
      urls: [img]
    })
  },
  
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
    var _this = this;
    var tiyan = this.data.userpingfen;
    for (var i = 0; i < tiyan.length; i++) {
      tiyan[i].pingfenpic = pingxin.pingfen(parseFloat(tiyan[i].pingfen));    //使用函数
    }
    _this.setData({
      userpingfen: tiyan
    })


  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  loadFontFace() {
    wx.loadFontFace({
      family: 'Bitstream Vera Serif Bold',
      source: 'url("https://sungd.github.io/Pacifico.ttf")',
      success(res) {
      },
      fail: function(res) {
      },
      complete: function(res) {
      }
    });
  },
  /**
   * 生命周期函数--监听页面显示
   */
  isString:function (str){ 
    return (typeof str=='string')&&str.constructor==String; 
    },
  onShow: function () {
    var anlixiaq =app.globalData.anlixiaq
    console.log(anlixiaq,'案例详情')
    if(anlixiaq.images&&this.isString(anlixiaq.images)){
      anlixiaq.images=JSON.parse(anlixiaq.images)
    }
    this.setData({anlixiaq})
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