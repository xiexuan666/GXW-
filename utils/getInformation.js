var http = require('./http');
// 获取基本信息 接口、版本号、用户id
function Getuser(){
    const app = getApp();
    let uid;
    if(wx.getStorageSync('gerxinx')){
         uid = wx.getStorageSync('gerxinx').id
    }else{
        uid = null
    }
    let user ={
        baseUrl:app.globalData.baseUrl,
        brandid:app.globalData.brandid,
        userid:uid
    }
    return user;
}
/**
 * 页面跳转--判断页面栈进行不同的跳转
 * 页面传值--判断不同类型并转化成可页面传值的数据流
 * 全局变量--暂时用不上
 */
function Jump(url,arry){
    // 判断类型
    let type =  Object.prototype.toString.call(arry);
<<<<<<< HEAD
    console.log(url,value,type);
    let value = JSON.stringify(arry);
=======
<<<<<<< HEAD
    console.log(url,value,type);
    let value = JSON.stringify(arry);
=======
<<<<<<< HEAD
    console.log(url,value,type);
    let value = JSON.stringify(arry);
=======
    let value = JSON.stringify(arry);
    console.log(url,value,type);
>>>>>>> d24e5d68f2511ff808d7dd102607e5500bf4b225
>>>>>>> c2d852eb919299f0777236b9e73da89733498f14
>>>>>>> e8e55f3a9c319a6878579450c3c18e28b346fd04
    if(url == 'souye/souye' || 'product/product' || 'hotspot/hotspot' ||' jinxs/jinxs' ||' me/me'){
        wx.switchTab({
            url: '/pages/'+url+'?value='+value
          }) 
    }else{
        return false
    }
    wx.navigateTo({
      url: '/pages/'+url+'?value='+value,
      success:(res=>{
          console.log('跳转成功');
      }),
      fail:(err=>{
        console.log(err);
      })
    })
}
/**
 * 判断用户登录状态--检查是否有缓存信息
*/
function checkUser(){
    let user = wx.getStorageSync('gerxinx');
    if (!user) {
      return false
    }else{
        return true
    }
}
/** 
 *添加收藏的产品
    将产品添加到我的收藏
    参数：
        userid:用户id
        brandid:版本id
        productid:产品id
    URL:production/productCollectionSaves
**/
function addProduct(uid){
    console.log(uid);
    var app =  Getuser();
    console.log(app.userid);
    console.log('我想添加产品到收藏夹',app,app.baseUrl);
    let url =  app.baseUrl + "production/productCollectionSaves";
    let data = {
        userid:app.userid,
        brandid:app.brandid,
        productid:uid
    };
    console.log(data);
    http.promisServer(url,data).then(res=>{
        console.log(res);
    })
    
}
/**
 *获取收藏的产品
   查询该用户的产品收藏
    参数：
    productName 模糊查询/文本内容
    brandId  品牌id
    userId  用户id
    state 为1时查询产品，2时查询案例
    URL:production/findProductCollection
    // 如果需要查询特定产品、案例、攻略详情时需要添加参数
    id
**/
function getProduct(uid,text,detailsId,user){
    var state = uid || 1;
    var name = text || '';
    var product;
    var details = detailsId || '';

    let app =  Getuser()
    let userid = app.userid || user
    let url =  app.baseUrl+'production/findProductCollection';
    let data={}
    data.id = details,
    data.name = name;
    data.state = state;
    data.userId = userid;
    data.brandId = app.brandid;
    console.log(data);
    product = http.promisServer(url,data).then(res=>{
        return res.data;
    })
    return product;
}

