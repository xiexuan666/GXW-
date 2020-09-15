// pages/me/ruzhu1/ruzhu2.js

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