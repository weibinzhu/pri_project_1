export function saveResDataToSession(data) {
  // 用户遍历传回来的数据并保存到sessionStorage中
  // data: Object
  for (let key in data){
    if(data.hasOwnProperty(key)){
      sessionStorage.setItem(key,data[key])
    }
  }
}

export function uploadPhoto(file,url,token,previewReceiver,fileReceiver){
  // 此函数依赖vue-resource
  // 返回一个相应数据，是一个装有图片路径的Array
  // file: Object-由input传进来的文件，一般是event.target.files[0]
  // url: String-上传目标地址
  // token: String-用户token
  // previewReceiver: Array-用来接收预览用的base64 图片的数组
  // fileReceiver: 用来存响应回来的数据
  let formData = new FormData()
  let reader = new FileReader()
  reader.onload = (e) => {
    previewReceiver.push(e.target.result)
  }
  reader.readAsDataURL(file);
  formData.append(Math.random(), file)
  this.$http.post(url, formData, {
    emulateJSON: true,
    headers: {'token': token}
  }).then((res) => {
    // fileReceiver =  res.body.data
    for(let item of res.body.data){
      fileReceiver.push(item)
    }// push 可以，直接赋值不行
  })
}

export function formatDate(date, fmt) {
  // 格式化日期
// 用正则表达式
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
};

function padLeftZero(str) {
  return ('00' + str).substr(str.length);
}
