// pages/product/cp/cpxq.js
const app = getApp();
const http = app.globalData.http;
const baseUrl = app.globalData.baseUrl;
const getInformation = app.globalData.getInformation;
const haibao = require('../../../utils/initial')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //产品详情状态
    cpxqzt: 1,
    cpxiaqs: '',
    // 海报是否隐藏显示
    maskHidden: false,
    hideModal: true, //模态框的状态  true-隐藏  false-显示
  },
  //产品详情导航选择
  cpxzxz: function (e) {
    var ind = app.hdindex(e, 'ind')

    var cpxqzt = this.data.cpxqzt;
    if (ind == cpxqzt) { return false }
    if (ind == 1) {
      cpxqzt = 1
      wx.setNavigationBarTitle({ title: '产品故事' })
    }
    if (ind == 2) {
      cpxqzt = 2
      wx.setNavigationBarTitle({ title: '空间效果' })
    }
    if (ind == 3) {
      cpxqzt = 2
      // wx.setNavigationBarTitle({ title: '全景体验'})
      var id = this.data.cpxiaqs.id
      console.log(id, 'aaaa');
      wx.navigateTo({
        url: '/pages/souye/webwei/weibwei?id=' + id
      })
    }
    if (ind == 4) {
      cpxqzt =4
        wx.setNavigationBarTitle({ title: '视频展示' })
    }
    this.setData({ cpxqzt: cpxqzt })
  },
  //点击打开图片
  dakerw: function (e) {
    console.log(e)
    var img = app.hdindex(e, 'img')
    console.log(img)
    wx.previewImage({
      current: img, // 当前显示图片的http链接 
      urls: [img]
    })
  },
  //请求价格
  qingqjiage: function (cpxiaqs) {

    var tha = this
    var bendijxs = wx.getStorageSync('bendijxs')
    if (!bendijxs || !bendijxs.id) {
      return false
    }
    var nr = cpxiaqs.product_guige


    var url = baseUrl + "production/findproductPriceById"
<<<<<<< HEAD
    var dat = {
      storeid: bendijxs.id,
      brandid: app.globalData.brandid,
      productid: cpxiaqs.id
    }
    // console.log(dat,'data')
    http.promisServer(url, dat).then(resc => {
      // console.log(resc,'价格1111111111111')
      if (!resc.data.productprice) {
=======
    var dat={
      storeid:bendijxs.id,
      brandid:app.globalData.brandid,
      productid:cpxiaqs.id
    }
    // console.log(dat,'data')
    http.promisServer(url, dat).then(resc=>{
      // console.log(resc,'价格1111111111111')
      if(!resc.data.productprice){
>>>>>>> f18b3e4711d7bf89bb5c53bd2154981f0aba8052
        // console.log(7777777)
        nr.forEach(el => {
          el.jiage = ''
        });
      } else {

        var productprice = resc.data.productprice.product_price
        productprice = JSON.parse(productprice)
        console.log(productprice, nr, 666)
        nr.forEach((el, ind) => {
          productprice.forEach(el2 => {

            if (el.weiyi == el2.weiyi) {

              el.jiage = el2.jiage
            }
          });
        });

      }
      cpxiaqs.product_guige = nr
      console.log(cpxiaqs.product_guige, "价格")
      tha.setData({ cpxiaqs })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  isString: function (str) {
    return (typeof str == 'string') && str.constructor == String;
  },

  // 显示遮罩层
  handleToTop: function () {
    console.log('显示')
    var that = this;
    that.setData({
      hideModal: false
    })
    var animation = wx.createAnimation({
      duration: 600,//动画的持续时间 默认600ms   数值越大，动画越慢   数值越小，动画越快
      timingFunction: 'ease',//动画的效果 默认值是linear
    })
    this.animation = animation
    setTimeout(function () {
      that.fadeIn();//调用显示动画
    }, 200)
  },

  // 隐藏遮罩层
  hideModal: function () {
    var that = this;
    var animation = wx.createAnimation({
      duration: 800,//动画的持续时间 默认800ms   数值越大，动画越慢   数值越小，动画越快
      timingFunction: 'ease',//动画的效果 默认值是linear
    })
    this.animation = animation
    that.fadeDown();//调用隐藏动画   
    setTimeout(function () {
      that.setData({
        hideModal: true
      })
    }, 100)//先执行下滑动画，再隐藏模块

  },

  clearPosters: function () {
    var that = this;
    var animation = wx.createAnimation({
      duration: 800,//动画的持续时间 默认800ms   数值越大，动画越慢   数值越小，动画越快
      timingFunction: 'ease',//动画的效果 默认值是linear
    })
    this.animation = animation
    that.fadeDown();//调用隐藏动画   
    setTimeout(function () {
      that.setData({
        hideModal: true
      })
    }, 100)//先执行下滑动画，再隐藏模块
  },

  //动画集
  fadeIn: function () {
    this.animation.translateY(0).step()
    this.setData({
      animationData: this.animation.export()//动画实例的export方法导出动画数据传递给组件的animation属性
    })
  },
  fadeDown: function () {
    this.animation.translateY(300).step()
    this.setData({
      animationData: this.animation.export(),
    })
  },


  // 取消操作
  quxiao: function () {
    var that = this;
    var animation = wx.createAnimation({
      duration: 800,//动画的持续时间 默认800ms   数值越大，动画越慢   数值越小，动画越快
      timingFunction: 'ease',//动画的效果 默认值是linear
    })
    this.animation = animation
    that.fadeDown();//调用隐藏动画   
    setTimeout(function () {
      that.setData({
        hideModal: true
      })
    }, 100)//先执行下滑动画，再隐藏模块，再隐藏模块
  },
  onLoad: function (options) {
    // console.log(options.arry);
    console.log(app.globalData.cpxiaqs.id)
<<<<<<< HEAD
    var cpxiaqs = app.globalData.cpxiaqs;

    if (cpxiaqs.product_guige && this.isString(cpxiaqs.product_guige)) {
      cpxiaqs.product_guige = JSON.parse(cpxiaqs.product_guige)

=======
    var cpxiaqs=app.globalData.cpxiaqs;

    if(cpxiaqs.product_guige&&this.isString(cpxiaqs.product_guige)){
      cpxiaqs.product_guige=JSON.parse(cpxiaqs.product_guige)
    
>>>>>>> f18b3e4711d7bf89bb5c53bd2154981f0aba8052
    }
    if (cpxiaqs.product_images && this.isString(cpxiaqs.product_images)) {
      cpxiaqs.product_images = JSON.parse(cpxiaqs.product_images)
    }



    if (cpxiaqs) {
      this.qingqjiage(cpxiaqs)
    }
<<<<<<< HEAD
    this.setData({ cpxiaqs })
=======
    this.setData({cpxiaqs})
>>>>>>> f18b3e4711d7bf89bb5c53bd2154981f0aba8052
    // console.log(cpxiaqs,'案例详情')
  },
  //点击保存到相册
  baocun: function () {
    var that = this
    wx.saveImageToPhotosAlbum({
      filePath: that.data.imagePath,
      success(res) {
        wx.showModal({
          content: '保存成功',
          showCancel: false,
          confirmText: '确定',
          confirmColor: '#333',
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定');
              /* 该隐藏的隐藏 */
              that.setData({
                maskHidden: false
              })
            }
          }, fail: function (res) {
            console.log(11111)
          }
        })
      }
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

  },
  //点击生成海报按钮
  formSubmit: function (e) {
    var that = this;
    this.setData({
      maskHidden: false
    });
    wx.showLoading({
      title: '海报生成中',
    })
    setTimeout(function () {
      that.quxiao();
      that.createNewImg();
      that.setData({
        maskHidden: true
      });
    },1000)
    },
  //将canvas转换为图片保存到本地，然后将图片路径传给image图片的src
  createNewImg: function () {
    var that = this;
    // 获取点击的案例图片和文字介绍
    var data = that.data.cpxiaqs;
    var result={
      photo:data.product_image,
      huxing:'',
      chengshi:'',
      mianji:data.name,
      name:'',
      chengshi:'',
      create_time:data.create_time
    };
    // 调用生成海报方法,将获取到的海报信息传递过去
    haibao.sethaibao(result);
    setTimeout(function () {
        wx.canvasToTempFilePath({
          canvasId: 'canvpos',
          success: function (res) {
            var tempFilePath = res.tempFilePath;
            that.setData({
              imagePath: tempFilePath,
              canvasHidden: true
            });
            wx.hideLoading()
          },
          fail: function (res) {
            console.log(res);
          }
        });
    },1000)
  },
  // 点击背景隐藏掉全部
  xiaoshi:function(){
    var that = this
    this.setData({
      maskHidden: false
    });
    }
})