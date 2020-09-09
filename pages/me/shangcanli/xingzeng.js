// pages/me/shangcanli/xingzeng.js
var QQMapWX = require('../../../libs/qqmap-wx-jssdk.min.js');
// 安全域名设置，需要在微信公众平台添加域名地址https://apis.map.qq.com
var qqmapsdk;
const app = getApp();
qqmapsdk = new QQMapWX({
  key: app.globalData.dtkey
});
const http = app.globalData.http;
const baseUrl = app.globalData.baseUrl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //案例名称
    anliname:'',
    //案例封面数组
    tupian:[],
    //案例内容
    erwm:[],
    //长按阻止点击
    longzt:true,
    // 个人信息
    gerxinx:null,

    //修改的案例内容
    anlinr:'',

    //商家信息
    sjzt:{}
    
  },
  //数组转字符串
  arrzhuans(arr){
    var trr=[]
    arr.forEach((e,i) => {
      trr[i]={}
      trr[i].url=e
      trr[i].name=''
    });
    var trrs=JSON.stringify(trr)
    return trrs
  },
  //字符串转数组
  strzhuanj(str){
    var trr=[]
    var json=JSON.parse(str)
    json.forEach((e,i) => {
      trr[i]=e.url
    });
    return trr
  },
  //提交案例内容
  tijiaoanliform(e) {
    var tha=this
    var gerxinx=this.data.gerxinx
    var tjnr=e.detail.value
    var sjzt=this.data.sjzt
    var userid=gerxinx.id
    var anlinr=this.data.anlinr
    var id=''
    if(anlinr){id=anlinr.id}
    var storeid=''
    if(sjzt&&sjzt.record&&sjzt.record.id){
      storeid=sjzt.record.id
    }
    var brandid='1'
    var photo=this.data.tupian[0]
    var images=this.data.erwm
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    tjnr.photo=photo
    tjnr.images=images
    var pdjieg= this.pdtjnr(tjnr)
    if(!pdjieg){return false}
    images=this.arrzhuans(images)
    tjnr.images=images
    tjnr.userid=userid
    tjnr.brandid=brandid
    tjnr.storeid=storeid
    tjnr.id=id
    tjnr.status=0
    tjnr.sheng='广东省'
    tjnr.shi='佛山市'
    tjnr.qu='南海区'
    console.log(tjnr,'提交之前的结果')
    // 提交
    app.jiaz()
    var url = baseUrl + "case/bendiCaseSave"
    http.promisServer(url, tjnr).then(resc=>{
      console.log(resc,'提交内容后结果')
      if(resc.status=="000"){
        wx.navigateBack({})
      }
      app.jiazs()
    })
  },

  //判断提交内容
  pdtjnr(tjnr){
    if(!tjnr.name){this.tis('请输入案例名称') 
    return false}
    if(!tjnr.photo){this.tis('请输入案例封面') 
    return false}
    if(!tjnr.images[0]){this.tis('请输入案例内容图片') 
    return false}
    return true
  },
  //提示
  tis(name){
    wx.showToast({
      title: name,
      icon: 'none',
      duration: 1800 //持续的时间
    })
  },




  //点击打开图片
  dakerw:function(e){
    var longzt=this.data.longzt
    if(!longzt){return false}
    var img=app.hdindex(e,'img')
    wx.previewImage({
      current: img, // 当前显示图片的http链接 
      urls: [img]
    })
  },
  // 删除头像图片
  shanc:function(e){
    var tha=this
    var tupian=tha.data.tupian
    var ind=app.hdindex(e,'ind')
    this.setData({longzt:false})
    wx.showModal({
      title: '删除图片',
      content: '是否要删除图片',
      success (res) {
        if (res.confirm) {tupian.splice(ind,1)}
      },
      complete(){tha.setData({longzt:true,tupian})}
    })
  },

  
  //上传头像图片
  shangctup:function(){
   var shul=1
    app.xuanzup(shul).then(rec=>{
        rec.forEach(filePath => {
          var tupian=this.data.tupian
          app.shangctup(filePath).then(res=>{
            tupian.unshift(res)
            if(tupian.length<shul+1){
              this.setData({tupian})
            }else{
              console.log(tupian)
              tupian.splice(shul)
              this.setData({tupian})
            }
          })
        });
    })
  },
  //上传二维码图片
  // shangcerw:function(e){
  //   console.log(e);
  //   var shul=9
  //    app.xuanzup(shul).then(rec=>{
  //        rec.forEach(filePath => {
  //          var erwm=this.data.erwm
  //          app.shangctup(filePath).then(res=>{
  //           erwm.unshift(res)
  //            if(erwm.length<shul+1){
  //              this.setData({erwm})
  //              console.log(erwm.length);
  //            }else{
  //             erwm.splice(shul)
  //              this.setData({erwm})
  //            }
  //          })
  //        });
  //    })
  //  },



  shangcerw(e) {  //点击上传图片
    let that = this;
    wx.chooseImage({
      count: 9,
      success: res => {
        let tempFilePaths = res.tempFilePaths;
        tempFilePaths.forEach((item,i) =>{
          wx.uploadFile({
            url: 'https://www.imebox.cn/api/common/upload',   //仅为示例，非真实的接口地址
            filePath: tempFilePaths[i],
            name: 'file',
            formData: {},
            success: res => {
              let data = JSON.parse(res.data)
              if (data.code == 200) {
                let erwm = that.data.erwm;
                if(erwm.length >= 9){
                   Function.shangcerw('最多上传五张照片！')
                   return false;
                }
                erwm.push('http://' + data.data.url)
                that.setData({
                  erwm: erwm
                })
                Function.shangcerw('上传成功！')
                console.log(that.data.erwm)
              } else {
                Function.shangcerw('上传失败，请重试或者联系工作人员！')
              }
            }
          })
        })
      }
    })
  },



   // 删除二维图片
  shancer:function(e){
    console.log(e);
    var tha=this
    var erwm=tha.data.erwm
    var ind=app.hdindex(e,'ind')
    this.setData({longzt:false})
    wx.showModal({
      title: '删除图片',
      content: '是否要删除图片',
      success (res) {
        if (res.confirm) {erwm.splice(ind,1)}
      },
      complete(){tha.setData({longzt:true,erwm})}
    })
  },
 
 
  
  // 初始化
  init:function(){
    var gerxinx = wx.getStorageSync('gerxinx')
    var sjzt = wx.getStorageSync('sjzt')
    if(!gerxinx||!sjzt){
      app.Jumps('me/me')
      return false
    }
    var anlinr=''
    if(app.globalData.anlinr){
      anlinr=app.globalData.anlinr
      this.xuanlinr(anlinr)
    }

    this.setData({gerxinx,anlinr,sjzt})
    
  },
  //如果是编辑案例就渲染
  xuanlinr:function(anlinr){
    var anliname=anlinr.name
    var tupian=[]
    tupian[0]=anlinr.photo
    var erwm=this.strzhuanj(anlinr.images)
    this.setData({anliname,tupian,erwm})
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
    this.init()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    app.globalData.anlinr=''
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
})