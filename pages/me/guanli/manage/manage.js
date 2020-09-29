
const app = getApp();
const http = app.globalData.http;
const baseUrl = app.globalData.baseUrl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cpxqzt: 1,
    cactiv: 1,
  },
  //产品详情导航选择
  cpxzxz: function (e) {
    var ind = app.hdindex(e, 'ind')

    var cpxqzt = this.data.cpxqzt;
    if (ind == cpxqzt) { return false }
    if (ind == 1) {
      cpxqzt = 1
      wx.setNavigationBarTitle({ title: '正在进行活动' })
    }
    if (ind == 2) {
      cpxqzt = 2
      wx.setNavigationBarTitle({ title: '未发布活动' })
    }
    if (ind == 3) {
      cpxqzt = 3
      wx.setNavigationBarTitle({ title: '已下架活动' })
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


  // 跳转到创建活动
  subscribe: function () {
    wx.navigateTo({
      url: '/pages/me/guanli/manage/newly',
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