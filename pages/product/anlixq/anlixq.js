// pages/product/anlixq/anlixq.js
const app = getApp();
const http = app.globalData.http;
const baseUrl = app.globalData.baseUrl;


Page({
  /**
   * 页面的初始数据
   */
  data: {

    inputVal:'',
    //评论信息
    comments:{},
    status: true, //评价框显示隐藏
    content: "",
    userId:'',
    pinlxinx:'',
    caseId:'',
    userpingfen: [          // 天快黑了
      { pingfen: 4 }
    ],
    anlixiaq:null,
    
    // 页面数据
    pagesubscript:{},
    // 评论数据
    findAllComment:{}
  },

  // 点击发表评论
  handlefa: function () {
    // 验证文本信息是否是null
    // if(this.data.pinlxinx.length == 0){
    // }else{
    //   var  tha = this
    // var url =baseUrl+"case/caseComment"
    // var gerxinx = wx.getStorageSync('gerxinx')
    // console.log(gerxinx,'评论成功');
    // http.promisServer(url,{
    //   brandId:gerxinx.brand_id,
    //   userId:gerxinx.id,
    //   caseId:tha.data.caseId,
    //   comment:tha.data.pinlxinx
    // })
    // }
    // var main=this.data.appraiseList;
    // this.setData({
    // appraiseList:main,
    //  inputVal:''
// })
    var that = this;
    // 请求接口
    let  url = baseUrl+"case/caseComment";
    // 用户id
    let userid = wx.getStorageSync('gerxinx').id;
    // 案例id
    let caseid = that.data.pagesubscript.id;
    // 品牌id
    let brandid = app.globalData.brandid;
    // 文本内容
    let content = that.data.pinlxinx;

    let data = {
      userId:userid,
      caseId:caseid,
      brandId:brandid,
      comment:content
    }
    http.promisServer(url,data).then(res=>{
      console.log(res);
      that.GetFindComment();
    })


  },
  // 评论输入框
  pingl:function(e){
   this.setData({
    pinlxinx:e.detail.value
   })
  },

  // 渲染评论
  handlepl(){
    console.log('执行这里');
    var  tha = this
     var url =baseUrl+"case/findAllComments"
     var gerxinx = wx.getStorageSync('gerxinx')
     var dat= {
       brandId:gerxinx.brand_id,
       caseId:tha.data.caseId,
     }
     http.promisServer(url,dat).then(resc=> {
     var commentpl =resc.data.caseList
       console.log(commentpl,'11111111');
       tha.setData({comments:commentpl})
       if(commentpl.length==1){
         wx.setStorageSync('comments', commentpl[0])
         return  false
       }
     })
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


   //失去焦点时获取里面评论内容
   bindTextAreaBlur: function (e) {
    this.setData({
      content: e.detail.value,
    })
  },
  //点击按钮时得到里面的值
  fabiao: function (e) {
    if(this.data.content == '') {
      wx.showToast({
        title: '内容不能为空',
        icon: "none",
        duration: 1500,
      })
    }else {
      this.setData({
        focus: 'false',
        concent1: this.data.content,
      })
      console.log(this.data.content)
    }
  },
 


  // 点赞功能逻辑
  praiseThis: function (e) {
    var index = e.currentTarget.dataset.curindex;
    if (this.data.repotList[index]) {
      var change = this.data.repotList[index].change;
      if (change !== undefined) {
        var num = this.data.repotList[index].praise;
        if (change) {
          this.data.repotList[index].praise = (num - 1);
          this.data.repotList[index].change = false;
        } else {
          this.data.repotList[index].praise = (num + 1);
          this.data.repotList[index].change = true;
        }
        this.setData({
          repotList: this.data.repotList
        })
      }
    }
  },

  // 点赞功能逻辑s
  praiseThiss: function (e) {
    var index = e.currentTarget.dataset.curindex;
    if (this.data.appraiseList[index]) {
      var change = this.data.appraiseList[index].change;
      if (change !== undefined) {
        var num = this.data.appraiseList[index].praise;
        if (change) {
          this.data.appraiseList[index].praise = (num - 1);
          this.data.appraiseList[index].change = false;
        } else {
          this.data.appraiseList[index].praise = (num + 1);
          this.data.appraiseList[index].change = true;
        }
        this.setData({
          appraiseList: this.data.appraiseList
        })
      }
    }
  },
  // 点赞内层逻辑
  praiseThisss: function(e) {
    var index = e.currentTarget.dataset.curindex;
    var indexs = e.currentTarget.dataset.curindexs;
    console.log(indexs)
    if (this.data.appraiseList[index].reply_list[indexs]) {
      var change = this.data.appraiseList[index].reply_list[indexs].changes;
      if (change !== undefined) {
        var num = this.data.appraiseList[index].reply_list[indexs].praise;
        if (change) {
          this.data.appraiseList[index].reply_list[indexs].praise = (num - 1);
          this.data.appraiseList[index].reply_list[indexs].changes = false;
        } else {
          this.data.appraiseList[index].reply_list[indexs].praise = (num + 1);
          this.data.appraiseList[index].reply_list[indexs].changes = true;
        }
        this.setData({
          appraiseList: this.data.appraiseList
        })
      }
    }
  },


  //点击打开图片
  dakerw:function(e){
    console.log(e)
    var img=app.hdindex(e,'img')
    console.log(img)
    wx.previewImage({
      current: img, // 当前显示图片的http链接 
      urls: [img]
    })
  },
  // 跳转到首页
  handleToTop:function(){
    wx.reLaunch({
      url: '/pages/souye/souye',
    })
  },
  
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    if(options.Arrys){
      let Arrys = JSON.parse(options.Arrys);
      that.setData({
        pagesubscript:Arrys
      })
      console.log('首页进入',Arrys)
    }else{
      console.log('案例页进入',app.globalData.anlixiaq);
      let caseId =app.globalData.anlixiaq;

      this.setData({
        pagesubscript:caseId
      })
      that.GetFindComment();

      var tiyan = this.data.userpingfen;
      console.log(tiyan);
      console.log(tiyan.length);
      for (var i = 0; i < tiyan.length; i++) {
        tiyan[i].pingfenpic = pingxin.pingfen(parseFloat(tiyan[i].pingfen));    //使用函数
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
      fail: function(res) {
      },
      complete: function(res) {
      }
    });
  },
  /**
   * 生命周期函数--监听页面显示
   */
  isString:function (str){ 
    return (typeof str=='string')&&str.constructor==String; 
    },
  onShow: function () {
    var anlixiaq =app.globalData.anlixiaq;
    console.log(anlixiaq);
    console.log(anlixiaq,'案例详情')
    if(anlixiaq.images&&this.isString(anlixiaq.images)){
      anlixiaq.images=JSON.parse(anlixiaq.images)
    }
    this.setData({anlixiaq})
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

  // 获取用户评论功能
  GetFindComment:function(){
    var that = this;
    // 品牌id
    let brandid = app.globalData.brandid;
    console.log(brandid);
    // 案例id
    let caseid = that.data.pagesubscript.id;
    console.log(caseid);

    // 请求接口
    let url = baseUrl +'case/findAllComment';
    let data= {
      brandId:brandid,
      caseId:caseid,
      // pages:0
    }
    // 调用接口
    http.promisServer(url, data).then(res=>{
      console.log(res.data);
      that.setData({
        findAllComment:res.data
      })

      console.log(that.data.findAllComment);
    })
  },

  //访问量
   preview:function(){
     var that = this;
    var Url =baseUrl+'case/preview';
    // 品牌id
    let brandid = app.globalData.brandid;
    // 案例id
    let caseid = that.data.pagesubscript.id;
    // 用户id
    let userid = wx.getStorageSync('gerxinx').id;
    // 参数
    let data={
      brandId:brandid,
      caseId:caseid,
      userId:userid
    };
    console.log(Url);
    console.log(data);
    http.promisServer(Url,data).then(res=>{
      console.log(res);
    })
   } 
  //参数：用户id,案例id,品牌id,
})