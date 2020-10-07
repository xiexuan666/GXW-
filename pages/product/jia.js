//产品
var keys = [{
  'name': '空间',
  'xuanz': '',
  'id': 0,
  'list': [{
    'name': '客厅',
    'id': 4,
    'zt': true
  }, {
    'name': '餐厅',
    'id': 5,
    'zt': true
  }, {
    'name': '厨房',
    'id': 6,
    'zt': true
  }, {
    'name': '卫生间',
    'id': 7,
    'zt': true
  }, {
    'name': '商业空间',
    'id': 8,
    'zt': true
  }]

}, {
  'name': '系列',
  'xuanz': '',
  'id': 1,
  'list': [{
    'name': '进口岩板',
    'id': 9,
    'zt': true
  }, {
    'name': '奢石',
    'id': 10,
    'zt': true
  }, {
    'name': '米兰',
    'id': 11,
    'zt': true
  }, {
    'name': '芬迪',
    'id': 12,
    'zt': true
  }, {
    'name': '自由',
    'id': 13,
    'zt': true
  }, {
    'name': '自然',
    'id': 14,
    'zt': true
  }, {
    'name': '经典',
    'id': 15,
    'zt': true
  }]
}, {
  'name': '色彩',
  'xuanz': '',
  'id': 2,
  'list': [{
    'name': '黑',
    'id': 16,
    'zt': true
  }, {
    'name': '白',
    'id': 17,
    'zt': true
  }, {
    'name': '灰',
    'id': 18,
    'zt': true
  }, {
    'name': '棕',
    'id': 19,
    'zt': true
  }, {
    'name': '彩色',
    'id': 20,
    'zt': true
  }, {
    'name': '柔光',
    'id': 21,
    'zt': true
  }, {
    'name': '仿古',
    'id': 30,
    'zt': true
  }]

}, {
  'name': '规格',
  'xuanz': '',
  'id': 3,
  'list': [{
    'name': '1500X3000mm',
    'id': 22,
    'zt': true
  }, {
    'name': '1200X2780mm',
    'id': 23,
    'zt': true
  }, {
    'name': '1000X3000mm',
    'id': 24,
    'zt': true
  }, {
    'name': '1200X2400mm	',
    'id': 25,
    'zt': true
  }, {
    'name': '900X1800mm',
    'id': 26,
    'zt': true
  }, {
    'name': '750X1500mm',
    'id': 27,
    'zt': true
  }, {
    'name': '600X1200mm',
    'id': 28,
    'zt': true
  }, {
    'name': '800X800mm',
    'id': 29,
    'zt': true
  }]
}

]

var data = {
  "4;9;16;22": {
      count: 1,
      id:'1'
  },
  "7;13;18;23": {
      count: 2,
      id:'1,9'
  },
  "8;14;19;25": {
      count: 2,
      id:'3,6'
  },
  "5;12;16;23": {
      count: 2,
      id:'7,9'
  },
  "6;14;18;27": {
      count: 1,
      id:'7'
  },
  "4;14;18;27": {
    count: 1,
    id:'11'
  },
  "5;13;16;26": {
    count: 1,
    id:'14'
  },
  "6;12;19;24": {
    count: 1,
    id:'15'
    
  },
  "7;11;20;23": {
    count: 1,
    id:'16'
  },
  "8;10;21;22": {
    count: 1,
    id:'15'
  }
  
}

//案例数据
var keyanli = [
  {
  'name': '风格',
  'xuanz': '',
  'id': 0,
  'list': [{
    'name': '现代',
    'id': 4,
    'zt': true
  }, {
    'name': '轻奢',
    'id': 5,
    'zt': true
  }, {
    'name': '新中式',
    'id': 6,
    'zt': true
  }, {
    'name': '简欧',
    'id': 7,
    'zt': true
  }, {
    'name': '其他',
    'id': 8,
    'zt': true
  }]

}, 
{
  'name': '户型',
  'xuanz': '',
  'id': 1,
  'list': [{
    'name': '别墅',
    'id': 9,
    'zt': true
  }, {
    'name': '平层',
    'id': 10,
    'zt': true
  }]
},
 {
  'name': '空间',
  'xuanz': '',
  'id': 2,
  'list': [{
    'name': ' 客厅',
    'id': 16,
    'zt': true
  }, {
    'name': '餐厅',
    'id': 17,
    'zt': true
  }, {
    'name': '厨房',
    'id': 18,
    'zt': true
  }, {
    'name': '卫生间',
    'id': 19,
    'zt': true
  }, {
    'name': '卧室',
    'id': 20,
    'zt': true
  }, {
    'name': '其他',
    'id': 21,
    'zt': true
  }]

}
]

