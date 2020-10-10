/**
 * 多用性较高的数据会被存入全局变量/全局缓存，提供给各个页面使用
 * 作用：
 * 避免重复的用户或信息的请求
 * 标准：
 * 三个页面及以上的页面所需要的变量会被添加为全局变量
 * 小程序每次登录需要随机秘钥才能获取的信息会被添加到全局缓存 
 * 目前支持：
 * 用户信息、商家信息、地址经纬度、根据地址搜索出的本地经销商已添加到全局缓存
 */
/* 
商家信息--暂定为全局缓存
此方法会在我的页面被调用
*/
function getmerchants(){
    let app = getApp();
    var http = require('./http');
    // 用户id
    let user = wx.getStorageSync('gerxinx');
    // 判断有没有用户信息/用户是否已登录
    if(user){
      // 获取版本id 
      let brandid = app.globalData.brandid;
      let data = {userid:user.id, brandid:brandid};
      console.log(data);
      let url = app.globalData.baseUrl + 'store/storestatus';
      http.promisServer(url, data).then(function (res) {
        console.log('商家信息',res.data.record);
        wx.setStorageSync('MC',res.data.record);
      })
    }else{
      return false;
    }
    // let data = {userid:,brandid:''};

    // 将商家信息存储到全局缓存 
    // MC:merchants
    // wx.setStorageSync('MC',);
}

  module.exports={
    //获取商家信息
    getmerchants,getmerchants
  }




