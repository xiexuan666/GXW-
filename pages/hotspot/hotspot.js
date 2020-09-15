
const app = getApp();
const http = app.globalData.http;
const baseUrl = app.globalData.baseUrl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
  cpxqzt:1,
  cactiv:1,
  },


  //案例头部选择
  anlitopxuanz:function(e){
    console.log(e,9999)
    var ind=app.hdindex(e,'ind')
    var id=app.hdindex(e,'idc')
    var cpzt=app.hdindex(e,'cpzt')
    var anlishuj=this.data.anlishuj
    var anlixuanz=this.data.anlixuanz
    if(cpzt){
      anlixuanz[ind]=null;
      anlishuj[ind].xuanz=''
    }else{
      anlixuanz[ind]=id
      anlishuj[ind].xuanz=id
    }
    if(this.arrlength(anlixuanz)==0){
      // 清除案例选中
      this.antoucclear()
      return false
    }
    // var anlimyData=this.data.anlimyData
    var anliskubs=this.data.anliskubs
    
    var fanhui= toubu0({},anlishuj,anliskubs,anlixuanz)
    this.setData({
      anlishuj:fanhui.keys,
      anlixuanz:anlixuanz,
      anlizfcid:fanhui.idzfc,
    })

    if(fanhui.idzfc==''){
      this.antoucclear(1)
      wx.showToast({title: '没有相关结果',icon: 'none',duration: 700})
      return false
    }
    //查询案例出内容
    this.chaxchuanlinr(fanhui.idzfc,1)
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
      findCaseById:idzfc
    }

    http.promisServer(url, dat).then(resc=>{
      var annrshuz= annrshuzs.concat(resc.data.CaseList)
      var anlifuhejieg=resc.data.casessCount
      console.log(resc.data,'查出来的案例')
      tha.setData({annrshuz,anlipage:page,anlifuhejieg,anlizfcid:idzfc})
    })
  },

  canpiqieh:function(e){
    var ind=app.hdindex(e,'ind')
    console.log(ind)
    var cactiv=this.data.cactiv;
    if(ind==cactiv){
      return false
    }
    if(ind==1){
      
     cactiv=1
     wx.setNavigationBarTitle({ title: '优惠活动'})
    }
    if(ind==2){
     this.chaxchuanlinr('',1,1)
     cactiv=2
     wx.setNavigationBarTitle({ title: '优惠活动'})
    }
    console.log(cactiv)
    this.setData({cactiv:cactiv})
   },
  //  跳转到专修攻略
  fitment:function(){
wx.navigateTo({
  url: '/pages/hotspot/strategy/strategy',
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