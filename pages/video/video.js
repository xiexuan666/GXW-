<<<<<<< HEAD
// pages/video/video.js

const app = getApp();
const http = app.globalData.http;
const baseUrl = app.globalData.baseUrl;
const getInformation = app.globalData.getInformation;
=======
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
// pages/video/video.js
>>>>>>> c2d852eb919299f0777236b9e73da89733498f14
>>>>>>> e8e55f3a9c319a6878579450c3c18e28b346fd04
>>>>>>> 7c1c0e3919fad4bfaed76d5d78733405b080bbc8
>>>>>>> fad09a589a83aee28003e1456ea874447a43011d
>>>>>>> f18b3e4711d7bf89bb5c53bd2154981f0aba8052
Page({

  /**
   * 页面的初始数据
   */
  data: {
<<<<<<< HEAD
    list: [],
    comments: false,
    commentsbottom: true,
    functionlist: [
      { imagurl: '/images/tubiao/wechat.png', status: 1 },
      { imagurl: '/images/tubiao/12-12.png', icon: '/images/tubiao/12-28.png', status: 1 },
      { imagurl: '/images/tubiao/common.png', status: 1 },
      { imagurl: '/images/tubiao/fx.png', status: 1 },
      { imagurl: '/images/tubiao/download.png', status: 1 },
    ],
    // 评论内容
    value: '',
    // 视频评论列表
    videolist: undefined,
    // 滚动条
    scroll:500,
=======
    list:[],
<<<<<<< HEAD
=======
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
    comments:false,
    functionlist:[
      {imagurl:'/images/tubiao/wechat.png'},
      {imagurl:'/images/tubiao/12-12.png'},
      {imagurl:'/images/tubiao/common.png'},
      {imagurl:'/images/tubiao/fx.png'},
      {imagurl:'/images/tubiao/download.png'},
    ]
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
>>>>>>> d24e5d68f2511ff808d7dd102607e5500bf4b225
>>>>>>> c2d852eb919299f0777236b9e73da89733498f14
>>>>>>> e8e55f3a9c319a6878579450c3c18e28b346fd04
>>>>>>> 7c1c0e3919fad4bfaed76d5d78733405b080bbc8
>>>>>>> fad09a589a83aee28003e1456ea874447a43011d
>>>>>>> f18b3e4711d7bf89bb5c53bd2154981f0aba8052
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(JSON.parse(options.value));
<<<<<<< HEAD
    let photo = JSON.parse(options.value).wx_photo
    this.setData({
      list: JSON.parse(options.value),
      ['functionlist[' + 0 + '].imagurl']: photo
    })
    console.log('视频详情：',JSON.parse(options.value));
    if(this.data.list.dianzhan){
     let lists =  this.data.functionlist;
     lists[1].status = 0,
     this.setData({
      functionlist:lists
     })
    }
    // 请求评论
    this.getCommon()
  },
  // 评论视频
  pinlun: function () {
    // 判断用户登录状态
    if(getInformation.checkUser()){
      if(this.data.value == ''){
        wx.showToast({
          title: '评论不能为空',
          icon:'none',
          duration:800
        })
      }else{
      console.log(this.data.value);
      let url = baseUrl + 'activity/hot/commonVideo';
      let data = {
        userId: wx.getStorageSync('gerxinx').id,
        videoId: this.data.list.videoId,
        brandId: app.globalData.brandid,
        common: this.data.value
      }
      console.log(data, url);
      http.promisServer(url, data).then(res => {
        console.log('评论成功');
        // 更新评论列表,清空输入框，拉回滚动条
        this.getCommon();
        this.setData({
          value: ''
        })
        this.setData({
          scroll:0
        })
      }
      )   
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
  // 清空输入框
  deletevalue: function () {
    console.log('清空输入框');
    // this.data.value = '';
    this.setData({
      value: ''
=======
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
<<<<<<< HEAD
    this.setData({
      list:JSON.parse(options.value)
=======
>>>>>>> c2d852eb919299f0777236b9e73da89733498f14
>>>>>>> e8e55f3a9c319a6878579450c3c18e28b346fd04
>>>>>>> 7c1c0e3919fad4bfaed76d5d78733405b080bbc8
>>>>>>> fad09a589a83aee28003e1456ea874447a43011d
    let photo = JSON.parse(options.value).wx_photo
    this.setData({
      list:JSON.parse(options.value),
      ['functionlist['+0+'].imagurl']:photo
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
>>>>>>> d24e5d68f2511ff808d7dd102607e5500bf4b225
>>>>>>> c2d852eb919299f0777236b9e73da89733498f14
>>>>>>> e8e55f3a9c319a6878579450c3c18e28b346fd04
>>>>>>> 7c1c0e3919fad4bfaed76d5d78733405b080bbc8
>>>>>>> fad09a589a83aee28003e1456ea874447a43011d
>>>>>>> f18b3e4711d7bf89bb5c53bd2154981f0aba8052
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
<<<<<<< HEAD
  },
  // 请求评论列表
  getCommon:function(){
    let url = baseUrl + 'activity/hot/showCommon';
    let data = {
      videoId: this.data.list.videoId,
      brandId: app.globalData.brandid
    }
    console.log(data, url);
    http.promisServer(url, data).then(res => {
      console.log('请求到的视频评论', res);
      this.setData({
        videolist: res.data
      })
    })
  },
  videofunction: function (e) {
    console.log(app.hdindex(e, 'index'));
    let index = app.hdindex(e, 'index');
    switch (index) {
      case 1:
        let url = 'activity/hot/greatVideo';
        let list = this.data.functionlist;
        console.log(url,list);
        getInformation.addgreat(url, undefined, this.data.list.videoId).then(res => {
          if (res.flag) {
            list[index].status = 0
          } else {
            list[index].status = 1
          }
          this.setData({
            functionlist: list
          })
        })
        break;
      case 2:
        console.log('视频评论');
        let status = this.data.comments;
        let statusbottom = this.data.commentsbottom;
        if (status) {
          this.setData({
            comments: false,
            commentsbottom: !statusbottom,
          })
        } else {
          this.setData({
            commentsbottom: true,
            comments: !status,
          })
        }
        console.log(this.data.comments);
        break;
      case 3:
        console.log('视频分享');
        break;
      case 4:
        console.log('视频下载');
   
        break;

    }
  },
  // 点击大屏幕，关闭评论框
  hiddenCommon:function(){
    let status = this.data.comments;
    let statusbottom = this.data.commentsbottom;
    console.log(status);
    if (status) {
      this.setData({
        comments: false,
        commentsbottom: !statusbottom,
      })
    } else {
      // this.setData({
      //   commentsbottom: true,
      //   comments: !status,
      // })
    }
  },
=======

  },

>>>>>>> f18b3e4711d7bf89bb5c53bd2154981f0aba8052
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
<<<<<<< HEAD
})
=======
<<<<<<< HEAD
}) 
=======
<<<<<<< HEAD
}) 
=======
<<<<<<< HEAD
}) 
=======
<<<<<<< HEAD
}) 
=======
})
>>>>>>> c2d852eb919299f0777236b9e73da89733498f14
>>>>>>> e8e55f3a9c319a6878579450c3c18e28b346fd04
>>>>>>> 7c1c0e3919fad4bfaed76d5d78733405b080bbc8
>>>>>>> fad09a589a83aee28003e1456ea874447a43011d
>>>>>>> f18b3e4711d7bf89bb5c53bd2154981f0aba8052
