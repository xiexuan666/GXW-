const app = getApp();
const http = app.globalData.http;
var WxParse = require('../../../wxParse/wxParse.js');
const baseUrl = app.globalData.baseUrl;
const getInformation = app.globalData.getInformation;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    strategy:[],
    // 收藏icon的状态值
    Collectionstate:false,
    // 评论参数
    Common:[],
    InputText:'快来评论吧',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    let strategy = JSON.parse(options.arry)[options.id];
    // 添加查看量
    let url = 'activity/strategy/strategyPreview';
    let strategyId = strategy.id;
    getInformation.addCollection(url,strategyId);
    // 添加到data进行渲染
    that.setData({
      strategy:strategy
    })
    // 判断是否已经收藏
    if(strategy.collection){
      that.setData({
        Collectionstate:true
      })
    }else{
      that.setData({
        Collectionstate:false
      })
    }


  },
  /* 

    *评论框的所有功能

  */
// 实时获取评论输入框内容
  getText:function(e){
    var value = e.detail.value
    this.setData({
      InputText:value
    });
  },
// 点击评论功能
  common:function(){
    var that = this;
    // 检查文本内容
    let text = that.data.InputText;
    console.log(that.data.InputText)
    if(text.length == 0){
      console.log("文本不能为空")
    }else{
      let url = baseUrl+"activity/strategy/commonStrategy";
      let data = {
        userId: wx.getStorageSync('gerxinx').id,
        strategyId:that.data.strategy.id,
        brandId:app.globalData.brandid,
        common:text,
      }
      http.promisServer(url,data).then(res=>{
        if(res.flag){
        wx.showLoading({
            title: '评论成功',
            mask:true
        })
        //更新评论
        that.onShow();
        // 清空Input输入框
        that.setData({
          InputText:'快来评论吧'
        })
        setTimeout(function () {
          wx.hideLoading()
        },500)
        }else{
          wx.showLoading({
            title: '评论失败',
            mask:true
        })
        setTimeout(function () {
          wx.hideLoading()
        },500)
        }
      })
      // 获取评论区的高度
      var query = wx.createSelectorQuery();
      console.log(query.select('.commentsContent'));
    }
  },
  // 获得焦点时，清空输入框
  clearInput:function(){
    var that = this;
    console.log('清空输入框');
    that.setData({
      InputText:''
    });
  },

  
  /* 
    *点赞功能
  */
  addgreat:function(){
    var that = this;
    console.log('点赞了');
    // url
    let url = 'activity/strategy/greatStrategy'
    // 攻略id
    let strategyId= that.data.strategy.id;
    getInformation.addgreat(url,strategyId).then(res=>{
      that.setData({
        'strategy.dianzhan':res.flag
      })
      // 点赞人数判断
      let num = that.data.strategy.great;
      if(res.flag){
        that.setData({
          'strategy.great':num+1
        });
        wx.showToast({ title: '点赞成功', icon: 'none', duration: 500 ,mask:true})
      }else{
        that.setData({
          'strategy.great':num-1
        })
        wx.showToast({ title: '点赞失败', icon: 'none', duration: 500 ,mask:true})
      }
    })
  },
 




// 富文本转换函数
  gonglue: function (req) {
    // var tha = this
    // var url = baseUrl + 'banner/index'
    // console.log(url,'这里1！！！！');
    // console.log(req.id, '这里1！！！！');
    // http.promisServer(url,{id:req.id}).then(res => {
    //   // tha.setData({lunb:res.data.allbannerList})
    //   console.log(res.data.allbannerList, '请求轮播图')
    // })

    // var article = '<p style="text-align:center;"><strong><span style="font-size:24px;">概述：</span></strong> </p><p class="p" style="margin-left:0.0000pt;"><span style="font-size:18px;">小伙伴们都知道我们的品牌叫</span><span style="font-size:18px;">YOU&amp;ME</span><span style="font-size:18px;">尧铭现代砖，但是大家知不知道为什么要叫</span><span style="font-size:18px;">YOU&amp;ME</span><span style="font-size:18px;">尧铭这个名字呢？这个名字有什么意义？背后又藏着怎样的故事呢？今天尧小铭来给大家揭开</span><span style="font-size:18px;">YOU&amp;ME</span><span style="font-size:18px;">尧铭的神秘面纱。</span> </p><p><br /></p><p style="text-align:center;"><img src="https://cdn.xhcxcn.com/7897171127816863f3ccdd27d2000e3f9255a7e3e2c48800" alt="" /> </p><p style="text-align:center;"><br /></p>';


    /**
     * 
    * WxParse.wxParse(bindName , type, data, target,imagePadding)
    * 1.bindName绑定的数据名(必填)
    * 2.type可以为html或者md(必填)
    * 3.data为传入的具体数据(必填)
    * 4.target为Page对象,一般为this(必填)
    * 5.imagePadding为当图片自适应是左右的单一padding(默认为0,可选)
    */
    // var that = this;
    // WxParse.wxParse('article', 'html', article, that);
  },
  
  // 跳转到海报
  handleToTop:function(){
    wx.navigateTo({
      url: '/pages/souye/poster/poster',
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
    var that = this;
    // 请求评论
    let url = 'activity/strategy/findAllCommon';
    let strategyId = this.data.strategy.id;
    console.log(strategyId);
    
    getInformation.setCommon(url,strategyId).then(res=>{
      that.setData({
        Common:res.data
      })

      // 对点赞进行判断和赋值

      // var query = wx.createSelectorQuery();
      // console.log(query.select('.commentsContent'));
      // 筛选不同的头像
      // for(let i=0;i<res.data.length;i++){
      //   // 因为+1判断，最后一个值为空会报错，但不影响运行
      //   if(res.data[i].wx_photo == res.data[i+1].wx_photo){
      //     console.log('有相同头像');
      //   }else{
      //     console.log(res.data[i].wx_photo);
      //     let wx_photo = [];
      //     wx_photo.push(res.data[i].wx_photo);
      //     console.log(wx_photo);
        // }
      // }
      // res.data.forEach(function(item,index){
      //   console.log(item,index);
      //   // if(item[index].wx_photo == item[index-1].wx_photo){
      //   //   console.log('有相同的头像')
      //   // }else{
      //   //   console.log(item[index].wx_photo);
      //   // }
        
      // })
    });
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
  Collection:function(){
    var that = this;
    var strategyId = that.data.strategy.id; 
    getInformation.setCollection(strategyId).then(res=>{
      // 改变星星状态
      if(res.flag){
        that.setData({
          Collectionstate:true
        })
      }else{
        that.setData({
          Collectionstate:false
        })
      }
    });
  }
})