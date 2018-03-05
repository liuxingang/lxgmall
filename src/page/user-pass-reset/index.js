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
    data: {
        username:'',
        question:'',
        answer:'',
        token:''
    },
    init: function () {
        this.onload();
        this.bindEvent();
    },
    onload: function () {
      this.loadStepUsername();
    },
    bindEvent: function () {
        var _this = this;
        //输入用户名后点击
        $('#submit-username').click(function () {
            var username = $.trim($('#username').val());
            if(username){
                _user.getQuestion(username, function (res) {
                    _this.data.username = username;
                    _this.data.question = res;
                    _this.loadStepQuestion();
                },function (errMsg) {
                    formError.show(errMsg);
                })
            }else{
                formError.show('请输入用户名');
            }
        });
        // 输入密码提示问题答案中的下一步
        $('#submit-question').click(function () {
            var answer = $.trim($('#username').val());
            if(answer){
                // 检查密码提示答案
                _user.checkAnswer({
                    username: _this.data.username,
                    question: _this.data.question,
                    answer: answer
                }, function (res) {
                    _this.data.answer = answer;
                    _this.data.token = res;
                    _this.loadStepPassword();
                },function (errMsg) {
                    formError.show(errMsg);
                })
            }else{
                formError.show('请输入正确的答案');
            }
        });

        // 输入新密码后的按钮点击
        $('#submit-password').click(function () {
            var password = $.trim($('#password').val());
            if(password && password.length >=6){
                // 检查密码提示答案
                _user.resetPassword({
                    username: _this.data.username,
                    passwordNew: password,
                    forgetToken: _this.data.token
                }, function (res) {
                    window.location.href = './result.html?type=pass-reset'
                },function (errMsg) {
                    formError.show(errMsg);
                })
            }else{
                formError.show('请输入不少于6位的新密码');
            }
        });

    },
    // 加载输入用户名
   loadStepUsername: function () {
       $('.step-username').show();
   },
    // 提示问题答案
   loadStepQuestion: function () {
        formError.hide();
       $('.step-username').hide().siblings('.step-question')
           .show().find('.question').text(this.data.question);
    },
    //
    loadStepPassword: function () {
        formError.hide();
        $('.step-question').hide().siblings('.step-password').show();
    },
};

$(function () {
    page.init();
});