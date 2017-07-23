'use strict';

// ({ a: 1, b: 2 }, 'a') => { b: 2 }
// ({ a: 1, b: 2, c: 3 }, ['a', 'b']) => { c: 3 }
function omit(obj, key) {
  if (!this.isObject(obj) || !key in obj) return obj;
  var _obj = {};
  if (typeof key === 'string') {
    for (var i in obj) {
      if (key === i) continue;
      _obj[i] = obj[i];
    }
    return _obj;
  } else {
    for (var _i in obj) {
      if (key.includes(_i)) continue;
      _obj[_i] = obj[_i];
    }
    return _obj;
  }
}

// min <= x < max
// random(0, 10) => 4
function random(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

// leftPad(1, 2, '0') => "01"
// leftPad(17, 5, 0) => "00017"
function leftPad(str, length, fill) {
  var cache = ['', ' ', '  ', '   ', '    ', '     ', '      ', '       ', '        ', '         '];
  str = String(str);
  length = length - str.length;
  if (length <= 0) return str;
  if (!fill && fill !== 0) fill = ' ';
  fill = String(fill);
  if (fill === ' ' && length < 10) return cache[length] + str;
  var pad = '';
  while (true) {
    if (length & 1) pad += fill;
    length >>= 1;
    if (length) fill += fill;else break;
  }
  return pad + str;
}

// randomArr([1,2,3,4]) => [3,1,2,4]
function randomArr(arr) {
  arr = arr.slice();
  var retArr = [];
  var staticArrLen = arr.length;
  var arrLength = staticArrLen;
  var randNum = void 0;
  for (var i = 0; i < staticArrLen; i++) {
    randNum = this.random(0, arrLength);
    retArr.push(arr[randNum]);
    arr.splice(randNum, 1);
    arrLength--;
  }
  return retArr;
}

// addUniqueArray([1,2,3], 3) => [1,2,3]
function addUniqueArray(originArray, ele) {
  if (originArray.indexOf(ele) > -1) {
    return originArray;
  } else {
    return originArray.concat(ele);
  }
}

// [1, 2, 3, 3, 3] => [1, 2, 3]
function uniquify(list) {
  var result = [];
  list.forEach(function (item) {
    if (result.indexOf(item) < 0) {
      result.push(item);
    }
  });
  return result;
}

// 'http://www.a.com', { haha: 123, xixi: 233 }) => 'http://www.a.com?haha=123&xixi=233'
// 'http://www.a.com?wowo=233', { haha: 123, xixi: 233 }) => 'http://www.a.com?haha=123&xixi=233&wowo=233'
function setQuery(url) {
  var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (Object.keys(data).length === 0) return url;

  var _parseQuery = parseQuery(url),
      originData = _parseQuery.data,
      host = _parseQuery.host;

  var query = serialize(Object.assign({}, originData, data));
  return host + '?' + query;
}

// { haha: 123, xixi: 233 } => haha=123&xixi=233
function serialize(data) {
  var keys = Object.keys(data);
  if (keys.length === 0) return '';
  return keys.map(function (key) {
    return key + '=' + data[key];
  }).join('&');
}

// http://www.a.com?haha=123&xixi=233 => { host: 'http://www.a.com', data: { haha: 123, xixi: 233 } }
function parseQuery(url) {
  var signPosition = url.indexOf('?');
  if (signPosition === -1) {
    return { host: url, data: {} };
  } else {
    var host = url.substr(0, signPosition);
    var query = url.substr(signPosition + 1);
    var data = JSON.parse('{"' + query.replace(/&/g, '","').replace(/=/g, '":"') + '"}');
    return { host: host, data: data };
  }
}

function isJSON(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

module.exports = {
  isObject: function isObject(p) {
    return Object.prototype.toString.call(p) === "[object Object]";
  },
  isArray: function isArray(p) {
    return Object.prototype.toString.call(p) === "[object Array]";
  },
  isString: function isString(p) {
    return typeof p === 'string';
  },
  omit: omit,
  random: random,
  leftPad: leftPad,
  randomArr: randomArr,
  isJSON: isJSON,
  addUniqueArray: addUniqueArray,
  uniquify: uniquify,
  setQuery: setQuery,
  serialize: serialize,
  parseQuery: parseQuery
};
