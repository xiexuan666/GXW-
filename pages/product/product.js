// pages/product/product.js
const { jia, toubu, toubu2, toubu0, skub, keyanli, anlisub, cpshuj } = require('./jia.js');
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
  },

  //产品头部选择
  toubxuanz: function (e) {
    var ind = app.hdindex(e, 'ind')
    var id = app.hdindex(e, 'idc')
    var cpzt = app.hdindex(e, 'cpzt')
    var titlej = this.data.titlej
    var canpxuanz = this.data.canpxuanz
    var myData = this.data.myData
    var skub = this.data.skub
    if (cpzt) {
      canpxuanz[ind] = null;
      titlej[ind].xuanz = ''
    } else {
      canpxuanz[ind] = id
      titlej[ind].xuanz = id
    }
    var cpxians = false;
    var arrleng = this.arrlength(canpxuanz, titlej)
    if (arrleng == 0) {
      cpxians = false
      this.setData({ cpxians })
      this.cptoucclear()
      return false
    } else {
      cpxians = true
    }
    var fanhui = toubu0({}, titlej, skub, canpxuanz)

    this.setData({
      myData: fanhui.myData,
      titlej: fanhui.keys,
      canpxuanz: canpxuanz,
      cpxians
    })
    if (fanhui.idzfc == '') {
      this.cptoucclear(1)
      wx.showToast({ title: '没有相关结果', icon: 'none', duration: 700 })
      return false
    }
    this.chaxchucpnr(fanhui.idzfc, 1, 1)
  },
  // 查询出产品 id字符串 页数 1  
  // num 1第一次添加 2
  chaxchucpnr(idzfc, page, num) {

    if (!page) { var page = 1 }
    console.log(idzfc, "产品id字符串")
    var cpfuhejiegs = this.data.cpfuhejieg
    var cps = []
    if (num == 2) {
      cps = this.data.cp
    }
    if (num == 1) {
      cpfuhejiegs = 0
    }

    if (cps.length >= cpfuhejiegs && cps.length != 0) {
      return false
    }
    var tha = this
    var url = baseUrl + "production/productPage"
    var dat = {
      page,
      findProductById: idzfc
    }
    http.promisServer(url, dat).then(resc => {
      var cp = cps.concat(resc.data.ProductList)
      var cpfuhejieg = resc.data.ProductsCount
      for (var i = 0; i < cp.length; i++) {
        annrshuz[i].sczt = false;
        annrshuz[i].sczt1 = false;
      }
      console.log(resc.data, '查出来的产品')
      tha.qinsouc(cp)
      tha.setData({ cp, cppage: page, cpfuhejieg, cpzfcid: idzfc })
    })
  },
  //获得数组实际选了几个
  arrlength: function (arr) {
    var shu = 0;
    for (let i = 0; i < arr.length; i++) { if (arr[i]) { shu++ } }
    return shu;
  },

  //案例头部选择
  anlitopxuanz: function (e) {
    // 行数下标
    var ind = app.hdindex(e, 'ind')
    // 选项下标
    var index = app.hdindex(e, 'index');
    // id
    var id = app.hdindex(e, 'idc')
    // 选中状态 1：0
    var cpzt = app.hdindex(e, 'cpzt');
    // 控制选中的数组
    var anlishuj = this.data.anlishuj;
    var anlixuanz = this.data.anlixuanz;
    // 我们来筛选数组吧
    var title = app.hdindex(e, 'title');
    console.log('行数', ind, '选项卡id', id, '标签名', title, '选中状态', cpzt, '选项下标', index);
    //  利用index来进行覆盖，使一列只能有一个选中值
    if (cpzt) {
      anlishuj[ind].xuanz = ''
      this.setData({
        anlishuj: anlishuj
      })
      anlixuanz[ind] = null;
    } else {
      anlishuj[ind].xuanz = id
      this.setData({
        anlishuj: anlishuj
      })
      anlixuanz[ind] = title
    }
    console.log('添加后的数组', anlixuanz);
    // 调用arrlength方法，获得选中了多少个值;
    // ==0时清空选中状态 并终止函数
    if (this.arrlength(anlixuanz) == 0) {
      // 清除案例选中
      this.antoucclear()
      return false
    }
    // 更新数据
    // 清空筛选数组
    this.setData({
      anlixuanz: anlixuanz,
      checkarry: []
    })
    var that = this;
    // 筛选
    console.log(this.data.check[0].shuxing);
    console.log(anlixuanz);
    let list;
    this.data.check.forEach((element, index) => {
      let arry = element.shuxing.split('.');
      arry.push(index)
      console.log(arry);
      arry.forEach(element => {
        for (let i = 0; i < anlixuanz.length; i++) {
          if (anlixuanz[i] == element) {
            console.log('查询出的案例下标', arry[arry.length - 1]);
            let check = that.data.checkarry;
            check.push(arry[arry.length - 1])
            that.setData({
              checkarry: check
            })
            console.log(that.data.checkarry);
            list = Array.from(new Set(that.data.checkarry));
            let arrys = [];
            console.log(list);
            console.log(that.data.annrshuz);
            for (let i = 0; i < list.length; i++) {
              console.log(i);
              console.log(list[i]);
              arrys.push(that.data.check[list[i]]);
              console.log(arrys)
              // 查询完毕，更新数组和查询状态
              that.setData({
                annrshuz: arrys,
              })
            }
          }
        }
      })
    });
    console.log(list)
    if (list) {
      console.log('查询成功')
      wx.showToast({ title: '查询成功', icon: 'none', duration: 700 })
      return false
    } else {
      console.log('没有结果')
      wx.showToast({ title: '没有相关结果,已为您展示所有内容', icon: 'none', duration: 700 })
      console.log(that.data.check);
      let arry = that.data.check;
      that.setData({
        annrshuz: arry
      })
      return false
    }



    // if(fanhui.idzfc==''){
    //   this.antoucclear(1)
    //   wx.showToast({title: '没有相关结果',icon: 'none',duration: 700})
    //   return false
    // }
    // console.log(ind,id,cpzt,anlishuj,anlixuanz);
    // console.log('选择了那一列',anlishuj[ind]);
    // // 选择了多少个选项
    // console.log(anlixuanz[ind]);
    // // 判断点击对象的选中状态
    // console.log(cpzt);
    // // 自己添加的xuanz属性，==id时则为选中状态
    // 利用index来进行覆盖，使一列只能有一个选中值
    // if(cpzt){
    //   anlishuj[ind].xuanz=''
    //   anlixuanz[ind]=null;
    // }else{
    //   anlishuj[ind].xuanz=id
    //   anlixuanz[ind]=id
    // }
    // console.log('更改后的值：',anlishuj[ind],anlixuanz[ind]);
    // // 调用arrlength方法，获得选中了多少个值;
    // // ==0时清空选中状态 并终止函数
    // if(this.arrlength(anlixuanz)==0){
    //   // 清除案例选中
    //   this.antoucclear()
    //   return false
    // }
    // // 一行只允许一个选中值
    // console.log('你选中了几个值：',this.arrlength(anlixuanz))
    // console.log('选中的id：',anlixuanz);
    // // 定义两个空对象，用以存储
    // var anlimyData=this.data.anlimyData
    // var anliskubs=this.data.anliskubs
    // console.log('新引入的数据：',anlimyData,anliskubs);
    // // 调用了外部方法，不知道什么操作，
    // // 参数：空对象，所有的行列渲染数组，空对象，选中了的状态值
    // var fanhui= toubu0({},anlishuj,anliskubs,anlixuanz);

    // this.setData({
    //   anlishuj:fanhui.keys,
    //   anlixuanz:anlixuanz,
    //   anlizfcid:fanhui.idzfc,
    // })
    // if(fanhui.idzfc==''){
    //   this.antoucclear(1)
    //   wx.showToast({title: '没有相关结果',icon: 'none',duration: 700})
    //   return false
    // }
    //查询案例出内容
    // this.chaxchuanlinr(fanhui.idzfc,1)


  },
  // 查询出案例 id字符串 页数 1  
  // num 1第一次添加 2
  chaxchuanlinr(idzfc, page, num) {
    var tha = this
    var url = 'case/tuijianCasePage';
    getInformation.getGerxinx(url).then(res => {
      tha.setData({
        annrshuz: res.data.tuijianCaseList,
        check: res.data.tuijianCaseList
      })
    })
    // if(!page){var page=1}
    // // console.log(idzfc,"产品id字符串")
    // var anlifuhejiegs=this.data.anlifuhejieg
    // var annrshuzs=[]
    // if(num==2){
    //   annrshuzs=this.data.annrshuz
    // }
    // if(num==1){
    //   anlifuhejiegs=0
    // }
    // if(annrshuzs.length>=anlifuhejiegs&&annrshuzs.length!=0){
    //   return false
    // }
    // var tha=this
    // var url = baseUrl + "case/casePage";
    // var dat={
    //   brand_id:'2',
    //   page,
    //   findCaseById:idzfc,
    //   userId:wx.getStorageSync('gerxinx').id
    // }
    // http.promisServer(url, dat).then(resc=>{
    //   var annrshuz= annrshuzs.concat(resc.data.CaseList)
    //   var anlifuhejieg=resc.data.casessCount
    //   console.log('全部案例：',resc.data)
    //   tha.setData({annrshuz,anlipage:page,anlifuhejieg,anlizfcid:idzfc})
    // })
  },
  //点击系列视频封面跳转到系列e
  tzxlcp: function (e) {
    var ind = app.hdindex(e, 'ind')
    var xilievideolist = this.data.xilievideolist
    var id = xilievideolist[ind].root_id
    var titlej = app.globalData.titlej
    var skub = app.globalData.skub
    titlej[1].xuanz = id
    var canpxuanz = new Array(4);
    canpxuanz[1] = id
    console.log(titlej, skub, canpxuanz)
    var fanhui = toubu0({}, titlej, skub, canpxuanz)
    var guigelist = fanhui.keys[3].children
    var geid = ''
    var cdid = ''
    guigelist.forEach((el, indexc) => {
      canpxuanz[3] = el.id
      if (el.spread) {
        geid += ',' + el.id
        fanhui = toubu0({}, titlej, skub, canpxuanz)
        cdid += '@' + fanhui.idzfc
      }
    });
    geid = geid.slice(1)
    cdid = cdid.slice(1)
    console.log(geid, 999)
    console.log(cdid, 9996)
    console.log(xilievideolist[ind], ind, '系列详情')
    xilievideolist[ind].geid = geid
    xilievideolist[ind].cdid = cdid
    app.globalData.xiliexqs = xilievideolist[ind]
    titlej = this.topclear(titlej)
    app.Jump('product/cp/xlcp')
  },

  //跳转搜索
  tzsous: function () {
    app.globalData.sous1 = '11'
    app.Jump('product/sousuo')
  },
  //跳转搜索
  tzsous2: function () {
    app.globalData.sous2 = '11'
    app.Jump('product/sousuo2')
  },
  //案例本地还是全国选择
  anlixuanz: function (e) {
    var ind = app.hdindex(e, 'ind')
    var twoactiv = this.data.twoactiv;
    if (ind == twoactiv) { return false }
    if (ind == 1) { twoactiv = 1 }
    if (ind == 2) {
      twoactiv = 2
      this.hdzuij()
    }
    this.setData({ twoactiv: twoactiv })
  },
  //产品或案例选择
  canpiqieh: function (e) {
    var ind = app.hdindex(e, 'ind')
    console.log(ind)
    var cactiv = this.data.cactiv;
    if (ind == cactiv) {
      return false
    }
    if (ind == 2) {
      this.chaxchuanlinr('', 1, 1)
      cactiv = 2
      wx.setNavigationBarTitle({ title: '案例中心' })
    }
    console.log(cactiv)
    this.setData({ cactiv: cactiv })
  },
  //初始化
  init: function () {
    this.ztsuoysp()
    //从详情页面过来的
    if (app.globalData.anlixiaq || app.globalData.cpxiaqs || app.globalData.xiliexqs || app.globalData.benanlixq || app.globalData.sous2 || app.globalData.sous1) {
      app.globalData.anlixiaq = ''
      app.globalData.cpxiaqs = ''
      app.globalData.xiliexqs = ''
      app.globalData.benanlixq = ''
      app.globalData.sous2 = ''
      app.globalData.sous1 = ''
    } else {

      console.log('头部产品清除')
      //头部产品清除
      this.cptoucclear()
      //头部案例清除
      this.antoucclear()

      this.setData({ cactiv: 1, twoactiv: 1, cpxians: false })
    }

  },
  //头部数据状态清除
  topclear: function (arr) {
    for (let i = 0; i < arr.length; i++) {
      arr[i].xuanz = ''
      for (let c = 0; c < arr[i].children.length; c++) {
        arr[i].children[c].zt = false
      }
    }
    return arr;
  },
  //跳转到案例详情
  anlitz: function (e) {
    var ind = app.hdindex(e, 'ind')
    var annrshuz = this.data.annrshuz
    // var url = baseUrl + "case/previewUpdate"
    var dat = {
      caseId: annrshuz[ind].id
    }
    console.log(annrshuz[ind]);
    // 将已获取的数据变为全局变量
    app.globalData.anlixiaq = annrshuz[ind]
    // 跳转页面
    app.Jump('product/anlixq/anlixq');
  },
  //跳转到本地案例详情
  bendanlitz: function (e) {
    var ind = app.hdindex(e, 'ind')
    var bendanlinr = this.data.bendanlinr
    // console.log(bendanlinr[ind],ind,'本地案例详情')
    app.globalData.benanlixq = bendanlinr[ind]
    app.Jump('product/anlixq/benanlixq')
  },
  //跳转产品详情
  tzcpxq: function (e) {
    var ind = app.hdindex(e, 'ind')
    var cp = this.data.cp
    app.globalData.cpxiaqs = cp[ind]
    app.Jump('product/cp/cpxq')
  },

  //暂停所有视频
  ztsuoysp: function () {
    var attr = this.data.attr
    if (!this.videoContext) {
      return false
    }
    for (var i = 0; i < this.videoContext.length; i++) {
      this.videoContext[i].pause()
    }
    attr.playind = -1
    this.setData({ attr })
  },
  //请求案例spu可能性
  rqanliknx: function () {
    // var tha=this
    // var url = baseUrl + "casecategory/selectCaseT"
    // var dat={}
    // http.promisServer(url, dat).then(resc=>{
    //   // console.log(resc)
    //   var anliskubs={}
    //   var anliknxb=resc.data.caseJiLuPage
    //   for (var i=0; i < anliknxb.length; i++) {
    //     anliskubs[anliknxb[i].case_list_id]={
    //       count:anliknxb[i].count,
    //       id:anliknxb[i].case_id
    //     }

    //   }
    //   tha.setData({anliskubs})
    //   wx.stopPullDownRefresh();
    //   console.log(anliskubs,'案例列表可能性')
    // })
  },
  //请求案例头部无限列表且请求案例内容
  rqwxanlist: function () {
    var tha = this
    var url = baseUrl + "casecategory/index"
    var dat = {}
    http.promisServer(url, dat).then(resc => {
      var da = resc.data.caseCategoryList
      var anlishuj = JSON.parse(da)[0].children
      var anlixuanz = new Array(anlishuj.length)
      tha.setData({ anlishuj, anlixuanz })
      tha.rqanliknx()
      // console.log(anlishuj,'案例无限列表')
    })
  },
  //头部案例清除
  antoucclear: function (num) {
    if (!num) {
      this.chaxchuanlinr('', 1, 1)
    }
    var anlishuj = this.data.anlishuj
    if (anlishuj.length == 0) { return false }
    anlishuj.forEach(e => {
      if (!num) {
        e.xuanz = ''
      }
      e.children.forEach(e2 => {
        e2.spread = true
      });
    });
    var annrshuz = this.data.annrshuz
    if (num) {
      annrshuz = []
    }
    var anlixuanz = new Array(anlishuj.length)
    this.setData({ anlishuj, annrshuz, anlixuanz })
  },
  //请求产品spu可能性
  rqcpknx: function () {
    var tha = this
    var url = baseUrl + "production/productpage"
    var dat = {}
    http.promisServer(url, dat).then(resc => {
      var skub = {}
      var skubs = resc.data.seriesJiLuPage
      for (var i = 0; i < skubs.length; i++) {
        skub[skubs[i].case_list_id] = {
          count: skubs[i].count,
          id: skubs[i].case_id

        }
      }
      tha.setData({ skub })

      wx.stopPullDownRefresh();
      console.log(skub, '产品列表可能性')
    })
  },
  //头部产品清除 有传参数就查不到清除状态
  cptoucclear: function (num) {
    var titlej = this.data.titlej
    if (titlej.length == 0) { return false }
    titlej.forEach(e => {
      if (!num) {
        e.xuanz = ''
      }
      e.children.forEach(e2 => {
        e2.spread = true
      });
    });
    var cp = []
    var canpxuanz = new Array(titlej.length)
    this.setData({ titlej, cp, canpxuanz })
  },
  //请求产品无限列表且请求可能性 1不从新请求 2从新请求
  qiangcp: function (num) {
    var tha = this
    var titlej = app.globalData.titlej
    var skub = app.globalData.skub
    if (titlej && skub && num == 1) {
      var canpxuanz = new Array(titlej.length)
      this.setData({ titlej, skub, canpxuanz })
      return false
    }
    //从新请求产品无限列表
    app.qiangcp().then((nr) => {
      titlej = nr.titlej
      skub = nr.skub
      var canpxuanz = new Array(titlej.length)
      tha.setData({ titlej, skub, canpxuanz })
      wx.stopPullDownRefresh();
    })
  },
  //请求系列
  qingvideolist: function () {
    var tha = this
    var url = baseUrl + "series/index2"
    var dat = {
      seriesBrandId: '1'
    }
    http.promisServer(url, dat).then(resc => {
      console.log(resc, '系列列表')
      var xilievideolist = resc.data.allseriessLists

      tha.setData({ xilievideolist })

    })
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
      brandId: '2',
      userid: gerxinx.id,

    }
    http.promisServer(url, dat).then(resc => {
      var sclist = resc.data.productCollectionList
      cp.forEach(el1 => {
        sclist.forEach(el2 => {
          if (el1 && el2 && el1.id == el2.id) {
            el1.sczt = true;
            el1.sczt1 = true;
          }
        });
      });
      this.setData({ cp })
      console.log(resc.data.productCollectionList, '收藏列表')
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
      // 
      // console.log(dat,"点赞状态改变前")
      // http.promisServer(url, dat).then(resc=>{
      //   if(resc.status==0){
      //     annrshuz[ind].sczt=false
      //     this.setData({annrshuz})
      //     console.log(annrshuz[ind].great);
      //     wx.showToast({title: '取消点赞',icon: 'none',duration: 800})
      //   }else{
      //     annrshuz[ind].sczt=true;
      //     this.setData({annrshuz})
      //     wx.showToast({title: '点赞成功',icon: 'none',duration: 800})
      //     console.log(annrshuz[ind].great);

      //   }
      //   // this.setData({})
      //   console.log(resc,'点赞状态改变')
      // })
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
      brandid: '1',
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
    console.log('显示了')
    //请求案例内容
    this.chaxchuanlinr('', 1, 1)
    //请求案例列表
    this.rqwxanlist()
    // var dyczx=this.data.dyczx
    // if(dyczx>0){
    //   this.init()
    // }
    // dyczx++
    // this.setData({dyczx})

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
<<<<<<< HEAD
 
=======
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
>>>>>>> 7c1c0e3919fad4bfaed76d5d78733405b080bbc8
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  onShareTimeline: function () { }

})