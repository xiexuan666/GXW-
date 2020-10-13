const app = getApp();
const http = app.globalData.http;
const baseUrl = app.globalData.baseUrl;
const getInformation = app.globalData.getInformation;
Page({

  /**
   * 页面的初始数据
   */

  data: {
    cpxqzt: 1,
    hiddenstrategy: 3,
<<<<<<< HEAD
    select_all: false,

  },
  selectall: function () {//全选与反全选
    var that = this;
    for (let i = 0; i < that.data.listData.length; i++) {
      that.data.listData[i].checked = (!that.data.select_all)
    }
    that.setData({
      listData: that.data.listData,
      select_all: (!that.data.select_all)
    })
  },

  //产品详情导航选择
  cpxzxz: function (e) {
    var that = this;
    var ind = app.hdindex(e, 'ind')
    var cpxqzt = this.data.cpxqzt;
    if (ind == cpxqzt) { return false };
    switch (ind) {

    }
    if (ind == 1) {
      cpxqzt = 1
      wx.setNavigationBarTitle({ title: '导购管理' });
      // 查找出现次数

      that.setData({
        hiddenstrategy: 3
      })
    }
    if (ind == 2) {
      cpxqzt = 2
      wx.setNavigationBarTitle({ title: '我的客户' });
      var sum = that.data.strategy;
      // that.query(1, sum);
      // console.log(sum.map)
      that.setData({
        hiddenstrategy: 1
      })
    }
    if (ind == 3) {
      cpxqzt = 3
      wx.setNavigationBarTitle({ title: '群发助手' });
      var sum = that.data.strategy;
      // that.query(2, sum);
      that.setData({
        hiddenstrategy: 2
      })
=======
    select_all:false,
<<<<<<< HEAD

  },
  selectall: function() {//全选与反全选
    var that = this;
    for (let i = 0; i < that.data.listData.length; i++) {
    that.data.listData[i].checked = (!that.data.select_all)}
    that.setData({
    listData: that.data.listData,
    select_all: (!that.data.select_all)
    })
=======
<<<<<<< HEAD

>>>>>>> e8e55f3a9c319a6878579450c3c18e28b346fd04
  },
  selectall: function() {//全选与反全选
    var that = this;
    for (let i = 0; i < that.data.listData.length; i++) {
    that.data.listData[i].checked = (!that.data.select_all)}
    that.setData({
    listData: that.data.listData,
    select_all: (!that.data.select_all)
    })
=======
<<<<<<< HEAD

<<<<<<< HEAD
=======
>>>>>>> c2d852eb919299f0777236b9e73da89733498f14
  },
  selectall: function() {//全选与反全选
    var that = this;
    for (let i = 0; i < that.data.listData.length; i++) {
    that.data.listData[i].checked = (!that.data.select_all)}
    that.setData({
    listData: that.data.listData,
    select_all: (!that.data.select_all)
    })
=======
    merchants:[],
    // 导购列表
    shopperslist:[],
    // 客戶列表
    customerlist:[],
    // 修改的id列表
    updatalist:[],

<<<<<<< HEAD
=======
    // 选择状态
    // check:false,
>>>>>>> d24e5d68f2511ff808d7dd102607e5500bf4b225
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

<<<<<<< HEAD
>>>>>>> c2d852eb919299f0777236b9e73da89733498f14
>>>>>>> e8e55f3a9c319a6878579450c3c18e28b346fd04
  //产品详情导航选择
  cpxzxz: function (e) {
    var that = this;
    var ind = app.hdindex(e, 'ind')
    var cpxqzt = this.data.cpxqzt;
    if (ind == cpxqzt) { return false };
    switch (ind) {

    }
    if (ind == 1) {
      cpxqzt = 1
      wx.setNavigationBarTitle({ title: '导购管理' });
      // 查找出现次数

      that.setData({
        hiddenstrategy: 3
      })
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> e8e55f3a9c319a6878579450c3c18e28b346fd04
    }
    if (ind == 2) {
      cpxqzt = 2
      wx.setNavigationBarTitle({ title: '我的客户' });
      var sum = that.data.strategy;
      // that.query(1, sum);
      // console.log(sum.map)
      that.setData({
        hiddenstrategy: 1
      })
    }
    if (ind == 3) {
      cpxqzt = 3
      wx.setNavigationBarTitle({ title: '群发助手' });
      var sum = that.data.strategy;
      // that.query(2, sum);
      that.setData({
        hiddenstrategy: 2
      })

<<<<<<< HEAD
    }
=======
    }
=======
    }
    if (ind == 2) {
      cpxqzt = 2
      wx.setNavigationBarTitle({ title: '我的客户' });
      var sum = that.data.strategy;
      // that.query(1, sum);
      // console.log(sum.map)
      that.setData({
        hiddenstrategy: 1
      })
    }
    if (ind == 3) {
      cpxqzt = 3
      wx.setNavigationBarTitle({ title: '群发助手' });
      var sum = that.data.strategy;
      // that.query(2, sum);
      that.setData({
        hiddenstrategy: 2
      })

    }
>>>>>>> c2d852eb919299f0777236b9e73da89733498f14
>>>>>>> e8e55f3a9c319a6878579450c3c18e28b346fd04
 
    this.setData({ cpxqzt: cpxqzt })
  },
  
<<<<<<< HEAD

=======
<<<<<<< HEAD

=======
=======
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // 获取商家信息
    this.setData({
      merchants:wx.getStorageSync('MC')
    })
    console.log(this.data.merchants.id);
    // 获取导购信息
    getInformation.getcustomer(this.data.merchants.id).then(res=>{
      console.log(res.data.salespersonList);
      this.setData({
        shopperslist:res.data.salespersonList
      })
    });
  },
  // 选项卡
  selectall: function(e) {//全选与反全选
    var that = this;
    let index= app.hdindex(e,'index');
    // 将要修改的id拼入数组
    let update =that.data.updatalist;
    update.push(index);
    // 将id进行筛选，去除重复选项
    update = Array.from(new Set(update));
    // 更新数组
    that.setData({
      updatalist:update
    });
    console.log(that.data.updatalist);    
    },
  // 放大图片
  amplification:function(){
  let imag =  this.data.merchants.store_qrcode_url;
    wx.previewImage({
      current: imag, // 当前显示图片的http链接
      urls: [imag]
    })
  },
  // 跳转到注册页面，进行修改操作
  update:function(e){
    // 获取下标取得数组
    let index = app.hdindex(e,'index');
    console.log(index);
    let arry = this.data.shopperslist[index];
    // 将数组转化为json数组，进行传递;
    wx.navigateTo({
      url: '/pages/me/update/shoppersupdate/shoppersupdate?arry='+JSON.stringify(arry),
    })
  },

  //删除导购
  delete:function(){
    console.log('delet');
    var that = this;
    // 控制路径
    let url =  'customer/salesperson/salespersondelete';
    // 处理数组
    let listid = that.data.updatalist.join(',');
    console.log(listid);
>>>>>>> c2d852eb919299f0777236b9e73da89733498f14
>>>>>>> e8e55f3a9c319a6878579450c3c18e28b346fd04

     getInformation.deletcustomer(url,listid).then(res=>{
      console.log(res);
      wx.showToast({
        title: '删除成功',
        icon: 'success',
        duration:800
      })
      that.onShow();
    })
  },

>>>>>>> d24e5d68f2511ff808d7dd102607e5500bf4b225
>>>>>>> 7c1c0e3919fad4bfaed76d5d78733405b080bbc8

    }

    this.setData({ cpxqzt: cpxqzt })
  },

