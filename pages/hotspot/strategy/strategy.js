const app = getApp();
const http = app.globalData.http;
var WxParse = require('../../../wxParse/wxParse.js');
const baseUrl = app.globalData.baseUrl;
const getInformation = app.globalData.getInformation;
const haibao = require('../../../utils/initial')
Page({

  /**
   * 页面的初始数据
   */
  data: {

    strategy: [],
    // 收藏icon的状态值
    Collectionstate: false,
    // 评论参数
    Common: [],
    InputText: '',
    // 海报是否隐藏显示
    maskHidden: false,
    hideModal: true, //模态框的状态  true-隐藏  false-显示
    //视频列表属性
    pinlunid: null,
    images: null,
    // 海报
    anlilist: null,
    // 滚动条
    scroll:0,
  },

  // 一键拨打
  calling: function () {
    wx.makePhoneCall({
      phoneNumber: '0757-85396681', //此号码并非真实电话号码，仅用于测试
      success: function () {
        console.log("拨打电话成功！")
      },
      fail: function () {
        console.log("拨打电话失败！")
      }
    })
  },

  // 显示遮罩层弹出框
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     var that = this;
    // 获取所有攻略详情，得到html代码
    getInformation.getstrategy(undefined, wx.getStorageSync('gerxinx').id).then(res => {
      // 修改标签
      for (let i = 0; i < res.data.length; i++) {
        let data = /\d{4}-\d{1,2}-\d{1,2}/g.exec(res.data[i].update_time);
        res.data[i].update_time = data;
        if (res.data[i].type == 1) {
          res.data[i].name = '如何选砖';
        } else if (res.data[i].type == 2) {
          res.data[i].name = '如何装修';
        } else if (res.data[i].type == 3) {
          res.data[i].name = '爆款推荐';
        } else if (res.data[i].type == 4) {
          res.data[i].name = '新品上市';
        }
      }
      // 更新视图
      that.setData({
        strategy: res.data[options.id],
        pinlunid: options.id
      })
      // 请求评论详情
      that.getCommon();
    })
  },
  /* 
    *评论框的所有功能
  */
  // 实时获取评论输入框内容
  getText: function (e) {
    var value = e.detail.value
    this.setData({
      InputText: value
    });
  },
  // 点击评论功能
  common: function () {
    var that = this;
    // 判断用户有没有缓存
    if(getInformation.checkUser()){
       // 检查文本内容
      let text = that.data.InputText;
      if (text.length == 0) {
        wx.showToast({
          title: '评论内容不能为空',
          icon:'none',
          duration:900
        })
      } else {
        let url = baseUrl + "activity/strategy/commonStrategy";
        let data = {
          userId: wx.getStorageSync('gerxinx').id,
          strategyId: that.data.strategy.id,
          brandId: app.globalData.brandid,
          common: text,
        }
        http.promisServer(url, data).then(res => {
          if (res.flag) {
            // 显示加载拟态框
            wx.showLoading({
              title: '评论成功',
            })
            setTimeout(function () {
              wx.hideLoading()
            }, 500)
            // 更新视图
            that.getCommon();
            // 拉回滚动条,清空输入框
            that.setData({
              scroll:0,
              InputText:''
            })
          } else {
            wx.showToast({
              title: '评论失败',
            })
          }
        })
    }
    }else{
      // 跳转到我的页面进行登录
      wx.showModal({
        content:'请先登录',
        success:res=>{
          if (res.confirm){
            wx.reLaunch({
              url: '/pages/me/me',
            })
          }else{
            return false
          }
        }
      })
    }
  },
  /* 
    *点赞功能
  */
  addgreat: function () {
    var that = this;
    console.log('点赞了');
    // url
    let url = 'activity/strategy/greatStrategy'
    // 攻略id
    let strategyId = that.data.strategy.id;
    getInformation.addgreat(url, strategyId).then(res => {
      console.log(res);
      that.setData({
        'strategy.dianzhan': res.flag
      })
      // 点赞人数判断
      let num = that.data.strategy.great;
      if (res.flag) {
        that.setData({
          'strategy.great': num + 1
        })
      } else {
        that.setData({
          'strategy.great': num - 1
        })
      }
    })
  },

  // 富文本转换函数
  gonglue: function (req) {
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  },
    // 请求攻略评论
    getCommon:function(){
      var that = this;
      let url = 'activity/strategy/findAllCommon';
      console.log(that.data.strategy);
      let strategyId = that.data.strategy.id;
      console.log('本攻略id',strategyId);
      let data = {
        brandId: app.globalData.brandid,
        strategyId: strategyId,
      }
      let urs = baseUrl + url;
      http.promisServer(urs, data).then(res => {
        console.log(res);
        that.setData({
          Common: res.data
        })
      })
    },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: "快点加入我们吧~",
      success: function (res) {
        console.log(res, "转发成功")
      },
      fail: function (res) {
        console.log(res, "转发失败")
      }
    }



  },
  // 收藏攻略
  Collection: function () {
    var that = this;
    var strategyId = that.data.strategy.id;
    getInformation.setCollection(strategyId).then(res => {
      // 改变星星状态
      if (res.flag) {
        that.setData({
          Collectionstate: true
        })
      } else {
        that.setData({
          Collectionstate: false
        })
      }
    });
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
  },500)
  },
  //将canvas转换为图片保存到本地，然后将图片路径传给image图片的src
  createNewImg: function () {
  var that = this;
  // 获取点击的案例图片和文字介绍
  var data = that.data.strategy;
  var result={
    photo:data.photo,
    huxing:'',
    chengshi:'',
    mianji:data.title,
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
  },800)
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
  // 点击背景隐藏掉全部
  xiaoshi:function(){
  var that = this
  this.setData({
    maskHidden: false
  });
  }
})