/* 
    *查询装修攻略列表
    *参数:
    状态:status = 1;
    选项卡:type = 5;（1：选砖2：专修，3：推荐，4，上市，5，全部显示）
    版本id:brandId,
    用户id：userid
    URL:activity/strategy/findAllStrategy
*/
function getstrategy(type,user){
<<<<<<< HEAD
    console.log(user);
=======
<<<<<<< HEAD
    console.log(user);
=======
<<<<<<< HEAD
    console.log(user);
=======
>>>>>>> d24e5d68f2511ff808d7dd102607e5500bf4b225
>>>>>>> c2d852eb919299f0777236b9e73da89733498f14
>>>>>>> e8e55f3a9c319a6878579450c3c18e28b346fd04
    // 解构赋值 ps:和正常获取对象值无异，可以设置默认值
    let {baseUrl,brandid,userId} = Getuser();
    let types = type || 5;
    let userid = userId || user
<<<<<<< HEAD
    console.log(baseUrl,brandid,userid,types);
=======
<<<<<<< HEAD
    console.log(baseUrl,brandid,userid,types);
=======
<<<<<<< HEAD
    console.log(baseUrl,brandid,userid,types);
=======
>>>>>>> d24e5d68f2511ff808d7dd102607e5500bf4b225
>>>>>>> c2d852eb919299f0777236b9e73da89733498f14
>>>>>>> e8e55f3a9c319a6878579450c3c18e28b346fd04
    let status = 1;
    let data = {
        status:status,
        type:types,
        brandId:brandid,
        userId:userid
    }
    let url = baseUrl+'activity/strategy/findAllStrategy';
<<<<<<< HEAD
    console.log(data,url);
=======
<<<<<<< HEAD
    console.log(data,url);
=======
<<<<<<< HEAD
    console.log(data,url);
=======
>>>>>>> d24e5d68f2511ff808d7dd102607e5500bf4b225
>>>>>>> c2d852eb919299f0777236b9e73da89733498f14
>>>>>>> e8e55f3a9c319a6878579450c3c18e28b346fd04
    let strategy =http.promisServer(url,data);
    return strategy;
}


/* 
    收藏攻略
    参数：
        brandId：版本
        userId：用户id
        strategyId:攻略id
    URL:activity/strategy/strategyCollection
*/
 function setCollection(uid){
    console.log('发送收藏请求');
    let {baseUrl,brandid,userid} = Getuser();
    console.log(baseUrl,brandid,userid,uid);
    let data = {
        brandId:brandid,
        userId:userid,
        strategyId:uid
    }
    let url = baseUrl +'activity/strategy/strategyCollection';
    let setcollection = http.promisServer(url,data);
    return setcollection;
 }

/* 
    添加查看数
    参数
    brandId：版本
    userId：用户
    strategyId：对应的攻略id
    URL:根据接口调整，提高重用性
*/
function addCollection(urls,uid){
    let {baseUrl,brandid,userid} = Getuser();
    let data ={
        brandId:brandid,
        userId:userid,
        strategyId:uid,
    }
    let url = baseUrl + urls;
    http.promisServer(url,data).then(res=>{
        console.log(res);
    })

}

/* 
    *查看评论
    参数
    brandId：版本
    userId：用户
    strategyId：攻略id
    url:根据接口调整，提高重用性
*/
function setCommon(urls,uid){
    let {baseUrl,brandid,userid} = Getuser();
    let data = {
        brandId:brandid,
        strategyId:uid,
    }
    let url = baseUrl + urls;
    return http.promisServer(url,data)
}
/*  可重用的点赞方法
    **activity/strategy/greatStrategy  攻略点赞
    activity/hot/greatVideo  视频点赞
    case/caseGreat  案例点赞
    参数:
        userId：用户id
        strategyId：攻略id:uid
        brandId：版本id
    URl:根据接口调整，提高重用性

    重用：video视频点赞需要videoid
          案例点赞需要caseId
*/
function addgreat(url,uid,videoid){
    let {baseUrl,brandid,userid} = Getuser();
    let data = {
        userId:userid,
        strategyId:uid,
        brandId:brandid,
    }
    if(videoid){
        console.log('是视频点赞',videoid);
        data={
            userId:userid,
            videoId:videoid,
            brandId:brandid,
        }
    }else{
        console.log('不是视频点赞',videoid);
        console.log(data);
    }
    


    let Url = baseUrl+url;
    console.log(data,Url);
    return http.promisServer(Url,data)
}


