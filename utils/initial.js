
// 生成海报// 
function sethaibao(data){
  const app = getApp();
  wx.downloadFile({
    url: data.photo,
    success:res=>{
      // console.log(res);
      if(res.statusCode === 200){
        let avterSrc = res.tempFilePath;
        var ctx =  wx.createCanvasContext('canvpos');
        ctx.setFillStyle("#fff")
        ctx.fillRect(0, 0, 375, 667);
        ctx.drawImage(avterSrc, 0, 0, 400, 350);
        // console.log(wx.getStorageSync('gerxinx'));
        // 判断全局变量中有没有头像的本地图片
        if(app.globalData.haibao){
          let avterSrc = app.globalData.haibao;
          ctx.beginPath();
          ctx.setFillStyle("#fff")
          ctx.arc(60,400,30, 0, 2 * Math.PI);
          ctx.fill()
          ctx.save();
          ctx.clip();
          ctx.drawImage(avterSrc,30,370,60,60);
          ctx.restore();
          ctx.beginPath();
            //绘制中间文字
          ctx.setFontSize(14);
          ctx.setFillStyle('#ccc');
          ctx.setTextAlign('left');
          ctx.fillText(wx.getStorageSync('gerxinx').wx_name, 105,390);
          ctx.stroke();
          ctx.setFontSize(14);
          ctx.setFillStyle('#696969');
          ctx.setTextAlign('left');
          ctx.fillText("冠星王陶瓷未来家", 105, 417);
          ctx.stroke();
          ctx.setFontSize(14);
          ctx.setFillStyle('#000');
          ctx.setTextAlign('left');
          let title = data.huxing+data.chengshi+data.mianji+data.name;
          // console.log(title);
          ctx.fillText('【'+title+'】', 19, 470);
          ctx.stroke();
          ctx.setFontSize(12);
          ctx.setFillStyle('#ccc');
          ctx.setTextAlign('left');
          ctx.fillText(data.chengshi, 20,510);
          ctx.stroke();
          ctx.setFontSize(12);
          ctx.setFillStyle('#ccc');
          ctx.setTextAlign('left');
          let time = data.create_time.slice(0,10).replace(/-/g,'.');
          // console.log(time);
          ctx.fillText(time, 295,510);
          ctx.stroke();
          ctx.fillStyle = 'rgb(105,105,105)';
          ctx.fillRect(20, 520, 340, 0.5);
          //绘制左下角小程序二维码
          var path5 = "/images/tubiao/code.jpg";
          ctx.drawImage(path5, 20, 540, 100, 100, 70, 560);
          //绘制右下角文字
          ctx.setFontSize(16);
          ctx.setFillStyle('#ccc');
          ctx.setTextAlign('left');
          ctx.fillText("长按识别二维码", 145, 580);
          ctx.stroke();
          ctx.setFontSize(16);
          ctx.setFillStyle('#ccc');
          ctx.setTextAlign('left');
          ctx.fillText("冠星王陶瓷未来家看文章", 145, 610);
          ctx.stroke();
          ctx.draw();
        }else{
          wx.downloadFile({
            url: wx.getStorageSync('gerxinx').wx_photo,
            success:res=>{
              if(res.statusCode === 200){
                let avterSrc = res.tempFilePath;
                ctx.beginPath();
                ctx.setFillStyle("#fff")
                ctx.arc(60,400,30, 0, 2 * Math.PI);
                ctx.fill()
                ctx.save();
                ctx.clip();
                ctx.drawImage(avterSrc,30,370,60,60);
                ctx.restore();
                ctx.beginPath();
                 //绘制中间文字
                ctx.setFontSize(14);
                ctx.setFillStyle('#ccc');
                ctx.setTextAlign('left');
                ctx.fillText(wx.getStorageSync('gerxinx').wx_name, 105,390);
                ctx.stroke();
                ctx.setFontSize(14);
                ctx.setFillStyle('#696969');
                ctx.setTextAlign('left');
                ctx.fillText("冠星王陶瓷未来家", 105, 417);
                ctx.stroke();
                ctx.setFontSize(14);
                ctx.setFillStyle('#000');
                ctx.setTextAlign('left');
                let title = data.huxing+data.chengshi+data.mianji+data.name;
                // console.log(title);
                ctx.fillText('【'+title+'】', 19, 470);
                ctx.stroke();
                ctx.setFontSize(12);
                ctx.setFillStyle('#ccc');
                ctx.setTextAlign('left');
                ctx.fillText(data.chengshi, 20,510);
                ctx.stroke();
                ctx.setFontSize(12);
                ctx.setFillStyle('#ccc');
                ctx.setTextAlign('left');
                let time = data.create_time.slice(0,10).replace(/-/g,'.');
                // console.log(time);
                ctx.fillText(time, 295,510);
                ctx.stroke();
                ctx.fillStyle = 'rgb(105,105,105)';
                ctx.fillRect(20, 520, 340, 0.5);
                //绘制左下角小程序二维码
                var path5 = "/images/tubiao/code.jpg";
                ctx.drawImage(path5, 20, 540, 100, 100, 70, 560);
                //绘制右下角文字
                ctx.setFontSize(16);
                ctx.setFillStyle('#ccc');
                ctx.setTextAlign('left');
                ctx.fillText("长按识别二维码", 145, 580);
                ctx.stroke();
                ctx.setFontSize(16);
                ctx.setFillStyle('#ccc');
                ctx.setTextAlign('left');
                ctx.fillText("冠星王陶瓷未来家看文章", 145, 610);
                ctx.stroke();
                ctx.draw();
              }
            }
          })
        }
      }else{
          
      }
    }
  })
}


