// pages/souye/souye.js
const app = getApp();
var http = require("../../utils/http");
const baseUrl = app.globalData.baseUrl;
Page({

  /**
   * 页面的初始数据
   */
  data: {

    img: "/images/tubiao/1-14.png",
    share:"/images/tubiao/share.png",
    maskHidden: false,
    name: "",


    lunb:[],
    lunbs:[
      {
        url:"/images/tubiao/1-14.png"
      },
    
    ],
    autoplay: true,
    interval: 4000,
    duration: 500,
    circular: true,
    hideModal: true, //模态框的状态  true-隐藏  false-显示
   animationData: {},
   annrshuz:[],
   titile:''
  },
    //拨打电话
    calling: function () {
      var bendijxs=this.data.bendijxs
      if(!bendijxs){
        return false
      }
      wx.makePhoneCall({
        phoneNumber: bendijxs.phone, //此号码并非真实电话号码，仅用于测试
        success: function () {
          console.log("拨打电话成功！")
        },
        fail: function () {
          console.log("拨打电话失败！")
        }
      })
    },
  
 //请求轮播
 handlelun:function() {
    var tha=this
    var url=baseUrl+'banner/index'
    console.log(url);
    http.promisServer(url).then(res=>{
    // tha.setData({lunb:res.data.allbannerList})
      console.log(res.data.allbannerList,'请求轮播图')
    })
    
 },
  //请求轮播 视频
  requestlunb:function(){
    var tha=this
    var url=baseUrl+'banner/index'
    http.promisServer(url).then(res=>{
    tha.setData({lunb:res.data.allbannerList})
       console.log(res.data.allbannerList,'请求轮播图')
    })

  },
   //请求推荐系列
   qingqtuijxili:function(){
    var tha=this
    var url=baseUrl+'series/tuijianSeriesPage'
    http.promisServer(url,{brandid:'1'}).then(res=>{
      tha.setData({xilie:res.data.allseriessLists})
      console.log(res,'推荐系列')
    })
  },
   //请求推荐案例
   qingqtuianli:function(){
    var tha=this
    var url=baseUrl+'case/tuijianCasePage'
    http.promisServer(url,{brandid:'2'}).then(res=>{
      tha.setData({lunbs:res.data.tuijianCaseList})
      console.log(res,"推荐案例")
    })
  },
  // 显示遮罩层
  handleToTop: function () {
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

  handlecha:function(){
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
  quxiao:function(){
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

// 跳转到案例
tzcase:function(){
  wx.reLaunch({
    url: '/pages/product/product?zhi=2',
  })
},
// 跳转量房
tzroom:function(){
wx.navigateTo({
  url: '/pages/souye/souye3',
})
},
// 跳转到装修攻略
tzstrategy:function(){
  wx.reLaunch({
    url: '/pages/hotspot/hotspot',
  })
},
// 跳转到品牌
tzbrand:function(){
wx.navigateTo({
  url:"/pages/souye/souye2"
})
},
// 跳转到产品
tzproduct:function(){
  wx.navigateTo({
    url:"/pages/product/product1"
  })
},
// 跳转到海报
hanglehb:function(){
wx.navigateTo({
  url: '/pages/souye/poster/poster',
})
},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
 //请求轮播
 this.requestlunb()
 //推荐系列
//  this.qingqtuijxili()
 //推荐案例
//  this.qingqtuianli()
  },
 //将canvas转换为图片保存到本地，然后将图片路径传给image图片的src
  createNewImg: function () {
    var that = this;
    var context = wx.createCanvasContext('mycanvas');
    context.setFillStyle("#fff")
    context.fillRect(0, 0, 375, 667)
    var path = "/images/tubiao/1-14.png";
    context.drawImage(path, 56, 56, 262, 349);
    var path5 = "/images/tubiao/code.jpg";
    var path2 = "/images/tubiao/text1.png";
    var name = that.data.name;
    context.drawImage(path2, 56, 400, 263, 121);
  
    //绘制左下角文字
    context.setFontSize(14);
    context.setFillStyle('#333');
    context.setTextAlign('left');
    context.fillText("长按识别查看", 70, 560);
    context.stroke();
    context.setFontSize(14);
    context.setFillStyle('#333');
    context.setTextAlign('left');
    context.fillText("冠星王陶瓷未来家看文章", 70, 580);
    context.stroke();
   
    //绘制右下角小程序二维码
    context.drawImage(path5, 230, 530,80,80);

    context.draw();
    //将生成好的图片保存到本地
    setTimeout(function () {
      wx.canvasToTempFilePath({
        canvasId: 'mycanvas',
        success: function (res) {
          var tempFilePath = res.tempFilePath;
          that.setData({
            imagePath: tempFilePath,
            canvasHidden: true
          });
        },
        fail: function (res) {
          console.log(res);
        }
      });
    }, 200);
  },
  //点击保存到相册
  baocun: function () {
    var that = this
    wx.saveImageToPhotosAlbum({
      filePath: that.data.imagePath,
      success(res) {
        wx.showModal({
          content: '海报已保存到相册',
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
  //点击生成
  formSubmit: function (e) {
    var that = this;
    this.setData({
      maskHidden: false
    });
    wx.showToast({
      title: '海报生成中...',
      icon: 'loading',
      duration: 1000
    });
    setTimeout(function () {
      wx.hideToast()
      that.createNewImg();
      that.setData({
        maskHidden: true
      });
    }, 1000)
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
    return {
      title: "一起来学习小程序吧~",
      success: function (res) {
        console.log(res, "转发成功")
      },
      fail: function (res) {
        console.log(res, "转发失败")
      }
    }
  },
  onShareTimeline: function (){}
 
 
})