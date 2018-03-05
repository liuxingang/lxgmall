
'use strict';
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navSide = require('page/common/nav-side/index.js');
var _mm = require('util/mm.js');
var _user = require('service/user-service.js');
// var templateIndex = require("./index.string");


// page  逻辑部分
var page = {
    init: function () {
        this.onLoad();
        this.bindEvent();
    },
    onLoad: function () {
        // 初始化左侧菜单
        navSide.init({
            name:'user-pass-update'
        });
        // 加载用户信息
        this.loadUserInfo();
    },
    bindEvent: function () {
        var _this = this;
        //点击提交按钮后的动作
        $(document).on('click','.btn-submit',function () {
            var userInfo = {
                    password: $.trim($("#password").val()),
                    passwordNew: $.trim($("#password-new").val()),
                    passwordConfirm: $.trim($("#password-confirm").val()),
                },
                valdateResult = _this.validateForm(userInfo);
            if(valdateResult.status){
                // 更改用户密码
                _user.updatePassword({
                    passwordOld: userInfo.password,
                    passwordNew: userInfo.passwordNew
                },function (res,msg) {
                    _mm.successTip(msg);
                },function (errMsg) {
                    _mm.errorTips(errMsg);
                });
            }else{
                _mm.errorTips(valdateResult.msg);
            }
        })
    },
    // 加载用户信息
    loadUserInfo: function () {
        var userHtml = '';
        _user.getUserInfo(function (res) {
            // userHtml = _mm.renderHtml(templateIndex, res);
            // $('.panel-body').html(userHtml);
        },function (errMsg) {
            _mm.errorTips(errMsg);
        })
    },
    //验证字段信息
    validateForm: function (formData) {
        var result = {
            status: false,
            msg: ''
        };
        if(!_mm.validate(formData.password, 'require')){
            result.msg = '原密码不能为空';
            return result;
        }
        if(!formData.passwordNew || formData.passwordNew.length < 6){
            result.msg = '新密码长度不得小于6位';
            return result;
        }
        if(formData.passwordNew !== formData.passwordConfirm){
            result.msg = '两次输入的密码不一致';
            return result;
        }
        // 通过验证
        result.status = true;
        result.msg = "验证通过";
        return result;
    }
};

$(function () {
    page.init();
});