// 判断用户的进入渠道
  //场景值判断
  function sceneInfo(s) {
    var scene = [];
    switch (s) {
      case 1001:
        scene.push(s, "发现栏小程序主入口");
        break;
      case 1005:
        scene.push(s, "顶部搜索框的搜索结果页");
        break;
      case 1006:
        scene.push(s, "发现栏小程序主入口搜索框的搜索结果页");
        break;
      case 1007:
        scene.push(s, "单人聊天会话中的小程序消息卡片");
        break;
      case 1008:
        scene.push(s, "群聊会话中的小程序消息卡片");
        break;
      case 1011:
        scene.push(s, "扫描二维码");
        break;
      case 1012:
        scene.push(s, "长按图片识别二维码");
        break;
      case 1014:
        scene.push(s, "手机相册选取二维码");
        break;
      case 1017:
        scene.push(s, "前往体验版的入口页");
        break;
      case 1019:
        scene.push(s, "微信钱包");
        break;
      case 1020:
        scene.push(s, "公众号profile页相关小程序列表");
        break;
      case 1022:
        scene.push(s, "聊天顶部置顶小程序入口");
        break;
      case 1023:
        scene.push(s, "安卓系统桌面图标");
        break;
      case 1024:
        scene.push(s, "小程序profile页");
        break;
      case 1025:
        scene.push(s, "扫描一维码");
        break;
      case 1026:
        scene.push(s, "附近小程序列表");
        break;
      case 1027:
        scene.push(s, "顶部搜索框搜索结果页“使用过的小程序”列表");
        break;
      case 1028:
        scene.push(s, "我的卡包");
        break;
      case 1029:
        scene.push(s, "卡券详情页");
        break;
      case 1031:
        scene.push(s, "长按图片识别一维码");
        break;
      case 1032:
        scene.push(s, "手机相册选取一维码");
        break;
      case 1034:
        scene.push(s, "微信支付完成页");
        break;
      case 1035:
        scene.push(s, "公众号自定义菜单");
        break;
      case 1036:
        scene.push(s, "App分享消息卡片");
        break;
      case 1037:
        scene.push(s, "小程序打开小程序");
        break;
      case 1038:
        scene.push(s, "从另一个小程序返回");
        break;
      case 1039:
        scene.push(s, "摇电视");
        break;
      case 1042:
        scene.push(s, "添加好友搜索框的搜索结果页");
        break;
      case 1044:
        scene.push(s, "带shareTicket的小程序消息卡片");
        break;
      case 1047:
        scene.push(s, "扫描小程序码");
        break;
      case 1048:
        scene.push(s, "长按图片识别小程序码");
        break;
      case 1049:
        scene.push(s, "手机相册选取小程序码");
        break;
      case 1052:
        scene.push(s, "卡券的适用门店列表");
        break;
      case 1053:
        scene.push(s, "搜一搜的结果页");
        break;
      case 1054:
        scene.push(s, "顶部搜索框小程序快捷入口");
        break;
      case 1056:
        scene.push(s, "音乐播放器菜单");
        break;
      case 1058:
        scene.push(s, "公众号文章");
        break;
      case 1059:
        scene.push(s, "体验版小程序绑定邀请页");
        break;
      case 1064:
        scene.push(s, "微信连Wifi状态栏");
        break;
      case 1067:
        scene.push(s, "公众号文章广告");
        break;
      case 1068:
        scene.push(s, "附近小程序列表广告");
        break;
      case 1072:
        scene.push(s, "二维码收款页面");
        break;
      case 1073:
        scene.push(s, "客服消息列表下发的小程序消息卡片");
        break;
      case 1074:
        scene.push(s, "公众号会话下发的小程序消息卡片");
        break;
      case 1089:
        scene.push(s, "微信聊天主界面下拉");
        break;
      case 1090:
        scene.push(s, "长按小程序右上角菜单唤出最近使用历史");
        break;
      case 1092:
        scene.push(s, "城市服务入口");
        break;
      default:
        scene.push("未知入口");
        break;
    }
    return scene;
  }
module.exports={
  sethaibao:sethaibao,
  sceneInfo:sceneInfo
}