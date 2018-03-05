'use strict';
require('./index.css');
require('page/common/nav-simple/index.js');
var _mm = require('util/mm.js');
var _user = require('service/user-service.js');

// form error
var formError = {
  show: function (errMsg) {
      $('.error-item').show().find('.err-msg').text(errMsg);
  },
  hide: function () {
      $('.error-item').hide().find('.err-msg').text('');
  }
};

// page  逻辑部分
var page = {
    init: function () {
        this.bindEvent();
    },
    bindEvent: function () {
        var _this = this;
        // 验证username
        $('#username').blur(function () {
            var username = $.trim($(this).val());
            if(!username){
                return;
            }
            //异步验证用户名是否存在
            _user.checkUsername(username,function (res) {
                formError.hide();
            },function (errMsg) {
                formError.show(errMsg);
            });
        });
        //注册按钮的点击
        $('#submit').click(function () {
            _this.submit();
        })
        // 如果按下回车，也进行提交
        $('.user-content').keyup(function (e) {
            if(e.keyCode===13){
                _this.submit();
            }
        })
    },
    // 提交表单
    submit: function () {
        var formData = {
            username: $.trim($('#username').val()),
            password: $.trim($('#password').val()),
            passwordConfim: $.trim($('#password-confirm').val()),
            phone: $.trim($('#phone').val()),
            email: $.trim($('#email').val()),
            question: $.trim($('#question').val()),
            answer: $.trim($('#answer').val())
        };
        // 表单验证结果
        var validateResult = this.formValidate(formData);
        //验证成功
        if(validateResult.status){
            _user.register(formData, function (res) {
               window.location.href = './result.html?type=register';
            },function (errMsg) {
                formError.show(errMsg);
            })
        }else{
            // 验证失败
            formError.show(validateResult.msg);
        }
    },
    formValidate: function (formData) {
        var result = {
            status: false,
            msg: ''
        };
        if(!_mm.validate(formData.username, 'require')){
            result.msg = '用户名不能为空';
            return result;
        }
        if(!_mm.validate(formData.password, 'require')){
            result.msg = '密码不能为空';
            return result;
        }
        if(formData.password.length < 6){
            result.msg = '密码长度不能小于6位';
            return result;
        }
        if(formData.password !== formData.passwordConfim){
            result.msg = '两次输入的密码不一致';
            return result;
        }
        if(!_mm.validate(formData.phone, 'phone')){
            result.msg = '手机号输入不正确';
            return result;
        }
        if(!_mm.validate(formData.email, 'email')){
            result.msg = '邮箱输入不正确';
            return result;
        }
        if(!_mm.validate(formData.question, 'require')){
            result.msg = '密码提示问题不能为空';
            return result;
        }
        if(!_mm.validate(formData.answer, 'require')){
            result.msg = '密码提示问题答案不能为空';
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