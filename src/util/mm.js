/*
* 通用工具类
* */
'use strict';
var Hogan = require('hogan.js');
var conf = {
    serverHost: ''
}

var _mm = {
    //网络请求
    request: function (param) {
        var _this = this;
        $.ajax({
            type: param.method || 'get',
            url: param.url || '',
            dataType: param.type || 'json',
            data: param.data || '',
            success: function (res) {
                if (res.status === 0) {  //请求成功
                    typeof param.success === 'function' && param.success(res.data, res.msg);
                } else if (res.status === 10) {  // 没有登录状态，需要强制登录
                    _this.doLogin();
                } else if (res.status === 1) { //请求数据错误
                    typeof param.error === 'function' && param.error(res.msg);
                }

            },
            error: function (err) {
                typeof param.error === 'function' && param.error(err.status);

            }

        })
    },
    //获取服务器地址
    getServerUrl: function (path) {
        return conf.serverHost + path;
    },
    //获取url 参数
    getUrlParam: function (name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
        var result = window.location.search.substr(1).match(reg);
        return result ? decodeURIComponent(result[2]) : null;
    },
    // 渲染html 模板
    renderHtml : function (htmlTemplate, data) {
        var template = Hogan.compile(htmlTemplate),
            result = template.render(data);
        return result;
    },
    //成功提示
    successTip: function (msg) {
        alert(msg || '操作成功!');
    },
    //错误提示
    errorTips: function (msg) {
        alert(msg || '哪里不对了~');
    },
    //校验
    validate: function (value, type) {
        var value = $.trim(value);
        // 非空验证
        if('require' === type){
            return !!value;
        }
        // 手机号验证
        if(type === 'phone'){
            return /^1\d{10}$/.test(value);
        }
        // 邮箱验证
        if(type === 'email'){
            return /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/.test(value);
        }
    },
    //统一登录处理
    doLogin: function () {
        window.location.href = './user-login.html?redirect=' + encodeURIComponent(window.location.href);
    },
    goHome: function () {
        window.location.href = './index.html';
    }
};

module.exports = _mm;