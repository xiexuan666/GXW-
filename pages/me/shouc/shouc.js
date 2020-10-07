
const app = getApp();
const http = app.globalData.http;
const baseUrl = app.globalData.baseUrl;
const getInformation = app.globalData .getInformation;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cpxqzt: 1,
    cactiv: 1,
    //产品假数据
    cp: [],
    product:[],
    strategy:[],
    show: false,//控制下拉列表的显示隐藏，false隐藏、true显示
    selectData: ['品尚宝石蓝', '品尚宝鱼肚金', '品尚雪山兰'],//下拉列表的数据
    index: 0,//选择的下拉列表下标
    select:'全部产品',
    selecif:'全部产品'
  },
  // 点击下拉显示框
  selectTap() {
    this.setData({
      show: !this.data.show
    });
  },
  // 点击下拉列表
  optionTap(e) {
    let Index = e.currentTarget.dataset.index;//获取点击的下拉列表的下标
    console.log(Index);
    if(Index == undefined){
      this.setData({
        select:'全部产品'
      })
    }
    var data = this.data.selectData;
    this.setData({
      index: Index,
      show: !this.data.show,
      select : data[Index]
    });
  },
  //产品详情导航选择
  cpxzxz: function (e) {
    var that = this;
    var ind = app.hdindex(e, 'ind')
    var cpxqzt = this.data.cpxqzt;
    if (ind == cpxqzt) { return false }
    if (ind == 1) {
      cpxqzt = 1
      // 请求数据、需要做判断避免重复请求
      getInformation.getProduct(1).then(res=>{
      })
      wx.setNavigationBarTitle({ title: '产品' })
    }else if(ind == 2){
      cpxqzt = 2
      // 请求数据、需要做判断避免重复请求
      getInformation.getProduct(2).then(res=>{ 
        console.log(res)
        that.setData({
          product:res
        })
      })
      wx.setNavigationBarTitle({ title: '案例' })
    }else if(ind == 3){
      cpxqzt = 3
      // 请求数据、需要做判断避免重复请求
      getInformation.getProduct(3).then(res=>{
        that.setData({
          strategy:res
        })
      })
      wx.setNavigationBarTitle({ title: '攻略' })
    }
    this.setData({ cpxqzt: cpxqzt })

  },

  //案例头部选择
  anlitopxuanz: function (e) {
    console.log(e, 9999)
    var ind = app.hdindex(e, 'ind')
    var id = app.hdindex(e, 'idc')
    var cpzt = app.hdindex(e, 'cpzt')
    var anlishuj = this.data.anlishuj
    var anlixuanz = this.data.anlixuanz
    if (cpzt) {
      anlixuanz[ind] = null;
      anlishuj[ind].xuanz = ''
    } else {
      anlixuanz[ind] = id
      anlishuj[ind].xuanz = id
    }
    if (this.arrlength(anlixuanz) == 0) {
      // 清除案例选中
      this.antoucclear()
      return false
    }
    // var anlimyData=this.data.anlimyData
    var anliskubs = this.data.anliskubs

    var fanhui = toubu0({}, anlishuj, anliskubs, anlixuanz)
    this.setData({
      anlishuj: fanhui.keys,
      anlixuanz: anlixuanz,
      anlizfcid: fanhui.idzfc,
    })

    if (fanhui.idzfc == '') {
      this.antoucclear(1)
      wx.showToast({ title: '没有相关结果', icon: 'none', duration: 700 })
      return false
    }
    //查询案例出内容
    this.chaxchuanlinr(fanhui.idzfc, 1)
  },

  // 查询出案例 id字符串 页数 1  
  // num 1第一次添加 2
  chaxchuanlinr(idzfc, page, num) {
    if (!page) { var page = 1 }
    console.log(idzfc, "产品id字符串")
    var anlifuhejiegs = this.data.anlifuhejieg
    var annrshuzs = []
    if (num == 2) {
      annrshuzs = this.data.annrshuz
    }
    if (num == 1) {
      anlifuhejiegs = 0
    }

    if (annrshuzs.length >= anlifuhejiegs && annrshuzs.length != 0) {
      return false
    }
    var tha = this
    var url = baseUrl + "case/casePage"
    var dat = {
      page,
      findCaseById: idzfc
    }

    http.promisServer(url, dat).then(resc => {
      var annrshuz = annrshuzs.concat(resc.data.CaseList)
      var anlifuhejieg = resc.data.casessCount
      console.log(resc.data, '查出来的案例')
      tha.setData({ annrshuz, anlipage: page, anlifuhejieg, anlizfcid: idzfc })
    })
  },

  canpiqieh: function (e) {
    var ind = app.hdindex(e, 'ind')
    console.log(ind)
    var cactiv = this.data.cactiv;
    if (ind == cactiv) {
      return false
    }
    if (ind == 1) {

      cactiv = 1
      wx.setNavigationBarTitle({ title: '个人收藏' })
    }
    if (ind == 2) {
      this.chaxchuanlinr('', 1, 1)
      cactiv = 2
      wx.setNavigationBarTitle({ title: '导购推送' })
    }
    console.log(cactiv)
    this.setData({ cactiv: cactiv })
  },


  //跳转产品详情
  tzcpxq: function (e) {
    var ind = app.hdindex(e, 'ind');
    var cp = this.data.cp;
    console.log(cp[ind]);
    app.globalData.cpxiaqs = cp[ind];
    app.Jump('product/cp/cpxq');
    // var state = 1;
    // getInformation.getProduct(state,undefined,cp[ind].product_id).then(res=>{
    //   console.log(res[0].id);
    //   //  将获取的详情设置到全局变量
    //   app.globalData.cpxiaqs = res[0];
    //   app.Jump('product/cp/cpxq');
    // })
  },
  // 跳转案例详情
  anlitz:function(e){
    var that  = this;
    var int = app.hdindex(e,'ind');
    // 设置自己的state为案例
    var state = 2;
    // 获取对应的案例id
    console.log(that)
    console.log('我点击了案例',int);
  },

  //收藏产品
  sccp: function (e) {
    var ind = app.hdindex(e, 'ind')
    var cp = this.data.cp
    cp[ind].sczt = !cp[ind].sczt
    this.setData({ cp })
  },
  //产品或案例选择
  canpiqieh: function (e) {
    var ind = app.hdindex(e, 'ind')
    console.log(ind)
    var cactiv = this.data.cactiv;
    if (ind == cactiv) {
      return false
    }
    if (ind == 1) {
      cactiv = 1
      wx.setNavigationBarTitle({ title: '产品收藏' })
    }
    if (ind == 2) {
      cactiv = 2
      wx.setNavigationBarTitle({ title: '案例收藏' })
    }
    console.log(cactiv)
    this.setData({ cactiv: cactiv })
  },

  //请求所有收藏
  qinsouc: function () {
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
      sclist.forEach(el2 => {
        if (!el2) {
          return false
        }
        el2.sczt = true
      });
      this.setData({ cp: sclist })
      console.log(resc, '收藏列表')
    })

  },
  //收藏产品
  sccp: function (e) {
    var tha = this
    var gerxinx = wx.getStorageSync('gerxinx')
    var cp = this.data.cp
    var ind = app.hdindex(e, 'ind')
    if (!gerxinx) {
      return false
    }
    var url = baseUrl + "production/productCollectionSaves"
    var dat = {
      brandid: '1',
      userid: gerxinx.id,
      productid: cp[ind].id
    }
    console.log(dat, "收藏状态改变前")
    http.promisServer(url, dat).then(resc => {
      if (resc.status == 0) {
        cp[ind].sczt = false
        this.setData({ cp })
        wx.showToast({ title: '取消收藏', icon: 'none', duration: 800 })
      }
      if (resc.status == 1) {
        cp[ind].sczt = true
        this.setData({ cp })
        wx.showToast({ title: '收藏成功', icon: 'none', duration: 800 })
      }
      console.log(resc, '收藏状态改变')
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    // 请求产品
    console.log(wx.getStorageSync('gerxinx').id);
    getInformation.getProduct(undefined,undefined,undefined,wx.getStorageSync('gerxinx').id).then(res=>{
      var arry = []
      console.log(res);
      for(let i=0;i<res.length;i++){
        arry.push(res[i].tname);
      }
      let select = Array.from(new Set(arry));
      select.unshift('全部产品');
      console.log(select);
      that.setData({
        selectData:select,
        cp:res
      })
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

  }
})