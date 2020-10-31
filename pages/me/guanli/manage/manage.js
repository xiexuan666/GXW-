
const app = getApp();
const http = app.globalData.http;
const baseUrl = app.globalData.baseUrl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cpxqzt: 1,
    cactiv: 1,


    // 优惠券现在的活动
    now: null,
    // 优惠券结束的活动
    end: null,
    // 未优惠券发布的活动
    not: null,


    // 正在进行的秒杀活动
    miaosha: null,
    //未发布的秒杀活动
    miaosss: null,
    //已下架的秒杀活动
    miaoshaa: null,



    //正在进行的免费活动
    mianfff: null,
    //未发布的免费活动
    mianf: null,
    //已下架的免费活动
    endfree: null,


    //正在进行的拼团活动
    togroup: null,
    //未发布的拼团活动
    puzzle: null,
    //已下架的拼团活动
    tetrad: null,


    // 商家信息
    shanjia: null,
    // 活动选择状态
    select: [true, true, true, true, true],
    status: 0,

  },


  //产品详情导航选择
  cpxzxz: function (e) {
    var ind = app.hdindex(e, 'ind')
    var cpxqzt = this.data.cpxqzt;
    if (ind == cpxqzt) { return false }
    if (ind == 1) {
      cpxqzt = 1
      wx.setNavigationBarTitle({ title: '正在进行活动' })
    }
    if (ind == 2) {
      cpxqzt = 2
      wx.setNavigationBarTitle({ title: '未发布活动' })
    }
    if (ind == 3) {
      cpxqzt = 3
      wx.setNavigationBarTitle({ title: '已下架活动' })
    }
    this.setData({ cpxqzt: cpxqzt })
  },


  // 跳转到创建活动
  subscribe: function () {
    let pd = this.data.status;
    console.log(pd);
    if (!pd) {
      this.setData({
        status: 1
      })
    } else {
      let status = this.data.select;
      status.forEach((item, index) => {
        if (!item) {
          switch (index) {
            case 0:
              console.log('免费活动')
              wx.navigateTo({
                url: '/pages/me/guanli/manage/newly',
              })
              break;
            case 1:
              console.log('优惠券')
              wx.navigateTo({
                url: '/pages/create/issue/issue',
              })
              break;
            case 2:
              console.log('商品秒杀')
              wx.navigateTo({
                url: '/pages/me/seckill/seckill',
              })
              break;
            case 3:
              console.log('拼团活动')
              wx.navigateTo({
                url: '/pages/me/booking/booking',
              })
              break;
            case 4:
              console.log('抽奖活动')
              wx.navigateTo({
                url: '/pages/me/draw/draw',
              })
              break;
          }
        } else {
          wx.showToast({
            title: '您还没选择要创建的活动类型',
            icon: 'none',
            duration: 800
          })
        }
      })
    }
  },


  // 关闭创建活动
  hidden: function () {
    let pd = this.data.status;
    if (pd) {
      this.setData({
        status: 0
      })
    } else {
      return false
    }
  },

  /* 生命周期函数--监听页面加载*/
  onLoad: function (options) {
    // 获取商家信息
    this.setData({
      shanjia: wx.getStorageSync('bendijxs')
    })
  },

  /*生命周期函数--监听页面初次渲染完成*/
  onReady: function () {

  },


  /*生命周期函数--监听页面显示*/
  onShow: function () {
    //优惠券活动
    // 正在进行和已经下架
    // this.getCoupns();
    // 未发布
    // this.getnotCoupons();
    // 免费活动
    // this.getfree();
    this.getnotfree();
    // 秒杀活动
    // this.getseckill();
    this.grtnotseckill();
    //拼团
    this.getgroup();
    this.getcarpool();
    //抽奖
  },



  // 查询正在进行和已经下架的优惠券
  getCoupns: function () {
    // 进行的活动与过期的活动
    let url = baseUrl + 'coupon/queryValidCouponsTotal';
    let data = {
      brandId: app.globalData.brandid,
      state: 2,
      storeId: wx.getStorageSync('sjid'),
    }
    http.promisServer(url, data).then(res => {
      console.log(res);
      if (res.flag) {
      } else {
        console.log('没有优惠券');
        return false
      }
      let Year = new Date().getFullYear();
      let Month = new Date().getMonth() + 1;
      let Dates = new Date().getDate();
      let Hour = new Date().getHours();
      let Minute = new Date().getMinutes();
      let second = new Date().getSeconds();
      let milliseconds = new Date().getMilliseconds();
      let now = [];
      let end = [];
      res.data.forEach(item => {
        let time = Year + '-' + Month + '-' + Dates + ' ' + Hour + ':' + Minute + ':' + second;
        // 结束时间 > 现在时间 = 
        let result = time < item.end_time;
        item.create_time = item.create_time.substr(0, 10).replace('-', '.').replace('-', '.');
        item.end_time = item.end_time.substr(0, 10).replace('-', '.').replace('-', '.');
        // 结束时间 < 现在时间
        if (result) {
          now.push(item);
        } else {
          end.push(item);
        }
      })
      console.log(now, end);
      this.setData({
        now: now,
        end: end
      })
    })
  },





  // 查询正在进行和已经下架的拼团
  getgroup: function () {
    let url = baseUrl + 'activity/pintuan/findByStatusPinTuan';
    let data = {
      brandId: app.globalData.brandid,
      storeId: 1,
      status: 2,
      examine:1,
    }
    console.log(url,data)
    console.log('11111111');
    
    http.promisServer(url, data).then(res => {
      console.log(res);
      if (res.flag) {
      } else {
        console.log('没有拼团活动');
        return false
      }
      let Year = new Date().getFullYear();
      let Month = new Date().getMonth() + 1;
      let Dates = new Date().getDate();
      let Hour = new Date().getHours();
      let Minute = new Date().getMinutes();
      let second = new Date().getSeconds();
      let milliseconds = new Date().getMilliseconds();
      let togroup = [];
      let tetrad = [];
      res.data.forEach(item => {
        let time = Year + '-' + Month + '-' + Dates + ' ' + Hour + ':' + Minute + ':' + second;
        // 结束时间 > 现在时间 = 
        let result = time < item.stop_time;
        item.start_time = item.start_time.substr(0, 10).replace('-', '.').replace('-', '.');
        item.stop_time = item.stop_time.substr(0, 10).replace('-', '.').replace('-', '.');
        // 结束时间 < 现在时间
        if (result) {
          tetrad.push(item);
        } else {
          togroup.push(item);
        }
      })
      console.log(tetrad, tetrad);
      this.setData({
        tetrad: tetrad,
        togroup: togroup
      })
    })
  },






  // 查询未发布的优惠券活动
  getnotCoupons: function () {
    let urls = baseUrl + 'coupon/queryUnpublishedCoupo';
    let datas = {
      storeId: wx.getStorageSync('sjid'),
      brandId: app.globalData.brandid,
      state: 1
    }
    http.promisServer(urls, datas).then(res => {
      if (res.flag) {
        res.data.forEach(item => {
          item.create_time = item.create_time.substr(0, 10).replace('-', '.').replace('-', '.');
          item.end_time = item.end_time.substr(0, 10).replace('-', '.').replace('-', '.');
        })
        this.setData({
          not: res.data
        })
      } else {
        console.log('暂无未发布优惠券');
        this.setData({
          not: null
        })
      }
    })
  },


  // 查询未发布的免费活动
  getnotfree: function () {
    let urls = baseUrl + 'activity/free/findByStatusFree';
    let datas = {
      storeId: 1,
      brandId: app.globalData.brandid,
    }
    http.promisServer(urls, datas).then(res => {
      if (res.flag) {
        res.data.forEach(item => {
          item.start_time = item.start_time.substr(0, 10).replace('-', '.').replace('-', '.');
          item.create_time = item.create_time.substr(0, 10).replace('-', '.').replace('-', '.');
        })
        this.setData({
          mianf: res.data
        })
      } else {
        console.log('暂无未发布免费活动');
        this.setData({
          mianf: null
        })
      }
    })
  },


  // 查询未发布的秒杀活动
  grtnotseckill: function () {
    let urls = baseUrl + 'activity/seckill/findByStatusSeckill'
    let datas = {
      storeId: 1,
      brandId: app.globalData.brandid,
    }
    http.promisServer(urls, datas).then(res => {
      console.log(res);

      if (res.flag) {
        res.data.forEach(item => {
          item.start_time = item.start_time.substr(0, 10).replace('-', '.').replace('-', '.');
          item.stop_time = item.stop_time.substr(0, 10).replace('-', '.').replace('-', '.');
        })
        this.setData({
          miaosss: res.data
        })
        console.log(this.data.miaos)
      } else {
        console.log('暂无未发布秒杀活动');
        this.setData({
          miaosss: null
        })
      }
    })
  },


  //查询未发布的拼团活动
  getcarpool: function () {
    let urls = baseUrl + 'activity/pintuan/findByStatusPinTuan'
    let datas = {
      storeId: 1,
      brandId: app.globalData.brandid,
    }
    http.promisServer(urls, datas).then(res => {
      console.log(res);

      if (res.flag) {
        res.data.forEach(item => {
          item.start_time = item.start_time.substr(0, 10).replace('-', '.').replace('-', '.');
          item.stop_time = item.stop_time.substr(0, 10).replace('-', '.').replace('-', '.');
        })
        this.setData({
          puzzle: res.data
        })
        console.log(this.data.puzzle)
      } else {
        console.log('暂无未发布拼团活动');
        this.setData({
          puzzle: null
        })
      }
    })

  },


  //查询免费活动
  // getfree: function () {
  //   let url = baseUrl + 'activity/free/findByStatusFree';
  //   let data = {
  //     status: 3,
  //     brandId: app.globalData.brandid,
  //     storeId: wx.getStorageSync('sjid'),
  //     state: 1,

  //   }
  //   http.promisServer(url, data).then(res => {
  //     console.log(res);
  //     if (res.flag) {

  //     } else {
  //       console.log('暂无免费活动');
  //       return false
  //     }
  //     let paddingfree = [];
  //     let notfree = [];
  //     let endfree = [];
  //     res.data.forEach((item, index) => {
  //       console.log(item.status);

  //       switch (item.status) {
  //         case 0:
  //           paddingfree.push(item)
  //           break;
  //         case 1:
  //           notfree.push(item);
  //           break;
  //         case 2:
  //           endfree.push(item)
  //           break;
  //       }
  //       this.setData({
  //         paddingfree: paddingfree,
  //         notfree: notfree,
  //         endfree: endfree
  //       })
  //     }

  //     )
  //     this.setData({
  //       free: res.data
  //     })
  //   })
  // },




  // 删除优惠券
  delet: function (e) {
    console.log(app.hdindex(e, 'id'));
    let index = app.hdindex(e, 'id');
    let url = baseUrl + 'coupon/delenteCoupons';
    let data = {
      couponId: index,
      storeId: wx.getStorageSync('sjid'),
      brandId: app.globalData.brandid
    }
    http.promisServer(url, data).then(res => {
      console.log(res);
      this.onShow();
    })
  },
  //删除免费活动
  omit: function (e) {
    console.log(app.hdindex(e, 'id'));
    let index = app.hdindex(e, 'id');
    let url = baseUrl + 'activity/free/deleteFreeById';
    let data = {
      freeId: index
    }
    http.promisServer(url, data).then(res => {
      console.log(res);
      this.onShow();
    })
  },

  // 删除秒杀活动
  remove: function (e) {
    console.log(e);
    let index = app.hdindex(e, 'id');
    let url = baseUrl + 'activity/seckill/deleteSeckill';
    let data = {
      seckillId: index,
      storeId: 1,
      brandId: app.globalData.brandid
    }
    http.promisServer(url, data).then(res => {
      console.log(res);
      this.onShow();
    })
  },


  // 删除拼团
  cancel: function (e) {
    let index = app.hdindex(e, 'id');
    let url = baseUrl + 'activity/pintuan/deletePintuanById';
    let data = {
      pintuanId: index
    }
    http.promisServer(url, data).then(res => {
      console.log(res);
      this.onShow();
    })

  },



  // 发布优惠券
  release: function (e) {
    var that = this;
    console.log(app.hdindex(e, 'id'));
    let id = app.hdindex(e, 'id');
    let url = baseUrl + 'coupon/AuditorCoupo';
    let data = {
      state: 3,
      couponId: id,
      brandId: app.globalData.brandid,
      storeId: wx.getStorageSync('sjid')
    }
    console.log(data);
    http.promisServer(url, data).then(res => {
      console.log('去审核')
      console.log(res);
      that.onShow();
    })
  },


  //发布免费活动
  announce: function (e) {
    var that = this;
    console.log(app.hdindex(e, 'id'));
    let id = app.hdindex(e, 'id');
    let url = baseUrl + 'activity/free/fabuFree';
    let data = {
      freeId: id,
      brandId: app.globalData.brandid,
      storeId: 1,
    }
    console.log(data);
    http.promisServer(url, data).then(res => {
      console.log('审核发布免费活动')
      console.log(res);
      that.onShow();
    })
  },




  //发布秒杀活动
  issue: function (e) {
    var that = this;
    console.log(app.hdindex(e, 'id'));
    let id = app.hdindex(e, 'id');
    let url = baseUrl + 'activity/seckill/fabuSeckill';
    let data = {
      seckillId: id,
      brandId: app.globalData.brandid,
      storeId: 1,
    }
    console.log(data);
    http.promisServer(url, data).then(res => {
      console.log('审核发布秒杀活动')
      console.log(res);
      that.onShow();
    })
  },


  //发布拼团活动
  publisher: function (e) {
    var that = this;
    console.log(app.hdindex(e, 'id'));
    let id = app.hdindex(e, 'id');
    let url = baseUrl + 'activity/pintuan/fabuPintuan';
    let data = {
      pintuanId: id,
      brandId: app.globalData.brandid,
      storeId: 1,
    }
    console.log(data);
    http.promisServer(url, data).then(res => {
      console.log('审核发布拼团活动')
      console.log(res);
      that.onShow();
    })
  },






  // 修改优惠券
  update: function (e) {
    let index = app.hdindex(e, 'index');
    let arry = JSON.stringify(this.data.not[index]);
    wx.navigateTo({
      url: '/pages/create/issue/issue?arry=' + arry,
    })
  },

  //修改秒杀活动
  amend:function(e) {
    let index = app.hdindex(e, 'index');
    let arry = JSON.stringify(this.data.miaosss[index]);
    wx.navigateTo({
      url: '/pages/me/seckill/seckill?arry='+ arry,
    })
  },


  
  // 选中的创建活动
  handleSelect: function (e) {
    let indexs = app.hdindex(e, 'index');
    let selct = this.data.select;
    selct.forEach((item, index) => {
      if (index == indexs) {
        if (!selct[index]) {
          selct[index] = true
          return false
        }
        selct[index] = false
      } else {
        selct[index] = true
      }
    })
    this.setData({
      select: selct
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

  },

  // 跳转页面
  jumpdiscounts: function (e) {
    let index = app.hdindex(e, 'index')
    console.log(index);
    switch (index) {
      case 1:
        break;
      case 2:
        if (!this.data.not) {
          wx.showToast({
            title: '没有未发布的优惠券',
            icon: 'none',
            duration: 800
          })
          return false
        }
        let not = JSON.stringify(this.data.not);
        wx.navigateTo({
          url: '/pages/me/activity/discounts/discounts?arry=' + not,
        })
        break;
      case 3:
        if (this.data.end.length == 0) {
          wx.showToast({
            title: '没有下架的优惠券',
            icon: 'none',
            duration: 800
          })
          return false
        }
        let end = JSON.stringify(this.data.end);
        wx.navigateTo({
          url: '/pages/me/activity/discounts/discounts?arry=' + end,
        })
        break;
    }
  }
})