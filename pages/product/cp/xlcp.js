// pages/product/cp/xlcp.js
// const {cpshuj} = require('../jia.js');
const app = getApp();
const http = app.globalData.http;
const baseUrl = app.globalData.baseUrl;
const getInformation = app.globalData.getInformation;
Page({

  /** 
   * 页面的初始数据
   */
  data: {
    cp: [],
    titile: '',
    // 收藏icon的状态值
    Collectionstate: false,
    strategy: [],
    // 海报是否隐藏显示
    maskHidden: false,
    hideModal: true, //模态框的状态  true-隐藏  false-显示
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

  //跳转产品详情
  tzcpxq: function (e) {
    var ind = app.hdindex(e, 'ind')
    var inds = app.hdindex(e, 'inds')
    var cp = this.data.cp
    // console.log(annrshuz[ind],'案例详情')
    app.globalData.cpxiaqs = cp[ind].productList[inds]
    app.Jump('product/cp/cpxq')
  },

  //请求所有收藏
  qinsouc: function (cp) {
    var tha = this
    var gerxinx = wx.getStorageSync('gerxinx')
    if (!gerxinx) {
      return false
    }
    var url = baseUrl + "production/findproductCollectionByUserId"
    var dat = {
      brandid: '1',
      userid: gerxinx.id
    }
    http.promisServer(url, dat).then(resc => {
      var sclist = resc.data.productCollectionList
      cp.forEach(el1 => {
        console.log(el1.productList, 99)
        el1.productList.forEach(el2 => {
          sclist.forEach(el3 => {
            if (el2.id == el3.id) {
              el2.sczt = true
            }
          });
        });
      });
      this.setData({ cp })
      console.log(resc.data.productCollectionList, '收藏列表')
    })

  },
  //收藏产品 
  sccp: function (e) {
    var tha = this
    var gerxinx = wx.getStorageSync('gerxinx')
    var cp = this.data.cp
    var ind = app.hdindex(e, 'ind')
    var inds = app.hdindex(e, 'inds')
    if (!gerxinx) {
      wx.showToast({ title: '没有登录', icon: 'none', duration: 700 })
      return false
    }
    var url = baseUrl + "production/productCollectionSaves"
    var dat = {
      brandid: app.globalData.brandid,
      userid: gerxinx.id,
      productid: cp[ind].productList[inds].id
    }
    console.log(dat, "收藏状态改变前")
    http.promisServer(url, dat).then(resc => {
      if (resc.status == 0) {
        cp[ind].productList[inds].sczt = false
        this.setData({ cp })
        wx.showToast({ title: '取消收藏', icon: 'none', duration: 800 })
      }
      if (resc.status == 1) {
        cp[ind].productList[inds].sczt = true
        this.setData({ cp })
        wx.showToast({ title: '收藏成功', icon: 'none', duration: 800 })
      }
      console.log(resc, '收藏状态改变')

    })
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var titile = app.globalData.xiliexqs
    var cp = app.globalData.xiliexqs.allproductsList
    this.qingqcp(titile)
    console.log(cp, '系列详情')
    this.setData({ titile })
    let strategy = JSON.parse(options.arry)[options.id];
    // 添加查看量
    let url = 'activity/strategy/strategyPreview';
    let strategyId = strategy.id;
    getInformation.addCollection(url, strategyId);
    // 添加到data进行渲染
    that.setData({
      strategy: strategy
    })
    // 判断是否已经收藏
    if (strategy.collection) {
      that.setData({
        Collectionstate: true
      })
    } else {
      that.setData({
        Collectionstate: false
      })
    }
  },

  //将canvas转换为图片保存到本地，然后将图片路径传给image图片的src
  createNewImg: function () {
    var that = this;
    var context = wx.createCanvasContext('mycanvas');
    context.setFillStyle("#fff")
    context.fillRect(0, 0, 375, 667)
    var path = "/images/tubiao/1-14.png";
    context.drawImage(path, 0, 0, 400, 350);
    var path5 = "/images/tubiao/code.jpg";
    var path2 = "/images/tubiao/tx.png";
    var name = that.data.name;
    context.drawImage(path2, 24, 380, 60, 60, 200, 560);
    //绘制中间文字
    context.setFontSize(14);
    context.setFillStyle('#ccc');
    context.setTextAlign('left');
    context.fillText("LUCAS", 105, 400);
    context.stroke();
    context.setFontSize(14);
    context.setFillStyle('#696969');
    context.setTextAlign('left');
    context.fillText("在冠星王陶瓷未来家上看文章", 105, 430);
    context.stroke();
    context.setFontSize(14);
    context.setFillStyle('#000');
    context.setTextAlign('left');
    context.fillText("【现代简约佛山280m2私宅│4年落地只为“雅奢生活”】", 19, 470);
    context.stroke();
    context.setFontSize(12);
    context.setFillStyle('#ccc');
    context.setTextAlign('left');
    context.fillText("广东省-佛山市-禅城区", 20, 500);
    context.stroke();
    context.setFontSize(12);
    context.setFillStyle('#ccc');
    context.setTextAlign('left');
    context.fillText("2020.09.01", 280, 500);
    context.stroke();
    context.fillStyle = 'rgb(105,105,105)';
    context.fillRect(20, 520, 340, 0.5);
    //绘制左下角小程序二维码
    context.drawImage(path5, 20, 530, 100, 100, 70, 560);
    //绘制右下角文字
    context.setFontSize(16);
    context.setFillStyle('#ccc');
    context.setTextAlign('left');
    context.fillText("长按识别查看", 145, 570);
    context.stroke();
    context.setFontSize(16);
    context.setFillStyle('#ccc');
    context.setTextAlign('left');
    context.fillText("冠星王陶瓷未来家看文章", 145, 600);
    context.stroke();
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


  //请求产品
  qingqcp: function (cps) {
    var tha = this
    var url = baseUrl + "series/selectSeriesTypeByguige"
    var dat = {
      brandid: app.globalData.brandid,
      productIdList: cps.cdid,
      guigeIdList: cps.geid
    }
    console.log(dat, 9999)
    http.promisServer(url, dat).then(resc => {
      if (resc.status == '000') {
        var cp = resc.data.allguigeProductLists
        this.qinsouc(cp)
        this.setData({ cp })
      }

      console.log(cp, '获得产品')
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
    app.globalData.cpxiaqs = ''
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
  }
})