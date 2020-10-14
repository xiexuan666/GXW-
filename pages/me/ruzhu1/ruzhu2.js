// pages/prize/prize.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> fad09a589a83aee28003e1456ea874447a43011d
    img: "/images/tubiao/1-14.png",
    share: "/images/tubiao/share.png",
    // 一开始不显示海报
    maskHidden: false,
    hideModal: true, //模态框的状态  true-隐藏  false-显示
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

  // 点击空白隐藏遮罩层
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


  
  // 点击取消
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
  // 跳转到海报
  hanglehb: function () {
    wx.navigateTo({
      url: '/pages/souye/poster/poster',
    })
  },
<<<<<<< HEAD
=======
=======
<<<<<<< HEAD

  },

=======
<<<<<<< HEAD

  },

=======
    img:"/images/tubiao/p",
    wechat:"/images/tubiao/wechat.png",
    quan:"/images/tubiao/wechat.png",
    code:"E7AI98",
    inputValue:"",
    maskHidden: false,
    name:"",
    touxiang:"",
    code: "E7A93C"
  },
  //获取输入框的值
  bindKeyInput:function(e){
    this.setData({
      inputValue: e.detail.value
    })
  },
  //点击提交按钮
  btnclick:function(){
    var text = this.data.inputValue
    wx.showToast({
      title: text,
      icon: 'none',
      duration: 2000
    })
  },
>>>>>>> c2d852eb919299f0777236b9e73da89733498f14
>>>>>>> e8e55f3a9c319a6878579450c3c18e28b346fd04
>>>>>>> 7c1c0e3919fad4bfaed76d5d78733405b080bbc8
>>>>>>> fad09a589a83aee28003e1456ea874447a43011d
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> fad09a589a83aee28003e1456ea874447a43011d


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
<<<<<<< HEAD
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
  // 跳轉案例
  tzcpanliye: function () {
    wx.switchTab({
      url: '/pages/product/product',
    })
  },

=======
=======
<<<<<<< HEAD


  },


=======
<<<<<<< HEAD


  },


=======
    var that = this;
    wx.getUserInfo({
      success: res => {
        console.log(res.userInfo,"huoqudao le ")
        this.setData({
          name: res.userInfo.nickName,
        })
        wx.downloadFile({
          url: res.userInfo.avatarUrl, //仅为示例，并非真实的资源
          success: function (res) {
            // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
            if (res.statusCode === 200) {
              console.log(res, "reererererer")
              that.setData({
                touxiang: res.tempFilePath
              })
            }
>>>>>>> 7c1c0e3919fad4bfaed76d5d78733405b080bbc8
          }
        })
      }
    })

  },
<<<<<<< HEAD
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
  // 跳轉案例
  tzcpanliye: function () {
    wx.switchTab({
      url: '/pages/product/product',
    })
  },

