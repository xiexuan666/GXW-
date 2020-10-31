// pages/product/anlixq/anlixq.js
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

    inputVal: '',
    // 评论参数
    Common: [],
    annrshuz: [],
    //评论信息
    comments: {},
    status: true, //评价框显示隐藏
    content: "",
    userId: '',
    pinlxinx: '',
    caseId: '',
    userpingfen: [          // 天快黑了
      { pingfen: 4 }
    ],
    anlixiaq: null,

    // 页面数据
    pagesubscript: {},
    // 评论数据
    findAllComment: {},
    // 海报是否隐藏显示
    maskHidden: false,
    hideModal: true, //模态框的状态  true-隐藏  false-显示
    // 案例详情“
    anlixiaqlist:[]
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



  // 点击发表评论
  handlefa: function () {
    this.setData({
      inputVal: '',
    })

    var that = this;
    // 请求接口
    let url = baseUrl + "case/caseComment";
    // 用户id
    let userid = wx.getStorageSync('gerxinx').id;
    // 案例id
    let caseid = that.data.pagesubscript.id;
    // 品牌id
    let brandid = app.globalData.brandid;
    // 文本内容
    let content = that.data.pinlxinx;

    let data = {
      userId: userid,
      caseId: caseid,
      brandId: brandid,
      comment: content
    }
    http.promisServer(url, data).then(res => {
      console.log(res);
      that.GetFindComment();
    })


  },
  // 评论输入框
  pingl: function (e) {
    this.setData({
      pinlxinx: e.detail.value
    })
  },

  // 渲染评论
  handlepl() {
    console.log('执行这里');
    var tha = this
    var url = baseUrl + "case/findAllComments"
    var gerxinx = wx.getStorageSync('gerxinx')
    var dat = {
      brandId: gerxinx.brand_id,
      caseId: tha.data.caseId,
    }
    http.promisServer(url, dat).then(resc => {
      var commentpl = resc.data.caseList
      console.log(commentpl, '11111111');
      tha.setData({ comments: commentpl })
      if (commentpl.length == 1) {
        wx.setStorageSync('comments', commentpl[0])
        return false
      }
    })
  },

  //失去焦点时获取里面评论内容
  bindTextAreaBlur: function (e) {
    this.setData({
      content: e.detail.value,
    })
  },
  //点击按钮时得到里面的值
  fabiao: function (e) {
    if (this.data.content == '') {
      wx.showToast({
        title: '内容不能为空',
        icon: "none",
        duration: 1500,
      })
    } else {
      this.setData({
        focus: 'false',
        concent1: this.data.content,
      })
      console.log(this.data.content)
    }
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

    if (options.Arrys) {
      let Arrys = JSON.parse(options.Arrys);
      console.log('首页进入', Arrys)
      console.log('转化后的数组：',JSON.parse(Arrys.images))
      that.setData({
        pagesubscript: Arrys,
        anlixiaqlist:JSON.parse(Arrys.images)
      })
    } else {
      let caseId = app.globalData.anlixiaq;
      console.log('案例页进入', caseId);
      console.log('案例页进入', JSON.parse(caseId.images));
      this.setData({
        pagesubscript: caseId,
        anlixiaqlist:JSON.parse(caseId.images)
      })
      that.GetFindComment();

      var tiyan = this.data.userpingfen;
      console.log(tiyan);
      console.log(tiyan.length);
      for (var i = 0; i < tiyan.length; i++) {
        //tiyan[i].pingfenpic = pingxin.pingfen(parseFloat(tiyan[i].pingfen));    //使用函数
      }
      this.setData({
        userpingfen: tiyan
      })

    }
    // 获取过来的字符转换成数组用以页面渲染
    // console.log(app.globalData.userInfo);
    // 获取评论信息
    that.GetFindComment();

    // 添加访问量
    that.preview();
    // 正规流程：
    // 获取过来的id去请求数据；
    // var caseId = options.caseId;
    // console.log(caseId);
    // console.log(app.globalData.anlixiaq);
    // this.setData({
    //   caseId:caseId
    // })
    // var _this = this;
    // var tiyan = this.data.userpingfen;
    // for (var i = 0; i < tiyan.length; i++) {
    //   //tiyan[i].pingfenpic = pingxin.pingfen(parseFloat(tiyan[i].pingfen));    //使用函数
    // }
    // _this.setData({
    //   userpingfen: tiyan
    // })

    // this.handlepl()



  },
  //将canvas转换为图片保存到本地，然后将图片路径传给image图片的src
  createNewImg: function () {
     var that = this;
    // 获取点击的案例图片和文字介绍
    var result = that.data.pagesubscript;
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
  //点击生成
  formSubmit: function (e) {
    var that = this;
    // 获取详细详细
    console.log(that.data.pagesubscript);
    
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
    }, 500)
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
      fail: function (res) {
      },
      complete: function (res) {
      }
    });
  },
  /**
   * 生命周期函数--监听页面显示
   */
  isString: function (str) {
    return (typeof str == 'string') && str.constructor == String;
  },
  onShow: function () {
    var anlixiaq = app.globalData.anlixiaq;
    console.log(anlixiaq);
    this.dealproduct()
    console.log(anlixiaq, '案例详情')
    if (anlixiaq.images && this.isString(anlixiaq.images)) {
      anlixiaq.images = JSON.parse(anlixiaq.images)
    }
    this.setData({ anlixiaq })
  },
  // 处理案例详情数据，处理出产品列表
  dealproduct: function () {
    console.log('要处理的数据', this.data.pagesubscript.case_product_id);
    let list = JSON.parse(this.data.pagesubscript.case_product_id);
    console.log('转化：', list);
    this.setData({
      productlist: list
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

  // 收藏案例
  collection: function (e) {
    let pagesubscript = this.data.pagesubscript;
    var gerxinx = wx.getStorageSync('gerxinx');
    let check = getInformation.checkUser();
    var annrshuz = this.data.annrshuz
    var ind = app.hdindex(e, 'ind')
    if (check) {
      var url = baseUrl + "case/allCaseCollectionSaves"
      var dat = {
        brand_id: '2',
        user_id: gerxinx.id,
        case_id: pagesubscript.id,
        case_type_id: 1,
      }
      http.promisServer(url, dat).then(resc => {
        if (resc.status == 0) {
          annrshuz[ind].scztt = false;
          this.setData({
            annrshuz,
            ['annrshuz[' + ind + '].collection']: annrshuz[ind].scztt
          })
          console.log(tha.data.annrshuz[ind].collection)
          wx.showToast({ title: '取消收藏', icon: 'none', duration: 800 })
        } else {
          annrshuz[ind].scztt = true;
          this.setData({
            annrshuz,
            ['annrshuz[' + ind + '].collection']: annrshuz[ind].scztt
          });
          console.log(tha.data.annrshuz[ind]);
          wx.showToast({ title: '收藏成功', icon: 'none', duration: 800 })
        }

        console.log(resc, '收藏状态改变')

      })

    } else {
      wx.showToast({ title: '没有登录', icon: 'none', duration: 700 })
      return false
    }


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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  // 获取用户评论功能
  GetFindComment: function () {
    var that = this;
    // 品牌id
    let brandid = app.globalData.brandid;
    console.log(brandid);
    // 案例id
    let caseid = that.data.pagesubscript.id;
    console.log(caseid);

    // 请求接口
    let url = baseUrl + 'case/findAllComment';
    let data = {
      brandId: brandid,
      caseId: caseid,
      // pages:0
    }
    // 调用接口
    http.promisServer(url, data).then(res => {
      console.log(res.data);
      that.setData({
        findAllComment: res.data
      })

      console.log(that.data.findAllComment);
    })
  },
  xiaoshi:function(){
    var that = this
    this.setData({
      maskHidden: false
    });
  },
  //访问量
  preview: function () {
    var that = this;
    var Url = baseUrl + 'case/preview';
    // 品牌id
    let brandid = app.globalData.brandid;
    // 案例id
    let caseid = that.data.pagesubscript.id;
    // 用户id
    let userid = wx.getStorageSync('gerxinx').id;
    // 参数
    let data = {
      brandId: brandid,
      caseId: caseid,
      userId: userid
    };
    console.log(Url);
    console.log(data);
    http.promisServer(Url, data).then(res => {
      console.log(res);
    })
  }
  //参数：用户id,案例id,品牌id,
})