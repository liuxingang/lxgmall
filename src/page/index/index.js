// require('./index.css');
// require('../module.js');
'use strict';
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navSide = require('page/common/nav-side/index.js');
var _mm = require('util/mm.js');

navSide.init({
    name: 'user-center'
});

// _mm.request({
//     url: '/product/list.do?keyword=1',
//     success: function (res) {
//         console.log(res);
//     },
//     error: function (errMsg) {
//         console.log(errMsg);
//     }
// })
// var html = '<div>{{data}}</div>';
// var data = {
//     data:123
// };
//
// console.log(_mm.renderHtml(html,data))