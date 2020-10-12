// pages/customers/system/system.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nav:[
      {value:'头像'},
      {value:'昵称'},
      // {value:'微信号'},
      // {value:'电话'},
      {value:'获客渠道'},
    ],
    select:true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  /* 
  *杂乱得功能方法
  */
  //跳转到分配页面
  Jump:function(){
    wx.navigateTo({
      url: '/pages/customers/distribution/distribution',
    })
  },
  // 打开分配select选框
  openSelect:function(){
    let selctstatus = this.data.selctstatus;
    if(selctstatus[1]){
      //关闭选择器
      selctstatus[1] = 0;
      selctstatus[0] = '分配';
      this.setData({  
        selctstatus:selctstatus
      })
    }else{
      //打开选择器
      selctstatus[1] = 1;
      selctstatus[0] = '取消分配';
      this.setData({  
        selctstatus:selctstatus
      })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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