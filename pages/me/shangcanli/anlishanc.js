// pages/me/shangcanli/anlishanc.js
const app = getApp();
const http = app.globalData.http;
const baseUrl = app.globalData.baseUrl;
Page({

  /**
   * 页面的初始数据
   */
  data: {

    caselist:[]
  },
  //案例选择要删除的
  anlishancxuanz:function(e){
    var ind=app.hdindex(e,'ind')
    var caselist=this.data.caselist
    caselist[ind].xuanzt=!caselist[ind].xuanzt
    this.setData({caselist})
  },
  //删除选中的
  shanc:function(){
    var tha=this
    wx.showModal({
      title: '删除案例',
      content: '你确定要删除选中的案例吗',
      success (res) {
        if (res.confirm) {
          tha.shancanli()
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
    
  },
  //删除案例
  shancanli:function(){
    var tha=this
    var listid=this.hqid()
    var url = baseUrl + "case/bendiCasedelete"
    var dat={
      listid
    }
    console.log(dat)
    http.promisServer(url, dat).then(resc=>{
      console.log(resc,'删除案例结果')
      if(resc.status=="000"){
        wx.navigateBack({})
      }
    })
  },
  //获取选中的id
  hqid:function(){
    var listid=[]
    var i=0;
    var caselist=this.data.caselist

    caselist.forEach((e) => {
      if(e.xuanzt){
        listid[i]=e.id
        i++
      }
    });
    var lis= listid.join(',')
    console.log(lis,'删除的id')
    return lis
  },
  //请求案例列表
  rqcase:function(){
    var tha=this
    var gerxinx=this.data.gerxinx
    var sjzt=this.data.sjzt
    var url = baseUrl + "case/bendiCaseindex"
    var dat={
      userid:gerxinx.id,
      brandid:'1',
      storeid:sjzt.record.id
    }
    http.promisServer(url, dat).then(resc=>{
      var caselist=resc.data.localCaseList
      caselist=tha.jizt(caselist)
      this.setData({caselist})
      console.log(caselist,'案例列表')
    })
  },
  //加上状态
  jizt:function(arr){
    arr.forEach(element => {
      element.xuanzt=false
    });
    return arr
  },
   // 初始化
   init:function(){
    var gerxinx = wx.getStorageSync('gerxinx')
    var sjzt = wx.getStorageSync('sjzt')
    if(!gerxinx||!sjzt){
      app.Jumps('me/me')
      return false
    }
    this.setData({gerxinx,sjzt})
    this.rqcase()
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