// pages/me/guanli/Verification/Verification.js
const app = getApp();
const http = app.globalData.http;
const baseUrl = app.globalData.baseUrl;
const getInformation = app.globalData.getInformation;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type:'',
    hidden:false,
    content:null,
    status:null,
    jc:null,
    jc1:null,
    jc2:null,
    jc3:null,
    jc4:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option) {
    const scene = decodeURIComponent(option);
    // 可以获取到二维码值的方法
    const scenes= decodeURIComponent(option.scene);
    const sceness = decodeURIComponent(encodeURIComponent(option.scene));
    this.setData({
      jc:scene,
      jc1:option,
      jc2:option.id,
      jc3:scenes,
      jc4:sceness
    });
    console.log(sceness);
    if(sceness == 'undefined'){
      return false;
    }else{
      if(wx.getStorageSync('sjid')){
        console.log(wx.getStorageSync('sjid'));
      }else{
        wx.reLaunch({
          url:'/pages/souye/souye',
        })
        return false
      }
      this.hexiao(sceness)
    }
  },
  // 根据二维码值来获取核销的方法
  hexiao:function(wechatId){
    var that = this;
    let url = baseUrl + 'coupon/doCoupon';
    let data = {
      saomaId:wx.getStorageSync('gerxinx').id,
      wechatId:wechatId,
      status:2
    }
    http.promisServer(url,data).then(res=>{
      // 传入卡券核销码，卡券状态
      that.check(res.data.usercode,res.message)
    })
  },

  // 查找优惠券
  check:function(num,status){
    var that = this;
    let userCode = this.data.type || num;
    // 判断输入值
    if(userCode){
      that.setData({
        type:userCode
      })
    }else{
      wx.showToast({
        title: '请输入核销码',
        icon:'loading',
        duration:800
      })
      return false;
    }
    // 根据核销码查询券的状态
    let branid = app.globalData.brandid;
    let url = baseUrl +'coupon/useCoupoDetails';
    let data = {
      brandId:branid,
      userCode:userCode,
    }
    http.promisServer(url,data).then(res=>{
      console.log(res);
      if(res.flag){
        // 根据返回值修改数组渲染视图
          res.data.forEach(item=>{
            item.start_time = item.start_time.slice(0,10).replace(/-/g,'.');
            item.end_time =  item.end_time.slice(0,10).replace(/-/g,'.');
            // 判断商家id是否符合发布优惠券商家的id
            if(item.store_id == wx.getStorageSync('sjid')){
              // 判断是否有message值
              if(status){
                switch(status) {
                  case '1':
                      item.situation = '核销成功'
                    break;
                  case '2':
                    item.situation = '核销失败'
                    break;
                  case '3':
                    item.situation = '优惠券已经过期了'
                    break;
                  case '4':
                    item.situation = '优惠券已经核销过了'
                    break;
                  case '5':
                    item.situation = '优惠券不是该门店的' 
                    break;
                  case '6':
                    item.situation = '联系工作人员' 
                    break;
                }
              }else{
                // 判断优惠券状态
                if(item.situation == 0){
                  item.situation = '确认核销'
                }else if(item.situation == 1){
                  item.situation = '优惠券已核销'
                }else if(item.situation == 2){
                  item.situation = '优惠券已经过期了'
                }
              }
          }else{
            wx.showToast({
              title: '您不是发布此优惠券的商家',
              icon: 'none',
              duration: 800
            })
            return false;
          }
          })
          // 更新视图
          this.setData({
            hidden:true,
            content:res.data[0]
          })
        }else{
          wx.showLoading({
            title: '查询不到优惠券',
          })
          setTimeout(function(){
            wx.hideLoading();
          },1000)
      }
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  // 搜索
  sousuo:function(){
    var that = this;
    that.check();
  },

  // 扫码
  saoma:function(){
    console.log('扫码');
    var that = this;
    wx.scanCode({
      success(res) {
        console.log(res);
        console.log(res.path.split('?'));
        let num = res.path.split('?')[1].split('=')[1];
        that.hexiao(num);
      }
    })
  },
  //确认核销
  submit:function(){
    console.log(this.data.content)
    var that = this;
    // 检查卡券状态
    if(this.data.content.situation == '确认核销'){
      console.log('可以核销');
      let url = baseUrl + 'coupon/name';
      let data = {
        Id:this.data.content.id,
        status:'2'
      }
      http.promisServer(url,data).then(res=>{
        console.log(res);
          wx.showToast({
            title: '核销成功',
            icon: 'success',
            duration:1000
          })
          let status = that.data.content;
          console.log(status);
          status.situation = '已核销'
          that.setData({
            content:status
          })
      })
    }else{
        wx.showToast({
          title: '该卡券无法核销',
          icon: 'none',
          duration:1000
        })
    }
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})