<<<<<<< HEAD
  // 跳转到导购管理
=======






<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
<<<<<<< HEAD



>>>>>>> c2d852eb919299f0777236b9e73da89733498f14
>>>>>>> e8e55f3a9c319a6878579450c3c18e28b346fd04



  // 跳转到导购管理
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
=======
    //产品详情导航选择
    cpxzxz: function (e) {
      var that = this;
      var ind = app.hdindex(e, 'ind');
      var cpxqzt = this.data.cpxqzt;
      if (ind == cpxqzt) { return false };
      switch (ind) {
      }
      if (ind == 1) {
        cpxqzt = 1
        wx.setNavigationBarTitle({ title: '导购管理' });
        // 查找出现次数
        that.setData({
          hiddenstrategy: 3
        })
      }
      if (ind == 2) {
        cpxqzt = 2
        wx.setNavigationBarTitle({ title: '我的客户' });
        var sum = that.data.strategy;
        // that.query(1, sum);
        // console.log(sum.map)
        that.setData({
          hiddenstrategy: 1
        })
      }
      if (ind == 3) {
        cpxqzt = 3
        wx.setNavigationBarTitle({ title: '群发助手' });
        var sum = that.data.strategy;
        // that.query(2, sum);
        that.setData({
          hiddenstrategy: 2
        })
  
      }
   
      this.setData({ cpxqzt: cpxqzt })
    },
  // 跳转到导购管理？
