export function saveResDataToSession(data) {
  // 用户遍历传回来的数据并保存到sessionStorage中
  // data: Object
  for (let key in data){
    if(data.hasOwnProperty(key)){
      sessionStorage.setItem(key,data[key])
    }
  }
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
