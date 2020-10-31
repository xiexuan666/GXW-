// pages/product/product.js
const { jia, toubu, toubu2, toubu0, skub, keyanli, anlisub, cpshuj } = require('./jia.js');
const app = getApp();
const http = app.globalData.http;
const baseUrl = app.globalData.baseUrl;
const getInformation = app.globalData.getInformation;
const haibao = require('../../utils/initial')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cp: [],
    //第一次执行
    dyczx: 0,
    //产品或案例
    cactiv: 2,
    //全国案例或本地案例
    twoactiv: 1,
    //产品头部数据
    titlej: [],
    //产品结果保存
    myData: {},
    //产品spu可能性
    skub: {},
    //产品选中的值
    canpxuanz: [],
    //产品符合结果的数
    cpfuhejieg: 0,
    //产品内容数组
    cp: [],
    //产品页数·
    cppage: 1,
    //产品zfcid
    cpzfcid: '',
    //案例假数据
    anlishuj: [],
    //案例结果保存
    anlimyData: {},
    //案例spu可能性
    anliskubs: {},
    //案例选中的值
    anlixuanz: 2,
    // 案例内容数组
    annrshuz: [],
    //案例页数
    anlipage: 1,
    //案例zfcid
    anlizfcid: '',
    //案例符合结果的数
    anlifuhejieg: 0,
    //产品显示效果
    cpxians: false,
    //本地案例内容
    bendanlinr: [],
    //案例总数
    bendcount: 0,
    //本地案例地区
    bendanlidq: '',
    //本地案例页数
    bendanlipage: 0,
    //系列视频列表
    xilievideolist: [],
    // 海报是否隐藏显示
    maskHidden: false,
    hideModal: true, //模态框的状态  true-隐藏  false-显示
    // 海报
    anlilist: null,
    //视频列表属性
    attr: {
      w: 700,
      h: 394,
      playind: -1,
      autoplay: false,
      loop: false,
    },
    shenhestatus: 0,
    checkarry: [],
    check: [],
    // 海报图片
    imagePath:null
  },

    /* 
    点击案例头部列表
  */
 //案例头部选择
 anlitopxuanz:function(e){
  var that = this;
  var ind=app.hdindex(e,'ind')
  var id=app.hdindex(e,'idc')
  var cpzt=app.hdindex(e,'cpzt')
  // 控制数组的显示
  var anlishuj=that.data.anlishuj;
  var anlixuanz=that.data.anlixuanz;
  if(cpzt){
    // 清除该下标id,去掉选中状态
    anlixuanz[ind] = null;
    anlishuj[ind].xuanz=''
  }else{
    // 添加该下标id，添加选中状态
    anlixuanz[ind] = id;
    anlishuj[ind].xuanz=id
  }
  // 判断如果没有下标被选中，清空选中数组
   if(this.arrlength(anlixuanz)==0){
      // 清除案例选中 
      this.antoucclear();

      return false
    }
  var anliskubs=this.data.anliskubs;
  var fanhui= toubu0({},anlishuj,anliskubs,anlixuanz);
  that.setData({
    anlishuj:fanhui.keys,
    anlixuanz:anlixuanz,
    anlizfcid:fanhui.idzfc,
  })

  if(fanhui.idzfc==''){
    this.antoucclear(1)
    wx.showToast({title: '没有相关结果',icon: 'none',duration: 700})
    return false
  }
  // //查询案例出内容
  this.chaxchuanlinr(fanhui.idzfc,1)
},
//获得数组实际选了几个
arrlength:function(arr){
  var shu=0;
  for (let i = 0; i < arr.length; i++) {if(arr[i]){shu++}}
  return shu;
},
//头部案例清除、
antoucclear:function(num){
  if(!num){
    this.chaxchuanlinr('',1,1)
  }
  var  anlishuj=this.data.anlishuj;
  if(anlishuj.length==0){return false}
  anlishuj.forEach(e => {
    if(!num){
      e.xuanz=''
    }
    e.children.forEach(e2 => {
      e2.spread=true
    });
  });
  var annrshuz=this.data.annrshuz
  if(num){
    annrshuz=[]
  }
  var  anlixuanz=new Array(anlishuj.length)
  this.setData({anlishuj,annrshuz,anlixuanz})
},
// 请求案例头部列表
rqwxanlist:function(){
  var tha=this
  var url = baseUrl + "casecategory/index"
  var dat={}
  http.promisServer(url, dat).then(resc=>{
    var da = resc.data.caseCategoryList
    var anlishuj = JSON.parse(da)[0].children;
    // 更新选中数组长度
    var  anlixuanz=new Array(anlishuj.length)
    tha.setData({anlishuj,anlixuanz})
    tha.rqanliknx()
  })
},
//请求案例spu可能性
rqanliknx:function(){
  var tha=this
  var url = baseUrl + "case/caseJiLuPage"
  var dat={}
  http.promisServer(url, dat).then(resc=>{
    var anliskubs={}
    console.log(resc);
    
    var anliknxb=resc.data.caseJiLuPage
    for (var i=0; i < anliknxb.length; i++) {
      anliskubs[anliknxb[i].case_list_id]={
        count:anliknxb[i].count,
        id:anliknxb[i].case_id
      }
    }
    tha.setData({anliskubs})
    wx.stopPullDownRefresh();
  })
},
// 查询出案例 id字符串 页数 1  
// num 1第一次添加 2
chaxchuanlinr(idzfc,page,num){
  if(!page){var page=1}
  console.log(idzfc,"产品id字符串")
  var anlifuhejiegs=this.data.anlifuhejieg
  var annrshuzs=[]
  if(num==2){
    annrshuzs=this.data.annrshuz
  }
  if(num==1){
    anlifuhejiegs=0
  }
  
  if(annrshuzs.length>=anlifuhejiegs&&annrshuzs.length!=0){
    return false
  }
  var tha=this
  var url = baseUrl + "case/casePage"
  var dat={
    page,
    findCaseById:idzfc,
    brandId:app.globalData.brandid
  }
  http.promisServer(url, dat).then(resc=>{
    var annrshuz= annrshuzs.concat(resc.data.CaseList)
    var anlifuhejieg=resc.data.casessCount
    tha.setData({annrshuz,anlipage:page,anlifuhejieg,anlizfcid:idzfc})
  })
},
  //点赞案列
  collect: function (e) {
    var tha = this;
    let check = getInformation.checkUser();
    if (check) {
      // 获取缓存的用户信息
      var gerxinx = wx.getStorageSync('gerxinx');
      var annrshuz = this.data.annrshuz;
      // 获取点击的下标
      var ind = app.hdindex(e, 'ind')
      // 判断用户有没有缓存存在
      if (!gerxinx) {
        wx.showToast({ title: '没有登录', icon: 'none', duration: 700 })
        return false
      }
      // 请求路径
      var url = baseUrl + "case/caseGreat";
      // 请求参数
      var dat = {
        brandId: '2',
        userId: gerxinx.id,
        caseId: annrshuz[ind].id
      };
      http.promisServer(url, dat).then(res => {
        console.log(res.flag);
        // 点赞成功，更新视图
        if (res.flag) {
          console.log(tha.data.annrshuz);
          let great = tha.data.annrshuz[ind].great + 1;
          this.setData({
            ['annrshuz[' + ind + '].great']: great,
            ['annrshuz[' + ind + '].dianzhan']: res.flag
          })
          wx.showToast({ title: '点赞成功', icon: 'none', duration: 500, mask: true })
        } else {
          // 取消点赞
          let great = tha.data.annrshuz[ind].great - 1;
          this.setData({
            ['annrshuz[' + ind + '].great']: great,
            ['annrshuz[' + ind + '].dianzhan']: res.flag
          })
          wx.showToast({ title: '取消点赞', icon: 'none', duration: 500, mask: true })
        }
      })
    } else {
      wx.showToast({ title: '没有登录', icon: 'none', duration: 700 })
      return false
    }
  },

  //收藏产品
  star: function (e) {
    var tha = this
    let check = getInformation.checkUser();
    if (check) {
      var gerxinx = wx.getStorageSync('gerxinx');
      var annrshuz = this.data.annrshuz
      var ind = app.hdindex(e, 'ind')
      if (!gerxinx) {
        wx.showToast({ title: '没有登录', icon: 'none', duration: 700 })
        return false
      }
      var url = baseUrl + "case/allCaseCollectionSaves"
      var dat = {
        brand_id: '2',
        user_id: gerxinx.id,
        case_id: annrshuz[ind].id,
        case_type_id: 1,
      }
      console.log(dat, "收藏状态改变前")
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
  //获得当地区
  hdzuij: function () {
    var tha = this
    var dizdenlu = wx.getStorageSync('dizdenlu')
    if (dizdenlu) {
      var dangq = dizdenlu.address_component.province + dizdenlu.address_component.city

      this.qingqdangd(dangq, 1, 1)
      return false
    }
    wx.getSetting({
      success: res => {
        if (!res.authSetting['scope.userLocation']) {
          wx.showToast({ title: '没有授权开启定位', icon: 'none', duration: 700 })
        } else {
          app.huodjwds()
            .then(rec => app.formSubmit(rec.latitude, rec.longitude))
            .then(resc => {
              var address = resc.address_component.province + resc.address_component.city

              tha.qingqdangd(address, 1, 1)

            })
        }
      }
    })
  },
  //请求当地案例
  qingqdangd: function (dqdz, page, num) {
    var tha = this
    var url = baseUrl + "case/selectbendiCase"
    var dat = {
      brandid: '2',
      page: page,
      address: dqdz
    }
    bendanlinrs = []
    if (num == 2) {
      var bendanlinrs = this.data.bendanlinr
    }
    var bendcount = this.data.bendcount
    if (bendanlinrs.length >= bendcount && bendanlinrs.length != 0) {
      return false
    }
    console.log(dqdz, dat, '当前地区')
    http.promisServer(url, dat).then(resc => {
      var bendanlinr = bendanlinrs.concat(resc.data.bendiCaseList)
      var bendcount = resc.data.bendiCasesCount
      console.log(bendanlinr, bendcount, '本地案例')
      tha.setData({ bendanlinr, bendcount, bendanlidq: dqdz, bendanlipage: page })
    })
  },
  // 显示遮罩层
  handleToTop: function (e) {
  let indx = app.hdindex(e,'index')
  let chaxchuanlinr = this.data.annrshuz
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

  },
  //将canvas转换为图片保存到本地，然后将图片路径传给image图片的src
  createNewImg: function () {
    var that = this;
    // 获取点击的案例图片和文字介绍
    var result = that.data.anlilist;
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
    },1000)
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




  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    //请求案例内容
    this.chaxchuanlinr('', 1, 1)
    //请求案例列表
    this.rqwxanlist()

    if (!app.globalData.status) {
      app.banbzt().then(resc => {
        this.setData({ shenhestatus: app.globalData.status })
      })
    } else {
      this.setData({ shenhestatus: app.globalData.status })
    }

    // //获取缓存信息
    this.huqhcgrxin()


  },
  //获取缓存信息
  huqhcgrxin() {
    var tha = this
    var gerxinx = wx.getStorageSync('gerxinx')
    if (gerxinx) {
      // tha.hqshangzt(gerxinx)
      this.setData({ gerxinx })
      return false
    }
    app.huoqopenid()
      .then((openid) => app.cuncgerxinx(openid))
      .then(gerxinx => {
        // tha.hqshangzt(gerxinx)
        tha.setData({ gerxinx })
      })
  },
  // 跳转详情页面
  anlitz:function(e){
    var index = app.hdindex(e,'ind');
    var arry = this.data.annrshuz;
    app.globalData.anlixiaq = arry[index];
    app.Jump('product/anlixq/anlixq');
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    var cactiv = this.data.cactiv
    var twoactiv = this.data.twoactiv
    if (cactiv == 1) {
      //请求系列
      this.qingvideolist()
      //请求产品
      this.qiangcp(2)
      this.setData({ cpxians: false })
      return false
    }
    if (cactiv == 2 && twoactiv == 1) {
      //请求案例列表
      this.rqwxanlist()
      //头部案例清除
      this.antoucclear()
      return false
    }
    //头部产品清除
    // this.cptoucclear()
  },

  /*** 页面上拉触底事件的处理函数*/

  onReachBottom: function () {
    // var cactiv=this.data.cactiv
    // var twoactiv=this.data.twoactiv
    // if(cactiv==2&&twoactiv==1){
    //   var anlipage=this.data.anlipage
    //   var anlizfcid=this.data.anlizfcid
    //   anlipage++
    //   this.chaxchuanlinr(anlizfcid,anlipage,2)
    // }
    // if(cactiv==1&&this.data.cpxians){
    //   var cppage=this.data.cppage
    //   var cpzfcid=this.data.cpzfcid
    //   cppage++
    //   this.chaxchucpnr(cpzfcid,cppage,2)
    // }
    // if(cactiv==2&&twoactiv==2){
    //   var bendanlipage=this.data.bendanlipage
    //   var bendanlidq=this.data.bendanlidq
    //   bendanlipage++
    //   this.qingqdangd(bendanlidq,bendanlipage,2)

    // }
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
  onShareTimeline: function () { },
  xiaoshi:function(){
    var that = this
    this.setData({
      maskHidden: false
    });
  }

})