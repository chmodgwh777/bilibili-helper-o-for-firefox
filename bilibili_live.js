/**
 * Created by Ruo on 4/12/2016.
 */
(function () {
    if (location.hostname == 'live.bilibili.com') {
        var Live = {};
        Live.set = function (k, v) {
            if (!window.localStorage) return;
            var l = JSON.parse(window.localStorage.live);
            l[k] = JSON.stringify(v);
            window.localStorage.live = JSON.stringify(l);
        };
        Live.get = function (k) {
            if (!window.localStorage) return;
            var l = JSON.parse(window.localStorage.live);
            return l[k];
        };
        Live.del = function (k) {
            if (!window.localStorage) return;
            var l = JSON.parse(window.localStorage.live);
            delete l[k];
            window.localStorage.live = JSON.stringify(l);
        };
        var live_sotre = (function () {
            if (!window.localStorage) return;
            if (window.localStorage.live) return window.localStorage.live;
            else {
                return window.localStorage.live = JSON.stringify({});
            }
        })();

        Live.doSign = {
            sign: function () {
                var date = new Date().getDate();
                if (Live.get('today') == false || Live.get('signDate') != date) {
                    $.get("/sign/doSign", function (data) {
                        var e = JSON.parse(data);
                        if (e.code == 0) {
                            var msg = new Notification(eval("'" + e.msg + "'"), {
                                body: "获得" + e.data.silver + "瓜子~",
                                icon: "//static.hdslb.com/live-static/images/7.png"
                            });
                            Live.set('today', true);
                            Live.set('signDate', date);
                            setTimeout(function () {
                                msg.close();
                            }, 1000);
                        } else if (e.code == -500) {
                            var msg = new Notification(eval("'" + e.msg + "'"), {
                                body: "不能重复签到",
                                icon: "//static.hdslb.com/live-static/live-room/images/gift-section/gift-1.gif"
                            });
                            Live.set('today', true);
                            Live.set('signDate', date);
                            setTimeout(function () {
                                msg.close()
                            }, 5000);
                        }
                        else if (e.code == -101) {
                            var msg = new Notification(eval("'" + e.msg + "'"), {
                                body: "您还没有登录",
                                icon: "//static.hdslb.com/live-static/live-room/images/gift-section/gift-1.gif"
                            });
                            setTimeout(function () {
                                msg.close()
                            }, 5000);
                        }
                    });
                }
            }
        };
        Live.bet = {
            times: 0,
            stop: false,
            rate: undefined,
            number: undefined,
            interval:undefined,
            init: function () {
                var bet = Live.bet.getBet();
                console.log(bet);
                if (bet.isBet == false) return;//none bet permission
                if (bet.betStatus == false) return;//bet is not on

                /*create quiz helper*/
                Live.bet.quiz_panel = $('#quiz-control-panel');
                Live.bet.quiz_helper = $('<div id="quiz_helper"></div>');
                //var quiz_helper_title = $('<h4 class="section-title"><span style="font-size: 13px;margin:30px 0 10px;display: block;">下注预约</span></h4>');
                Live.bet.quiz_rate = $('<input class="rate" type="text"  placeholder="赔率" maxlength="3" required="required" />');
                Live.bet.quiz_number = $('<input class="number" type="text" placeholder="数额" maxlength="8" required="required" />');
                Live.bet.quiz_btns = $('<div class="bet-buy-btns p-relative clear-float"></div>');
                Live.bet.quiz_cancel_btn = $('<button class="cancel hide">取消下注</button>');
                Live.bet.quiz_success_btn = $('<button class="success hide">下注成功 - 点击继续下注</button>');
                Live.bet.quiz_blue_btn = $('<button class="bet-buy-btn blue float-left" data-target="a" data-type="silver">填坑</button>');
                Live.bet.quiz_red_btn = $('<button class="bet-buy-btn pink float-right" data-target="b" data-type="silver">填坑</button>');
                Live.bet.quiz_btns.append(Live.bet.quiz_blue_btn, Live.bet.quiz_red_btn);
                Live.bet.quiz_helper.append(
                    Live.bet.quiz_success_btn,
                    Live.bet.quiz_cancel_btn,
                    $('<div class="quiz_helper">').append($('<span class="rate_title">').text('赔率'), Live.bet.quiz_rate),
                    $('<div class="quiz_helper">').append($('<span class="number_title">').text('   数额'), Live.bet.quiz_number),
                    Live.bet.quiz_btns
                )
                Live.bet.quiz_panel.append(Live.bet.quiz_helper);

                /*delete default button*/
                $('.bet-buy-ctnr.dp-none').children('.bet-buy-btns').hide();

                /*add listener*/
                Live.bet.quiz_blue_btn.click(function () {
                    Live.bet.stop = false;

                    if (Live.bet.quiz_rate.val() == '') {
                        Live.bet.quiz_rate.addClass('error');
                        return;
                    } else Live.bet.quiz_rate.removeClass('error');
                    if (Live.bet.quiz_number.val() == '') {
                        Live.bet.quiz_number.addClass('error');
                        return;
                    } else Live.bet.quiz_number.removeClass('error');

                    Live.bet.rate = parseFloat(Live.bet.quiz_rate.val());
                    if (Live.bet.rate.length > 3) Live.bet.rate = Live.bet.rate.toFixed(1);
                    Live.bet.number = parseFloat(Live.bet.quiz_number.val());

                    Live.bet.which = 0;

                    Live.bet.quiz_cancel_btn.text('取消下注 ' + Live.bet.rate + ' / ' + Live.bet.number + ' 买蓝');

                    Live.bet.startInterval();
                    Live.bet.quiz_helper.children('input,div').addClass('hide');
                    Live.bet.quiz_helper.children('.cancel').removeClass('hide');
                });
                Live.bet.quiz_red_btn.click(function () {
                    Live.bet.stop = false;
                    if (Live.bet.quiz_rate.val() == '') {
                        Live.bet.quiz_rate.addClass('error');
                        return;
                    } else Live.bet.quiz_rate.removeClass('error');
                    if (Live.bet.quiz_number.val() == '') {
                        Live.bet.quiz_number.addClass('error');
                        return;
                    } else Live.bet.quiz_number.removeClass('error');

                    Live.bet.rate = parseFloat(Live.bet.quiz_rate.val());
                    if (Live.bet.rate.length > 3) Live.bet.rate = Live.bet.rate.toFixed(1);
                    Live.bet.number = parseFloat(Live.bet.quiz_number.val());

                    Live.bet.which = 1;

                    Live.bet.quiz_cancel_btn.text('取消下注 ' + Live.bet.rate + ' / ' + Live.bet.number + ' 买红');

                    Live.bet.startInterval();
                    Live.bet.quiz_helper.children('input,div').addClass('hide');
                    Live.bet.quiz_helper.children('.cancel').removeClass('hide');
                });
                Live.bet.quiz_cancel_btn.click(function () {
                    Live.bet.stop = true;
                    Live.bet.quiz_helper.children('input,div').removeClass('hide');
                    Live.bet.quiz_helper.children('button').addClass('hide');
                });
                Live.bet.quiz_success_btn.click(function () {
                    Live.bet.quiz_cancel_btn.click();
                })
            },
            getBet: function () {
                var bet =
                    $.ajax({
                        url: 'http://live.bilibili.com/bet/getRoomBet',
                        type: 'POST',
                        dataType: 'json',
                        async: false,
                        data: {roomid: location.pathname.substr(1)}
                    }).responseText;
                return JSON.parse(bet).data;
            },
            startInterval: function () {
               Live.bet.interval = setInterval(function () {
                    var bet = Live.bet.getBet();
                    var bankerId = Live.bet.which ? bet.silver.b.id : bet.silver.a.id;
                    var times = Live.bet.which ? bet.silver.b.times : bet.silver.a.times;
                    if (Live.bet.stop) clearInterval(Live.bet.interval);
                    if (times >= Live.bet.rate) {
                        $.ajax({
                            url: 'http://live.bilibili.com/bet/addBettor',
                            type: 'POST',
                            dataType: 'json',
                            data: {
                                bankerId: bankerId,
                                amount: Live.bet.number,
                                token: __GetCookie('LIVE_LOGIN_DATA')
                            },
                            complete: function (data, ts) {
                                b = JSON.parse(data.responseText).data;
                                Live.bet.quiz_cancel_btn.addClass('hide');
                                Live.bet.quiz_success_btn.removeClass('hide');
                                clearInterval(Live.bet.interval);
                            }
                        });
                    }
                }, 2000);
            }
        }
        Live.bet.init();
        Live.bet.getBet();
        setInterval(function () {
            Live.doSign.sign();
        }, 300000); //doSign per 5 min

        Notification.requestPermission();
    }
})();