>>>>>>> d24e5d68f2511ff808d7dd102607e5500bf4b225
>>>>>>> c2d852eb919299f0777236b9e73da89733498f14
>>>>>>> e8e55f3a9c319a6878579450c3c18e28b346fd04
>>>>>>> 7c1c0e3919fad4bfaed76d5d78733405b080bbc8
  daog: function () {
    wx.navigateTo({
      url: '/pages/me/guanli/shoppers/shoppers',
    })
<<<<<<< HEAD
  },
  fasong: function () {
    wx.navigateTo({
      url: '/pages/me/guanli/information/information',
    })
  },
  //跳转到客户信息
  message: function () {
    wx.navigateTo({
      url: '/pages/me/guanli/key/key',
=======
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> c2d852eb919299f0777236b9e73da89733498f14
>>>>>>> e8e55f3a9c319a6878579450c3c18e28b346fd04
  },
  fasong: function () {
    wx.navigateTo({
      url: '/pages/me/guanli/information/information',
>>>>>>> 7c1c0e3919fad4bfaed76d5d78733405b080bbc8
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
=======
>>>>>>> c2d852eb919299f0777236b9e73da89733498f14
>>>>>>> e8e55f3a9c319a6878579450c3c18e28b346fd04
  },
  fasong: function () {
    wx.navigateTo({
      url: '/pages/me/guanli/information/information',
    })
>>>>>>> d24e5d68f2511ff808d7dd102607e5500bf4b225
>>>>>>> 7c1c0e3919fad4bfaed76d5d78733405b080bbc8
  },


  /* 
    暂时被废弃的功能
      // 全选
      // Future:function(){
      //   let check = this.data.check;
      //   console.log(check);
      //   this.setData({
      //     check:!check
      //   })
      // },
  */

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> c2d852eb919299f0777236b9e73da89733498f14
>>>>>>> e8e55f3a9c319a6878579450c3c18e28b346fd04
>>>>>>> 7c1c0e3919fad4bfaed76d5d78733405b080bbc8

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
>>>>>>> e8e55f3a9c319a6878579450c3c18e28b346fd04
>>>>>>> 7c1c0e3919fad4bfaed76d5d78733405b080bbc8
  },
=======
>>>>>>> c2d852eb919299f0777236b9e73da89733498f14
  },

>>>>>>> d24e5d68f2511ff808d7dd102607e5500bf4b225

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

  },
  onShareTimeline: function () { },

  //   query: function (type, arry) {
  //     var that = this;
  //     console.log(type, arry);
  //     arry.forEach(item => {
  //       console.log(item)
  //       let num;
  //       if (item.type == type) {
  //         num++
  //         console.log('xxx', num);
  //       }
  //     });
  //   }
  // })
})