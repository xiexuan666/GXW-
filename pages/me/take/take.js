var app = getApp()
var address = require("../../../utils/mock");
const http = app.globalData.http;
const baseUrl = app.globalData.baseUrl;
const getInformation = app.globalData.getInformation;
Page({
  /**
    * 控件当前显示的数据
    * provinces:所有省份
    * citys 选择省对应的所有市,
    * areas 选择市对应的所有区
    * consigneeRegion：点击确定时选择的省市县结果
    * animationAddressMenu：动画
    * addressMenuIsShow：是否可见
    */
  /**
   * 页面的初始数据
   */
  data: {
    animationAddressMenu: {},
    addressMenuIsShow: false,
    value: [0, 0, 0],
    provinces: [],
    citys: [],
    areas: [],
    consigneeName: "", 
    phone: "",
    consigneeRegion: "",
    detailedAddress: "",
    labelList: ["家", "公司", "学校"],            //标签
    labelDefault: 0,              // 标签默认,
    judge:null,
    default:1
  },
  consigneeNameInput: function(e) {
    this.setData({
      consigneeName: e.detail.value
    })
  },
  phoneInput: function(e) {
    this.setData({
      phone: e.detail.value
    })
  },
  consigneeRegionInput: function (e) {
    this.setData({
      consigneeRegion: e.detail.value
    })
  },
  detailedAddressInput: function (e) {
    this.setData({
      detailedAddress: e.detail.value
    })
  },
  chooseLabelSelect: function(e) {
    var index = e.currentTarget.dataset.index;
    this.setData({
      labelDefault: index
    })
  },
  // swithc状态判断、是否设为默认地址
  updateswitch:function(e){
    console.log('设为默认地址',e.detail.value);
    if(e.detail.value){
    this.setData({
      default:1
    })
  }else{
    this.setData({
      default:0
    })
    }
  },

  // 保存地址
  submit: function() {
    let userid = wx.getStorageSync('gerxinx').id;
    let brand_id = app.globalData.brandid;
    var consigneeName = this.data.consigneeName;
    var phone = this.data.phone;
    var consigneeRegion = this.data.consigneeRegion;
    console.log(consigneeRegion);
    var detailedAddress = this.data.detailedAddress;
    // 判断用户是否有输入值
    if (consigneeName == "") {
      wx.showToast({
        title: '请输入姓名',
        image: "/images/tubiao/46.png"
      })
      return false
    }
    else if (phone == "") {
       wx.showToast({
        title: '请输入手机号码',
        image: "/images/tubiao/46.png"
      })
      return false
    }
    else if (consigneeRegion == "") {
       wx.showToast({
        title: '请选择所在地区',
        image: "/images/tubiao/46.png"
      })
      return false
    }
    else if (detailedAddress == "") {
       wx.showToast({
        title: '请输入详细地址',
        image: "/images/tubiao/46.png"
      })
      return false
    }else {
      // 信息无误，发送请求并跳转页面
    let crtlist = consigneeRegion.split('-');
    let data ={
    brandId:brand_id,
    userId:userid,
    phone:phone,
    name:consigneeName,
    sheng:crtlist[0],
    city:crtlist[1],
    region:crtlist[2],
    defaults:this.data.default,//默认地址
    address:detailedAddress,
  }
    // 在这里判断值，是否是修改
    if(this.data.judge){
    data.addressId=this.data.judge
    }else{

    }
    let url = baseUrl + 'activity/address/saveAddress';
    console.log(data,url);
    http.promisServer(url,data).then(res=>{
      console.log(res);
      wx.showToast({
        title: '地址保存成功',
        image: "/images/tubiao/46.png"
      })
      setTimeout(function(){ 
<<<<<<< HEAD
        wx.navigateBack()
=======
        wx.reLaunch({
          url: '/pages/me/address/address',
        })
>>>>>>> e8e55f3a9c319a6878579450c3c18e28b346fd04
      }, 500);
      
    })

  }
  },

  // 删除地址
  delete:function(){
    let userid = wx.getStorageSync('gerxinx').id;
    let brand_id = app.globalData.brandid;
    let addressId = this.data.judge;

    let data={
      brandId:brand_id,
      userId:userid,
      addressId:addressId
    }
    let url = baseUrl + 'activity/address/deleteAddress';
    console.log(data,url)
    http.promisServer(url,data).then(res=>{
      console.log(res);
      wx.showToast({
        title: '地址已删除',
        image: "/images/tubiao/46.png"
      })
      setTimeout(function(){ 
        wx.reLaunch({
          url: '/pages/me/address/address',
        })
      }, 500);
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.arry){
    let arry =  JSON.parse(options.arry);
    console.log(arry)
    this.setData({
      consigneeName:arry.name,
      phone:arry.phone,
      detailedAddress:arry.address,
      consigneeRegion:arry.sheng+'-'+arry.city+'-'+arry.region,
      judge:arry.id,
      default:arry.defaults
    })}

    // 默认联动显示北京
    var id = address.provinces[0].id
    this.setData({
      provinces: address.provinces,
      citys: address.citys[id],
      areas: address.areas[address.citys[id][0].id],
    })
  },
  // 点击所在地区弹出选择框
  select: function (e) {
    // 如果已经显示，不在执行显示动画
    if (this.data.addressMenuIsShow) {
      return false
    } else {
      // 执行显示动画
      this.startAddressAnimation(true)
    }
  },
  // 执行动画
  startAddressAnimation: function (isShow) {
    if (isShow) {
      // vh是用来表示尺寸的单位，高度全屏是100vh
      this.animation.translateY(0 + 'vh').step()
    } else {
      this.animation.translateY(40 + 'vh').step()
    }
    this.setData({
      animationAddressMenu: this.animation.export(),
      addressMenuIsShow: isShow,
    })
  },
  // 点击地区选择取消按钮
  cityCancel: function (e) {
    this.startAddressAnimation(false)
  },
  // 点击地区选择确定按钮
  citySure: function (e) {
    var that = this
    var city = that.data.city
    var value = that.data.value
    this.startAddressAnimation(false)
    // 将选择的城市信息显示到输入框
    var consigneeRegion = that.data.provinces[value[0]].name + '-' + that.data.citys[value[1]].name + '-' + that.data.areas[value[2]].name
    that.setData({
      consigneeRegion: consigneeRegion,
    })
  },
  // 处理省市县联动逻辑
  cityChange: function (e) {
    var value = e.detail.value
    var provinces = this.data.provinces
    var citys = this.data.citys
    var areas = this.data.areas
    var provinceNum = value[0]
    var cityNum = value[1]
    var countyNum = value[2]
    // 如果省份选择项和之前不一样，表示滑动了省份，此时市默认是省的第一组数据，
    if (this.data.value[0] != provinceNum) {
      var id = provinces[provinceNum].id
      this.setData({
        value: [provinceNum, 0, 0],
        citys: address.citys[id],
        areas: address.areas[address.citys[id][0].id],
      })
    } else if (this.data.value[1] != cityNum) {
      // 滑动选择了第二项数据，即市，此时区显示省市对应的第一组数据
      var id = citys[cityNum].id
      this.setData({
        value: [provinceNum, cityNum, 0],
        areas: address.areas[citys[cityNum].id],
      })
    } else {
      // 滑动选择了区
      this.setData({
        value: [provinceNum, cityNum, countyNum]
      })
    }
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
    var animation = wx.createAnimation({
      duration: 500,
      timingFunction: 'linear',
    })
    this.animation = animation
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