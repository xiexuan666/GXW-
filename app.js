//app.js
var QQMapWX = require('./libs/qqmap-wx-jssdk.min.js');
// 安全域名设置，需要在微信公众平台添加域名地址https://apis.map.qq.com
var qqmapsdk;
qqmapsdk = new QQMapWX({
  key: '4UWBZ-VMMKD-VH74S-HKGF4-YTCTQ-5KBBD'
});
const http = require('utils/http.js');

const getInformation = require('utils/getInformation.js');
App({
  onLaunch: function () {
    //获得定位授权地址信息
    this.dwsouq();
   //是否曾经登录过
   this.isdenlu();
   //版本状态
   this.banbzt();
   //加载产品无限列表
   this.qiangcp();
  },

  globalData: {
    userInfo: null,
    //  baseUrl:"http://192.168.0.105:8087/gxwslyk/",
    baseUrl:"https://md.juesedao.com/gxwslyk/",
    // baseUrl:"http://192.168.0.160:8087/gxwslyk/",
    dtkey:'77ABZ-KQC62-FVJUB-C7TTO-4DX6T-7WB2J',
    http: http,
    getInformation:getInformation,
    status: 0,
    banben:'1.0.1',
    jiage:999999,
    qqmapsdk:qqmapsdk,
    brandid:'2',
  },

   //一些方法
  //跳转页面Jum('')
  Jump: function (url, query) {
    var url = '/pages/' + url + "?";
    // console.log(!query);
    if(!query){
      wx.navigateTo({url: url,fail:function(){console.log('跳转失败'+url)}})
      return false;
    }
    for (let key in query) {
      url += key + "=" + query[key] + "&"
    }
    wx.navigateTo({url: url,fail:function(){console.log('跳转失败'+url)}})
  },


  //跳转页面Jum('')
  Jumpss: function (url, query) {
    var url = '/pages/' + url + "?"+query;
    if(!query){
      wx.navigateTo({url: url,fail:function(){console.log('跳转失败'+url)}})
      return false;
    }
   
    
  },
   //跳转页面TabJum('')
   Jumps: function (url) {
    var url = '/pages/' + url + "?"
      wx.switchTab({url: url,fail:function(){console.log('跳转失败'+url)}})
      return false;
  },
  //获得index
  hdindex:function(e,name){
    return e.currentTarget.dataset[name]
  },
  //加载
  jiaz:function(name){
    var tit='加载中'
    if(name){tit=name}
    wx.showLoading({title: tit})
    setTimeout(function () {wx.hideLoading()}, 2500)
  },
  //结束加载
  jiazs:function(){wx.hideLoading()},

  //请求产品无限列表且请求可能性
  qiangcp:function(){
    var tha=this
    var url = this.globalData.baseUrl + "itemcategory/index"
    var dat={}
    var p = new Promise(function(resolve, reject) {
      http.promisServer(url, dat).then(resc=>{
        var da = resc.data.itemCategoryList
        var titlej = JSON.parse(da)[0].children
        tha.globalData.titlej=titlej
        tha.rqcpknx().then(skub=>{
          var nr={skub,titlej}
          resolve(nr)
        })
        // console.log(titlej,'产品无限列表')
      })
    })
    return p;
  },
   //请求产品spu可能性
   rqcpknx:function(){
    var tha=this
    var url = this.globalData.baseUrl + "production/seriesJiLuPage"
    var dat={}
    var p = new Promise(function(resolve, reject) {
      http.promisServer(url, dat).then(resc=>{
        var skub={}
        var skubs=resc.data.seriesJiLuPage
        for (var i=0; i < skubs.length; i++) {
          skub[skubs[i].case_list_id]={
            count:skubs[i].count,
            id:skubs[i].case_id
          }
        }
        resolve(skub)
        tha.globalData.skub=skub
        // console.log(skub,'产品列表可能性')
      })
    })
    return p;
  },

  //获得定位授权
  dwsouq:function(){
    var tha=this
    wx.getSetting({
      success: res => {
        if (!res.authSetting['scope.userLocation']) {
          wx.authorize({scope: 'scope.userLocation',success(){
            //当前位置详细信息
            tha.dtxx()
            console.log('没有定位授权获得授权成功')
          }})
        }else{
          tha.dtxx()
        }
      }
    })
  },
  //获得经纬度
  huodjwd:function(){
    var p = new Promise(function(resolve, reject) {
      wx.showLoading({
        title: '加载中',
      })
      wx.getLocation({
        type: 'gcj02',
        success (res) {
          resolve(res)
        },
        fail(e){
          console.log(e,99988777)
          if(e.errCode&&e.errCode==2){
            wx.showModal({
              title: '手机未开启定位',
              content: '开启定位才能获得经纬度',
              success (res) {
                if (res.confirm) {
                  // wx.openSetting({success (res) {}})
                }
              }
            })
            return false
          }
          wx.showModal({
            title: '未获得定位',
            content: '是否允许获得定位',
            success (res) {
              if (res.confirm) {
                wx.openSetting({success (res) {}})
              }
            }
          })
        },
        complete(e){
          wx.hideLoading()
        }
      })
    })
    return p;
  },
  //获得经纬度不授权不提示
  huodjwds:function(){
    var p = new Promise(function(resolve, reject) {
      wx.getLocation({
        type: 'gcj02',
        success (res) {
          resolve(res)
        },
        fail(e){
        }
      })
    })
    return p;
  },
  //当前位置详细信息
  dtxx: function () {
    var tha = this
    //获得当前经纬度
    tha.huodjwds()
    .then(rec=>tha.formSubmit(rec.latitude,rec.longitude))
    .then(resc=>{
      var address=resc.address_component.province+resc.address_component.city
      tha.hdbdjxs(address)
    })
  },
   //根据经纬度得地址
   formSubmit(latitude, longitude) {
    var tha = this;
    var p = new Promise(function(resolve, reject) {
      qqmapsdk.reverseGeocoder({
        location: {
          latitude: latitude,
          longitude: longitude
        },
        success: function (res) {//成功后的回调
          wx.setStorage({
            key:"dizdenlu",
            data:res.result
          })
          resolve(res.result)
        },

      })
    })
    return p;
  },
  //根据地区获得本地经销商
  hdbdjxs:function(address){
    console.log(address,'当前地区')
    // address='广东省广州市'
    var tha=this
    var url = this.globalData.baseUrl + "store/findstoreByAddress"
    var dat={
      address,
      brandid:'1'
    }
    var p = new Promise(function(resolve, reject) {
      http.promisServer(url, dat).then(resc=>{
        var benjxslist=resc.data.storeList
        // console.log(benjxslist,'本地经销商列表')
        if(benjxslist.length==1){
          resolve(benjxslist[0])
          wx.setStorageSync('bendijxs', benjxslist[0])
          return false
          console.log('66')
        }
        var jxsjli=[]
        benjxslist.forEach((ec,i) => {
          jxsjli[i]={
            latitude:ec.position_latitude,
            longitude:ec.position_longitude
          }
        });
        qqmapsdk.calculateDistance({
          mode: 'driving',//可选值：'driving'（驾车）、'walking'（步行），不填默认：'walking',可不填
          //from参数不填默认当前地址
          //获取表单提交的经纬度并设置from和to参数（示例为string格式）
          from: '', //若起点有数据则采用起点坐标，若为空默认当前地址
          to: jxsjli, //终点坐标
          success: function (fhjuli) {//成功后的回调
            console.log(fhjuli,'返回距离6666')
            var julilist=fhjuli.result.elements
            benjxslist.forEach((etl,ind)=> {
              if(julilist[ind].distance==-1){
                etl.jl=99999999999999999999
              }else{
                etl.jli=julilist[ind].distance
              }
              
            });
            //排序
            benjxslist=tha.paixu(benjxslist,'jli')
            console.log(benjxslist,'返回距离')
            wx.setStorageSync('bendijxs', benjxslist[0])
            resolve(benjxslist[0])
          },
        }); 
      })
    })
    return p;
  },
  // 排序
  paixu:function(arr,zd){
    function compare(property){
      return function(a,b){
          var value1 = a[property];
          var value2 = b[property];
          return value1 - value2;//升序,降序为value2 - value1
      }
    }
    arr.sort(compare(zd))
    return arr
  },
  
  //上传图片设置
  xuanzup:function(num){
    var p = new Promise(function(resolve, reject) {
      wx.chooseImage({
        count: num,
        sizeType: ['original'],
        sourceType: ['album', 'camera'],
        success (res) {
          // tempFilePath可以作为img标签的src属性显示图片
          const tempFilePaths = res.tempFilePaths
          resolve(tempFilePaths)
        }
      })
    })
    return p;
  },
  //上传图片
  shangctup:function(filePath){
    let url = this.globalData.baseUrl+"allupload/fupload"
    var p = new Promise(function(resolve, reject) {
      wx.uploadFile({
        url: url, //仅为示例，非真实的接口地址
        filePath: filePath,
        name: 'file',
        success (res){
          const data = JSON.parse(res.data)
          var url=data.data.qnURL      
          resolve(url)
        }
      })
    })
    return p;
  },
  //加载字体未用到
  loadFontFace() {
    // https://fonts.googleapis.com/css?family=Noto+Sans+SC:100,300,400,500,700,900
    // https://sungd.github.io/Pacifico.ttf
    wx.loadFontFace({
      family: 'Bitstream Vera Serif Bold',
      source: 'url("https://fonts.googleapis.com/css?family=Noto+Sans+SC:100,300,400,500,700,900")',
      success(res) {console.log('Bitstream Vera Serif Bold字体已加载')},
      fail(res){console.log(res,'字体加载错误')}
    });
  },



  //当前版本状态 
  banbzt:function(){
    var tha=this
      var p = new Promise(function(resolve, reject) {
        var url = tha.globalData.baseUrl + 'app/shezhishenhe' 
        var dta={
          brandid:'2',
          shenhecode:tha.globalData.banben
        }
        http.promisServer(url,dta).then(function(resc){
          console.log(resc,'版本状态')
          
          if (resc.status=='000'){
            var status=resc.data.shenherecord.status
            tha.globalData.status=status
            tha.globalData.jiage=resc.data.shenherecord.jiage*100
          }else{
            tha.globalData.status=0
          }
          resolve(resc)
        })
      })
    return p; 
  },



  //是否登录过
  isdenlu(){
    var tha=this
      var p = new Promise(function(resolve, reject) {

        // 查询本地cookies是否有用户信息
      var gerxinx = wx.getStorageSync('gerxinx');
      // 有的话就直接返回
      if(gerxinx){return false;}
      tha.huoqopenid()
      .then((openid)=>tha.cuncgerxinx(openid))
      .then(gerxinx=>{
        resolve(gerxinx)
      })
      })
    return p; 
  },
  //获取存储的个人信息
  cuncgerxinx(openid){
    var tha=this
    var p = new Promise(function(resolve, reject) {
    var openId=openid
    var url = tha.globalData.baseUrl + 'user/wxInfo' 
      http.promisServer(url,{openId}).then(function(resc){
        if(resc.data){wx.setStorageSync('gerxinx', resc.data)}
        resolve(resc.data)
      })
    })
    return p;  
  },
  //登录
  denlus: function() {
    var tha = this
    var p = new Promise(function(resolve, reject) {
      //获得openid 获得登录信息 存储到后台 ,再从后台获取所有信息
      tha.huoqopenid()                    
      .then(openid=>tha.huodedenlux(openid))
      .then(userInfo=>tha.cunxinx(userInfo))
      .then(openid=>tha.cuncgerxinx(openid))
      .then(res=>{
         resolve(res)
      })
    })
    return p;
  },
  //获得登录信息 
  huodedenlux:function(openid){
    var tha = this
    var p = new Promise(function(resolve, reject) {
      wx.getUserInfo({
        lang: 'zh_CN',
        success: function (res) {
          var userInfo = res.userInfo
              userInfo.openid=openid
          //存个人信息到后台
          resolve(userInfo)
        }
      })
    })
    return p;
  },
  //获取oopenid
  huoqopenid: function() {
    var tha = this
    var p = new Promise(function(resolve, reject) {
      wx.login({
        success: function(res) {
          console.log(res, 'cod')
          if (res.code) {
            wx.request({
              url: tha.globalData.baseUrl + 'user/getOpenId',
              data: {
                code: res.code
              },
              success: function(res) {
                console.log(res, 'getOpenId');
                console.log('我已经获取到了openid',res.data.data.openid);
                var openid = res.data.data['openid']
                tha.cuncgerxinx(openid).then(gerxinx=>{
                //将下来的数据存储到本地缓存
                wx.setStorageSync('gerxinx',gerxinx);
                //重新加载页面
                tha.onShow()
                })
                if (openid) {
                  resolve(openid)
                }
              }
            })
          }
        }
      })

    })

    return p;
  },
  //存keynr个人信息到后台
  cunxinx: function (userInfo){
    var tha=this;
    console.log(userInfo,"userInfo")
    var dizdenlu = wx.getStorageSync('dizdenlu')
    var address=''
    var province=userInfo.province
    var city=userInfo.city
    var district=''
    if (dizdenlu) {
      address=dizdenlu.address
      province=dizdenlu.address_component.province
      city=dizdenlu.address_component.city
      district=dizdenlu.address_component.district
    }
    var data={
      openId: userInfo.openid,
      wxName: userInfo.nickName,
      wxphoto: userInfo.avatarUrl,
      sex: userInfo.gender,
      address,
      province,
      city,
      district,
      brandid:'1'
      }
    //存储到后台
    var p = new Promise(function(resolve, reject) {
      var url = tha.globalData.baseUrl + 'user/wxLogin' 
      http.promisServer(url,data).then(function(resc){
        console.log(resc,'存储的信息')
        if (resc.status=='000'){
          var keynr={
            openid: userInfo.openid,
            token: resc.data.token,
            userId: resc.data.userId,
            wxname: userInfo.nickName,
            wxphoto: userInfo.avatarUrl,
            sex: userInfo.gender,
          }
          //存储特殊信息
          wx.setStorageSync('keynr', keynr)
          wx.hideToast()
          resolve(userInfo.openid)
        }
      })
    })
    return p;
  },
  

  //获取手机号
  getphone:function(e,openid){
    var tha = this
    wx.showToast({
      title: '获取用户手机授权中',
      icon: 'loading',
      duration: 2000
    })
    var p = new Promise(function(resolve, reject) {
      wx.login({
        success: res => {
          var url= tha.globalData.baseUrl + 'user/getPhone'
          var data= {
            'encryptedData': e.detail.encryptedData,
            'iv': e.detail.iv,
            'code': res.code
          }
          http.promisServer(url, data).then(rec=>{
              wx.hideToast()
              // 获取全部信息
              tha.cuncgerxinx(openid).then(gerxinx=>{
                resolve(gerxinx)
              })
              console.log(rec,'phone')
          })
        }
      })
    })
    return p;
  },

})