class Util {
    // 时间戳转换日期 （秒）
  timestampToDate(timestamp) {
    var date = new Date(timestamp); //时间戳为10位需*1000
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
    var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
    var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
    var s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
    return Y + M + D + h + m + s;
  }

  // shorter B32 address
  shorterB32Address(address) {
    return address.slice(0, 5)+"...."+address.slice(-5)
  }

  stringToCapitalize(str) {
    var arr = str.toLowerCase().split('_');
    arr = arr.map(function(val) {
      if (val == 'new') {
        val = 'place'
      }
      val = val.slice(0, 1).toUpperCase() + val.slice(1);
      return val
    })
    return arr.join(' ')
  }

  /**
   * cookie操作
   */
  setCookie(name, value, options) {
    options = options || {};
    if (value === null) {
      value = '';
      options.expires = -1;
    }
    var expires = '';
    if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
      var date;
      if (typeof options.expires == 'number') {
        date = new Date();
        date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
      } else {
        date = options.expires;
      }
      expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
    }
    var path = options.path ? '; path=' + options.path : '';
    var domain = options.domain ? '; domain=' + options.domain : '';
    var secure = options.secure ? '; secure' : '';
    var c = [name, '=', encodeURIComponent(value)].join('');
    var cookie = [c, expires, path, domain, secure].join('')
    document.cookie = cookie;
  }

  getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
      var cookies = document.cookie.split(';');
      for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();
        // Does this cookie string begin with the name we want?
        if (cookie.substring(0, name.length + 1) == (name + '=')) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }

  // 数字千分位，保留n位小数格式化
  addCommas(nStr, n = 2) {
    if (typeof(nStr) == 'string') {
      nStr = parseFloat(nStr);
    }
    if (typeof(nStr) == 'number') {
      nStr = nStr.toFixed(n);
    }
    nStr += '';
    let x = nStr.split('.');
    let x1 = x[0];
    let x2 = x.length > 1 ? '.' + x[1] : '';
    let rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
      x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
  }

  getFullNum(num) {
    //处理非数字
    if (isNaN(num)) { return num }

    //处理不需要转换的数字
    var str = '' + num;
    if (!/e/i.test(str)) { return num; }

    return (num).toFixed(18).replace(/\.?0+$/, "");
  }

  setSession(key, value){
    value = JSON.stringify(value);
    sessionStorage.setItem(key, value);
  }

  getSession(key){
    if (key == "") return "";
    let value = sessionStorage.getItem(key);
    if (value == ""){
      return "";
    }
    return value;
  }

  delSession(key){
    if (key){
      sessionStorage.removeItem(key);
    }
  }
}

let util = new Util;

export default util;
