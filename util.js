/**
 * 时间戳转日期字符串
 * @param {Object} dateObj 日期对象： new Date(时间戳)
 * @param {String} format 格式：yyyy.MM.dd hh:mm'
 * @returns 日期字符串
 */
export function timeFormat(dateObj, formater) {
  if (!dateObj) return '';
  var format = formater || 'yyyy.MM.dd';
  var date = {
    "M+": dateObj.getMonth() + 1,
    "d+": dateObj.getDate(),
    "h+": dateObj.getHours(),
    "m+": dateObj.getMinutes(),
    "s+": dateObj.getSeconds(),
    "q+": Math.floor((dateObj.getMonth() + 3) / 3),
    "S+": dateObj.getMilliseconds()
  };
  if (/(y+)/i.test(format)) {
    format = format.replace(RegExp.$1, (dateObj.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  for (var k in date) {
    if (new RegExp("(" + k + ")").test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length == 1 ?
        date[ k ] : ("00" + date[ k ]).substr(("" + date[ k ]).length));
    }
  }
  return format;
};

/**
 * 节流器
 * @param method
 * @param obj
 */
export function throttle (method, obj, time) {
  var durTime = time ? time : 500;
  clearTimeout(method.tId);
  method.tId = setTimeout(function () {
    method.call(obj);
  }, durTime);
};

/**
 * 阻止冒泡
 * @param event
 */
export function stopBubble(event) {
  event.stopPropagation ? event.stopPropagation() : event.cancelBubble = true;
};

/**
 * 阻止默认事件
 * @param event
 */
export function stopDefault(event) {
  event.preventDefault ? event.preventDefault() : event.returnValue = false;
};

/**
 * 设置cookie
 * @param name
 * @param value
 * @param options {json} 必填
 */
export function setCookie(name, value, options, type) {
  var odate = new Date();
  // original模式写入原始值,getCookie也需该模式
  var _value = type && type.toLowerCase() === 'original' ? value : escape(value);
  // 配置cookie有效期，必填，单位为天数
  options && options.expires ? odate.setTime(odate.getTime() + 1000 * 3600 * 24 * options.expires) : '';
  document.cookie = [
    name + '=' + _value,
    options && options.expires ? '; expires=' + odate.toUTCString() : '', // use expires a   ttribute, max-age is not supported by IE
    options && options.path ? '; path=' + options.path : '; path=/', // 默认为根目录
    options && options.domain ? '; domain=' + options.domain : '', // 默认当前域名
    options && options.secure ? '; secure=' + options.secure : '' // 0 or 1，默认为0，1表示只能在https传输
  ].join('');
};


/**
 * 获取cookie
 * @param name
 * @returns {string}
 */
export function getCookie(name, type) {
  var cookieArray = document.cookie.split('; ');
  var i, len, lock = true;
  for (i = 0, len = cookieArray.length; i < len; i++) {
    var listArray = cookieArray[ i ].split('=');
    if (listArray[ 0 ] == name) {
      var _value = type && type.toLowerCase() === 'original' ? listArray[ 1 ] : unescape(listArray[ 1 ]);
      return _value;
      lock = false;
      break;
    }
  }
  if (lock) {
    return '';
  }
};

/**
 * 获取页面 UserAgent
 * @returns {{isUA: string, isWechat: boolean, isQQ: boolean, isQQBrowser: boolean, isUC: boolean, isIos: boolean, isAndroid: boolean, isUcsdk: boolean, isNG: boolean, isNGios: boolean, isNGandroid: boolean}}
 */
export function getUA() {
  const ua = navigator.userAgent;
  return {
    isUA: ua,
    isWechat: !!ua.match(/MicroMessenger/i),
    isQQ: !!ua.match(/QQ\//i), // QQ客户端
    isQQBrowser: !!ua.match(/MQQBrowser/i) && !ua.match(/QQ\//i), // QQ浏览器
    isUC: !!ua.match(/UCBrowser/i) && !ua.match(/(ucbs|uws)/i),
    isIos: !!ua.match(/(iPad|iPhone|iPod)/i),
    isAndroid: !!ua.match(/Android/i),
    isUcsdk: !!ua.match(/ucsdk/i),
    isNG: !!ua.match(/ninegameclient/i),
    isNGios: !!ua.match(/ninegameclient\/ios/i),
    isNGandroid: !!ua.match(/ninegameclient\/android/i),
  }
};