/* 
    *获取热点视频
    activity/hot/getAllVideo
    参数：
        brandId:版本
        status：审核通过的视频，1：通过
    Url:根据接口调整，提高重用性
*/
function getVideo(urls){
    let {baseUrl,brandid,userid} = Getuser();
    let data = {
        brandId:brandid,
        status:1
    }
    let url = baseUrl +urls;
    console.log(data,url);
    return http.promisServer(url,data);
}


/**
 * 获取案例--首页和推荐页
 * 参数：
 *      版本id
 * 
 * URl:重用性的接口
 *  */ 
function getGerxinx(url){
    let {baseUrl,brandid,userid} = Getuser();
    let urls = baseUrl + url;
    let data = {
        brandid:brandid,
        userId:userid
    }
    return http.promisServer(urls,data);
}


<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
/**
 * 用户绑定到附近店家，及线下绑定
 *  */ 

   function binding(url,data){  
        return http.promisServer(url,data);
   }

/**
 * 用户扫码后获取小程序码参数
 * url：固定：/scancode/scanCode/salespersonScanCode
 * 参数：
 *     id：二维码返回路径中附带的参数：scene
 */
   function parameter(uid){
    let {baseUrl,brandid,userid} = Getuser();
    let url = baseUrl + 'scancode/scanCode/salespersonScanCode';
    let date = {
        id:uid
    };
    return http.promisServer(url,date);
   }
   /**
    * 保存信息
    */
   function save(data){
        let {baseUrl,brandid,userid} = Getuser();
        /**
         * url:customer/salesperson/registersalesperson 
         * 参数：
         *     data:已经准备好的数组
         */
        let url = baseUrl + 'customer/salesperson/registersalesperson';
        return http.promisServer(url,data)
   }



   /* 
    *获取客户/导购信息
    *参数
    *     brand_id     品牌id
          store_id    商家id
    * url:/customer/salesperson/salespersonList 
   */
    function getcustomer(uid){
        console.log('获取客户');
        let {baseUrl,brandid,userid} = Getuser();
        let url = baseUrl + 'customer/salesperson/salespersonList';
        let data = {brand_id:brandid,store_id:1};
        return  http.promisServer(url,data)
    }
    /**
     *删除客户/导购 
     *参数：
            listid：要删除导购的id   例如：20,23,25
     *url:
        导购：/customer/salesperson/salespersondelete
     */
    function deletcustomer(urls,list){
        console.log('删除信息');
        let {baseUrl,brandid,userid} = Getuser();
        let url = baseUrl + urls;
        let data = {listid:list};
        return http.promisServer(url,data);
    }
>>>>>>> d24e5d68f2511ff808d7dd102607e5500bf4b225
>>>>>>> c2d852eb919299f0777236b9e73da89733498f14
>>>>>>> e8e55f3a9c319a6878579450c3c18e28b346fd04
module.exports = {
    checkUser:checkUser,
    Jump:Jump,
    getProduct:getProduct,
    addProduct:addProduct,
    getstrategy:getstrategy,
    setCollection:setCollection,
    addCollection:addCollection,
    setCommon:setCommon,
    addgreat:addgreat,
    getVideo:getVideo,
<<<<<<< HEAD
    getGerxinx:getGerxinx
=======
<<<<<<< HEAD
    getGerxinx:getGerxinx
=======
<<<<<<< HEAD
    getGerxinx:getGerxinx
=======
    getGerxinx:getGerxinx,
    binding:binding,
    parameter:parameter,
    save:save,
    getcustomer:getcustomer,
    deletcustomer:deletcustomer
>>>>>>> d24e5d68f2511ff808d7dd102607e5500bf4b225
>>>>>>> c2d852eb919299f0777236b9e73da89733498f14
>>>>>>> e8e55f3a9c319a6878579450c3c18e28b346fd04
}