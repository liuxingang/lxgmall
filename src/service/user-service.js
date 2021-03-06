'use strict';

var _mm = require("util/mm.js");

var _user = {
    //用户登录
    login: function (userInfo, resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/user/login.do'),
            method: 'POST',
            data: userInfo,
            success: resolve,
            error: reject
        })
    },

    //检测用户名
    checkUsername: function (username, resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/user/check_valid.do'),
            method: 'POST',
            data: {
                type: 'username',
                str: username
            },
            success: resolve,
            error: reject
        })
    },

    //用户注册
    register: function (userInfo, resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/user/register.do'),
            method: 'POST',
            data: userInfo,
            success: resolve,
            error: reject
        })
    },

    //检查登录状态
    checkLogin: function (resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/user/get_user_info.do'),
            method: 'POST',
            success: resolve,
            error: reject
        })
    },
    //获取用户密码提示问题
    getQuestion:function (username, resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/user/forget_get_question.do'),
            method: 'POST',
            data: {
                username: username
            },
            success: resolve,
            error: reject
        })
    },
    //获取用户密码提示问题答案
    checkAnswer:function (userInfo, resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/user/forget_check_answer.do'),
            method: 'POST',
            data: userInfo,
            success: resolve,
            error: reject
        })
    },
    resetPassword:function (userInfo, resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/user/forget_reset_password.do'),
            method: 'POST',
            data: userInfo,
            success: resolve,
            error: reject
        })
    },
    // 获取用户信息
    getUserInfo:function (resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/user/get_information.do'),
            method: 'POST',
            success: resolve,
            error: reject
        })
    },
    //更新个人信息
    updateUserInfo:function (userInfo, resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/user/update_information.do'),
            method: 'POST',
            data: userInfo,
            success: resolve,
            error: reject
        })
    },
    //登录状态下修改密码
    updatePassword:function (userInfo, resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/user/reset_password.do'),
            method: 'POST',
            data: userInfo,
            success: resolve,
            error: reject
        })
    },
    //退出登录
    logout: function (resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/user/logout.do'),
            method: 'POST',
            success: resolve,
            error: reject
        })
    }
};

module.exports = _user;