var anlisub = {
  "4;9;16": {
      count: 1,
      id:'4,7,961'
  },
  "7;10;18": {
      count: 1
  },
  "8;9;19": {
      count: 1
  },
  "5;10;16": {
      count: 1
  },
  "6;9;18": {
      count: 1
  },
  "4;10;18": {
    count: 1
  },
  "5;9;16": {
    count: 1
  },
  "6;9;19": {
    count: 1
  },
  "7;9;20": {
    count: 1
  },
  "8;10;21": {
    count: 1
  }
  
}
//产品假数据
var cpshuj=[
  {
    img:'/images/luns/9.png',
    name:'科莫白-DT88211',
    sczt:false
  },
  {
    img:'/images/luns/10.jpg',
    name:'科莫白-DT88211',
    sczt:true
  },
  {
    img:'/images/luns/10.jpg',
    name:'科莫白-DT88211',
    sczt:true
  },
  {
    img:'/images/luns/9.png',
    name:'科莫白-DT88211',

  }
  ,
  {
    img:'/images/luns/10.jpg',
    name:'科莫白-DT88211',
    sczt:true
  }
  ,
  {
    img:'/images/luns/9.png',
    name:'科莫白-DT88211',
    sczt:false
  }
  ,
  {
    img:'/images/luns/9.png',
    name:'科莫白-DT88211',
    sczt:false
  }
  ,
  {
    img:'/images/luns/9.png',
    name:'科莫白-DT88211',
    sczt:false
  }
]
 
//动态计算头部2
function toubu2(myData,keys,data,canpxuanz,ind){
  
  for(var c=0;c<keys.length;c++){ 
    for(var d=0;d<keys[c].list.length;d++){
      if(ind==c){ 
        break;
      }else{
        canpxuanz[c]=keys[c].list[d].id
        var zhis= fanhuizfcs(canpxuanz,c,ind)
        console.log(zhis)
        if(getNum(zhis)>0){
          keys[c].list[d].zt=true
        }else{
          keys[c].list[d].zt=false
        }
         canpxuanz[c]=null;
      }
      
    }
  }

  function getNum(key) {
    
      var result = 0,
          i, j, m,
          items, n = [];
      //检查是否已计算过
      if (typeof myData[key] != 'undefined') {
          return myData[key];
      }
  
      items = key.split(";");

      //已选择数据是最小路径，直接从已端数据获取
      if (items.length === keys.length) {
          
          return data[key] ? data[key].count : 0;
      }

      //拼接子串
      for (i = 0; i < keys.length; i++) {

          for (j = 0; j < keys[i].list.length && items.length > 0; j++) {
            
              if (keys[i].list[j].id == items[0]) {
                  break;
              }
          }
  
          if (j < keys[i].list.length && items.length > 0) {
              //找到该项，跳过
              n.push(items.shift());
          } else {
            
             //分解求值
	          for (m = 0; m < keys[i].list.length; m++) {
	   				   if(items==""){
						      var shul=getNum(n.concat(keys[i].list[m].id).join(";"))   
					      }else{
						        var shul=getNum(n.concat(keys[i].list[m].id, items).join(";"))
					        }
	                   result +=shul ;
	               }
	               break;
          }
      }
    
      //缓存
      
      myData[key] = result;
      // console.log(myData)
      return result;
  }
  //返回字符
  function fanhuizfcs(canpxuanz,c,ind){
    var zhi=''
    if(c>ind){
      zhi=canpxuanz[ind]+";"+canpxuanz[c]
    }else{
      zhi=canpxuanz[c]+";"+canpxuanz[ind]
    }
    return zhi;
  }
  
  return {
    myData,
    keys,
    data
  }
}
//动态计算头部1
function toubu(myData,keys,data,canpxuanz){
  var idjh=''
  for(var c=0;c<keys.length;c++){ 
    for(var d=0;d<keys[c].list.length;d++){
      if(canpxuanz[c]){ 
        break;
      }else{
        canpxuanz[c]=keys[c].list[d].id
        var zhis= fanhuizfc(canpxuanz)
        if(getNum(zhis)>0){
          keys[c].list[d].zt=true
        }else{
          keys[c].list[d].zt=false
        }
         canpxuanz[c]=null;
      }
      
    }
  }

  function getNum(key) {
      var result = 0,
          i, j, m,
          items, n = [];
      //检查是否已计算过
      if (typeof myData[key] != 'undefined') {
          return myData[key];
      }
  
      items = key.split(";");

      //已选择数据是最小路径，直接从已端数据获取
      if (items.length === keys.length) {
          // // idjh+=data[key].id
          // console.log(data[key])
          if(data[key]){
            idjh+=data[key].id+","
          }
          return data[key] ? data[key].count : 0;
      }

      //拼接子串
      for (i = 0; i < keys.length; i++) {

          for (j = 0; j < keys[i].list.length && items.length > 0; j++) {
            
              if (keys[i].list[j].id == items[0]) {
                  break;
              }
          }
  
          if (j < keys[i].list.length && items.length > 0) {
              //找到该项，跳过
              n.push(items.shift());
          } else {
            
             //分解求值
	          for (m = 0; m < keys[i].list.length; m++) {
	   				   if(items==""){
						      var shul=getNum(n.concat(keys[i].list[m].id).join(";"))   
					      }else{
						        var shul=getNum(n.concat(keys[i].list[m].id, items).join(";"))
					        }
	                   result +=shul ;
	               }
	               break;
          }
      }
    
      //缓存
      
      myData[key] = result;
      // console.log(myData)
      return result;
  }
  //返回字符
  function fanhuizfc(arr){
    
    var zhi=""
    for(var i=0;i<arr.length;i++){
      if(arr[i]){
          zhi+=arr[i]+";"
      }
    }
    zhi=zhi.substring(0, zhi.length- 1)
    return zhi;
  }
  // console.log(idjh)
  return {
    myData,
    keys,
    data,
    idzfc:idjh
  }
}

