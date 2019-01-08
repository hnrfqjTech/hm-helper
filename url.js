// 获取hostname [http://localhost:3000]
export function getHostName() {
  var hostIndex = window.location.href.indexOf(window.location.pathname);
  return window.location.href.substring(0, hostIndex);
};

// 获取顶级域名
export function getTopDomain() {
  var topDomains = [
    '.com.cn', '.edu.cn', '.net.cn', '.org.cn', '.gov.cn', '.edu', '.cn', '.com'
  ]; // 默认domain时, 处理的顶级域名集合, 一层域名写在数组最后
  var hostname = window.location.hostname,
    _domain;
  for (var i = 0; i < topDomains.length; i++) {
    var top = topDomains[ i ];
    var idx = hostname.lastIndexOf(top);
    if (idx > 0) {
      var left = hostname.substring(idx, hostname.length);
      if (left === top) {
        var front = hostname.substring(0, idx);
        _domain = front.substring(front.lastIndexOf('.'), front.length) + top;
        break;
      }
    }
  }
  if (!_domain) _domain = hostname;
  return _domain;
};

/**
 * 给指定链接绑定query参数
 * @param key 参数
 * @param val 参数的值
 * @param baseUrl 指定的链接，默认不用传，取当前链接
 * @returns {string} 新的链接
 */
export function urlAddQuery(key, val, baseUrl) {
  var _href = baseUrl ? baseUrl : window.location.href;
  var reg = /\?\w+/;
  var _handle = function (str) {
    // 结尾是某符号
    if (str === _href.substr(_href.length - 1)) {
      _href += key + '=' + val;
    } else {
      _href += str + '' + key + '=' + val;
    }
  }

  if (reg.test(_href)) { // ?a
    var _index = _href.indexOf('?');
    var _searchStr = _href.substr(_index + 1);
    if (_searchStr.search(key) > -1) { // 覆写
      var _searchArr = _searchStr.split('&');
      var _tempArr = [];
      _searchArr.forEach(function (v) {
        var tempArr = v.split('=');
        if (tempArr[ 0 ] === key) tempArr[ 1 ] = val;
        _tempArr.push(tempArr.join('='));
      });

      _href = _href.substring(0, _href.indexOf('?')) + '?' + _tempArr.join('&');
    } else {
      _handle('&');
    }
  } else { // ? or none
    _handle('?');
  }
  return _href;
};

/**
 * 根据url参数取值
 * @param {String} key
 * @returns val
 */
export function getQueryByKey(key) {
  var query_arr = window.location.search.substring(1).split('&'),
    _val;
  var _list = {},
    _temp,
    _index,
    match_lens;
  if (query_arr[ 0 ]) {
    for (var i in query_arr) {
      match_lens = query_arr[ i ].match(/=/g) && query_arr[ i ].match(/=/g).length;
      if (match_lens > 1) {
        _index = query_arr[ i ].indexOf('=');
        _list[ query_arr[ i ].substring(0, _index) ] = query_arr[ i ].substring(_index + 1);
      } else {
        _temp = query_arr[ i ].split('=');
        _list[ _temp[ 0 ] ] = _temp[ 1 ];
      }
    }
    if (key) {
      _val = _list[ key ];
    } else {
      _val = _list;
    }
  }
  return _val;
};

/**
* 链接去掉参数
*/
export function urlClearQuery(url) {
  if (url && url.indexOf('?') > 0) {
    return url.split('?')[ 0 ];
  }
  return url;
};

/**
 * URL重定向
 * @param href 跳转地址
 * @param time 等待时长
 */
export function redirect(href, time) {
  setTimeout(function () {
    window.location.href = href;
  }, time);
};