// pages/me/ruzhu1/ruzhu2.js
const app = getApp();
var date = new Date();//调用系统时间函数
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show:false,//控制下拉列表的显示隐藏，false隐藏、true显示
    selectData:['男','女'],//下拉列表的数据
    index:0,//选择的下拉列表下标
    picker1Value:0,
    picker1Range:['北京','上海','广州','深圳'],
    timeValue:'08:08',
    dateValue:'2016-10-13',
    date1: '',
    date2: '',
    array: ['选择分类的参数一', '选择分类的参数二'],
    index: 0,
    status: true, //评价框显示隐藏
    content: "",
   
    appraiseList: [
      {
        username: "太白子",
        img: "/images/tubiao/tx.png",
        is_merchant: 0,
        isOpen: false,
        change: false,
        praise: 0,
        appraise_content: "相信经常不化妆的小仙女都知道眉毛的重要性, 明人不说暗话,今天小编就来给推一推哪些优惠的眉笔吧!!!",
        reply_list: [
          { nickname: "太白金星", img: "/images/tubiao/tx.png", reply_content: "我也是这么觉得", changes: false, praise: 0, time: "05-25"},
          { nickname: "太白金星", img: "/images/tubiao/tx.png", reply_content: "我也是这么觉得", changes: false, praise: 0, time: "05-25" },
          { nickname: "太白金星", img: "/images/tubiao/tx.png", reply_content: "我也是这么觉得", changes: false, praise: 0, time: "05-25" },
          { nickname: "太白金星", img: "/images/tubiao/tx.png", reply_content: "我也是这么觉得", changes: false, praise: 0, time: "05-25" },
        ],
        time: "今天 15:07",
      },
      {
        username: "太白子",
        img: "/images/tubiao/tx.png",
        is_merchant: 1,
        isOpen: false,
        change: false,
        praise: 0,
        appraise_content: "相信经常不化妆的小仙女都知道眉毛的重要性, 明人不说暗话,今天小编就来给推一推哪些优惠的眉笔吧!!!",
        reply_list: [
          { nickname: "太白金星", img: "/images/tubiao/tx.png", reply_content: "我也是这么觉得", changes: false, time: "05-25", praise: 0, },
          { nickname: "太白金星", img: "/images/tubiao/tx.png", reply_content: "我也是这么觉得", changes: false, praise: 0, time: "05-25" },
          { nickname: "太白金星", img: "/images/tubiao/tx.png", reply_content: "我也是这么觉得", changes: false, praise: 0, time: "05-25" },
          { nickname: "太白金星", img: "/images/tubiao/tx.png", reply_content: "我也是这么觉得", changes: false, time: "05-25", praise: 0, },
          { nickname: "太白金星", img: "/images/tubiao/tx.png", reply_content: "我也是这么觉得", changes: false, praise: 0, time: "05-25" },
          { nickname: "太白金星", img: "/images/tubiao/tx.png", reply_content: "我也是这么觉得", changes: false, praise: 0, time: "05-25" }
        ],
        time: "今天 15:07",
      },
      
    ],
    userpingfen: [          // 用户评分
      { pingfen: 4 }
    ],

  },
    // 点击下拉显示框
    selectTap(){
      this.setData({
        show: !this.data.show
      });
    },
    // 点击下拉列表
    optionTap(e){
      let Index=e.currentTarget.dataset.index;//获取点击的下拉列表的下标
      this.setData({
        index:Index,
        show:!this.data.show
      });
    },
    normalPickerBindchange:function(e){
      this.setData({
       picker1Value:e.detail.value
      })
     },
     timePickerBindchange:function(e){
      this.setData({
       timeValue:e.detail.value
      })
     },
     datePickerBindchange:function(e){
      this.setData({
       dateValue:e.detail.value
      })
     },




     //获取经纬度
  getLocation: function () {
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
          wx.openLocation({
            latitude: res.latitude,
            longitude: res.longitude,
            scale:18,

            success:function(res) {
              wx.chooseLocation({
                success:function(res) {
                  console.log(res);
                  
                }
              })
            }
          })
      },
      fail:function(err) {
        console.log(err);
        
      }
    })
  },
//  点击开始日期组件确定事件
bindDateStartChange: function (e) {
  var that = this;
  that.setData({
    date1: e.detail.value
  })
},

//  点击结束日期组件确定事件
bindDateEndChange: function (e) {
  var that = this;
  that.setData({
    date2: e.detail.value
  })
},
//  点击分类组件确定事件
bindPickerChange: function (e) {
  var that = this;
  that.setData({
    index: e.detail.value
  })
},







//点击查询时组件的事件
query: function (e) {
  var that = this;
  var array = that.data.array;
  var index = that.data.index;
  var startDate = that.data.date1;
  var endDate = that.data.date2;
  console.log("分类："+array[index])
  console.log("开始时间：" + startDate)
  console.log("结束时间" + endDate)
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

    

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var dateNow = new Date();
    var year = dateNow.getFullYear();
    var month = dateNow.getMonth() + 1;
    var day = dateNow.getDate()
    var date = year + "-" + month + "-" + day
    that.setData({
      date1: date,
      date2: date
    });

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