//动态计算头部0
function toubu0(myData,keys,data,canpxuanz){
  
  var xuanzjig=arrlength(canpxuanz);
  console.log('选中的id值：',canpxuanz);
  var idjh=''
  console.log('所有的数据',keys);
  for(var c=0;c<keys.length;c++){ 
    // 二重筛选
    for(var d=0;d<keys[c].children.length;d++){
      
      if(canpxuanz[c]){
        if(xuanzjig==canpxuanz.length){
          var zhis=fanhuizfc(canpxuanz)
          getNum(zhis)
        }
        break;
      }else{
        canpxuanz[c]=keys[c].children[d].id
        var zhis= fanhuizfc(canpxuanz)
      
        if(getNum(zhis)>0){
          keys[c].children[d].spread=true
        }else{
          keys[c].children[d].spread=false
        }
         canpxuanz[c]=null;
      }
      
    }
  }

  function getNum(key) {
      var result = 0,
          i, j, m,
          items, n = [];
      //检查是否已计算过
      if (typeof myData[key] != 'undefined') {
          return myData[key];
      }
  
      items = key.split(",");

      //已选择数据是最小路径，直接从已端数据获取
      if (items.length === keys.length) {
          if(data[key]){
            idjh+=data[key].id+","
          }
          return data[key] ? data[key].count : 0;
      }

      //拼接子串
      for (i = 0; i < keys.length; i++) {
          for (j = 0; j < keys[i].children.length && items.length > 0; j++) {
            
              if (keys[i].children[j].id == items[0]) {
                  break;
              }
          }
          if (j < keys[i].children.length && items.length > 0) {
              //找到该项，跳过
              n.push(items.shift());
          } else {
            
             //分解求值
	          for (m = 0; m < keys[i].children.length; m++) {
	   				   if(items==""){
						      var shul=getNum(n.concat(keys[i].children[m].id).join(","))   
					      }else{
						        var shul=getNum(n.concat(keys[i].children[m].id, items).join(","))
					        }
	                   result +=shul ;
	               }
	               break;
          }
      }
    
      //缓存
      
      myData[key] = result;
      // console.log(myData,999)
      return result;
  }
  //返回字符
  function fanhuizfc(arr){
    
    var zhi=""
    for(var i=0;i<arr.length;i++){
      if(arr[i]){
          zhi+=arr[i]+","
      }
    }
    zhi=zhi.substring(0, zhi.length- 1)
    return zhi;
  }
  
   //获得数组实际选了几个
    function arrlength(arr){
    var shu=0;
    for (let i = 0; i < arr.length; i++) {if(arr[i]){shu++}}
    return shu;
    }
    // 字符串去重
    function uniq(zfc){
      var array=zfc.split(",")
      var temp = [];
      var index = [];
      var l = array.length;
      for(var i = 0; i < l; i++) {
          for(var j = i + 1; j < l; j++){
              if (array[i] === array[j]){
                  i++;
                  j = i;
              }
          }
          temp.push(array[i]);
          index.push(i);
      }
      var str=temp.join(",")
      return str;
  }
   
  idjh=idjh.substring(0, idjh.length- 1)
  idjh=uniq(idjh)
  // console.log(idjh,'idzfc')
  return {
    myData,
    keys,
    data,
    idzfc:idjh
  }
}
module.exports = {
  jia: keys,
  keyanli:keyanli,
  anlisub:anlisub,
  toubu,
  toubu2,
  toubu0,
  cpshuj,
  skub:data
}
