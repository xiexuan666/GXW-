// pages/souye/souye.js
const app = getApp();
var http = require("../../utils/http");
const baseUrl = app.globalData.baseUrl;
const getInformation = app.globalData.getInformation;
const haibao = require('../../utils/initial')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 海报
    img: "/images/tubiao/1-14.png",
    share: "/images/tubiao/share.png",
    // 海边是否隐藏显示
    maskHidden: false,
    // 海报
    anlilist: null,
    name: "",
    lunb: [],
    lunbs: [{ url: "/images/tubiao/1-14.png" },],
    autoplay: true,
    interval: 4000,
    duration: 500,
    circular: true,
    hideModal: true, //模态框的状态  true-隐藏  false-显示
    animationData: {},
    imagePath: {},
    annrshuz: [],
    patha: '',
    data: [
      {
        title: 'CASE',
        image: '/images/tubiao/1-02.png',
        content: '看案例'
      },
      {
        title: 'PRODUCT',
        image: '/images/tubiao/1-03.png',
        content: '找产品'
      },
      {
        title: 'STRATEGY',
        image: '/images/tubiao/1-04.png',
        content: '做攻略'
      },
      {
        title: 'BRAND',
        image: '/images/tubiao/1-05.png',
        content: '逛门店'
      },
      {
        title: 'RESERVATION',
        image: '/images/tubiao/1-06.png',
        content: '约量房'
      }
    ]
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


  daohan: function () {
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        wx.openLocation({//​使用微信内置地图查看位置。
          latitude: 23.014746,//要去的纬度-地址
          longitude: 113.168396,//要去的经度-地址
          name: "广东省佛山市南海区季华东路31号",
          address: '广东省佛山市南海区季华东路31号'
        })
      }
    })
  },



  //请求轮播
  handlelun: function () {
    var tha = this
    var url = baseUrl + 'banner/index'
    console.log(url);
    http.promisServer(url).then(res => {
      console.log(res.data.allbannerList, '请求轮播图')
    })

  },


  //请求轮播 视频
  requestlunb: function () {
    var tha = this;
    var url = baseUrl + 'banner/index';
    let data = { brand_id: app.globalData.brandid, module: 1 };
    http.promisServer(url, data).then(res => {
      console.log('请求轮播图：', res.data.allbannerList);
      tha.setData({ lunb: res.data.allbannerList })
    })
  },


  //请求推荐系列
  qingqtuijxili: function () {
    var tha = this
    var url = baseUrl + 'series/tuijianSeriesPage';
    http.promisServer(url, { brandid: '2' }).then(res => {
      tha.setData({ xilie: res.data.allseriessLists })
      console.log(res, '推荐系列')
    })
  },
  //请求推荐案例
  qingqtuianli: function () {
    var tha = this
    var url = 'case/tuijianCasePage';
    getInformation.getGerxinx(url).then(res => {
      tha.setData({ lunbs: res.data.tuijianCaseList })
    })
  },

  // 跳转到海报
  hanglehb: function () {
    wx.navigateTo({
      url: '/pages/souye/poster/poster',
    })
  },
  // 跳轉案例
  tzcpanliye: function () {
    wx.switchTab({
      url: '/pages/product/product',
    })
  },

  /**
  *  导航栏跳转
  */
  Jump: function (e) {
    var index = app.hdindex(e, 'index');
    console.log(index);
    switch (index) {
      case 0:
        getInformation.Jump('product/product')
        break;
      case 1:
        getInformation.Jump('product/product1')
        break;
      case 2:
        getInformation.Jump('jinxs/jinxs')
        break;
      case 3:
        getInformation.Jump('me/fujin/fujin')
        break;
      case 4:
        getInformation.Jump('souye/souye3')
        break;
      case 5:

        break;
      default:
        ;
    }
  },
  // 显示遮罩层
  handleToTop: function (e) {
    let indx = app.hdindex(e,'index')
    let chaxchuanlinr = this.data.lunbs
    let anli=chaxchuanlinr[indx];
      var that = this;
      that.setData({
        hideModal: false,
        anlilist:anli
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
    //请求轮播
    this.requestlunb()


  },
  //将canvas转换为图片保存到本地，然后将图片路径传给image图片的src
  createNewImg: function () {
    var that = this;
    // 获取点击的案例图片和文字介绍
    var result = that.data.anlilist;
    haibao.sethaibao(result);
    setTimeout(function () {
      // 调用生成海报方法,将获取到的海报信息传递过去
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
    }, 1000)
  },
  //点击保存到相册
  baocun: function () {
    console.log('用户点击保存按钮');
    var that = this
    wx.saveImageToPhotosAlbum({
      filePath: that.data.imagePath,
      success(res) {
        wx.showModal({
          content: '图片已保存到相册，赶紧晒一下吧~',
          showCancel: false,
          confirmText: '好的',
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


  xiaoshi: function () {
    var that = this
    this.setData({
      maskHidden: false
    });
  },

  
  bendi: function () {
    var that = this
    wx.downloadFile({
      url: 'https://cdn.juesedao.cn/gxw/18655adabbbd420588b323d2357f1242',
      success: function (res) {
        if (res.statusCode === 200) {
          var avaterSrc = res.tempFilePath;
          that.setData({
            patha: res.tempFilePath
          });
        } else {
          wx.showToast({
            title: '头像下载失败！',
            icon: 'none',
            duration: 2000,
            success: function () {
              that.getQrCode(avaterSrc = "", cardInfo);//回调另一个图片下载
            }
          })
        }
      }
    })

  },
  //点击生成
  formSubmit: function (e) {
    var that = this;
    this.setData({
      maskHidden: false
    });
    wx.showLoading({
      title: '海报生成中',
    })
    setTimeout(function () {
      wx.hideToast();
      that.quxiao();
      that.bendi();
      that.createNewImg();
      that.setData({
        maskHidden: true
      });
    }, 500)
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

    //推荐案例
    this.qingqtuianli()

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
      title: "快点加入我们吧~",
      success: function (res) {
        console.log(res, "转发成功")
      },
      fail: function (res) {
        console.log(res, "转发失败")
      }
    }
  },
  onShareTimeline: function () { }


  ,

  // 点击附带参数跳转案例详情页面
  JumpCase: function (event) {
    var that = this;
    // 获取下标
    var subscript = event.currentTarget.dataset['index'];
    // 获取对应数组并转换成字符（wx不支持数组为参数跳转，必须json转码）
    let set = JSON.stringify(that.data.lunbs[subscript]);
    wx.navigateTo({
      url: '/pages/product/anlixq/anlixq?Arrys=' + set,
    })
  },
  // 点击点赞事件
  great: function (event) {
    var that = this;
    let check = getInformation.checkUser();
    // 执行点赞操作
    if (check) {
      console.log('来点赞吧');
      // 获取点击下标
      var subscript = event.currentTarget.dataset['index'];
      // 获取轮播图数据
      let greatid = that.data.lunbs;
      //获取用户缓存
      let user = wx.getStorageSync('gerxinx');
      // 获取点击数据表的id
      let caseid = greatid[subscript].id;
      //设置请求路径
      let url = baseUrl + "case/caseGreat";
      // 设置请求参数
      var dat = {
        brandId: '2',
        userId: user.id,
        caseId: caseid
      };
      console.log(dat, url);
      // 获取默认的点赞数
      let great = greatid[subscript].great;
      http.promisServer(url, dat).then(res => {
        console.log('点赞的判断值：', res.flag);
        if (res.flag) {
          // 点赞成功，点赞数+1 更新视图，修改图标高亮状态
          let good = great + 1;
          that.setData({
            ['lunbs[' + subscript + '].great']: good,
            ['lunbs[' + subscript + '].dianzhan']: res.flag,
          });
          wx.showToast({ title: '点赞成功', icon: 'none', duration: 500, mask: true })
        } else {
          // 取消点赞,点赞数-1，更新视图
          let good = great - 1;
          that.setData({
            ['lunbs[' + subscript + '].great']: good,
            ['lunbs[' + subscript + '].dianzhan']: res.flag
          })
          console.log('点击的案例下标：', subscript);
          wx.showToast({ title: '取消点赞', icon: 'none', duration: 800, mask: true })
        }
      })

    } else {
      // 当用户没登录时
      wx.showToast({ title: '没有登录', icon: 'none', duration: 700 })
      return false
    };
  },

  //  点击收藏
  collection: function (e) {
    console.log('首页的收藏事件');
    /* 需要参数为 
      版本id 用户id 所选案例id 
    */
    let check = getInformation.checkUser();
    if (check) {
      var that = this;
      var gerxinx = wx.getStorageSync('gerxinx');
      var index = app.hdindex(e, 'ind');
      var case_id = that.data.lunbs[index].id;
      var brand_id = app.globalData.brandid;
      let data = {
        brand_id: brand_id,
        user_id: gerxinx.id,
        case_id: case_id,
        case_type_id: 1,
      }
      let url = baseUrl + "case/allCaseCollectionSaves";
      console.log(data, url);

      var lunbo = that.data.lunbs;
      http.promisServer(url, data).then(resc => {
        console.log(resc);
        if (resc.status == 0) {
          lunbo[index].scztt = false;
          console.log(index);
          // 取消收藏
          this.setData({
            lunbo,
            ['lunbs[' + index + '].collection']: lunbo[index].scztt
          })
          wx.showToast({ title: '取消收藏', icon: 'none', duration: 800, mask: true })
        } else {
          lunbo[index].scztt = true;
          that.data.lunbs[index].collection = true;
          this.setData({
            lunbo,
            ['lunbs[' + index + '].collection']: lunbo[index].scztt
          })
          wx.showToast({ title: '收藏成功', icon: 'none', duration: 800, mask: true })
        }
        console.log(resc, '收藏状态改变')
      })
    } else {
      wx.showToast({ title: '没有登录', icon: 'none', duration: 700 })
      return false
    }
  }
})

