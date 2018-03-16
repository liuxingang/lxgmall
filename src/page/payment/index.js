'use strict';
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');

var _mm = require('util/mm.js');
var _payment = require('service/payment-service.js');
var templateIndex = require("./index.string");


// page  逻辑部分
var page = {
    data: {
        orderNumber: _mm.getUrlParam('orderNumber')
    },
    init: function () {
        this.onLoad();
    },
    onLoad: function () {
        this.loadPaymentInfo();
    },
    // 加载订单详情
    loadPaymentInfo: function () {
        var _this = this,
            paymentHtml = '',
            $pageWrap = $('.page-wrap');
        $pageWrap.html('<div class="loading"></div>');

        _payment.getPaymentInfo(this.data.orderNumber, function (res) {
            paymentHtml = _mm.renderHtml(templateIndex, res);
            $pageWrap.html(paymentHtml);
            _this.listenOrderStatus();
        }, function (errMsg) {
            $pageWrap.html('<p class="err-tip">' + errMsg + '</p>')
        })
    },
    //监听订单状态
    listenOrderStatus: function () {
        var _this = this;
        _this.getNumber = 0
        this.paymentTimer = window.setInterval(function () {
            _payment.getPaymentStatus(_this.data.orderNumber, function (res) {
                _this.getNumber +=1;
                if(_this.getNumber == 5){
                    res = true
                }
                if(res == true){
                    window.location.href = './result.html?type=payment&orderNumber='+ _this.data.orderNumber;
                }
            })
        },5000)
    }
};

$(function () {
    page.init();
});