=======
  //将canvas转换为图片保存到本地，然后将图片路径传给image图片的src
  createNewImg: function () {
    var that = this;
    var context = wx.createCanvasContext('mycanvas');
    context.setFillStyle("#ffe200")
    context.fillRect(0, 0, 375, 667)
    var path = "/images/gobg.png";
    //将模板图片绘制到canvas,在开发工具中drawImage()函数有问题，不显示图片
    //不知道是什么原因，手机环境能正常显示
    context.drawImage(path, 0, 0, 375, 183);
    var path1 = that.data.touxiang;
    console.log(path1,"path1")
    //将模板图片绘制到canvas,在开发工具中drawImage()函数有问题，不显示图片
    var path2 = "/images/txquan.png";
    var path3 = "/images/heise.png";
    var path4 = "/images/wenziBg.png";
    var path5 = "/images/wenxin.png";
    context.drawImage(path2, 126, 186, 120, 120);
    //不知道是什么原因，手机环境能正常显示
    // context.save(); // 保存当前context的状态

    var name = that.data.name;
    //绘制名字
    context.setFontSize(24);
    context.setFillStyle('#333333');
    context.setTextAlign('center');
    context.fillText(name, 185, 340);
    context.stroke();
    //绘制一起吃面标语
    context.setFontSize(14);
    context.setFillStyle('#333333');
    context.setTextAlign('center');
    context.fillText("邀请你一起去吃面", 185, 370);
    context.stroke();
    //绘制验证码背景
    context.drawImage(path3, 48, 390, 280, 84);
    //绘制code码
    context.setFontSize(40);
    context.setFillStyle('#ffe200');
    context.setTextAlign('center');
    context.fillText(that.data.code, 185, 435);
    context.stroke();
    //绘制左下角文字背景图
    context.drawImage(path4, 25, 520, 184, 82);
    context.setFontSize(12);
    context.setFillStyle('#333');
    context.setTextAlign('left');
    context.fillText("进入小程序输入朋友的邀请", 35, 540);
    context.stroke();
    context.setFontSize(12);
    context.setFillStyle('#333');
    context.setTextAlign('left');
    context.fillText("码，朋友和你各自获得通用", 35, 560);
    context.stroke();
    context.setFontSize(12);
    context.setFillStyle('#333');
    context.setTextAlign('left');
    context.fillText("优惠券1张哦~", 35, 580);
    context.stroke();
    //绘制右下角扫码提示语
    context.drawImage(path5, 248, 578, 90, 25);
    //绘制头像
    context.arc(186, 246, 50, 0, 2 * Math.PI) //画出圆
    context.strokeStyle = "#ffe200";
    context.clip(); //裁剪上面的圆形
    context.drawImage(path1, 136, 196, 100, 100); // 在刚刚裁剪的园上画图
    context.draw();
    //将生成好的图片保存到本地，需要延迟一会，绘制期间耗时
    setTimeout(function () {
      wx.canvasToTempFilePath({
        canvasId: 'mycanvas',
        success: function (res) {
          var tempFilePath = res.tempFilePath;
          that.setData({
            imagePath: tempFilePath,
            canvasHidden:true
          });
        },
        fail: function (res) {
          console.log(res);
        }
      });
    }, 200);
  },
  //点击保存到相册
  baocun:function(){
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
          },fail:function(res){
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
      title: '装逼中...',
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

>>>>>>> c2d852eb919299f0777236b9e73da89733498f14
>>>>>>> e8e55f3a9c319a6878579450c3c18e28b346fd04
>>>>>>> 7c1c0e3919fad4bfaed76d5d78733405b080bbc8
>>>>>>> fad09a589a83aee28003e1456ea874447a43011d
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

=======
  
>>>>>>> c2d852eb919299f0777236b9e73da89733498f14
>>>>>>> e8e55f3a9c319a6878579450c3c18e28b346fd04
>>>>>>> 7c1c0e3919fad4bfaed76d5d78733405b080bbc8
>>>>>>> fad09a589a83aee28003e1456ea874447a43011d
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
<<<<<<< HEAD
    
=======
    var that = this;
    wx.getUserInfo({
      success: res => {
        console.log(res.userInfo, "huoqudao le ")
        this.setData({
          name: res.userInfo.nickName,
        })
        wx.downloadFile({
          url: res.userInfo.avatarUrl, //仅为示例，并非真实的资源
          success: function (res) {
            // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
            if (res.statusCode === 200) {
              console.log(res, "reererererer")
              that.setData({
                touxiang: res.tempFilePath
              })
            }
          }
        })
      }
    })
>>>>>>> c2d852eb919299f0777236b9e73da89733498f14
>>>>>>> e8e55f3a9c319a6878579450c3c18e28b346fd04
>>>>>>> 7c1c0e3919fad4bfaed76d5d78733405b080bbc8
>>>>>>> fad09a589a83aee28003e1456ea874447a43011d
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
<<<<<<< HEAD

=======
<<<<<<< HEAD

=======
<<<<<<< HEAD

=======
<<<<<<< HEAD

=======
  
>>>>>>> c2d852eb919299f0777236b9e73da89733498f14
>>>>>>> e8e55f3a9c319a6878579450c3c18e28b346fd04
>>>>>>> 7c1c0e3919fad4bfaed76d5d78733405b080bbc8
>>>>>>> fad09a589a83aee28003e1456ea874447a43011d
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
<<<<<<< HEAD

=======
<<<<<<< HEAD

=======
<<<<<<< HEAD

=======
<<<<<<< HEAD

=======
  
>>>>>>> c2d852eb919299f0777236b9e73da89733498f14
>>>>>>> e8e55f3a9c319a6878579450c3c18e28b346fd04
>>>>>>> 7c1c0e3919fad4bfaed76d5d78733405b080bbc8
>>>>>>> fad09a589a83aee28003e1456ea874447a43011d
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
<<<<<<< HEAD

=======
<<<<<<< HEAD

=======
<<<<<<< HEAD

=======
<<<<<<< HEAD

=======
  
>>>>>>> c2d852eb919299f0777236b9e73da89733498f14
>>>>>>> e8e55f3a9c319a6878579450c3c18e28b346fd04
>>>>>>> 7c1c0e3919fad4bfaed76d5d78733405b080bbc8
>>>>>>> fad09a589a83aee28003e1456ea874447a43011d
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
<<<<<<< HEAD

=======
<<<<<<< HEAD

=======
<<<<<<< HEAD

=======
<<<<<<< HEAD

=======
  
>>>>>>> c2d852eb919299f0777236b9e73da89733498f14
>>>>>>> e8e55f3a9c319a6878579450c3c18e28b346fd04
>>>>>>> 7c1c0e3919fad4bfaed76d5d78733405b080bbc8
>>>>>>> fad09a589a83aee28003e1456ea874447a43011d
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> fad09a589a83aee28003e1456ea874447a43011d
    return {
      title: "一起来学习小程序吧~",
      success: function (res) {
        console.log(res, "转发成功")
      },
      fail: function (res) {
        console.log(res, "转发失败")
      }
    }
<<<<<<< HEAD
=======
=======
<<<<<<< HEAD
    
=======
<<<<<<< HEAD
    
=======
    return {
      title:"这个是我分享出来的东西",
      success:function(res){
        console.log(res,"转发成功")
      },
      fail:function(res){
        console.log(res,"转发失败")
      }
    }
>>>>>>> c2d852eb919299f0777236b9e73da89733498f14
>>>>>>> e8e55f3a9c319a6878579450c3c18e28b346fd04
>>>>>>> 7c1c0e3919fad4bfaed76d5d78733405b080bbc8
>>>>>>> fad09a589a83aee28003e1456ea874447a43011d
  }
})