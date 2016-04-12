function __GetCookie(e) {
    var t = "" + document.cookie;
    var n = t.indexOf(e);
    if (n == -1 || e == "")return "";
    var r = t.indexOf(";", n);
    if (r == -1)r = t.length;
    return unescape(t.substring(n + e.length + 1, r))
}
function __SetCookie(e, t) {
    var n = 365;
    var r = new Date;
    r.setTime(r.getTime() + n * 24 * 60 * 60 * 1e3);
    document.cookie = e + "=" + escape(t) + ";expires=" + r.toGMTString() + "; path=/; domain=.bilibili.com"
}
function ChatGetSettings(e) {
    if (typeof localStorage != "undefined") {
        return localStorage.getItem(e)
    } else {
        return __GetCookie(e)
    }
}
function ChatSaveSettings(e, t) {
    if (typeof localStorage != "undefined") {
        return localStorage.setItem(e, t)
    } else {
        return __SetCookie(e, t)
    }
}
function MessageBox(e) {
    if (typeof e == "undefined") {
        this.evType = "over";
        this.Overlap = false;
        this.focusShowPos = false;
        this.zIndex = 1e4;
        return
    } else if (typeof e == "string") {
        this.evType = e
    } else {
        this.evType = typeof e.evType == "undefined" ? "over" : e.evType
    }
    this.Overlap = typeof e.Overlap == "undefined" ? false : e.Overlap;
    this.focusShowPos = typeof e.focusShowPos == "undefined" ? false : e.focusShowPos;
    if (typeof e.position != "undefined") {
        this.sp_position = {left: e.position.left, top: e.position.top}
    }
    if (typeof e.zIndex != "undefined") {
        this.zIndex = e.zIndex
    } else {
        this.zIndex = 1e4
    }
}
function loadFB(e, t, n) {
    var r = "/feedback/arc-" + e + "-" + t + ".html?r=" + Math.random();
    if (r == lastPage)return;
    lastPage = r;
    $(".comm > .loading").remove();
    $('<div class="loading"></div>').prependTo(".comm");
    var i = new Date;
    $.ajax(lastPage, {
        success: function (e) {
            var t = (new Date).getTime() - i.getTime();
            if (t < 500) {
                setTimeout(function () {
                    $(".comm").html(e);
                    if (typeof n != "undefined")n();
                    bindCardEvent()
                }, 300 - t <= 0 ? 10 : 300 - t)
            } else {
                $(".comm").html(e);
                if (typeof n != "undefined")n();
                bindCardEvent()
            }
        }
    })
}
function searchAT() {
    searchKW = $("#search_key").val();
    loadAT(1)
}
function loadAT(e) {
    var t = "/feedback/at-" + e + ".html?search=" + searchKW + "&att=" + ($(".ms-btn.addinfo").hasClass("on") ? 1 : 0) + "&r=" + Math.random();
    if (t == lastPage)return;
    lastPage = t;
    $("#atme.atlist > .loading").remove();
    $('<div class="loading"></div>').prependTo("#atme.atlist");
    var n = new Date;
    $.ajax(lastPage, {
        success: function (e) {
            var t = (new Date).getTime() - n.getTime();
            if (t < 500) {
                setTimeout(function () {
                    $("#atme.atlist").html(e);
                    bindCardEvent()
                }, 300 - t <= 0 ? 10 : 300 - t)
            } else {
                $("#atme.atlist").html(e);
                bindCardEvent()
            }
        }
    })
}
function searchDyn() {
    searchKW = $("#search_key").val();
    loadDyn(1)
}
function loadDyn(e) {
    var t = "/dynamic/dyn-" + e + ".html?search=" + searchKW + "&fb=" + ($(".ms-btn.comm").hasClass("on") ? 1 : 0) + "&r=" + Math.random();
    if (t == lastPage)return;
    lastPage = t;
    $("#dynlist.atlist > .loading").remove();
    $('<div class="loading"></div>').prependTo("#dynlist.atlist");
    var n = new Date;
    $.ajax(lastPage, {
        success: function (e) {
            var t = (new Date).getTime() - n.getTime();
            if (t < 500) {
                setTimeout(function () {
                    $("#dynlist.atlist").html(e);
                    bindCardEvent()
                }, 300 - t <= 0 ? 10 : 300 - t)
            } else {
                $("#dynlist.atlist").html(e);
                bindCardEvent()
            }
        }
    })
}
function agFB(e, t, n, r) {
    $.ajax("/feedback/agreement?aid=" + t + "&news_id=" + n + "&rid=" + r, {
        success: function (t) {
            if (t != "OK") {
                (new MessageBox).show(e, t, 2e3, "warning")
            } else {
                var n = $(e).children("b").html();
                n = n.substr(2);
                n = n.substr(0, n.length - 1);
                $(e).children("b").html("(+" + (parseInt(n) + 1) + ")");
                (new MessageBox).show(e, "赞同成功", 500, "info")
            }
        }, error: function () {
            (new MessageBox).show(e, "发送失败，请检查您的网络或发送邮件至 orz#hdslb.com", 2e3, "error")
        }
    });
    return false
}
function dagFB(e, t, n, r) {
    $.ajax("/feedback/disagreement?aid=" + t + "&news_id=" + n + "&rid=" + r, {
        success: function (t) {
            if (t != "OK") {
                (new MessageBox).show(e, t, 2e3, "warning")
            } else {
                var n = $(e).children("b").html();
                n = n.substr(2);
                n = n.substr(0, n.length - 1);
                $(e).children("b").html("(+" + (parseInt(n) + 1) + ")");
                (new MessageBox).show(e, "反对成功", 500, "info")
            }
        }, error: function () {
            (new MessageBox).show(e, "发送失败，请检查您的网络或发送邮件至 orz#hdslb.com", 2e3, "error")
        }
    });
    return false
}
function adHideFB(e, t, n, r) {
    if (e == "undefined")e = this;
    $.ajax("/m/hideFeedback?aid=" + t + "&news_id=" + n + "&rid=" + r, {
        success: function (t) {
            if (t != "OK") {
                (new MessageBox).show(e, t, 2e3, "warning")
            } else {
                (new MessageBox).show(e, "隐藏成功", 500, "info");
                $(e).parent().find(".showfb").show();
                $(e).hide()
            }
        }, error: function () {
            (new MessageBox).show(e, "发送失败，请检查您的网络或发送邮件至 orz#hdslb.com", 2e3, "error")
        }
    });
    return false
}
function adShowFB(e, t, n, r) {
    if (e == "undefined")e = this;
    $.ajax("/m/showFeedback?aid=" + t + "&news_id=" + n + "&rid=" + r, {
        success: function (t) {
            if (t != "OK") {
                (new MessageBox).show(e, t, 2e3, "warning")
            } else {
                (new MessageBox).show(e, "显示成功", 500, "info");
                $(e).parent().find(".hidefb").show();
                $(e).hide()
            }
        }, error: function () {
            (new MessageBox).show(e, "发送失败，请检查您的网络或发送邮件至 orz#hdslb.com", 2e3, "error")
        }
    });
    return false
}
function set_qure(e) {
    $("._qure .t").html($("#l_id_" + e + " .t").html());
    $("._qure").show()
}
function replyFB(e) {
    $("#quoteID").val(e);
    $("#comment_text").focus()
}
function commitFeedback() {
    if ("请在这里输入您要发表的评论信息" == $("#comment_text").val()) {
        $("#comment_text").focus();
        return false
    }
    if ($("#comment_text").val().length > 1e3 || $("#comment_text").val().length < 4) {
        alert("评论字数必须在4到1000个之间！");
        $("#comment_text").focus();
        return false
    }
    $.post("/feedback/post", "msg=" + encodeURIComponent($("#comment_text").val().replace(/%/g, "%25")).replace(/\+/g, "%2B") + ($("#fb_aid").length > 0 ? "&aid=" + $("#fb_aid").val() : "&news_id=" + $("#fb_news_id").val()) + "&action=send&quoteID=" + $("#quoteID").val() + ($("#fb_vcode").length > 0 ? "&vcode=" + $("#fb_vcode").val() : ""), function (e) {
        if (e == "OK") {
            if ($("#fb_aid").length > 0) {
                loadFB($("#fb_aid").val(), 1)
            } else {
                loadFB($("#fb_news_id").val(), 1)
            }
        } else {
            alert(e)
        }
    })
}
function InitCardEvent() {
    if ($(card_obj).attr("direction") == "top") {
        $(".a_layer").css("top", $(card_obj).offset().top - $(".a_layer").outerHeight() + 40 + "px");
        $(".a_layer > .bg > .arrow").addClass("arrow_t")
    } else {
        $(".a_layer").css("top", $(card_obj).offset().top + $(card_obj).outerHeight() / 2 - 20 + "px")
    }
    if ($(card_obj).offset().left + $(".a_layer").outerWidth() + $(card_obj).width() + 5 > $(window).width()) {
        $(".a_layer").css("left", $(card_obj).offset().left - 5 - $(".a_layer").outerWidth() + "px");
        $(".a_layer > .bg > .arrow").removeClass("arrow_l");
        $(".a_layer > .bg > .arrow").addClass("arrow_r")
    } else {
        $(".a_layer").css("left", $(card_obj).offset().left + $(card_obj).width() + 5 + "px")
    }
    $(".a_layer").mouseover(function () {
        clearTimeout(evCardTimer)
    });
    $(".a_layer").mouseout(CardEventOut)
}
function ShowCardMsg(e) {
    clearTimeout(tmrCardError);
    $(".a_layer").remove();
    $('<div class="a_layer"><div class="bg"><div class="content"><div class="msg">' + e + '</div></div><div class="arrow arrow_l" style=""></div></div></div>').appendTo("body");
    InitCardEvent()
}
function attentionUser(e, t) {
    var n = new MessageBox;
    $.ajax("/m/attention?uid=" + t, {
        success: function (r) {
            if (r == "OK")window.AttentionList.push(t);
            n.show(e, r == "OK" ? "关注成功!" : r, r == "OK" ? 500 : 2e3, r == "OK" ? "ok" : "warning")
        }, error: function () {
            n.show(e, "系统错误，请稍后重试!", 2e3, "error")
        }
    })
}
function unattentionUser(e, t) {
    var n = new MessageBox;
    $.ajax("/m/unattention?uid=" + t, {
        success: function (r) {
            var i = window.AttentionList.indexOf(t);
            if (i != -1 && r == "OK") {
                delete window.AttentionList[i]
            }
            n.show(e, r == "OK" ? "取消关注成功!" : r, r == "OK" ? 500 : 2e3, r == "OK" ? "ok" : "warning")
        }, error: function () {
            n.show(e, "系统错误，请稍后重试!", 2e3, "error")
        }
    })
}
function ShowCard(e) {
    clearTimeout(tmrCardError);
    if (typeof e.mid == "undefined") {
        ShowCardMsg("抱歉，该昵称目前不存在哦(*^__^*)");
        return
    }
    $(".a_layer").remove();
    var t = false;
    var n = false;
    if (typeof window.AttentionList != "undefined" && typeof window.AttentionList != "null") {
        for (var r = 0; r < window.AttentionList.length; r++) {
            if (window.AttentionList[r] == e.mid) {
                n = true;
                break
            }
        }
    }
    if (typeof e.attentions != "undefined" && typeof e.attentions != "null") {
        for (var i = 0; i < e.attentions.length; i++) {
            if (e.attentions[i] == window.uid) {
                t = true;
                break
            }
        }
    }
    var s = "";
    if (n && t) {
        s = '<img class="icon_add addbtn_b" title="加关注" src="http://static.hdslb.com/images/common/transparent.8x7.gif">互相关注<span class="W_vline">|</span><a href="javascript:;" onclick="unattentionUser(this,' + e.mid + ')" class="W_linkb"><em>取消</em></a>'
    } else if (!n) {
        s = '<a href="javascript:;" onclick="attentionUser(this,' + e.mid + ')"><img class="icon_add addbtn_a" title="加关注" src="http://static.hdslb.com/images/common/transparent.8x7.gif">加关注</a>'
    } else if (!t) {
        s = '<img class="icon_add addbtn_c" title="已关注" src="http://static.hdslb.com/images/common/transparent.8x7.gif">已关注<span class="W_vline">|</span><a href="javascript:;" onclick="unattentionUser(this,' + e.mid + ')" class="W_linkb"><em>取消</em></a>'
    }
    $('<div class="a_layer"><div class="bg"><div class="content"><div class="card">' + '<img src="' + e.face + '" class="face"><div class="t">' + '<a href="http://space.bilibili.com/' + e.mid + '" target="_blank">' + e.name + "</a>" + (e.approve ? '<a href="http://www.bilibili.com/html/certified.html" target="_blank" title="哔哩哔哩认证" class="approve"></a>' : "") + '</div><div class="address" style="width:150px">' + '<img class="small_icon ' + (e.sex == "男" ? "male" : e.sex == "女" ? "female" : "") + '" title="' + e.sex + '" src="http://static.hdslb.com/images/common/transparent.8x7.gif"' + 'alt=""> ' + (e.place ? e.place : "未知") + '</div><ul class="userdata" style="clear:top"><li><a href="http://space.bilibili.com/' + e.mid + '/follow.html" target="_blank">关注</a> ' + e.attention + '</li><li class="W_vline">|</li><li><a href="http://space.bilibili.com/' + e.mid + '/fans.html" target="_blank">粉丝</a> ' + e.fans + "</li>" + '<li class="W_vline">|</li><li><a href="http://space.bilibili.com/' + e.mid + '" target="_blank">投稿</a> ' + e.article + "</li></ul></div>" + '<div class="cardinfo">' + (e.approve ? '<div class="approve">认证资料</div>' : "") + e.description + "</div>" + '<div class="links"><p><a href="http://member.bilibili.com/#msg&act=new&mid=' + e.mid + '" target="_blank">私信</a></p><div class="W_addbtn_even">' + s + '</div></div></div><div class="arrow arrow_l" style=""></div></div></div>').appendTo("body");
    InitCardEvent()
}
function ShowLoadCardFail() {
    clearTimeout(tmrCardError);
    ShowCardMsg('<span class="loading">加载失败</span>')
}
function LoadCard(e, t) {
    card_obj = e;
    ShowCardMsg('<span class="loading">正在加载中,请稍候..</span>');
    $('<script type="text/javascript" src="http://interface.bilibili.com/card/' + t + '.js" onerror="ShowLoadCardFail()"><' + "/script>").appendTo("body");
    clearTimeout(tmrCardError);
    tmrCardError = setTimeout(ShowLoadCardFail, 5e3)
}
function CardEventOver(e, t) {
    clearTimeout(evCardTimer);
    evCardTimer = setTimeout(function () {
        clearTimeout(evCardTimer);
        LoadCard(e, t)
    }, 300)
}
function CardEventOut() {
    clearTimeout(evCardTimer);
    evCardTimer = setTimeout(function () {
        clearTimeout(evCardTimer);
        $(".a_layer").remove()
    }, 100)
}
function bindCardEvent(e) {
    if (typeof e != "undefined") {
        $(e).find("a[card]").mouseover(function () {
            CardEventOver(this, $(this).attr("card"))
        }).mouseout(CardEventOut)
    } else {
        $("a[card]").mouseover(function () {
            CardEventOver(this, $(this).attr("card"))
        }).mouseout(CardEventOut)
    }
}
function createSuggestUserList(e) {
    var t;
    var n = 0;
    var r = 0;
    $("#rup_user").empty();
    if (e + 5 > suggest_user.length)e = 0;
    for (t in suggest_user) {
        n++;
        if (typeof e != "undefined" && n <= e)continue;
        var i = suggest_user[t];
        var s = false;
        if (typeof window.AttentionList != "undefined" && typeof window.AttentionList != "null") {
            for (var o = 0; o < window.AttentionList.length; o++) {
                if (window.AttentionList[o] == i[0]) {
                    s = true;
                    break
                }
            }
        }
        if (s) {
            continue
        }
        $('<li><a href="http://space.bilibili.com/' + i[0] + '" target="_blank" card="' + i[1] + '"><img src="' + i[2] + '"><div class="name">' + i[1] + '</div></a><p class="i"><a href="http://member.bilibili.com/friend?act=add&smod=attention&uid=' + i[0] + '" class="gz">关注</a></p><div class="info">' + i[3] + "</div></li>").appendTo("#rup_user");
        last_sug_user_start = n;
        if (++r >= 5)break
    }
    bindCardEvent()
}
function createSuggestSpList(e) {
    var t;
    var n = 0;
    var r = 0;
    $("#rup_sp").empty();
    if (suggest_sp.length == 0) {
        $('<div class="no_more">没有更多信息</div>').appendTo("#rup_sp");
        return
    }
    if (e + 5 > suggest_sp.length)e = 0;
    for (t in suggest_sp) {
        n++;
        if (typeof e != "undefined" && n <= e)continue;
        var i = suggest_sp[t];
        if (typeof i == "undefined" || typeof i[0] == "undefined")continue;
        $('<li><a href="/sp/' + i[0] + '"><img src="' + i[1] + '" title="' + i[0] + '"><div class="name">' + i[0] + '</div></a><p class="i"><b>' + i[3] + "</b>个视频</p>" + (i[2] ? '<div class="info">同义词:' + i[2] + "</div>" : "") + "</li>").appendTo("#rup_sp");
        if (++r >= 5)break
    }
}
function bindPOCoins(e) {
    var t;
    for (var n = 0; n < e.length; n++) {
        t = parseInt($(e[n]).attr("yb"));
        if (t >= 20 && t < 60) {
            $(e[n]).find("img").css("background", "url(http://static.hdslb.com/images/po-img-bg.png) no-repeat -72px -26px")
        }
        if (t >= 60 && t < 120) {
            $(e[n]).find("img").css("background", "url(http://static.hdslb.com/images/po-img-bg.png) no-repeat -402px -26px")
        }
        if (t >= 120) {
            $(e[n]).find("img").css("background", "url(http://static.hdslb.com/images/po-img-bg.png) no-repeat -572px -26px")
        }
    }
    if ($.browser.msie) {
        e.addClass("snti")
    }
    var r = 0;
    var i;
    var s;
    mouseOutFunc = function () {
        r = 0;
        clearInterval(i);
        s = setTimeout(function () {
            if (r)return;
            clearTimeout(s);
            $(".ov-box").remove()
        }, 100)
    };
    e.mouseover(function () {
        var e = this;
        r = 1;
        i = setTimeout(function () {
            if (r == 1) {
                $(".ov-box").remove();
                $('<div class="ov-box" style="display: none; "><div class="ov"><div class="title"></div><div class="subtitle"></div><img src=""><a class="gk">播放:' + $(e).attr("gk") + '</a><a class="sc">收藏:' + $(e).attr("sc") + '</a><a class="pl">评论:' + $(e).attr("pl") + '</a><a class="pf">(+' + $(e).attr("pf") + ')</a><p class="txt"></p><p class="tg-date"></p><p class="lm"></p></div></div>').prependTo("body");
                $(".ov-box").css({left: $(e).offset().left, top: $(e).offset().top - 120});
                $(".ov-box > .ov > .txt").html($(e).attr("txt"));
                $(".ov-box > .ov > .title").html($(e).find(".t").html());
                $(".ov-box > .ov > .subtitle").html($(e).attr("subtitle"));
                $(".ov-box > .ov > .tg-date").html("日期:" + $(e).attr("tg"));
                $(".ov-box > .ov > .lm").html("UP主:" + $(e).attr("up"));
                $(".ov-box > .ov > img").attr("src", $(e).find("img").attr("src"));
                $(".ov-box").fadeIn(300);
                $(".ov-box").mouseover(function () {
                    r = 1;
                    clearTimeout(s)
                });
                $(".ov-box").mouseout(mouseOutFunc);
                clearTimeout(i)
            }
        }, 500)
    });
    e.mouseout(mouseOutFunc)
}
function date_format(e) {
    var t = new Date;
    var n = t.getTime() / 1e3 * e;
    if (n < 86400 && n > 0) {
        if (n < 60) {
            return n + "秒前"
        } else if (n < 3600) {
            return Math.floor(n / 60) + "分钟前"
        } else if (n < 86400) {
            return Math.floor(n / 3600) + "小时前"
        }
    } else {
        var r = new Date;
        r.setTime(e * 1e3);
        return r.getFullYear() + "/" + (r.getMonth() + 1) + "/" + r.getDate()
    }
}
function numsout() {
    timi = 0;
    mouIntervals = setTimeout(function () {
        if (timi == 0) {
            clearInterval(mouIntervals);
            $(".nums").slideUp(100)
        }
    }, 200)
}
function alertCharNums(e) {
    var t = 1e3;
    if (e.value.length > t) {
        e.value = e.value.substring(0, t)
    }
    $("#ajaxBackMsg").html("字符统计:" + e.value.length + "/1000")
}
function showGlobalAlert(e) {
    tips_str = '<div class="ui-widget" id="announce_alerts" style="margin: 0px; position: fixed; top: 0px; width: 980px; z-index: 100;">' + ' <div class="ui-state-error ui-corner-all" style="padding: 0 .7em;"> ' + '  <p><span class="ui-icon ui-icon-alert" style="float: left; margin-right: .3em;margin-top:.1em;"></span>' + e + "</p>" + " </div>" + "</div>";
    fc = $($(".z")[0].firstChild);
    fc.before(tips_str)
}
function insertFlash(e, t, n, r) {
    if (!document.getElementById(e))return;
    var i = '<embed height="' + r + '" width="' + n + '" id="' + e + '_flash" wmode="opaque" pluginspage="http://www.adobe.com/shockwave/download/download.cgi?P1_Prod_Version=ShockwaveFlash" allowscriptaccess="none" rel="noreferrer" src="' + t + '" type="application/x-shockwave-flash" allowfullscreen="true" allowscriptaccess="true" quality="high">';
    document.getElementById(e).innerHTML = i
}
function cb_initok() {
    cb_controler.setConnectParam(1, __GetCookie("DedeUserID") !== undefined && __GetCookie("DedeUserID") ? __GetCookie("DedeUserID") : 0, "");
    cb_controler.connect()
}
function cb_onconnect() {
}
function goTop(e, t) {
    if (!scrollActivate) {
        scrollActivate = true;
        return
    }
    e = e || .1;
    t = t || 16;
    var n = 0;
    var r = 0;
    var i = 0;
    var s = 0;
    var o = 0;
    var u = 0;
    if (document.documentElement) {
        n = document.documentElement.scrollLeft || 0;
        r = document.documentElement.scrollTop || 0
    }
    if (document.body) {
        i = document.body.scrollLeft || 0;
        s = document.body.scrollTop || 0
    }
    var o = window.scrollX || 0;
    var u = window.scrollY || 0;
    var a = Math.max(n, Math.max(i, o));
    var f = Math.max(r, Math.max(s, u));
    var l = 1 + e;
    window.scrollTo(Math.floor(a / l), Math.floor(f / l));
    if (a > 0 || f > 0) {
        var c = "goTop(" + e + ", " + t + ")";
        window.setTimeout(c, t)
    }
}
(function (e, t) {
    function n(e) {
        return H.isWindow(e) ? e : e.nodeType === 9 ? e.defaultView || e.parentWindow : !1
    }

    function r(e) {
        if (!vn[e]) {
            var t = _.body, n = H("<" + e + ">").appendTo(t), r = n.css("display");
            n.remove();
            if (r === "none" || r === "") {
                mn || (mn = _.createElement("iframe"), mn.frameBorder = mn.width = mn.height = 0), t.appendChild(mn);
                if (!gn || !mn.createElement)gn = (mn.contentWindow || mn.contentDocument).document, gn.write((H.support.boxModel ? "<!doctype html>" : "") + "<html><body>"), gn.close();
                n = gn.createElement(e), gn.body.appendChild(n), r = H.css(n, "display"), t.removeChild(mn)
            }
            vn[e] = r
        }
        return vn[e]
    }

    function i(e, t) {
        var n = {};
        H.each(En.concat.apply([], En.slice(0, t)), function () {
            n[this] = e
        });
        return n
    }

    function s() {
        Sn = t
    }

    function o() {
        setTimeout(s, 0);
        return Sn = H.now()
    }

    function u() {
        try {
            return new e.ActiveXObject("Microsoft.XMLHTTP")
        } catch (t) {
        }
    }

    function a() {
        try {
            return new e.XMLHttpRequest
        } catch (t) {
        }
    }

    function f(e, n) {
        e.dataFilter && (n = e.dataFilter(n, e.dataType));
        var r = e.dataTypes, i = {}, s, o, u = r.length, a, f = r[0], l, c, h, p, d;
        for (s = 1; s < u; s++) {
            if (s === 1)for (o in e.converters)typeof o == "string" && (i[o.toLowerCase()] = e.converters[o]);
            l = f, f = r[s];
            if (f === "*")f = l; else if (l !== "*" && l !== f) {
                c = l + " " + f, h = i[c] || i["* " + f];
                if (!h) {
                    d = t;
                    for (p in i) {
                        a = p.split(" ");
                        if (a[0] === l || a[0] === "*") {
                            d = i[a[1] + " " + f];
                            if (d) {
                                p = i[p], p === !0 ? h = d : d === !0 && (h = p);
                                break
                            }
                        }
                    }
                }
                !h && !d && H.error("No conversion from " + c.replace(" ", " to ")), h !== !0 && (n = h ? h(n) : d(p(n)))
            }
        }
        return n
    }

    function l(e, n, r) {
        var i = e.contents, s = e.dataTypes, o = e.responseFields, u, a, f, l;
        for (a in o)a in r && (n[o[a]] = r[a]);
        while (s[0] === "*")s.shift(), u === t && (u = e.mimeType || n.getResponseHeader("content-type"));
        if (u)for (a in i)if (i[a] && i[a].test(u)) {
            s.unshift(a);
            break
        }
        if (s[0] in r)f = s[0]; else {
            for (a in r) {
                if (!s[0] || e.converters[a + " " + s[0]]) {
                    f = a;
                    break
                }
                l || (l = a)
            }
            f = f || l
        }
        if (f) {
            f !== s[0] && s.unshift(f);
            return r[f]
        }
    }

    function c(e, t, n, r) {
        if (H.isArray(t))H.each(t, function (t, i) {
            n || Ut.test(e) ? r(e, i) : c(e + "[" + (typeof i == "object" ? t : "") + "]", i, n, r)
        }); else if (!n && H.type(t) === "object")for (var i in t)c(e + "[" + i + "]", t[i], n, r); else r(e, t)
    }

    function h(e, n) {
        var r, i, s = H.ajaxSettings.flatOptions || {};
        for (r in n)n[r] !== t && ((s[r] ? e : i || (i = {}))[r] = n[r]);
        i && H.extend(!0, e, i)
    }

    function p(e, n, r, i, s, o) {
        s = s || n.dataTypes[0], o = o || {}, o[s] = !0;
        var u = e[s], a = 0, f = u ? u.length : 0, l = e === rn, c;
        for (; a < f && (l || !c); a++)c = u[a](n, r, i), typeof c == "string" && (!l || o[c] ? c = t : (n.dataTypes.unshift(c), c = p(e, n, r, i, c, o)));
        (l || !c) && !o["*"] && (c = p(e, n, r, i, "*", o));
        return c
    }

    function d(e) {
        return function (t, n) {
            typeof t != "string" && (n = t, t = "*");
            if (H.isFunction(n)) {
                var r = t.toLowerCase().split(Zt), i = 0, s = r.length, o, u, a;
                for (; i < s; i++)o = r[i], a = /^\+/.test(o), a && (o = o.substr(1) || "*"), u = e[o] = e[o] || [], u[a ? "unshift" : "push"](n)
            }
        }
    }

    function v(e, t, n) {
        var r = t === "width" ? e.offsetWidth : e.offsetHeight, i = t === "width" ? 1 : 0, s = 4;
        if (r > 0) {
            if (n !== "border")for (; i < s; i += 2)n || (r -= parseFloat(H.css(e, "padding" + jt[i])) || 0), n === "margin" ? r += parseFloat(H.css(e, n + jt[i])) || 0 : r -= parseFloat(H.css(e, "border" + jt[i] + "Width")) || 0;
            return r + "px"
        }
        r = Ft(e, t);
        if (r < 0 || r == null)r = e.style[t];
        if (Dt.test(r))return r;
        r = parseFloat(r) || 0;
        if (n)for (; i < s; i += 2)r += parseFloat(H.css(e, "padding" + jt[i])) || 0, n !== "padding" && (r += parseFloat(H.css(e, "border" + jt[i] + "Width")) || 0), n === "margin" && (r += parseFloat(H.css(e, n + jt[i])) || 0);
        return r + "px"
    }

    function m(e) {
        var t = _.createElement("div");
        Lt.appendChild(t), t.innerHTML = e.outerHTML;
        return t.firstChild
    }

    function g(e) {
        var t = (e.nodeName || "").toLowerCase();
        t === "input" ? y(e) : t !== "script" && typeof e.getElementsByTagName != "undefined" && H.grep(e.getElementsByTagName("input"), y)
    }

    function y(e) {
        if (e.type === "checkbox" || e.type === "radio")e.defaultChecked = e.checked
    }

    function b(e) {
        return typeof e.getElementsByTagName != "undefined" ? e.getElementsByTagName("*") : typeof e.querySelectorAll != "undefined" ? e.querySelectorAll("*") : []
    }

    function w(e, t) {
        var n;
        t.nodeType === 1 && (t.clearAttributes && t.clearAttributes(), t.mergeAttributes && t.mergeAttributes(e), n = t.nodeName.toLowerCase(), n === "object" ? t.outerHTML = e.outerHTML : n !== "input" || e.type !== "checkbox" && e.type !== "radio" ? n === "option" ? t.selected = e.defaultSelected : n === "input" || n === "textarea" ? t.defaultValue = e.defaultValue : n === "script" && t.text !== e.text && (t.text = e.text) : (e.checked && (t.defaultChecked = t.checked = e.checked), t.value !== e.value && (t.value = e.value)), t.removeAttribute(H.expando), t.removeAttribute("_submit_attached"), t.removeAttribute("_change_attached"))
    }

    function E(e, t) {
        if (t.nodeType === 1 && !!H.hasData(e)) {
            var n, r, i, s = H._data(e), o = H._data(t, s), u = s.events;
            if (u) {
                delete o.handle, o.events = {};
                for (n in u)for (r = 0, i = u[n].length; r < i; r++)H.event.add(t, n, u[n][r])
            }
            o.data && (o.data = H.extend({}, o.data))
        }
    }

    function S(e, t) {
        return H.nodeName(e, "table") ? e.getElementsByTagName("tbody")[0] || e.appendChild(e.ownerDocument.createElement("tbody")) : e
    }

    function x(e) {
        var t = dt.split("|"), n = e.createDocumentFragment();
        if (n.createElement)while (t.length)n.createElement(t.pop());
        return n
    }

    function T(e, t, n) {
        t = t || 0;
        if (H.isFunction(t))return H.grep(e, function (e, r) {
            var i = !!t.call(e, r, e);
            return i === n
        });
        if (t.nodeType)return H.grep(e, function (e, r) {
            return e === t === n
        });
        if (typeof t == "string") {
            var r = H.grep(e, function (e) {
                return e.nodeType === 1
            });
            if (lt.test(t))return H.filter(t, r, !n);
            t = H.filter(t, r)
        }
        return H.grep(e, function (e, r) {
            return H.inArray(e, t) >= 0 === n
        })
    }

    function N(e) {
        return !e || !e.parentNode || e.parentNode.nodeType === 11
    }

    function C() {
        return !0
    }

    function k() {
        return !1
    }

    function L(e, t, n) {
        var r = t + "defer", i = t + "queue", s = t + "mark", o = H._data(e, r);
        o && (n === "queue" || !H._data(e, i)) && (n === "mark" || !H._data(e, s)) && setTimeout(function () {
            !H._data(e, i) && !H._data(e, s) && (H.removeData(e, r, !0), o.fire())
        }, 0)
    }

    function A(e) {
        for (var t in e) {
            if (t === "data" && H.isEmptyObject(e[t]))continue;
            if (t !== "toJSON")return !1
        }
        return !0
    }

    function O(e, n, r) {
        if (r === t && e.nodeType === 1) {
            var i = "data-" + n.replace(I, "-$1").toLowerCase();
            r = e.getAttribute(i);
            if (typeof r == "string") {
                try {
                    r = r === "true" ? !0 : r === "false" ? !1 : r === "null" ? null : H.isNumeric(r) ? +r : F.test(r) ? H.parseJSON(r) : r
                } catch (s) {
                }
                H.data(e, n, r)
            } else r = t
        }
        return r
    }

    function M(e) {
        var t = B[e] = {}, n, r;
        e = e.split(/\s+/);
        for (n = 0, r = e.length; n < r; n++)t[e[n]] = !0;
        return t
    }

    var _ = e.document, D = e.navigator, P = e.location, H = function () {
        function n() {
            if (!r.isReady) {
                try {
                    _.documentElement.doScroll("left")
                } catch (e) {
                    setTimeout(n, 1);
                    return
                }
                r.ready()
            }
        }

        var r = function (e, t) {
            return new r.fn.init(e, t, o)
        }, i = e.jQuery, s = e.$, o, u = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/, a = /\S/, f = /^\s+/, l = /\s+$/, c = /^<(\w+)\s*\/?>(?:<\/\1>)?$/, h = /^[\],:{}\s]*$/, p = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, d = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, v = /(?:^|:|,)(?:\s*\[)+/g, m = /(webkit)[ \/]([\w.]+)/, g = /(opera)(?:.*version)?[ \/]([\w.]+)/, y = /(msie) ([\w.]+)/, b = /(mozilla)(?:.*? rv:([\w.]+))?/, w = /-([a-z]|[0-9])/ig, E = /^-ms-/, S = function (e, t) {
            return (t + "").toUpperCase()
        }, x = D.userAgent, T, N, C, k = Object.prototype.toString, L = Object.prototype.hasOwnProperty, A = Array.prototype.push, O = Array.prototype.slice, M = String.prototype.trim, P = Array.prototype.indexOf, H = {};
        r.fn = r.prototype = {
            constructor: r, init: function (e, n, i) {
                var s, o, a, f;
                if (!e)return this;
                if (e.nodeType) {
                    this.context = this[0] = e, this.length = 1;
                    return this
                }
                if (e === "body" && !n && _.body) {
                    this.context = _, this[0] = _.body, this.selector = e, this.length = 1;
                    return this
                }
                if (typeof e == "string") {
                    e.charAt(0) !== "<" || e.charAt(e.length - 1) !== ">" || e.length < 3 ? s = u.exec(e) : s = [null, e, null];
                    if (s && (s[1] || !n)) {
                        if (s[1]) {
                            n = n instanceof r ? n[0] : n, f = n ? n.ownerDocument || n : _, a = c.exec(e), a ? r.isPlainObject(n) ? (e = [_.createElement(a[1])], r.fn.attr.call(e, n, !0)) : e = [f.createElement(a[1])] : (a = r.buildFragment([s[1]], [f]), e = (a.cacheable ? r.clone(a.fragment) : a.fragment).childNodes);
                            return r.merge(this, e)
                        }
                        o = _.getElementById(s[2]);
                        if (o && o.parentNode) {
                            if (o.id !== s[2])return i.find(e);
                            this.length = 1, this[0] = o
                        }
                        this.context = _, this.selector = e;
                        return this
                    }
                    return !n || n.jquery ? (n || i).find(e) : this.constructor(n).find(e)
                }
                if (r.isFunction(e))return i.ready(e);
                e.selector !== t && (this.selector = e.selector, this.context = e.context);
                return r.makeArray(e, this)
            }, selector: "", jquery: "1.7.2", length: 0, size: function () {
                return this.length
            }, toArray: function () {
                return O.call(this, 0)
            }, get: function (e) {
                return e == null ? this.toArray() : e < 0 ? this[this.length + e] : this[e]
            }, pushStack: function (e, t, n) {
                var i = this.constructor();
                r.isArray(e) ? A.apply(i, e) : r.merge(i, e), i.prevObject = this, i.context = this.context, t === "find" ? i.selector = this.selector + (this.selector ? " " : "") + n : t && (i.selector = this.selector + "." + t + "(" + n + ")");
                return i
            }, each: function (e, t) {
                return r.each(this, e, t)
            }, ready: function (e) {
                r.bindReady(), N.add(e);
                return this
            }, eq: function (e) {
                e = +e;
                return e === -1 ? this.slice(e) : this.slice(e, e + 1)
            }, first: function () {
                return this.eq(0)
            }, last: function () {
                return this.eq(-1)
            }, slice: function () {
                return this.pushStack(O.apply(this, arguments), "slice", O.call(arguments).join(","))
            }, map: function (e) {
                return this.pushStack(r.map(this, function (t, n) {
                    return e.call(t, n, t)
                }))
            }, end: function () {
                return this.prevObject || this.constructor(null)
            }, push: A, sort: [].sort, splice: [].splice
        }, r.fn.init.prototype = r.fn, r.extend = r.fn.extend = function () {
            var e, n, i, s, o, u, a = arguments[0] || {}, f = 1, l = arguments.length, c = !1;
            typeof a == "boolean" && (c = a, a = arguments[1] || {}, f = 2), typeof a != "object" && !r.isFunction(a) && (a = {}), l === f && (a = this, --f);
            for (; f < l; f++)if ((e = arguments[f]) != null)for (n in e) {
                i = a[n], s = e[n];
                if (a === s)continue;
                c && s && (r.isPlainObject(s) || (o = r.isArray(s))) ? (o ? (o = !1, u = i && r.isArray(i) ? i : []) : u = i && r.isPlainObject(i) ? i : {}, a[n] = r.extend(c, u, s)) : s !== t && (a[n] = s)
            }
            return a
        }, r.extend({
            noConflict: function (t) {
                e.$ === r && (e.$ = s), t && e.jQuery === r && (e.jQuery = i);
                return r
            }, isReady: !1, readyWait: 1, holdReady: function (e) {
                e ? r.readyWait++ : r.ready(!0)
            }, ready: function (e) {
                if (e === !0 && !--r.readyWait || e !== !0 && !r.isReady) {
                    if (!_.body)return setTimeout(r.ready, 1);
                    r.isReady = !0;
                    if (e !== !0 && --r.readyWait > 0)return;
                    N.fireWith(_, [r]), r.fn.trigger && r(_).trigger("ready").off("ready")
                }
            }, bindReady: function () {
                if (!N) {
                    N = r.Callbacks("once memory");
                    if (_.readyState === "complete")return setTimeout(r.ready, 1);
                    if (_.addEventListener)_.addEventListener("DOMContentLoaded", C, !1), e.addEventListener("load", r.ready, !1); else if (_.attachEvent) {
                        _.attachEvent("onreadystatechange", C), e.attachEvent("onload", r.ready);
                        var t = !1;
                        try {
                            t = e.frameElement == null
                        } catch (i) {
                        }
                        _.documentElement.doScroll && t && n()
                    }
                }
            }, isFunction: function (e) {
                return r.type(e) === "function"
            }, isArray: Array.isArray || function (e) {
                return r.type(e) === "array"
            }, isWindow: function (e) {
                return e != null && e == e.window
            }, isNumeric: function (e) {
                return !isNaN(parseFloat(e)) && isFinite(e)
            }, type: function (e) {
                return e == null ? String(e) : H[k.call(e)] || "object"
            }, isPlainObject: function (e) {
                if (!e || r.type(e) !== "object" || e.nodeType || r.isWindow(e))return !1;
                try {
                    if (e.constructor && !L.call(e, "constructor") && !L.call(e.constructor.prototype, "isPrototypeOf"))return !1
                } catch (n) {
                    return !1
                }
                var i;
                for (i in e);
                return i === t || L.call(e, i)
            }, isEmptyObject: function (e) {
                for (var t in e)return !1;
                return !0
            }, error: function (e) {
                throw new Error(e)
            }, parseJSON: function (t) {
                if (typeof t != "string" || !t)return null;
                t = r.trim(t);
                if (e.JSON && e.JSON.parse)return e.JSON.parse(t);
                if (h.test(t.replace(p, "@").replace(d, "]").replace(v, "")))return (new Function("return " + t))();
                r.error("Invalid JSON: " + t)
            }, parseXML: function (n) {
                if (typeof n != "string" || !n)return null;
                var i, s;
                try {
                    e.DOMParser ? (s = new DOMParser, i = s.parseFromString(n, "text/xml")) : (i = new ActiveXObject("Microsoft.XMLDOM"), i.async = "false", i.loadXML(n))
                } catch (o) {
                    i = t
                }
                (!i || !i.documentElement || i.getElementsByTagName("parsererror").length) && r.error("Invalid XML: " + n);
                return i
            }, noop: function () {
            }, globalEval: function (t) {
                t && a.test(t) && (e.execScript || function (t) {
                    e.eval.call(e, t)
                })(t)
            }, camelCase: function (e) {
                return e.replace(E, "ms-").replace(w, S)
            }, nodeName: function (e, t) {
                return e.nodeName && e.nodeName.toUpperCase() === t.toUpperCase()
            }, each: function (e, n, i) {
                var s, o = 0, u = e.length, a = u === t || r.isFunction(e);
                if (i) {
                    if (a) {
                        for (s in e)if (n.apply(e[s], i) === !1)break
                    } else for (; o < u;)if (n.apply(e[o++], i) === !1)break
                } else if (a) {
                    for (s in e)if (n.call(e[s], s, e[s]) === !1)break
                } else for (; o < u;)if (n.call(e[o], o, e[o++]) === !1)break;
                return e
            }, trim: M ? function (e) {
                return e == null ? "" : M.call(e)
            } : function (e) {
                return e == null ? "" : (e + "").replace(f, "").replace(l, "")
            }, makeArray: function (e, t) {
                var n = t || [];
                if (e != null) {
                    var i = r.type(e);
                    e.length == null || i === "string" || i === "function" || i === "regexp" || r.isWindow(e) ? A.call(n, e) : r.merge(n, e)
                }
                return n
            }, inArray: function (e, t, n) {
                var r;
                if (t) {
                    if (P)return P.call(t, e, n);
                    r = t.length, n = n ? n < 0 ? Math.max(0, r + n) : n : 0;
                    for (; n < r; n++)if (n in t && t[n] === e)return n
                }
                return -1
            }, merge: function (e, n) {
                var r = e.length, i = 0;
                if (typeof n.length == "number")for (var s = n.length; i < s; i++)e[r++] = n[i]; else while (n[i] !== t)e[r++] = n[i++];
                e.length = r;
                return e
            }, grep: function (e, t, n) {
                var r = [], i;
                n = !!n;
                for (var s = 0, o = e.length; s < o; s++)i = !!t(e[s], s), n !== i && r.push(e[s]);
                return r
            }, map: function (e, n, i) {
                var s, o, u = [], a = 0, f = e.length, l = e instanceof r || f !== t && typeof f == "number" && (f > 0 && e[0] && e[f - 1] || f === 0 || r.isArray(e));
                if (l)for (; a < f; a++)s = n(e[a], a, i), s != null && (u[u.length] = s); else for (o in e)s = n(e[o], o, i), s != null && (u[u.length] = s);
                return u.concat.apply([], u)
            }, guid: 1, proxy: function (e, n) {
                if (typeof n == "string") {
                    var i = e[n];
                    n = e, e = i
                }
                if (!r.isFunction(e))return t;
                var s = O.call(arguments, 2), o = function () {
                    return e.apply(n, s.concat(O.call(arguments)))
                };
                o.guid = e.guid = e.guid || o.guid || r.guid++;
                return o
            }, access: function (e, n, i, s, o, u, a) {
                var f, l = i == null, c = 0, h = e.length;
                if (i && typeof i == "object") {
                    for (c in i)r.access(e, n, c, i[c], 1, u, s);
                    o = 1
                } else if (s !== t) {
                    f = a === t && r.isFunction(s), l && (f ? (f = n, n = function (e, t, n) {
                        return f.call(r(e), n)
                    }) : (n.call(e, s), n = null));
                    if (n)for (; c < h; c++)n(e[c], i, f ? s.call(e[c], c, n(e[c], i)) : s, a);
                    o = 1
                }
                return o ? e : l ? n.call(e) : h ? n(e[0], i) : u
            }, now: function () {
                return (new Date).getTime()
            }, uaMatch: function (e) {
                e = e.toLowerCase();
                var t = m.exec(e) || g.exec(e) || y.exec(e) || e.indexOf("compatible") < 0 && b.exec(e) || [];
                return {browser: t[1] || "", version: t[2] || "0"}
            }, sub: function () {
                function e(t, n) {
                    return new e.fn.init(t, n)
                }

                r.extend(!0, e, this), e.superclass = this, e.fn = e.prototype = this(), e.fn.constructor = e, e.sub = this.sub, e.fn.init = function (n, i) {
                    i && i instanceof r && !(i instanceof e) && (i = e(i));
                    return r.fn.init.call(this, n, i, t)
                }, e.fn.init.prototype = e.fn;
                var t = e(_);
                return e
            }, browser: {}
        }), r.each("Boolean Number String Function Array Date RegExp Object".split(" "), function (e, t) {
            H["[object " + t + "]"] = t.toLowerCase()
        }), T = r.uaMatch(x), T.browser && (r.browser[T.browser] = !0, r.browser.version = T.version), r.browser.webkit && (r.browser.safari = !0), a.test(" ") && (f = /^[\s\xA0]+/, l = /[\s\xA0]+$/), o = r(_), _.addEventListener ? C = function () {
            _.removeEventListener("DOMContentLoaded", C, !1), r.ready()
        } : _.attachEvent && (C = function () {
            _.readyState === "complete" && (_.detachEvent("onreadystatechange", C), r.ready())
        });
        return r
    }(), B = {};
    H.Callbacks = function (e) {
        e = e ? B[e] || M(e) : {};
        var n = [], r = [], i, s, o, u, a, f, l = function (t) {
            var r, i, s, o, u;
            for (r = 0, i = t.length; r < i; r++)s = t[r], o = H.type(s), o === "array" ? l(s) : o === "function" && (!e.unique || !h.has(s)) && n.push(s)
        }, c = function (t, l) {
            l = l || [], i = !e.memory || [t, l], s = !0, o = !0, f = u || 0, u = 0, a = n.length;
            for (; n && f < a; f++)if (n[f].apply(t, l) === !1 && e.stopOnFalse) {
                i = !0;
                break
            }
            o = !1, n && (e.once ? i === !0 ? h.disable() : n = [] : r && r.length && (i = r.shift(), h.fireWith(i[0], i[1])))
        }, h = {
            add: function () {
                if (n) {
                    var e = n.length;
                    l(arguments), o ? a = n.length : i && i !== !0 && (u = e, c(i[0], i[1]))
                }
                return this
            }, remove: function () {
                if (n) {
                    var t = arguments, r = 0, i = t.length;
                    for (; r < i; r++)for (var s = 0; s < n.length; s++)if (t[r] === n[s]) {
                        o && s <= a && (a--, s <= f && f--), n.splice(s--, 1);
                        if (e.unique)break
                    }
                }
                return this
            }, has: function (e) {
                if (n) {
                    var t = 0, r = n.length;
                    for (; t < r; t++)if (e === n[t])return !0
                }
                return !1
            }, empty: function () {
                n = [];
                return this
            }, disable: function () {
                n = r = i = t;
                return this
            }, disabled: function () {
                return !n
            }, lock: function () {
                r = t, (!i || i === !0) && h.disable();
                return this
            }, locked: function () {
                return !r
            }, fireWith: function (t, n) {
                r && (o ? e.once || r.push([t, n]) : (!e.once || !i) && c(t, n));
                return this
            }, fire: function () {
                h.fireWith(this, arguments);
                return this
            }, fired: function () {
                return !!s
            }
        };
        return h
    };
    var j = [].slice;
    H.extend({
        Deferred: function (e) {
            var t = H.Callbacks("once memory"), n = H.Callbacks("once memory"), r = H.Callbacks("memory"), i = "pending", s = {
                resolve: t,
                reject: n,
                notify: r
            }, o = {
                done: t.add, fail: n.add, progress: r.add, state: function () {
                    return i
                }, isResolved: t.fired, isRejected: n.fired, then: function (e, t, n) {
                    u.done(e).fail(t).progress(n);
                    return this
                }, always: function () {
                    u.done.apply(u, arguments).fail.apply(u, arguments);
                    return this
                }, pipe: function (e, t, n) {
                    return H.Deferred(function (r) {
                        H.each({done: [e, "resolve"], fail: [t, "reject"], progress: [n, "notify"]}, function (e, t) {
                            var n = t[0], i = t[1], s;
                            H.isFunction(n) ? u[e](function () {
                                s = n.apply(this, arguments), s && H.isFunction(s.promise) ? s.promise().then(r.resolve, r.reject, r.notify) : r[i + "With"](this === u ? r : this, [s])
                            }) : u[e](r[i])
                        })
                    }).promise()
                }, promise: function (e) {
                    if (e == null)e = o; else for (var t in o)e[t] = o[t];
                    return e
                }
            }, u = o.promise({}), a;
            for (a in s)u[a] = s[a].fire, u[a + "With"] = s[a].fireWith;
            u.done(function () {
                i = "resolved"
            }, n.disable, r.lock).fail(function () {
                i = "rejected"
            }, t.disable, r.lock), e && e.call(u, u);
            return u
        }, when: function (e) {
            function t(e) {
                return function (t) {
                    o[e] = arguments.length > 1 ? j.call(arguments, 0) : t, f.notifyWith(l, o)
                }
            }

            function n(e) {
                return function (t) {
                    r[e] = arguments.length > 1 ? j.call(arguments, 0) : t, --u || f.resolveWith(f, r)
                }
            }

            var r = j.call(arguments, 0), i = 0, s = r.length, o = Array(s), u = s, a = s, f = s <= 1 && e && H.isFunction(e.promise) ? e : H.Deferred(), l = f.promise();
            if (s > 1) {
                for (; i < s; i++)r[i] && r[i].promise && H.isFunction(r[i].promise) ? r[i].promise().then(n(i), f.reject, t(i)) : --u;
                u || f.resolveWith(f, r)
            } else f !== e && f.resolveWith(f, s ? [e] : []);
            return l
        }
    }), H.support = function () {
        var t, n, r, i, s, o, u, a, f, l, c, h, p = _.createElement("div"), d = _.documentElement;
        p.setAttribute("className", "t"), p.innerHTML = "   <link/><table></table><a href='/a' style='top:1px;float:left;opacity:.55;'>a</a><input type='checkbox'/>", n = p.getElementsByTagName("*"), r = p.getElementsByTagName("a")[0];
        if (!n || !n.length || !r)return {};
        i = _.createElement("select"), s = i.appendChild(_.createElement("option")), o = p.getElementsByTagName("input")[0], t = {
            leadingWhitespace: p.firstChild.nodeType === 3,
            tbody: !p.getElementsByTagName("tbody").length,
            htmlSerialize: !!p.getElementsByTagName("link").length,
            style: /top/.test(r.getAttribute("style")),
            hrefNormalized: r.getAttribute("href") === "/a",
            opacity: /^0.55/.test(r.style.opacity),
            cssFloat: !!r.style.cssFloat,
            checkOn: o.value === "on",
            optSelected: s.selected,
            getSetAttribute: p.className !== "t",
            enctype: !!_.createElement("form").enctype,
            html5Clone: _.createElement("nav").cloneNode(!0).outerHTML !== "<:nav></:nav>",
            submitBubbles: !0,
            changeBubbles: !0,
            focusinBubbles: !1,
            deleteExpando: !0,
            noCloneEvent: !0,
            inlineBlockNeedsLayout: !1,
            shrinkWrapBlocks: !1,
            reliableMarginRight: !0,
            pixelMargin: !0
        }, H.boxModel = t.boxModel = _.compatMode === "CSS1Compat", o.checked = !0, t.noCloneChecked = o.cloneNode(!0).checked, i.disabled = !0, t.optDisabled = !s.disabled;
        try {
            delete p.test
        } catch (v) {
            t.deleteExpando = !1
        }
        !p.addEventListener && p.attachEvent && p.fireEvent && (p.attachEvent("onclick", function () {
            t.noCloneEvent = !1
        }), p.cloneNode(!0).fireEvent("onclick")), o = _.createElement("input"), o.value = "t", o.setAttribute("type", "radio"), t.radioValue = o.value === "t", o.setAttribute("checked", "checked"), o.setAttribute("name", "t"), p.appendChild(o), u = _.createDocumentFragment(), u.appendChild(p.lastChild), t.checkClone = u.cloneNode(!0).cloneNode(!0).lastChild.checked, t.appendChecked = o.checked, u.removeChild(o), u.appendChild(p);
        if (p.attachEvent)for (c in{
            submit: 1,
            change: 1,
            focusin: 1
        })l = "on" + c, h = l in p, h || (p.setAttribute(l, "return;"), h = typeof p[l] == "function"), t[c + "Bubbles"] = h;
        u.removeChild(p), u = i = s = p = o = null, H(function () {
            var n, r, i, s, o, u, f, l, c, d, v, m, g, y = _.getElementsByTagName("body")[0];
            !y || (l = 1, g = "padding:0;margin:0;border:", v = "position:absolute;top:0;left:0;width:1px;height:1px;", m = g + "0;visibility:hidden;", c = "style='" + v + g + "5px solid #000;", d = "<div " + c + "display:block;'><div style='" + g + "0;display:block;overflow:hidden;'></div></div>" + "<table " + c + "' cellpadding='0' cellspacing='0'>" + "<tr><td></td></tr></table>", n = _.createElement("div"), n.style.cssText = m + "width:0;height:0;position:static;top:0;margin-top:" + l + "px", y.insertBefore(n, y.firstChild), p = _.createElement("div"), n.appendChild(p), p.innerHTML = "<table><tr><td style='" + g + "0;display:none'></td><td>t</td></tr></table>", a = p.getElementsByTagName("td"), h = a[0].offsetHeight === 0, a[0].style.display = "", a[1].style.display = "none", t.reliableHiddenOffsets = h && a[0].offsetHeight === 0, e.getComputedStyle && (p.innerHTML = "", f = _.createElement("div"), f.style.width = "0", f.style.marginRight = "0", p.style.width = "2px", p.appendChild(f), t.reliableMarginRight = (parseInt((e.getComputedStyle(f, null) || {marginRight: 0}).marginRight, 10) || 0) === 0), typeof p.style.zoom != "undefined" && (p.innerHTML = "", p.style.width = p.style.padding = "1px", p.style.border = 0, p.style.overflow = "hidden", p.style.display = "inline", p.style.zoom = 1, t.inlineBlockNeedsLayout = p.offsetWidth === 3, p.style.display = "block", p.style.overflow = "visible", p.innerHTML = "<div style='width:5px;'></div>", t.shrinkWrapBlocks = p.offsetWidth !== 3), p.style.cssText = v + m, p.innerHTML = d, r = p.firstChild, i = r.firstChild, o = r.nextSibling.firstChild.firstChild, u = {
                doesNotAddBorder: i.offsetTop !== 5,
                doesAddBorderForTableAndCells: o.offsetTop === 5
            }, i.style.position = "fixed", i.style.top = "20px", u.fixedPosition = i.offsetTop === 20 || i.offsetTop === 15, i.style.position = i.style.top = "", r.style.overflow = "hidden", r.style.position = "relative", u.subtractsBorderForOverflowNotVisible = i.offsetTop === -5, u.doesNotIncludeMarginInBodyOffset = y.offsetTop !== l, e.getComputedStyle && (p.style.marginTop = "1%", t.pixelMargin = (e.getComputedStyle(p, null) || {marginTop: 0}).marginTop !== "1%"), typeof n.style.zoom != "undefined" && (n.style.zoom = 1), y.removeChild(n), f = p = n = null, H.extend(t, u))
        });
        return t
    }();
    var F = /^(?:\{.*\}|\[.*\])$/, I = /([A-Z])/g;
    H.extend({
        cache: {},
        uuid: 0,
        expando: "jQuery" + (H.fn.jquery + Math.random()).replace(/\D/g, ""),
        noData: {embed: !0, object: "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000", applet: !0},
        hasData: function (e) {
            e = e.nodeType ? H.cache[e[H.expando]] : e[H.expando];
            return !!e && !A(e)
        },
        data: function (e, n, r, i) {
            if (!!H.acceptData(e)) {
                var s, o, u, a = H.expando, f = typeof n == "string", l = e.nodeType, c = l ? H.cache : e, h = l ? e[a] : e[a] && a, p = n === "events";
                if ((!h || !c[h] || !p && !i && !c[h].data) && f && r === t)return;
                h || (l ? e[a] = h = ++H.uuid : h = a), c[h] || (c[h] = {}, l || (c[h].toJSON = H.noop));
                if (typeof n == "object" || typeof n == "function")i ? c[h] = H.extend(c[h], n) : c[h].data = H.extend(c[h].data, n);
                s = o = c[h], i || (o.data || (o.data = {}), o = o.data), r !== t && (o[H.camelCase(n)] = r);
                if (p && !o[n])return s.events;
                f ? (u = o[n], u == null && (u = o[H.camelCase(n)])) : u = o;
                return u
            }
        },
        removeData: function (e, t, n) {
            if (!!H.acceptData(e)) {
                var r, i, s, o = H.expando, u = e.nodeType, a = u ? H.cache : e, f = u ? e[o] : o;
                if (!a[f])return;
                if (t) {
                    r = n ? a[f] : a[f].data;
                    if (r) {
                        H.isArray(t) || (t in r ? t = [t] : (t = H.camelCase(t), t in r ? t = [t] : t = t.split(" ")));
                        for (i = 0, s = t.length; i < s; i++)delete r[t[i]];
                        if (!(n ? A : H.isEmptyObject)(r))return
                    }
                }
                if (!n) {
                    delete a[f].data;
                    if (!A(a[f]))return
                }
                H.support.deleteExpando || !a.setInterval ? delete a[f] : a[f] = null, u && (H.support.deleteExpando ? delete e[o] : e.removeAttribute ? e.removeAttribute(o) : e[o] = null)
            }
        },
        _data: function (e, t, n) {
            return H.data(e, t, n, !0)
        },
        acceptData: function (e) {
            if (e.nodeName) {
                var t = H.noData[e.nodeName.toLowerCase()];
                if (t)return t !== !0 && e.getAttribute("classid") === t
            }
            return !0
        }
    }), H.fn.extend({
        data: function (e, n) {
            var r, i, s, o, u, a = this[0], f = 0, l = null;
            if (e === t) {
                if (this.length) {
                    l = H.data(a);
                    if (a.nodeType === 1 && !H._data(a, "parsedAttrs")) {
                        s = a.attributes;
                        for (u = s.length; f < u; f++)o = s[f].name, o.indexOf("data-") === 0 && (o = H.camelCase(o.substring(5)), O(a, o, l[o]));
                        H._data(a, "parsedAttrs", !0)
                    }
                }
                return l
            }
            if (typeof e == "object")return this.each(function () {
                H.data(this, e)
            });
            r = e.split(".", 2), r[1] = r[1] ? "." + r[1] : "", i = r[1] + "!";
            return H.access(this, function (n) {
                if (n === t) {
                    l = this.triggerHandler("getData" + i, [r[0]]), l === t && a && (l = H.data(a, e), l = O(a, e, l));
                    return l === t && r[1] ? this.data(r[0]) : l
                }
                r[1] = n, this.each(function () {
                    var t = H(this);
                    t.triggerHandler("setData" + i, r), H.data(this, e, n), t.triggerHandler("changeData" + i, r)
                })
            }, null, n, arguments.length > 1, null, !1)
        }, removeData: function (e) {
            return this.each(function () {
                H.removeData(this, e)
            })
        }
    }), H.extend({
        _mark: function (e, t) {
            e && (t = (t || "fx") + "mark", H._data(e, t, (H._data(e, t) || 0) + 1))
        }, _unmark: function (e, t, n) {
            e !== !0 && (n = t, t = e, e = !1);
            if (t) {
                n = n || "fx";
                var r = n + "mark", i = e ? 0 : (H._data(t, r) || 1) - 1;
                i ? H._data(t, r, i) : (H.removeData(t, r, !0), L(t, n, "mark"))
            }
        }, queue: function (e, t, n) {
            var r;
            if (e) {
                t = (t || "fx") + "queue", r = H._data(e, t), n && (!r || H.isArray(n) ? r = H._data(e, t, H.makeArray(n)) : r.push(n));
                return r || []
            }
        }, dequeue: function (e, t) {
            t = t || "fx";
            var n = H.queue(e, t), r = n.shift(), i = {};
            r === "inprogress" && (r = n.shift()), r && (t === "fx" && n.unshift("inprogress"), H._data(e, t + ".run", i), r.call(e, function () {
                H.dequeue(e, t)
            }, i)), n.length || (H.removeData(e, t + "queue " + t + ".run", !0), L(e, t, "queue"))
        }
    }), H.fn.extend({
        queue: function (e, n) {
            var r = 2;
            typeof e != "string" && (n = e, e = "fx", r--);
            if (arguments.length < r)return H.queue(this[0], e);
            return n === t ? this : this.each(function () {
                var t = H.queue(this, e, n);
                e === "fx" && t[0] !== "inprogress" && H.dequeue(this, e)
            })
        }, dequeue: function (e) {
            return this.each(function () {
                H.dequeue(this, e)
            })
        }, delay: function (e, t) {
            e = H.fx ? H.fx.speeds[e] || e : e, t = t || "fx";
            return this.queue(t, function (t, n) {
                var r = setTimeout(t, e);
                n.stop = function () {
                    clearTimeout(r)
                }
            })
        }, clearQueue: function (e) {
            return this.queue(e || "fx", [])
        }, promise: function (e, n) {
            function r() {
                --u || i.resolveWith(s, [s])
            }

            typeof e != "string" && (n = e, e = t), e = e || "fx";
            var i = H.Deferred(), s = this, o = s.length, u = 1, a = e + "defer", f = e + "queue", l = e + "mark", c;
            while (o--)if (c = H.data(s[o], a, t, !0) || (H.data(s[o], f, t, !0) || H.data(s[o], l, t, !0)) && H.data(s[o], a, H.Callbacks("once memory"), !0))u++, c.add(r);
            r();
            return i.promise(n)
        }
    });
    var q = /[\n\t\r]/g, R = /\s+/, U = /\r/g, z = /^(?:button|input)$/i, W = /^(?:button|input|object|select|textarea)$/i, X = /^a(?:rea)?$/i, V = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i, $ = H.support.getSetAttribute, J, K, Q;
    H.fn.extend({
        attr: function (e, t) {
            return H.access(this, H.attr, e, t, arguments.length > 1)
        }, removeAttr: function (e) {
            return this.each(function () {
                H.removeAttr(this, e)
            })
        }, prop: function (e, t) {
            return H.access(this, H.prop, e, t, arguments.length > 1)
        }, removeProp: function (e) {
            e = H.propFix[e] || e;
            return this.each(function () {
                try {
                    this[e] = t, delete this[e]
                } catch (n) {
                }
            })
        }, addClass: function (e) {
            var t, n, r, i, s, o, u;
            if (H.isFunction(e))return this.each(function (t) {
                H(this).addClass(e.call(this, t, this.className))
            });
            if (e && typeof e == "string") {
                t = e.split(R);
                for (n = 0, r = this.length; n < r; n++) {
                    i = this[n];
                    if (i.nodeType === 1)if (!i.className && t.length === 1)i.className = e; else {
                        s = " " + i.className + " ";
                        for (o = 0, u = t.length; o < u; o++)~s.indexOf(" " + t[o] + " ") || (s += t[o] + " ");
                        i.className = H.trim(s)
                    }
                }
            }
            return this
        }, removeClass: function (e) {
            var n, r, i, s, o, u, a;
            if (H.isFunction(e))return this.each(function (t) {
                H(this).removeClass(e.call(this, t, this.className))
            });
            if (e && typeof e == "string" || e === t) {
                n = (e || "").split(R);
                for (r = 0, i = this.length; r < i; r++) {
                    s = this[r];
                    if (s.nodeType === 1 && s.className)if (e) {
                        o = (" " + s.className + " ").replace(q, " ");
                        for (u = 0, a = n.length; u < a; u++)o = o.replace(" " + n[u] + " ", " ");
                        s.className = H.trim(o)
                    } else s.className = ""
                }
            }
            return this
        }, toggleClass: function (e, t) {
            var n = typeof e, r = typeof t == "boolean";
            if (H.isFunction(e))return this.each(function (n) {
                H(this).toggleClass(e.call(this, n, this.className, t), t)
            });
            return this.each(function () {
                if (n === "string") {
                    var i, s = 0, o = H(this), u = t, a = e.split(R);
                    while (i = a[s++])u = r ? u : !o.hasClass(i), o[u ? "addClass" : "removeClass"](i)
                } else if (n === "undefined" || n === "boolean")this.className && H._data(this, "__className__", this.className), this.className = this.className || e === !1 ? "" : H._data(this, "__className__") || ""
            })
        }, hasClass: function (e) {
            var t = " " + e + " ", n = 0, r = this.length;
            for (; n < r; n++)if (this[n].nodeType === 1 && (" " + this[n].className + " ").replace(q, " ").indexOf(t) > -1)return !0;
            return !1
        }, val: function (e) {
            var n, r, i, s = this[0];
            {
                if (!!arguments.length) {
                    i = H.isFunction(e);
                    return this.each(function (r) {
                        var s = H(this), o;
                        if (this.nodeType === 1) {
                            i ? o = e.call(this, r, s.val()) : o = e, o == null ? o = "" : typeof o == "number" ? o += "" : H.isArray(o) && (o = H.map(o, function (e) {
                                return e == null ? "" : e + ""
                            })), n = H.valHooks[this.type] || H.valHooks[this.nodeName.toLowerCase()];
                            if (!n || !("set" in n) || n.set(this, o, "value") === t)this.value = o
                        }
                    })
                }
                if (s) {
                    n = H.valHooks[s.type] || H.valHooks[s.nodeName.toLowerCase()];
                    if (n && "get" in n && (r = n.get(s, "value")) !== t)return r;
                    r = s.value;
                    return typeof r == "string" ? r.replace(U, "") : r == null ? "" : r
                }
            }
        }
    }), H.extend({
        valHooks: {
            option: {
                get: function (e) {
                    var t = e.attributes.value;
                    return !t || t.specified ? e.value : e.text
                }
            }, select: {
                get: function (e) {
                    var t, n, r, i, s = e.selectedIndex, o = [], u = e.options, a = e.type === "select-one";
                    if (s < 0)return null;
                    n = a ? s : 0, r = a ? s + 1 : u.length;
                    for (; n < r; n++) {
                        i = u[n];
                        if (i.selected && (H.support.optDisabled ? !i.disabled : i.getAttribute("disabled") === null) && (!i.parentNode.disabled || !H.nodeName(i.parentNode, "optgroup"))) {
                            t = H(i).val();
                            if (a)return t;
                            o.push(t)
                        }
                    }
                    if (a && !o.length && u.length)return H(u[s]).val();
                    return o
                }, set: function (e, t) {
                    var n = H.makeArray(t);
                    H(e).find("option").each(function () {
                        this.selected = H.inArray(H(this).val(), n) >= 0
                    }), n.length || (e.selectedIndex = -1);
                    return n
                }
            }
        },
        attrFn: {val: !0, css: !0, html: !0, text: !0, data: !0, width: !0, height: !0, offset: !0},
        attr: function (e, n, r, i) {
            var s, o, u, a = e.nodeType;
            if (!!e && a !== 3 && a !== 8 && a !== 2) {
                if (i && n in H.attrFn)return H(e)[n](r);
                if (typeof e.getAttribute == "undefined")return H.prop(e, n, r);
                u = a !== 1 || !H.isXMLDoc(e), u && (n = n.toLowerCase(), o = H.attrHooks[n] || (V.test(n) ? K : J));
                if (r !== t) {
                    if (r === null) {
                        H.removeAttr(e, n);
                        return
                    }
                    if (o && "set" in o && u && (s = o.set(e, r, n)) !== t)return s;
                    e.setAttribute(n, "" + r);
                    return r
                }
                if (o && "get" in o && u && (s = o.get(e, n)) !== null)return s;
                s = e.getAttribute(n);
                return s === null ? t : s
            }
        },
        removeAttr: function (e, t) {
            var n, r, i, s, o, u = 0;
            if (t && e.nodeType === 1) {
                r = t.toLowerCase().split(R), s = r.length;
                for (; u < s; u++)i = r[u], i && (n = H.propFix[i] || i, o = V.test(i), o || H.attr(e, i, ""), e.removeAttribute($ ? i : n), o && n in e && (e[n] = !1))
            }
        },
        attrHooks: {
            type: {
                set: function (e, t) {
                    if (z.test(e.nodeName) && e.parentNode)H.error("type property can't be changed"); else if (!H.support.radioValue && t === "radio" && H.nodeName(e, "input")) {
                        var n = e.value;
                        e.setAttribute("type", t), n && (e.value = n);
                        return t
                    }
                }
            }, value: {
                get: function (e, t) {
                    if (J && H.nodeName(e, "button"))return J.get(e, t);
                    return t in e ? e.value : null
                }, set: function (e, t, n) {
                    if (J && H.nodeName(e, "button"))return J.set(e, t, n);
                    e.value = t
                }
            }
        },
        propFix: {
            tabindex: "tabIndex",
            readonly: "readOnly",
            "for": "htmlFor",
            "class": "className",
            maxlength: "maxLength",
            cellspacing: "cellSpacing",
            cellpadding: "cellPadding",
            rowspan: "rowSpan",
            colspan: "colSpan",
            usemap: "useMap",
            frameborder: "frameBorder",
            contenteditable: "contentEditable"
        },
        prop: function (e, n, r) {
            var i, s, o, u = e.nodeType;
            if (!!e && u !== 3 && u !== 8 && u !== 2) {
                o = u !== 1 || !H.isXMLDoc(e), o && (n = H.propFix[n] || n, s = H.propHooks[n]);
                return r !== t ? s && "set" in s && (i = s.set(e, r, n)) !== t ? i : e[n] = r : s && "get" in s && (i = s.get(e, n)) !== null ? i : e[n]
            }
        },
        propHooks: {
            tabIndex: {
                get: function (e) {
                    var n = e.getAttributeNode("tabindex");
                    return n && n.specified ? parseInt(n.value, 10) : W.test(e.nodeName) || X.test(e.nodeName) && e.href ? 0 : t
                }
            }
        }
    }), H.attrHooks.tabindex = H.propHooks.tabIndex, K = {
        get: function (e, n) {
            var r, i = H.prop(e, n);
            return i === !0 || typeof i != "boolean" && (r = e.getAttributeNode(n)) && r.nodeValue !== !1 ? n.toLowerCase() : t
        }, set: function (e, t, n) {
            var r;
            t === !1 ? H.removeAttr(e, n) : (r = H.propFix[n] || n, r in e && (e[r] = !0), e.setAttribute(n, n.toLowerCase()));
            return n
        }
    }, $ || (Q = {name: !0, id: !0, coords: !0}, J = H.valHooks.button = {
        get: function (e, n) {
            var r;
            r = e.getAttributeNode(n);
            return r && (Q[n] ? r.nodeValue !== "" : r.specified) ? r.nodeValue : t
        }, set: function (e, t, n) {
            var r = e.getAttributeNode(n);
            r || (r = _.createAttribute(n), e.setAttributeNode(r));
            return r.nodeValue = t + ""
        }
    }, H.attrHooks.tabindex.set = J.set, H.each(["width", "height"], function (e, t) {
        H.attrHooks[t] = H.extend(H.attrHooks[t], {
            set: function (e, n) {
                if (n === "") {
                    e.setAttribute(t, "auto");
                    return n
                }
            }
        })
    }), H.attrHooks.contenteditable = {
        get: J.get, set: function (e, t, n) {
            t === "" && (t = "false"), J.set(e, t, n)
        }
    }), H.support.hrefNormalized || H.each(["href", "src", "width", "height"], function (e, n) {
        H.attrHooks[n] = H.extend(H.attrHooks[n], {
            get: function (e) {
                var r = e.getAttribute(n, 2);
                return r === null ? t : r
            }
        })
    }), H.support.style || (H.attrHooks.style = {
        get: function (e) {
            return e.style.cssText.toLowerCase() || t
        }, set: function (e, t) {
            return e.style.cssText = "" + t
        }
    }), H.support.optSelected || (H.propHooks.selected = H.extend(H.propHooks.selected, {
        get: function (e) {
            var t = e.parentNode;
            t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex);
            return null
        }
    })), H.support.enctype || (H.propFix.enctype = "encoding"), H.support.checkOn || H.each(["radio", "checkbox"], function () {
        H.valHooks[this] = {
            get: function (e) {
                return e.getAttribute("value") === null ? "on" : e.value
            }
        }
    }), H.each(["radio", "checkbox"], function () {
        H.valHooks[this] = H.extend(H.valHooks[this], {
            set: function (e, t) {
                if (H.isArray(t))return e.checked = H.inArray(H(e).val(), t) >= 0
            }
        })
    });
    var G = /^(?:textarea|input|select)$/i, Y = /^([^\.]*)?(?:\.(.+))?$/, Z = /(?:^|\s)hover(\.\S+)?\b/, et = /^key/, tt = /^(?:mouse|contextmenu)|click/, nt = /^(?:focusinfocus|focusoutblur)$/, rt = /^(\w*)(?:#([\w\-]+))?(?:\.([\w\-]+))?$/, it = function (e) {
        var t = rt.exec(e);
        t && (t[1] = (t[1] || "").toLowerCase(), t[3] = t[3] && new RegExp("(?:^|\\s)" + t[3] + "(?:\\s|$)"));
        return t
    }, st = function (e, t) {
        var n = e.attributes || {};
        return (!t[1] || e.nodeName.toLowerCase() === t[1]) && (!t[2] || (n.id || {}).value === t[2]) && (!t[3] || t[3].test((n["class"] || {}).value))
    }, ot = function (e) {
        return H.event.special.hover ? e : e.replace(Z, "mouseenter$1 mouseleave$1")
    };
    H.event = {
        add: function (e, n, r, i, s) {
            var o, u, a, f, l, c, h, p, d, v, m, g;
            if (!(e.nodeType === 3 || e.nodeType === 8 || !n || !r || !(o = H._data(e)))) {
                r.handler && (d = r, r = d.handler, s = d.selector), r.guid || (r.guid = H.guid++), a = o.events, a || (o.events = a = {}), u = o.handle, u || (o.handle = u = function (e) {
                    return typeof H != "undefined" && (!e || H.event.triggered !== e.type) ? H.event.dispatch.apply(u.elem, arguments) : t
                }, u.elem = e), n = H.trim(ot(n)).split(" ");
                for (f = 0; f < n.length; f++) {
                    l = Y.exec(n[f]) || [], c = l[1], h = (l[2] || "").split(".").sort(), g = H.event.special[c] || {}, c = (s ? g.delegateType : g.bindType) || c, g = H.event.special[c] || {}, p = H.extend({
                        type: c,
                        origType: l[1],
                        data: i,
                        handler: r,
                        guid: r.guid,
                        selector: s,
                        quick: s && it(s),
                        namespace: h.join(".")
                    }, d), m = a[c];
                    if (!m) {
                        m = a[c] = [], m.delegateCount = 0;
                        if (!g.setup || g.setup.call(e, i, h, u) === !1)e.addEventListener ? e.addEventListener(c, u, !1) : e.attachEvent && e.attachEvent("on" + c, u)
                    }
                    g.add && (g.add.call(e, p), p.handler.guid || (p.handler.guid = r.guid)), s ? m.splice(m.delegateCount++, 0, p) : m.push(p), H.event.global[c] = !0
                }
                e = null
            }
        },
        global: {},
        remove: function (e, t, n, r, i) {
            var s = H.hasData(e) && H._data(e), o, u, a, f, l, c, h, p, d, v, m, g;
            if (!!s && !!(p = s.events)) {
                t = H.trim(ot(t || "")).split(" ");
                for (o = 0; o < t.length; o++) {
                    u = Y.exec(t[o]) || [], a = f = u[1], l = u[2];
                    if (!a) {
                        for (a in p)H.event.remove(e, a + t[o], n, r, !0);
                        continue
                    }
                    d = H.event.special[a] || {}, a = (r ? d.delegateType : d.bindType) || a, m = p[a] || [], c = m.length, l = l ? new RegExp("(^|\\.)" + l.split(".").sort().join("\\.(?:.*\\.)?") + "(\\.|$)") : null;
                    for (h = 0; h < m.length; h++)g = m[h], (i || f === g.origType) && (!n || n.guid === g.guid) && (!l || l.test(g.namespace)) && (!r || r === g.selector || r === "**" && g.selector) && (m.splice(h--, 1), g.selector && m.delegateCount--, d.remove && d.remove.call(e, g));
                    m.length === 0 && c !== m.length && ((!d.teardown || d.teardown.call(e, l) === !1) && H.removeEvent(e, a, s.handle), delete p[a])
                }
                H.isEmptyObject(p) && (v = s.handle, v && (v.elem = null), H.removeData(e, ["events", "handle"], !0))
            }
        },
        customEvent: {getData: !0, setData: !0, changeData: !0},
        trigger: function (n, r, i, s) {
            if (!i || i.nodeType !== 3 && i.nodeType !== 8) {
                var o = n.type || n, u = [], a, f, l, c, h, p, d, v, m, g;
                if (nt.test(o + H.event.triggered))return;
                o.indexOf("!") >= 0 && (o = o.slice(0, -1), f = !0), o.indexOf(".") >= 0 && (u = o.split("."), o = u.shift(), u.sort());
                if ((!i || H.event.customEvent[o]) && !H.event.global[o])return;
                n = typeof n == "object" ? n[H.expando] ? n : new H.Event(o, n) : new H.Event(o), n.type = o, n.isTrigger = !0, n.exclusive = f, n.namespace = u.join("."), n.namespace_re = n.namespace ? new RegExp("(^|\\.)" + u.join("\\.(?:.*\\.)?") + "(\\.|$)") : null, p = o.indexOf(":") < 0 ? "on" + o : "";
                if (!i) {
                    a = H.cache;
                    for (l in a)a[l].events && a[l].events[o] && H.event.trigger(n, r, a[l].handle.elem, !0);
                    return
                }
                n.result = t, n.target || (n.target = i), r = r != null ? H.makeArray(r) : [], r.unshift(n), d = H.event.special[o] || {};
                if (d.trigger && d.trigger.apply(i, r) === !1)return;
                m = [[i, d.bindType || o]];
                if (!s && !d.noBubble && !H.isWindow(i)) {
                    g = d.delegateType || o, c = nt.test(g + o) ? i : i.parentNode, h = null;
                    for (; c; c = c.parentNode)m.push([c, g]), h = c;
                    h && h === i.ownerDocument && m.push([h.defaultView || h.parentWindow || e, g])
                }
                for (l = 0; l < m.length && !n.isPropagationStopped(); l++)c = m[l][0], n.type = m[l][1], v = (H._data(c, "events") || {})[n.type] && H._data(c, "handle"), v && v.apply(c, r), v = p && c[p], v && H.acceptData(c) && v.apply(c, r) === !1 && n.preventDefault();
                n.type = o, !s && !n.isDefaultPrevented() && (!d._default || d._default.apply(i.ownerDocument, r) === !1) && (o !== "click" || !H.nodeName(i, "a")) && H.acceptData(i) && p && i[o] && (o !== "focus" && o !== "blur" || n.target.offsetWidth !== 0) && !H.isWindow(i) && (h = i[p], h && (i[p] = null), H.event.triggered = o, i[o](), H.event.triggered = t, h && (i[p] = h));
                return n.result
            }
        },
        dispatch: function (n) {
            n = H.event.fix(n || e.event);
            var r = (H._data(this, "events") || {})[n.type] || [], i = r.delegateCount, s = [].slice.call(arguments, 0), o = !n.exclusive && !n.namespace, u = H.event.special[n.type] || {}, a = [], f, l, c, h, p, d, v, m, g, y, b;
            s[0] = n, n.delegateTarget = this;
            if (!u.preDispatch || u.preDispatch.call(this, n) !== !1) {
                if (i && (!n.button || n.type !== "click")) {
                    h = H(this), h.context = this.ownerDocument || this;
                    for (c = n.target; c != this; c = c.parentNode || this)if (c.disabled !== !0) {
                        d = {}, m = [], h[0] = c;
                        for (f = 0; f < i; f++)g = r[f], y = g.selector, d[y] === t && (d[y] = g.quick ? st(c, g.quick) : h.is(y)), d[y] && m.push(g);
                        m.length && a.push({elem: c, matches: m})
                    }
                }
                r.length > i && a.push({elem: this, matches: r.slice(i)});
                for (f = 0; f < a.length && !n.isPropagationStopped(); f++) {
                    v = a[f], n.currentTarget = v.elem;
                    for (l = 0; l < v.matches.length && !n.isImmediatePropagationStopped(); l++) {
                        g = v.matches[l];
                        if (o || !n.namespace && !g.namespace || n.namespace_re && n.namespace_re.test(g.namespace))n.data = g.data, n.handleObj = g, p = ((H.event.special[g.origType] || {}).handle || g.handler).apply(v.elem, s), p !== t && (n.result = p, p === !1 && (n.preventDefault(), n.stopPropagation()))
                    }
                }
                u.postDispatch && u.postDispatch.call(this, n);
                return n.result
            }
        },
        props: "attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: "char charCode key keyCode".split(" "), filter: function (e, t) {
                e.which == null && (e.which = t.charCode != null ? t.charCode : t.keyCode);
                return e
            }
        },
        mouseHooks: {
            props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function (e, n) {
                var r, i, s, o = n.button, u = n.fromElement;
                e.pageX == null && n.clientX != null && (r = e.target.ownerDocument || _, i = r.documentElement, s = r.body, e.pageX = n.clientX + (i && i.scrollLeft || s && s.scrollLeft || 0) - (i && i.clientLeft || s && s.clientLeft || 0), e.pageY = n.clientY + (i && i.scrollTop || s && s.scrollTop || 0) - (i && i.clientTop || s && s.clientTop || 0)), !e.relatedTarget && u && (e.relatedTarget = u === e.target ? n.toElement : u), !e.which && o !== t && (e.which = o & 1 ? 1 : o & 2 ? 3 : o & 4 ? 2 : 0);
                return e
            }
        },
        fix: function (e) {
            if (e[H.expando])return e;
            var n, r, i = e, s = H.event.fixHooks[e.type] || {}, o = s.props ? this.props.concat(s.props) : this.props;
            e = H.Event(i);
            for (n = o.length; n;)r = o[--n], e[r] = i[r];
            e.target || (e.target = i.srcElement || _), e.target.nodeType === 3 && (e.target = e.target.parentNode), e.metaKey === t && (e.metaKey = e.ctrlKey);
            return s.filter ? s.filter(e, i) : e
        },
        special: {
            ready: {setup: H.bindReady},
            load: {noBubble: !0},
            focus: {delegateType: "focusin"},
            blur: {delegateType: "focusout"},
            beforeunload: {
                setup: function (e, t, n) {
                    H.isWindow(this) && (this.onbeforeunload = n)
                }, teardown: function (e, t) {
                    this.onbeforeunload === t && (this.onbeforeunload = null)
                }
            }
        },
        simulate: function (e, t, n, r) {
            var i = H.extend(new H.Event, n, {type: e, isSimulated: !0, originalEvent: {}});
            r ? H.event.trigger(i, null, t) : H.event.dispatch.call(t, i), i.isDefaultPrevented() && n.preventDefault()
        }
    }, H.event.handle = H.event.dispatch, H.removeEvent = _.removeEventListener ? function (e, t, n) {
        e.removeEventListener && e.removeEventListener(t, n, !1)
    } : function (e, t, n) {
        e.detachEvent && e.detachEvent("on" + t, n)
    }, H.Event = function (e, t) {
        if (!(this instanceof H.Event))return new H.Event(e, t);
        e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || e.returnValue === !1 || e.getPreventDefault && e.getPreventDefault() ? C : k) : this.type = e, t && H.extend(this, t), this.timeStamp = e && e.timeStamp || H.now(), this[H.expando] = !0
    }, H.Event.prototype = {
        preventDefault: function () {
            this.isDefaultPrevented = C;
            var e = this.originalEvent;
            !e || (e.preventDefault ? e.preventDefault() : e.returnValue = !1)
        }, stopPropagation: function () {
            this.isPropagationStopped = C;
            var e = this.originalEvent;
            !e || (e.stopPropagation && e.stopPropagation(), e.cancelBubble = !0)
        }, stopImmediatePropagation: function () {
            this.isImmediatePropagationStopped = C, this.stopPropagation()
        }, isDefaultPrevented: k, isPropagationStopped: k, isImmediatePropagationStopped: k
    }, H.each({mouseenter: "mouseover", mouseleave: "mouseout"}, function (e, t) {
        H.event.special[e] = {
            delegateType: t, bindType: t, handle: function (e) {
                var n = this, r = e.relatedTarget, i = e.handleObj, s = i.selector, o;
                if (!r || r !== n && !H.contains(n, r))e.type = i.origType, o = i.handler.apply(this, arguments), e.type = t;
                return o
            }
        }
    }), H.support.submitBubbles || (H.event.special.submit = {
        setup: function () {
            if (H.nodeName(this, "form"))return !1;
            H.event.add(this, "click._submit keypress._submit", function (e) {
                var n = e.target, r = H.nodeName(n, "input") || H.nodeName(n, "button") ? n.form : t;
                r && !r._submit_attached && (H.event.add(r, "submit._submit", function (e) {
                    e._submit_bubble = !0
                }), r._submit_attached = !0)
            })
        }, postDispatch: function (e) {
            e._submit_bubble && (delete e._submit_bubble, this.parentNode && !e.isTrigger && H.event.simulate("submit", this.parentNode, e, !0))
        }, teardown: function () {
            if (H.nodeName(this, "form"))return !1;
            H.event.remove(this, "._submit")
        }
    }), H.support.changeBubbles || (H.event.special.change = {
        setup: function () {
            if (G.test(this.nodeName)) {
                if (this.type === "checkbox" || this.type === "radio")H.event.add(this, "propertychange._change", function (e) {
                    e.originalEvent.propertyName === "checked" && (this._just_changed = !0)
                }), H.event.add(this, "click._change", function (e) {
                    this._just_changed && !e.isTrigger && (this._just_changed = !1, H.event.simulate("change", this, e, !0))
                });
                return !1
            }
            H.event.add(this, "beforeactivate._change", function (e) {
                var t = e.target;
                G.test(t.nodeName) && !t._change_attached && (H.event.add(t, "change._change", function (e) {
                    this.parentNode && !e.isSimulated && !e.isTrigger && H.event.simulate("change", this.parentNode, e, !0)
                }), t._change_attached = !0)
            })
        }, handle: function (e) {
            var t = e.target;
            if (this !== t || e.isSimulated || e.isTrigger || t.type !== "radio" && t.type !== "checkbox")return e.handleObj.handler.apply(this, arguments)
        }, teardown: function () {
            H.event.remove(this, "._change");
            return G.test(this.nodeName)
        }
    }), H.support.focusinBubbles || H.each({focus: "focusin", blur: "focusout"}, function (e, t) {
        var n = 0, r = function (e) {
            H.event.simulate(t, e.target, H.event.fix(e), !0)
        };
        H.event.special[t] = {
            setup: function () {
                n++ === 0 && _.addEventListener(e, r, !0)
            }, teardown: function () {
                --n === 0 && _.removeEventListener(e, r, !0)
            }
        }
    }), H.fn.extend({
        on: function (e, n, r, i, s) {
            var o, u;
            if (typeof e == "object") {
                typeof n != "string" && (r = r || n, n = t);
                for (u in e)this.on(u, n, r, e[u], s);
                return this
            }
            r == null && i == null ? (i = n, r = n = t) : i == null && (typeof n == "string" ? (i = r, r = t) : (i = r, r = n, n = t));
            if (i === !1)i = k; else if (!i)return this;
            s === 1 && (o = i, i = function (e) {
                H().off(e);
                return o.apply(this, arguments)
            }, i.guid = o.guid || (o.guid = H.guid++));
            return this.each(function () {
                H.event.add(this, e, i, r, n)
            })
        }, one: function (e, t, n, r) {
            return this.on(e, t, n, r, 1)
        }, off: function (e, n, r) {
            if (e && e.preventDefault && e.handleObj) {
                var i = e.handleObj;
                H(e.delegateTarget).off(i.namespace ? i.origType + "." + i.namespace : i.origType, i.selector, i.handler);
                return this
            }
            if (typeof e == "object") {
                for (var s in e)this.off(s, n, e[s]);
                return this
            }
            if (n === !1 || typeof n == "function")r = n, n = t;
            r === !1 && (r = k);
            return this.each(function () {
                H.event.remove(this, e, r, n)
            })
        }, bind: function (e, t, n) {
            return this.on(e, null, t, n)
        }, unbind: function (e, t) {
            return this.off(e, null, t)
        }, live: function (e, t, n) {
            H(this.context).on(e, this.selector, t, n);
            return this
        }, die: function (e, t) {
            H(this.context).off(e, this.selector || "**", t);
            return this
        }, delegate: function (e, t, n, r) {
            return this.on(t, e, n, r)
        }, undelegate: function (e, t, n) {
            return arguments.length == 1 ? this.off(e, "**") : this.off(t, e, n)
        }, trigger: function (e, t) {
            return this.each(function () {
                H.event.trigger(e, t, this)
            })
        }, triggerHandler: function (e, t) {
            if (this[0])return H.event.trigger(e, t, this[0], !0)
        }, toggle: function (e) {
            var t = arguments, n = e.guid || H.guid++, r = 0, i = function (n) {
                var i = (H._data(this, "lastToggle" + e.guid) || 0) % r;
                H._data(this, "lastToggle" + e.guid, i + 1), n.preventDefault();
                return t[i].apply(this, arguments) || !1
            };
            i.guid = n;
            while (r < t.length)t[r++].guid = n;
            return this.click(i)
        }, hover: function (e, t) {
            return this.mouseenter(e).mouseleave(t || e)
        }
    }), H.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function (e, t) {
        H.fn[t] = function (e, n) {
            n == null && (n = e, e = null);
            return arguments.length > 0 ? this.on(t, null, e, n) : this.trigger(t)
        }, H.attrFn && (H.attrFn[t] = !0), et.test(t) && (H.event.fixHooks[t] = H.event.keyHooks), tt.test(t) && (H.event.fixHooks[t] = H.event.mouseHooks)
    }), function () {
        function e(e, t, n, r, s, o) {
            for (var u = 0, a = r.length; u < a; u++) {
                var f = r[u];
                if (f) {
                    var l = !1;
                    f = f[e];
                    while (f) {
                        if (f[i] === n) {
                            l = r[f.sizset];
                            break
                        }
                        if (f.nodeType === 1) {
                            o || (f[i] = n, f.sizset = u);
                            if (typeof t != "string") {
                                if (f === t) {
                                    l = !0;
                                    break
                                }
                            } else if (h.filter(t, [f]).length > 0) {
                                l = f;
                                break
                            }
                        }
                        f = f[e]
                    }
                    r[u] = l
                }
            }
        }

        function n(e, t, n, r, s, o) {
            for (var u = 0, a = r.length; u < a; u++) {
                var f = r[u];
                if (f) {
                    var l = !1;
                    f = f[e];
                    while (f) {
                        if (f[i] === n) {
                            l = r[f.sizset];
                            break
                        }
                        f.nodeType === 1 && !o && (f[i] = n, f.sizset = u);
                        if (f.nodeName.toLowerCase() === t) {
                            l = f;
                            break
                        }
                        f = f[e]
                    }
                    r[u] = l
                }
            }
        }

        var r = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g, i = "sizcache" + (Math.random() + "").replace(".", ""), s = 0, o = Object.prototype.toString, u = !1, a = !0, f = /\\/g, l = /\r\n/g, c = /\W/;
        [0, 0].sort(function () {
            a = !1;
            return 0
        });
        var h = function (e, t, n, i) {
            n = n || [], t = t || _;
            var s = t;
            if (t.nodeType !== 1 && t.nodeType !== 9)return [];
            if (!e || typeof e != "string")return n;
            var u, a, f, l, c, p, m, g, b = !0, w = h.isXML(t), E = [], x = e;
            do {
                r.exec(""), u = r.exec(x);
                if (u) {
                    x = u[3], E.push(u[1]);
                    if (u[2]) {
                        l = u[3];
                        break
                    }
                }
            } while (u);
            if (E.length > 1 && v.exec(e))if (E.length === 2 && d.relative[E[0]])a = S(E[0] + E[1], t, i); else {
                a = d.relative[E[0]] ? [t] : h(E.shift(), t);
                while (E.length)e = E.shift(), d.relative[e] && (e += E.shift()), a = S(e, a, i)
            } else {
                !i && E.length > 1 && t.nodeType === 9 && !w && d.match.ID.test(E[0]) && !d.match.ID.test(E[E.length - 1]) && (c = h.find(E.shift(), t, w), t = c.expr ? h.filter(c.expr, c.set)[0] : c.set[0]);
                if (t) {
                    c = i ? {
                        expr: E.pop(),
                        set: y(i)
                    } : h.find(E.pop(), E.length === 1 && (E[0] === "~" || E[0] === "+") && t.parentNode ? t.parentNode : t, w), a = c.expr ? h.filter(c.expr, c.set) : c.set, E.length > 0 ? f = y(a) : b = !1;
                    while (E.length)p = E.pop(), m = p, d.relative[p] ? m = E.pop() : p = "", m == null && (m = t), d.relative[p](f, m, w)
                } else f = E = []
            }
            f || (f = a), f || h.error(p || e);
            if (o.call(f) === "[object Array]")if (!b)n.push.apply(n, f); else if (t && t.nodeType === 1)for (g = 0; f[g] != null; g++)f[g] && (f[g] === !0 || f[g].nodeType === 1 && h.contains(t, f[g])) && n.push(a[g]); else for (g = 0; f[g] != null; g++)f[g] && f[g].nodeType === 1 && n.push(a[g]); else y(f, n);
            l && (h(l, s, n, i), h.uniqueSort(n));
            return n
        };
        h.uniqueSort = function (e) {
            if (w) {
                u = a, e.sort(w);
                if (u)for (var t = 1; t < e.length; t++)e[t] === e[t - 1] && e.splice(t--, 1)
            }
            return e
        }, h.matches = function (e, t) {
            return h(e, null, null, t)
        }, h.matchesSelector = function (e, t) {
            return h(t, null, null, [e]).length > 0
        }, h.find = function (e, t, n) {
            var r, i, s, o, u, a;
            if (!e)return [];
            for (i = 0, s = d.order.length; i < s; i++) {
                u = d.order[i];
                if (o = d.leftMatch[u].exec(e)) {
                    a = o[1], o.splice(1, 1);
                    if (a.substr(a.length - 1) !== "\\") {
                        o[1] = (o[1] || "").replace(f, ""), r = d.find[u](o, t, n);
                        if (r != null) {
                            e = e.replace(d.match[u], "");
                            break
                        }
                    }
                }
            }
            r || (r = typeof t.getElementsByTagName != "undefined" ? t.getElementsByTagName("*") : []);
            return {set: r, expr: e}
        }, h.filter = function (e, n, r, i) {
            var s, o, u, a, f, l, c, p, v, m = e, g = [], y = n, b = n && n[0] && h.isXML(n[0]);
            while (e && n.length) {
                for (u in d.filter)if ((s = d.leftMatch[u].exec(e)) != null && s[2]) {
                    l = d.filter[u], c = s[1], o = !1, s.splice(1, 1);
                    if (c.substr(c.length - 1) === "\\")continue;
                    y === g && (g = []);
                    if (d.preFilter[u]) {
                        s = d.preFilter[u](s, y, r, g, i, b);
                        if (!s)o = a = !0; else if (s === !0)continue
                    }
                    if (s)for (p = 0; (f = y[p]) != null; p++)f && (a = l(f, s, p, y), v = i ^ a, r && a != null ? v ? o = !0 : y[p] = !1 : v && (g.push(f), o = !0));
                    if (a !== t) {
                        r || (y = g), e = e.replace(d.match[u], "");
                        if (!o)return [];
                        break
                    }
                }
                if (e === m)if (o == null)h.error(e); else break;
                m = e
            }
            return y
        }, h.error = function (e) {
            throw new Error("Syntax error, unrecognized expression: " + e)
        };
        var p = h.getText = function (e) {
            var t, n, r = e.nodeType, i = "";
            if (r) {
                if (r === 1 || r === 9 || r === 11) {
                    if (typeof e.textContent == "string")return e.textContent;
                    if (typeof e.innerText == "string")return e.innerText.replace(l, "");
                    for (e = e.firstChild; e; e = e.nextSibling)i += p(e)
                } else if (r === 3 || r === 4)return e.nodeValue
            } else for (t = 0; n = e[t]; t++)n.nodeType !== 8 && (i += p(n));
            return i
        }, d = h.selectors = {
            order: ["ID", "NAME", "TAG"],
            match: {
                ID: /#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
                CLASS: /\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
                NAME: /\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,
                ATTR: /\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(?:(['"])(.*?)\3|(#?(?:[\w\u00c0-\uFFFF\-]|\\.)*)|)|)\s*\]/,
                TAG: /^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,
                CHILD: /:(only|nth|last|first)-child(?:\(\s*(even|odd|(?:[+\-]?\d+|(?:[+\-]?\d*)?n\s*(?:[+\-]\s*\d+)?))\s*\))?/,
                POS: /:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,
                PSEUDO: /:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/
            },
            leftMatch: {},
            attrMap: {"class": "className", "for": "htmlFor"},
            attrHandle: {
                href: function (e) {
                    return e.getAttribute("href")
                }, type: function (e) {
                    return e.getAttribute("type")
                }
            },
            relative: {
                "+": function (e, t) {
                    var n = typeof t == "string", r = n && !c.test(t), i = n && !r;
                    r && (t = t.toLowerCase());
                    for (var s = 0, o = e.length, u; s < o; s++)if (u = e[s]) {
                        while ((u = u.previousSibling) && u.nodeType !== 1);
                        e[s] = i || u && u.nodeName.toLowerCase() === t ? u || !1 : u === t
                    }
                    i && h.filter(t, e, !0)
                }, ">": function (e, t) {
                    var n, r = typeof t == "string", i = 0, s = e.length;
                    if (r && !c.test(t)) {
                        t = t.toLowerCase();
                        for (; i < s; i++) {
                            n = e[i];
                            if (n) {
                                var o = n.parentNode;
                                e[i] = o.nodeName.toLowerCase() === t ? o : !1
                            }
                        }
                    } else {
                        for (; i < s; i++)n = e[i], n && (e[i] = r ? n.parentNode : n.parentNode === t);
                        r && h.filter(t, e, !0)
                    }
                }, "": function (t, r, i) {
                    var o, u = s++, a = e;
                    typeof r == "string" && !c.test(r) && (r = r.toLowerCase(), o = r, a = n), a("parentNode", r, u, t, o, i)
                }, "~": function (t, r, i) {
                    var o, u = s++, a = e;
                    typeof r == "string" && !c.test(r) && (r = r.toLowerCase(), o = r, a = n), a("previousSibling", r, u, t, o, i)
                }
            },
            find: {
                ID: function (e, t, n) {
                    if (typeof t.getElementById != "undefined" && !n) {
                        var r = t.getElementById(e[1]);
                        return r && r.parentNode ? [r] : []
                    }
                }, NAME: function (e, t) {
                    if (typeof t.getElementsByName != "undefined") {
                        var n = [], r = t.getElementsByName(e[1]);
                        for (var i = 0, s = r.length; i < s; i++)r[i].getAttribute("name") === e[1] && n.push(r[i]);
                        return n.length === 0 ? null : n
                    }
                }, TAG: function (e, t) {
                    if (typeof t.getElementsByTagName != "undefined")return t.getElementsByTagName(e[1])
                }
            },
            preFilter: {
                CLASS: function (e, t, n, r, i, s) {
                    e = " " + e[1].replace(f, "") + " ";
                    if (s)return e;
                    for (var o = 0, u; (u = t[o]) != null; o++)u && (i ^ (u.className && (" " + u.className + " ").replace(/[\t\n\r]/g, " ").indexOf(e) >= 0) ? n || r.push(u) : n && (t[o] = !1));
                    return !1
                }, ID: function (e) {
                    return e[1].replace(f, "")
                }, TAG: function (e, t) {
                    return e[1].replace(f, "").toLowerCase()
                }, CHILD: function (e) {
                    if (e[1] === "nth") {
                        e[2] || h.error(e[0]), e[2] = e[2].replace(/^\+|\s*/g, "");
                        var t = /(-?)(\d*)(?:n([+\-]?\d*))?/.exec(e[2] === "even" && "2n" || e[2] === "odd" && "2n+1" || !/\D/.test(e[2]) && "0n+" + e[2] || e[2]);
                        e[2] = t[1] + (t[2] || 1) - 0, e[3] = t[3] - 0
                    } else e[2] && h.error(e[0]);
                    e[0] = s++;
                    return e
                }, ATTR: function (e, t, n, r, i, s) {
                    var o = e[1] = e[1].replace(f, "");
                    !s && d.attrMap[o] && (e[1] = d.attrMap[o]), e[4] = (e[4] || e[5] || "").replace(f, ""), e[2] === "~=" && (e[4] = " " + e[4] + " ");
                    return e
                }, PSEUDO: function (e, t, n, i, s) {
                    if (e[1] === "not")if ((r.exec(e[3]) || "").length > 1 || /^\w/.test(e[3]))e[3] = h(e[3], null, null, t); else {
                        var o = h.filter(e[3], t, n, !0 ^ s);
                        n || i.push.apply(i, o);
                        return !1
                    } else if (d.match.POS.test(e[0]) || d.match.CHILD.test(e[0]))return !0;
                    return e
                }, POS: function (e) {
                    e.unshift(!0);
                    return e
                }
            },
            filters: {
                enabled: function (e) {
                    return e.disabled === !1 && e.type !== "hidden"
                }, disabled: function (e) {
                    return e.disabled === !0
                }, checked: function (e) {
                    return e.checked === !0
                }, selected: function (e) {
                    e.parentNode && e.parentNode.selectedIndex;
                    return e.selected === !0
                }, parent: function (e) {
                    return !!e.firstChild
                }, empty: function (e) {
                    return !e.firstChild
                }, has: function (e, t, n) {
                    return !!h(n[3], e).length
                }, header: function (e) {
                    return /h\d/i.test(e.nodeName)
                }, text: function (e) {
                    var t = e.getAttribute("type"), n = e.type;
                    return e.nodeName.toLowerCase() === "input" && "text" === n && (t === n || t === null)
                }, radio: function (e) {
                    return e.nodeName.toLowerCase() === "input" && "radio" === e.type
                }, checkbox: function (e) {
                    return e.nodeName.toLowerCase() === "input" && "checkbox" === e.type
                }, file: function (e) {
                    return e.nodeName.toLowerCase() === "input" && "file" === e.type
                }, password: function (e) {
                    return e.nodeName.toLowerCase() === "input" && "password" === e.type
                }, submit: function (e) {
                    var t = e.nodeName.toLowerCase();
                    return (t === "input" || t === "button") && "submit" === e.type
                }, image: function (e) {
                    return e.nodeName.toLowerCase() === "input" && "image" === e.type
                }, reset: function (e) {
                    var t = e.nodeName.toLowerCase();
                    return (t === "input" || t === "button") && "reset" === e.type
                }, button: function (e) {
                    var t = e.nodeName.toLowerCase();
                    return t === "input" && "button" === e.type || t === "button"
                }, input: function (e) {
                    return /input|select|textarea|button/i.test(e.nodeName)
                }, focus: function (e) {
                    return e === e.ownerDocument.activeElement
                }
            },
            setFilters: {
                first: function (e, t) {
                    return t === 0
                }, last: function (e, t, n, r) {
                    return t === r.length - 1
                }, even: function (e, t) {
                    return t % 2 === 0
                }, odd: function (e, t) {
                    return t % 2 === 1
                }, lt: function (e, t, n) {
                    return t < n[3] - 0
                }, gt: function (e, t, n) {
                    return t > n[3] - 0
                }, nth: function (e, t, n) {
                    return n[3] - 0 === t
                }, eq: function (e, t, n) {
                    return n[3] - 0 === t
                }
            },
            filter: {
                PSEUDO: function (e, t, n, r) {
                    var i = t[1], s = d.filters[i];
                    if (s)return s(e, n, t, r);
                    if (i === "contains")return (e.textContent || e.innerText || p([e]) || "").indexOf(t[3]) >= 0;
                    if (i === "not") {
                        var o = t[3];
                        for (var u = 0, a = o.length; u < a; u++)if (o[u] === e)return !1;
                        return !0
                    }
                    h.error(i)
                }, CHILD: function (e, t) {
                    var n, r, s, o, u, a, f, l = t[1], c = e;
                    switch (l) {
                        case"only":
                        case"first":
                            while (c = c.previousSibling)if (c.nodeType === 1)return !1;
                            if (l === "first")return !0;
                            c = e;
                        case"last":
                            while (c = c.nextSibling)if (c.nodeType === 1)return !1;
                            return !0;
                        case"nth":
                            n = t[2], r = t[3];
                            if (n === 1 && r === 0)return !0;
                            s = t[0], o = e.parentNode;
                            if (o && (o[i] !== s || !e.nodeIndex)) {
                                a = 0;
                                for (c = o.firstChild; c; c = c.nextSibling)c.nodeType === 1 && (c.nodeIndex = ++a);
                                o[i] = s
                            }
                            f = e.nodeIndex - r;
                            return n === 0 ? f === 0 : f % n === 0 && f / n >= 0
                    }
                }, ID: function (e, t) {
                    return e.nodeType === 1 && e.getAttribute("id") === t
                }, TAG: function (e, t) {
                    return t === "*" && e.nodeType === 1 || !!e.nodeName && e.nodeName.toLowerCase() === t
                }, CLASS: function (e, t) {
                    return (" " + (e.className || e.getAttribute("class")) + " ").indexOf(t) > -1
                }, ATTR: function (e, t) {
                    var n = t[1], r = h.attr ? h.attr(e, n) : d.attrHandle[n] ? d.attrHandle[n](e) : e[n] != null ? e[n] : e.getAttribute(n), i = r + "", s = t[2], o = t[4];
                    return r == null ? s === "!=" : !s && h.attr ? r != null : s === "=" ? i === o : s === "*=" ? i.indexOf(o) >= 0 : s === "~=" ? (" " + i + " ").indexOf(o) >= 0 : o ? s === "!=" ? i !== o : s === "^=" ? i.indexOf(o) === 0 : s === "$=" ? i.substr(i.length - o.length) === o : s === "|=" ? i === o || i.substr(0, o.length + 1) === o + "-" : !1 : i && r !== !1
                }, POS: function (e, t, n, r) {
                    var i = t[2], s = d.setFilters[i];
                    if (s)return s(e, n, t, r)
                }
            }
        }, v = d.match.POS, m = function (e, t) {
            return "\\" + (t - 0 + 1)
        };
        for (var g in d.match)d.match[g] = new RegExp(d.match[g].source + /(?![^\[]*\])(?![^\(]*\))/.source), d.leftMatch[g] = new RegExp(/(^(?:.|\r|\n)*?)/.source + d.match[g].source.replace(/\\(\d+)/g, m));
        d.match.globalPOS = v;
        var y = function (e, t) {
            e = Array.prototype.slice.call(e, 0);
            if (t) {
                t.push.apply(t, e);
                return t
            }
            return e
        };
        try {
            Array.prototype.slice.call(_.documentElement.childNodes, 0)[0].nodeType
        } catch (b) {
            y = function (e, t) {
                var n = 0, r = t || [];
                if (o.call(e) === "[object Array]")Array.prototype.push.apply(r, e); else if (typeof e.length == "number")for (var i = e.length; n < i; n++)r.push(e[n]); else for (; e[n]; n++)r.push(e[n]);
                return r
            }
        }
        var w, E;
        _.documentElement.compareDocumentPosition ? w = function (e, t) {
            if (e === t) {
                u = !0;
                return 0
            }
            if (!e.compareDocumentPosition || !t.compareDocumentPosition)return e.compareDocumentPosition ? -1 : 1;
            return e.compareDocumentPosition(t) & 4 ? -1 : 1
        } : (w = function (e, t) {
            if (e === t) {
                u = !0;
                return 0
            }
            if (e.sourceIndex && t.sourceIndex)return e.sourceIndex - t.sourceIndex;
            var n, r, i = [], s = [], o = e.parentNode, a = t.parentNode, f = o;
            if (o === a)return E(e, t);
            if (!o)return -1;
            if (!a)return 1;
            while (f)i.unshift(f), f = f.parentNode;
            f = a;
            while (f)s.unshift(f), f = f.parentNode;
            n = i.length, r = s.length;
            for (var l = 0; l < n && l < r; l++)if (i[l] !== s[l])return E(i[l], s[l]);
            return l === n ? E(e, s[l], -1) : E(i[l], t, 1)
        }, E = function (e, t, n) {
            if (e === t)return n;
            var r = e.nextSibling;
            while (r) {
                if (r === t)return -1;
                r = r.nextSibling
            }
            return 1
        }), function () {
            var e = _.createElement("div"), n = "script" + (new Date).getTime(), r = _.documentElement;
            e.innerHTML = "<a name='" + n + "'/>", r.insertBefore(e, r.firstChild), _.getElementById(n) && (d.find.ID = function (e, n, r) {
                if (typeof n.getElementById != "undefined" && !r) {
                    var i = n.getElementById(e[1]);
                    return i ? i.id === e[1] || typeof i.getAttributeNode != "undefined" && i.getAttributeNode("id").nodeValue === e[1] ? [i] : t : []
                }
            }, d.filter.ID = function (e, t) {
                var n = typeof e.getAttributeNode != "undefined" && e.getAttributeNode("id");
                return e.nodeType === 1 && n && n.nodeValue === t
            }), r.removeChild(e), r = e = null
        }(), function () {
            var e = _.createElement("div");
            e.appendChild(_.createComment("")), e.getElementsByTagName("*").length > 0 && (d.find.TAG = function (e, t) {
                var n = t.getElementsByTagName(e[1]);
                if (e[1] === "*") {
                    var r = [];
                    for (var i = 0; n[i]; i++)n[i].nodeType === 1 && r.push(n[i]);
                    n = r
                }
                return n
            }), e.innerHTML = "<a href='#'></a>", e.firstChild && typeof e.firstChild.getAttribute != "undefined" && e.firstChild.getAttribute("href") !== "#" && (d.attrHandle.href = function (e) {
                return e.getAttribute("href", 2)
            }), e = null
        }(), _.querySelectorAll && function () {
            var e = h, t = _.createElement("div"), n = "__sizzle__";
            t.innerHTML = "<p class='TEST'></p>";
            if (!t.querySelectorAll || t.querySelectorAll(".TEST").length !== 0) {
                h = function (t, r, i, s) {
                    r = r || _;
                    if (!s && !h.isXML(r)) {
                        var o = /^(\w+$)|^\.([\w\-]+$)|^#([\w\-]+$)/.exec(t);
                        if (o && (r.nodeType === 1 || r.nodeType === 9)) {
                            if (o[1])return y(r.getElementsByTagName(t), i);
                            if (o[2] && d.find.CLASS && r.getElementsByClassName)return y(r.getElementsByClassName(o[2]), i)
                        }
                        if (r.nodeType === 9) {
                            if (t === "body" && r.body)return y([r.body], i);
                            if (o && o[3]) {
                                var u = r.getElementById(o[3]);
                                if (!u || !u.parentNode)return y([], i);
                                if (u.id === o[3])return y([u], i)
                            }
                            try {
                                return y(r.querySelectorAll(t), i)
                            } catch (a) {
                            }
                        } else if (r.nodeType === 1 && r.nodeName.toLowerCase() !== "object") {
                            var f = r, l = r.getAttribute("id"), c = l || n, p = r.parentNode, v = /^\s*[+~]/.test(t);
                            l ? c = c.replace(/'/g, "\\$&") : r.setAttribute("id", c), v && p && (r = r.parentNode);
                            try {
                                if (!v || p)return y(r.querySelectorAll("[id='" + c + "'] " + t), i)
                            } catch (m) {
                            } finally {
                                l || f.removeAttribute("id")
                            }
                        }
                    }
                    return e(t, r, i, s)
                };
                for (var r in e)h[r] = e[r];
                t = null
            }
        }(), function () {
            var e = _.documentElement, t = e.matchesSelector || e.mozMatchesSelector || e.webkitMatchesSelector || e.msMatchesSelector;
            if (t) {
                var n = !t.call(_.createElement("div"), "div"), r = !1;
                try {
                    t.call(_.documentElement, "[test!='']:sizzle")
                } catch (i) {
                    r = !0
                }
                h.matchesSelector = function (e, i) {
                    i = i.replace(/\=\s*([^'"\]]*)\s*\]/g, "='$1']");
                    if (!h.isXML(e))try {
                        if (r || !d.match.PSEUDO.test(i) && !/!=/.test(i)) {
                            var s = t.call(e, i);
                            if (s || !n || e.document && e.document.nodeType !== 11)return s
                        }
                    } catch (o) {
                    }
                    return h(i, null, null, [e]).length > 0
                }
            }
        }(), function () {
            var e = _.createElement("div");
            e.innerHTML = "<div class='test e'></div><div class='test'></div>";
            if (!!e.getElementsByClassName && e.getElementsByClassName("e").length !== 0) {
                e.lastChild.className = "e";
                if (e.getElementsByClassName("e").length === 1)return;
                d.order.splice(1, 0, "CLASS"), d.find.CLASS = function (e, t, n) {
                    if (typeof t.getElementsByClassName != "undefined" && !n)return t.getElementsByClassName(e[1])
                }, e = null
            }
        }(), _.documentElement.contains ? h.contains = function (e, t) {
            return e !== t && (e.contains ? e.contains(t) : !0)
        } : _.documentElement.compareDocumentPosition ? h.contains = function (e, t) {
            return !!(e.compareDocumentPosition(t) & 16)
        } : h.contains = function () {
            return !1
        }, h.isXML = function (e) {
            var t = (e ? e.ownerDocument || e : 0).documentElement;
            return t ? t.nodeName !== "HTML" : !1
        };
        var S = function (e, t, n) {
            var r, i = [], s = "", o = t.nodeType ? [t] : t;
            while (r = d.match.PSEUDO.exec(e))s += r[0], e = e.replace(d.match.PSEUDO, "");
            e = d.relative[e] ? e + "*" : e;
            for (var u = 0, a = o.length; u < a; u++)h(e, o[u], i, n);
            return h.filter(s, i)
        };
        h.attr = H.attr, h.selectors.attrMap = {}, H.find = h, H.expr = h.selectors, H.expr[":"] = H.expr.filters, H.unique = h.uniqueSort, H.text = h.getText, H.isXMLDoc = h.isXML, H.contains = h.contains
    }();
    var ut = /Until$/, at = /^(?:parents|prevUntil|prevAll)/, ft = /,/, lt = /^.[^:#\[\.,]*$/, ct = Array.prototype.slice, ht = H.expr.match.globalPOS, pt = {
        children: !0,
        contents: !0,
        next: !0,
        prev: !0
    };
    H.fn.extend({
        find: function (e) {
            var t = this, n, r;
            if (typeof e != "string")return H(e).filter(function () {
                for (n = 0, r = t.length; n < r; n++)if (H.contains(t[n], this))return !0
            });
            var i = this.pushStack("", "find", e), s, o, u;
            for (n = 0, r = this.length; n < r; n++) {
                s = i.length, H.find(e, this[n], i);
                if (n > 0)for (o = s; o < i.length; o++)for (u = 0; u < s; u++)if (i[u] === i[o]) {
                    i.splice(o--, 1);
                    break
                }
            }
            return i
        }, has: function (e) {
            var t = H(e);
            return this.filter(function () {
                for (var e = 0, n = t.length; e < n; e++)if (H.contains(this, t[e]))return !0
            })
        }, not: function (e) {
            return this.pushStack(T(this, e, !1), "not", e)
        }, filter: function (e) {
            return this.pushStack(T(this, e, !0), "filter", e)
        }, is: function (e) {
            return !!e && (typeof e == "string" ? ht.test(e) ? H(e, this.context).index(this[0]) >= 0 : H.filter(e, this).length > 0 : this.filter(e).length > 0)
        }, closest: function (e, t) {
            var n = [], r, i, s = this[0];
            if (H.isArray(e)) {
                var o = 1;
                while (s && s.ownerDocument && s !== t) {
                    for (r = 0; r < e.length; r++)H(s).is(e[r]) && n.push({selector: e[r], elem: s, level: o});
                    s = s.parentNode, o++
                }
                return n
            }
            var u = ht.test(e) || typeof e != "string" ? H(e, t || this.context) : 0;
            for (r = 0, i = this.length; r < i; r++) {
                s = this[r];
                while (s) {
                    if (u ? u.index(s) > -1 : H.find.matchesSelector(s, e)) {
                        n.push(s);
                        break
                    }
                    s = s.parentNode;
                    if (!s || !s.ownerDocument || s === t || s.nodeType === 11)break
                }
            }
            n = n.length > 1 ? H.unique(n) : n;
            return this.pushStack(n, "closest", e)
        }, index: function (e) {
            if (!e)return this[0] && this[0].parentNode ? this.prevAll().length : -1;
            if (typeof e == "string")return H.inArray(this[0], H(e));
            return H.inArray(e.jquery ? e[0] : e, this)
        }, add: function (e, t) {
            var n = typeof e == "string" ? H(e, t) : H.makeArray(e && e.nodeType ? [e] : e), r = H.merge(this.get(), n);
            return this.pushStack(N(n[0]) || N(r[0]) ? r : H.unique(r))
        }, andSelf: function () {
            return this.add(this.prevObject)
        }
    }), H.each({
        parent: function (e) {
            var t = e.parentNode;
            return t && t.nodeType !== 11 ? t : null
        }, parents: function (e) {
            return H.dir(e, "parentNode")
        }, parentsUntil: function (e, t, n) {
            return H.dir(e, "parentNode", n)
        }, next: function (e) {
            return H.nth(e, 2, "nextSibling")
        }, prev: function (e) {
            return H.nth(e, 2, "previousSibling")
        }, nextAll: function (e) {
            return H.dir(e, "nextSibling")
        }, prevAll: function (e) {
            return H.dir(e, "previousSibling")
        }, nextUntil: function (e, t, n) {
            return H.dir(e, "nextSibling", n)
        }, prevUntil: function (e, t, n) {
            return H.dir(e, "previousSibling", n)
        }, siblings: function (e) {
            return H.sibling((e.parentNode || {}).firstChild, e)
        }, children: function (e) {
            return H.sibling(e.firstChild)
        }, contents: function (e) {
            return H.nodeName(e, "iframe") ? e.contentDocument || e.contentWindow.document : H.makeArray(e.childNodes)
        }
    }, function (e, t) {
        H.fn[e] = function (n, r) {
            var i = H.map(this, t, n);
            ut.test(e) || (r = n), r && typeof r == "string" && (i = H.filter(r, i)), i = this.length > 1 && !pt[e] ? H.unique(i) : i, (this.length > 1 || ft.test(r)) && at.test(e) && (i = i.reverse());
            return this.pushStack(i, e, ct.call(arguments).join(","))
        }
    }), H.extend({
        filter: function (e, t, n) {
            n && (e = ":not(" + e + ")");
            return t.length === 1 ? H.find.matchesSelector(t[0], e) ? [t[0]] : [] : H.find.matches(e, t)
        }, dir: function (e, n, r) {
            var i = [], s = e[n];
            while (s && s.nodeType !== 9 && (r === t || s.nodeType !== 1 || !H(s).is(r)))s.nodeType === 1 && i.push(s), s = s[n];
            return i
        }, nth: function (e, t, n, r) {
            t = t || 1;
            var i = 0;
            for (; e; e = e[n])if (e.nodeType === 1 && ++i === t)break;
            return e
        }, sibling: function (e, t) {
            var n = [];
            for (; e; e = e.nextSibling)e.nodeType === 1 && e !== t && n.push(e);
            return n
        }
    });
    var dt = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video", vt = / jQuery\d+="(?:\d+|null)"/g, mt = /^\s+/, gt = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig, yt = /<([\w:]+)/, bt = /<tbody/i, wt = /<|&#?\w+;/, Et = /<(?:script|style)/i, St = /<(?:script|object|embed|option|style)/i, xt = new RegExp("<(?:" + dt + ")[\\s/>]", "i"), Tt = /checked\s*(?:[^=]|=\s*.checked.)/i, Nt = /\/(java|ecma)script/i, Ct = /^\s*<!(?:\[CDATA\[|\-\-)/, kt = {
        option: [1, "<select multiple='multiple'>", "</select>"],
        legend: [1, "<fieldset>", "</fieldset>"],
        thead: [1, "<table>", "</table>"],
        tr: [2, "<table><tbody>", "</tbody></table>"],
        td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
        col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
        area: [1, "<map>", "</map>"],
        _default: [0, "", ""]
    }, Lt = x(_);
    kt.optgroup = kt.option, kt.tbody = kt.tfoot = kt.colgroup = kt.caption = kt.thead, kt.th = kt.td, H.support.htmlSerialize || (kt._default = [1, "div<div>", "</div>"]), H.fn.extend({
        text: function (e) {
            return H.access(this, function (e) {
                return e === t ? H.text(this) : this.empty().append((this[0] && this[0].ownerDocument || _).createTextNode(e))
            }, null, e, arguments.length)
        }, wrapAll: function (e) {
            if (H.isFunction(e))return this.each(function (t) {
                H(this).wrapAll(e.call(this, t))
            });
            if (this[0]) {
                var t = H(e, this[0].ownerDocument).eq(0).clone(!0);
                this[0].parentNode && t.insertBefore(this[0]), t.map(function () {
                    var e = this;
                    while (e.firstChild && e.firstChild.nodeType === 1)e = e.firstChild;
                    return e
                }).append(this)
            }
            return this
        }, wrapInner: function (e) {
            if (H.isFunction(e))return this.each(function (t) {
                H(this).wrapInner(e.call(this, t))
            });
            return this.each(function () {
                var t = H(this), n = t.contents();
                n.length ? n.wrapAll(e) : t.append(e)
            })
        }, wrap: function (e) {
            var t = H.isFunction(e);
            return this.each(function (n) {
                H(this).wrapAll(t ? e.call(this, n) : e)
            })
        }, unwrap: function () {
            return this.parent().each(function () {
                H.nodeName(this, "body") || H(this).replaceWith(this.childNodes)
            }).end()
        }, append: function () {
            return this.domManip(arguments, !0, function (e) {
                this.nodeType === 1 && this.appendChild(e)
            })
        }, prepend: function () {
            return this.domManip(arguments, !0, function (e) {
                this.nodeType === 1 && this.insertBefore(e, this.firstChild)
            })
        }, before: function () {
            if (this[0] && this[0].parentNode)return this.domManip(arguments, !1, function (e) {
                this.parentNode.insertBefore(e, this)
            });
            if (arguments.length) {
                var e = H.clean(arguments);
                e.push.apply(e, this.toArray());
                return this.pushStack(e, "before", arguments)
            }
        }, after: function () {
            if (this[0] && this[0].parentNode)return this.domManip(arguments, !1, function (e) {
                this.parentNode.insertBefore(e, this.nextSibling)
            });
            if (arguments.length) {
                var e = this.pushStack(this, "after", arguments);
                e.push.apply(e, H.clean(arguments));
                return e
            }
        }, remove: function (e, t) {
            for (var n = 0, r; (r = this[n]) != null; n++)if (!e || H.filter(e, [r]).length)!t && r.nodeType === 1 && (H.cleanData(r.getElementsByTagName("*")), H.cleanData([r])), r.parentNode && r.parentNode.removeChild(r);
            return this
        }, empty: function () {
            for (var e = 0, t; (t = this[e]) != null; e++) {
                t.nodeType === 1 && H.cleanData(t.getElementsByTagName("*"));
                while (t.firstChild)t.removeChild(t.firstChild)
            }
            return this
        }, clone: function (e, t) {
            e = e == null ? !1 : e, t = t == null ? e : t;
            return this.map(function () {
                return H.clone(this, e, t)
            })
        }, html: function (e) {
            return H.access(this, function (e) {
                var n = this[0] || {}, r = 0, i = this.length;
                if (e === t)return n.nodeType === 1 ? n.innerHTML.replace(vt, "") : null;
                if (typeof e == "string" && !Et.test(e) && (H.support.leadingWhitespace || !mt.test(e)) && !kt[(yt.exec(e) || ["", ""])[1].toLowerCase()]) {
                    e = e.replace(gt, "<$1></$2>");
                    try {
                        for (; r < i; r++)n = this[r] || {}, n.nodeType === 1 && (H.cleanData(n.getElementsByTagName("*")), n.innerHTML = e);
                        n = 0
                    } catch (s) {
                    }
                }
                n && this.empty().append(e)
            }, null, e, arguments.length)
        }, replaceWith: function (e) {
            if (this[0] && this[0].parentNode) {
                if (H.isFunction(e))return this.each(function (t) {
                    var n = H(this), r = n.html();
                    n.replaceWith(e.call(this, t, r))
                });
                typeof e != "string" && (e = H(e).detach());
                return this.each(function () {
                    var t = this.nextSibling, n = this.parentNode;
                    H(this).remove(), t ? H(t).before(e) : H(n).append(e)
                })
            }
            return this.length ? this.pushStack(H(H.isFunction(e) ? e() : e), "replaceWith", e) : this
        }, detach: function (e) {
            return this.remove(e, !0)
        }, domManip: function (e, n, r) {
            var i, s, o, u, a = e[0], f = [];
            if (!H.support.checkClone && arguments.length === 3 && typeof a == "string" && Tt.test(a))return this.each(function () {
                H(this).domManip(e, n, r, !0)
            });
            if (H.isFunction(a))return this.each(function (i) {
                var s = H(this);
                e[0] = a.call(this, i, n ? s.html() : t), s.domManip(e, n, r)
            });
            if (this[0]) {
                u = a && a.parentNode, H.support.parentNode && u && u.nodeType === 11 && u.childNodes.length === this.length ? i = {fragment: u} : i = H.buildFragment(e, this, f), o = i.fragment, o.childNodes.length === 1 ? s = o = o.firstChild : s = o.firstChild;
                if (s) {
                    n = n && H.nodeName(s, "tr");
                    for (var l = 0, c = this.length, h = c - 1; l < c; l++)r.call(n ? S(this[l], s) : this[l], i.cacheable || c > 1 && l < h ? H.clone(o, !0, !0) : o)
                }
                f.length && H.each(f, function (e, t) {
                    t.src ? H.ajax({
                        type: "GET",
                        global: !1,
                        url: t.src,
                        async: !1,
                        dataType: "script"
                    }) : H.globalEval((t.text || t.textContent || t.innerHTML || "").replace(Ct, "/*$0*/")), t.parentNode && t.parentNode.removeChild(t)
                })
            }
            return this
        }
    }), H.buildFragment = function (e, t, n) {
        var r, i, s, o, u = e[0];
        t && t[0] && (o = t[0].ownerDocument || t[0]), o.createDocumentFragment || (o = _), e.length === 1 && typeof u == "string" && u.length < 512 && o === _ && u.charAt(0) === "<" && !St.test(u) && (H.support.checkClone || !Tt.test(u)) && (H.support.html5Clone || !xt.test(u)) && (i = !0, s = H.fragments[u], s && s !== 1 && (r = s)), r || (r = o.createDocumentFragment(), H.clean(e, o, r, n)), i && (H.fragments[u] = s ? r : 1);
        return {fragment: r, cacheable: i}
    }, H.fragments = {}, H.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function (e, t) {
        H.fn[e] = function (n) {
            var r = [], i = H(n), s = this.length === 1 && this[0].parentNode;
            if (s && s.nodeType === 11 && s.childNodes.length === 1 && i.length === 1) {
                i[t](this[0]);
                return this
            }
            for (var o = 0, u = i.length; o < u; o++) {
                var a = (o > 0 ? this.clone(!0) : this).get();
                H(i[o])[t](a), r = r.concat(a)
            }
            return this.pushStack(r, e, i.selector)
        }
    }), H.extend({
        clone: function (e, t, n) {
            var r, i, s, o = H.support.html5Clone || H.isXMLDoc(e) || !xt.test("<" + e.nodeName + ">") ? e.cloneNode(!0) : m(e);
            if ((!H.support.noCloneEvent || !H.support.noCloneChecked) && (e.nodeType === 1 || e.nodeType === 11) && !H.isXMLDoc(e)) {
                w(e, o), r = b(e), i = b(o);
                for (s = 0; r[s]; ++s)i[s] && w(r[s], i[s])
            }
            if (t) {
                E(e, o);
                if (n) {
                    r = b(e), i = b(o);
                    for (s = 0; r[s]; ++s)E(r[s], i[s])
                }
            }
            r = i = null;
            return o
        }, clean: function (e, t, n, r) {
            var i, s, o, u = [];
            t = t || _, typeof t.createElement == "undefined" && (t = t.ownerDocument || t[0] && t[0].ownerDocument || _);
            for (var a = 0, f; (f = e[a]) != null; a++) {
                typeof f == "number" && (f += "");
                if (!f)continue;
                if (typeof f == "string")if (!wt.test(f))f = t.createTextNode(f); else {
                    f = f.replace(gt, "<$1></$2>");
                    var l = (yt.exec(f) || ["", ""])[1].toLowerCase(), c = kt[l] || kt._default, h = c[0], p = t.createElement("div"), d = Lt.childNodes, v;
                    t === _ ? Lt.appendChild(p) : x(t).appendChild(p), p.innerHTML = c[1] + f + c[2];
                    while (h--)p = p.lastChild;
                    if (!H.support.tbody) {
                        var m = bt.test(f), y = l === "table" && !m ? p.firstChild && p.firstChild.childNodes : c[1] === "<table>" && !m ? p.childNodes : [];
                        for (o = y.length - 1; o >= 0; --o)H.nodeName(y[o], "tbody") && !y[o].childNodes.length && y[o].parentNode.removeChild(y[o])
                    }
                    !H.support.leadingWhitespace && mt.test(f) && p.insertBefore(t.createTextNode(mt.exec(f)[0]), p.firstChild), f = p.childNodes, p && (p.parentNode.removeChild(p), d.length > 0 && (v = d[d.length - 1], v && v.parentNode && v.parentNode.removeChild(v)))
                }
                var b;
                if (!H.support.appendChecked)if (f[0] && typeof (b = f.length) == "number")for (o = 0; o < b; o++)g(f[o]); else g(f);
                f.nodeType ? u.push(f) : u = H.merge(u, f)
            }
            if (n) {
                i = function (e) {
                    return !e.type || Nt.test(e.type)
                };
                for (a = 0; u[a]; a++) {
                    s = u[a];
                    if (r && H.nodeName(s, "script") && (!s.type || Nt.test(s.type)))r.push(s.parentNode ? s.parentNode.removeChild(s) : s); else {
                        if (s.nodeType === 1) {
                            var w = H.grep(s.getElementsByTagName("script"), i);
                            u.splice.apply(u, [a + 1, 0].concat(w))
                        }
                        n.appendChild(s)
                    }
                }
            }
            return u
        }, cleanData: function (e) {
            var t, n, r = H.cache, i = H.event.special, s = H.support.deleteExpando;
            for (var o = 0, u; (u = e[o]) != null; o++) {
                if (u.nodeName && H.noData[u.nodeName.toLowerCase()])continue;
                n = u[H.expando];
                if (n) {
                    t = r[n];
                    if (t && t.events) {
                        for (var a in t.events)i[a] ? H.event.remove(u, a) : H.removeEvent(u, a, t.handle);
                        t.handle && (t.handle.elem = null)
                    }
                    s ? delete u[H.expando] : u.removeAttribute && u.removeAttribute(H.expando), delete r[n]
                }
            }
        }
    });
    var At = /alpha\([^)]*\)/i, Ot = /opacity=([^)]*)/, Mt = /([A-Z]|^ms)/g, _t = /^[\-+]?(?:\d*\.)?\d+$/i, Dt = /^-?(?:\d*\.)?\d+(?!px)[^\d\s]+$/i, Pt = /^([\-+])=([\-+.\de]+)/, Ht = /^margin/, Bt = {
        position: "absolute",
        visibility: "hidden",
        display: "block"
    }, jt = ["Top", "Right", "Bottom", "Left"], Ft, It, qt;
    H.fn.css = function (e, n) {
        return H.access(this, function (e, n, r) {
            return r !== t ? H.style(e, n, r) : H.css(e, n)
        }, e, n, arguments.length > 1)
    }, H.extend({
        cssHooks: {
            opacity: {
                get: function (e, t) {
                    if (t) {
                        var n = Ft(e, "opacity");
                        return n === "" ? "1" : n
                    }
                    return e.style.opacity
                }
            }
        },
        cssNumber: {
            fillOpacity: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {"float": H.support.cssFloat ? "cssFloat" : "styleFloat"},
        style: function (e, n, r, i) {
            if (!!e && e.nodeType !== 3 && e.nodeType !== 8 && !!e.style) {
                var s, o, u = H.camelCase(n), a = e.style, f = H.cssHooks[u];
                n = H.cssProps[u] || u;
                if (r === t) {
                    if (f && "get" in f && (s = f.get(e, !1, i)) !== t)return s;
                    return a[n]
                }
                o = typeof r, o === "string" && (s = Pt.exec(r)) && (r = +(s[1] + 1) * +s[2] + parseFloat(H.css(e, n)), o = "number");
                if (r == null || o === "number" && isNaN(r))return;
                o === "number" && !H.cssNumber[u] && (r += "px");
                if (!f || !("set" in f) || (r = f.set(e, r)) !== t)try {
                    a[n] = r
                } catch (l) {
                }
            }
        },
        css: function (e, n, r) {
            var i, s;
            n = H.camelCase(n), s = H.cssHooks[n], n = H.cssProps[n] || n, n === "cssFloat" && (n = "float");
            if (s && "get" in s && (i = s.get(e, !0, r)) !== t)return i;
            if (Ft)return Ft(e, n)
        },
        swap: function (e, t, n) {
            var r = {}, i, s;
            for (s in t)r[s] = e.style[s], e.style[s] = t[s];
            i = n.call(e);
            for (s in t)e.style[s] = r[s];
            return i
        }
    }), H.curCSS = H.css, _.defaultView && _.defaultView.getComputedStyle && (It = function (e, t) {
        var n, r, i, s, o = e.style;
        t = t.replace(Mt, "-$1").toLowerCase(), (r = e.ownerDocument.defaultView) && (i = r.getComputedStyle(e, null)) && (n = i.getPropertyValue(t), n === "" && !H.contains(e.ownerDocument.documentElement, e) && (n = H.style(e, t))), !H.support.pixelMargin && i && Ht.test(t) && Dt.test(n) && (s = o.width, o.width = n, n = i.width, o.width = s);
        return n
    }), _.documentElement.currentStyle && (qt = function (e, t) {
        var n, r, i, s = e.currentStyle && e.currentStyle[t], o = e.style;
        s == null && o && (i = o[t]) && (s = i), Dt.test(s) && (n = o.left, r = e.runtimeStyle && e.runtimeStyle.left, r && (e.runtimeStyle.left = e.currentStyle.left), o.left = t === "fontSize" ? "1em" : s, s = o.pixelLeft + "px", o.left = n, r && (e.runtimeStyle.left = r));
        return s === "" ? "auto" : s
    }), Ft = It || qt, H.each(["height", "width"], function (e, t) {
        H.cssHooks[t] = {
            get: function (e, n, r) {
                if (n)return e.offsetWidth !== 0 ? v(e, t, r) : H.swap(e, Bt, function () {
                    return v(e, t, r)
                })
            }, set: function (e, t) {
                return _t.test(t) ? t + "px" : t
            }
        }
    }), H.support.opacity || (H.cssHooks.opacity = {
        get: function (e, t) {
            return Ot.test((t && e.currentStyle ? e.currentStyle.filter : e.style.filter) || "") ? parseFloat(RegExp.$1) / 100 + "" : t ? "1" : ""
        }, set: function (e, t) {
            var n = e.style, r = e.currentStyle, i = H.isNumeric(t) ? "alpha(opacity=" + t * 100 + ")" : "", s = r && r.filter || n.filter || "";
            n.zoom = 1;
            if (t >= 1 && H.trim(s.replace(At, "")) === "") {
                n.removeAttribute("filter");
                if (r && !r.filter)return
            }
            n.filter = At.test(s) ? s.replace(At, i) : s + " " + i
        }
    }), H(function () {
        H.support.reliableMarginRight || (H.cssHooks.marginRight = {
            get: function (e, t) {
                return H.swap(e, {display: "inline-block"}, function () {
                    return t ? Ft(e, "margin-right") : e.style.marginRight
                })
            }
        })
    }), H.expr && H.expr.filters && (H.expr.filters.hidden = function (e) {
        var t = e.offsetWidth, n = e.offsetHeight;
        return t === 0 && n === 0 || !H.support.reliableHiddenOffsets && (e.style && e.style.display || H.css(e, "display")) === "none"
    }, H.expr.filters.visible = function (e) {
        return !H.expr.filters.hidden(e)
    }), H.each({margin: "", padding: "", border: "Width"}, function (e, t) {
        H.cssHooks[e + t] = {
            expand: function (n) {
                var r, i = typeof n == "string" ? n.split(" ") : [n], s = {};
                for (r = 0; r < 4; r++)s[e + jt[r] + t] = i[r] || i[r - 2] || i[0];
                return s
            }
        }
    });
    var Rt = /%20/g, Ut = /\[\]$/, zt = /\r?\n/g, Wt = /#.*$/, Xt = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg, Vt = /^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i, $t = /^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/, Jt = /^(?:GET|HEAD)$/, Kt = /^\/\//, Qt = /\?/, Gt = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, Yt = /^(?:select|textarea)/i, Zt = /\s+/, en = /([?&])_=[^&]*/, tn = /^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+))?)?/, nn = H.fn.load, rn = {}, sn = {}, on, un, an = ["*/"] + ["*"];
    try {
        on = P.href
    } catch (fn) {
        on = _.createElement("a"), on.href = "", on = on.href
    }
    un = tn.exec(on.toLowerCase()) || [], H.fn.extend({
        load: function (e, n, r) {
            if (typeof e != "string" && nn)return nn.apply(this, arguments);
            if (!this.length)return this;
            var i = e.indexOf(" ");
            if (i >= 0) {
                var s = e.slice(i, e.length);
                e = e.slice(0, i)
            }
            var o = "GET";
            n && (H.isFunction(n) ? (r = n, n = t) : typeof n == "object" && (n = H.param(n, H.ajaxSettings.traditional), o = "POST"));
            var u = this;
            H.ajax({
                url: e, type: o, dataType: "html", data: n, complete: function (e, t, n) {
                    n = e.responseText, e.isResolved() && (e.done(function (e) {
                        n = e
                    }), u.html(s ? H("<div>").append(n.replace(Gt, "")).find(s) : n)), r && u.each(r, [n, t, e])
                }
            });
            return this
        }, serialize: function () {
            return H.param(this.serializeArray())
        }, serializeArray: function () {
            return this.map(function () {
                return this.elements ? H.makeArray(this.elements) : this
            }).filter(function () {
                return this.name && !this.disabled && (this.checked || Yt.test(this.nodeName) || Vt.test(this.type))
            }).map(function (e, t) {
                var n = H(this).val();
                return n == null ? null : H.isArray(n) ? H.map(n, function (e, n) {
                    return {name: t.name, value: e.replace(zt, "\r\n")}
                }) : {name: t.name, value: n.replace(zt, "\r\n")}
            }).get()
        }
    }), H.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "), function (e, t) {
        H.fn[t] = function (e) {
            return this.on(t, e)
        }
    }), H.each(["get", "post"], function (e, n) {
        H[n] = function (e, r, i, s) {
            H.isFunction(r) && (s = s || i, i = r, r = t);
            return H.ajax({type: n, url: e, data: r, success: i, dataType: s})
        }
    }), H.extend({
        getScript: function (e, n) {
            return H.get(e, t, n, "script")
        },
        getJSON: function (e, t, n) {
            return H.get(e, t, n, "json")
        },
        ajaxSetup: function (e, t) {
            t ? h(e, H.ajaxSettings) : (t = e, e = H.ajaxSettings), h(e, t);
            return e
        },
        ajaxSettings: {
            url: on,
            isLocal: $t.test(un[1]),
            global: !0,
            type: "GET",
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            processData: !0,
            async: !0,
            accepts: {
                xml: "application/xml, text/xml",
                html: "text/html",
                text: "text/plain",
                json: "application/json, text/javascript",
                "*": an
            },
            contents: {xml: /xml/, html: /html/, json: /json/},
            responseFields: {xml: "responseXML", text: "responseText"},
            converters: {"* text": e.String, "text html": !0, "text json": H.parseJSON, "text xml": H.parseXML},
            flatOptions: {context: !0, url: !0}
        },
        ajaxPrefilter: d(rn),
        ajaxTransport: d(sn),
        ajax: function (e, n) {
            function r(e, n, r, p) {
                if (E !== 2) {
                    E = 2, b && clearTimeout(b), y = t, m = p || "", T.readyState = e > 0 ? 4 : 0;
                    var d, v, g, w = n, x = r ? l(i, T, r) : t, N, C;
                    if (e >= 200 && e < 300 || e === 304) {
                        if (i.ifModified) {
                            if (N = T.getResponseHeader("Last-Modified"))H.lastModified[h] = N;
                            if (C = T.getResponseHeader("Etag"))H.etag[h] = C
                        }
                        if (e === 304)w = "notmodified", d = !0; else try {
                            v = f(i, x), w = "success", d = !0
                        } catch (k) {
                            w = "parsererror", g = k
                        }
                    } else {
                        g = w;
                        if (!w || e)w = "error", e < 0 && (e = 0)
                    }
                    T.status = e, T.statusText = "" + (n || w), d ? u.resolveWith(s, [v, w, T]) : u.rejectWith(s, [T, w, g]), T.statusCode(c), c = t, S && o.trigger("ajax" + (d ? "Success" : "Error"), [T, i, d ? v : g]), a.fireWith(s, [T, w]), S && (o.trigger("ajaxComplete", [T, i]), --H.active || H.event.trigger("ajaxStop"))
                }
            }

            typeof e == "object" && (n = e, e = t), n = n || {};
            var i = H.ajaxSetup({}, n), s = i.context || i, o = s !== i && (s.nodeType || s instanceof H) ? H(s) : H.event, u = H.Deferred(), a = H.Callbacks("once memory"), c = i.statusCode || {}, h, d = {}, v = {}, m, g, y, b, w, E = 0, S, x, T = {
                readyState: 0,
                setRequestHeader: function (e, t) {
                    if (!E) {
                        var n = e.toLowerCase();
                        e = v[n] = v[n] || e, d[e] = t
                    }
                    return this
                },
                getAllResponseHeaders: function () {
                    return E === 2 ? m : null
                },
                getResponseHeader: function (e) {
                    var n;
                    if (E === 2) {
                        if (!g) {
                            g = {};
                            while (n = Xt.exec(m))g[n[1].toLowerCase()] = n[2]
                        }
                        n = g[e.toLowerCase()]
                    }
                    return n === t ? null : n
                },
                overrideMimeType: function (e) {
                    E || (i.mimeType = e);
                    return this
                },
                abort: function (e) {
                    e = e || "abort", y && y.abort(e), r(0, e);
                    return this
                }
            };
            u.promise(T), T.success = T.done, T.error = T.fail, T.complete = a.add, T.statusCode = function (e) {
                if (e) {
                    var t;
                    if (E < 2)for (t in e)c[t] = [c[t], e[t]]; else t = e[T.status], T.then(t, t)
                }
                return this
            }, i.url = ((e || i.url) + "").replace(Wt, "").replace(Kt, un[1] + "//"), i.dataTypes = H.trim(i.dataType || "*").toLowerCase().split(Zt), i.crossDomain == null && (w = tn.exec(i.url.toLowerCase()), i.crossDomain = !(!w || w[1] == un[1] && w[2] == un[2] && (w[3] || (w[1] === "http:" ? 80 : 443)) == (un[3] || (un[1] === "http:" ? 80 : 443)))), i.data && i.processData && typeof i.data != "string" && (i.data = H.param(i.data, i.traditional)), p(rn, i, n, T);
            if (E === 2)return !1;
            S = i.global, i.type = i.type.toUpperCase(), i.hasContent = !Jt.test(i.type), S && H.active++ === 0 && H.event.trigger("ajaxStart");
            if (!i.hasContent) {
                i.data && (i.url += (Qt.test(i.url) ? "&" : "?") + i.data, delete i.data), h = i.url;
                if (i.cache === !1) {
                    var N = H.now(), C = i.url.replace(en, "$1_=" + N);
                    i.url = C + (C === i.url ? (Qt.test(i.url) ? "&" : "?") + "_=" + N : "")
                }
            }
            (i.data && i.hasContent && i.contentType !== !1 || n.contentType) && T.setRequestHeader("Content-Type", i.contentType), i.ifModified && (h = h || i.url, H.lastModified[h] && T.setRequestHeader("If-Modified-Since", H.lastModified[h]), H.etag[h] && T.setRequestHeader("If-None-Match", H.etag[h])), T.setRequestHeader("Accept", i.dataTypes[0] && i.accepts[i.dataTypes[0]] ? i.accepts[i.dataTypes[0]] + (i.dataTypes[0] !== "*" ? ", " + an + "; q=0.01" : "") : i.accepts["*"]);
            for (x in i.headers)T.setRequestHeader(x, i.headers[x]);
            if (i.beforeSend && (i.beforeSend.call(s, T, i) === !1 || E === 2)) {
                T.abort();
                return !1
            }
            for (x in{success: 1, error: 1, complete: 1})T[x](i[x]);
            y = p(sn, i, n, T);
            if (!y)r(-1, "No Transport"); else {
                T.readyState = 1, S && o.trigger("ajaxSend", [T, i]), i.async && i.timeout > 0 && (b = setTimeout(function () {
                    T.abort("timeout")
                }, i.timeout));
                try {
                    E = 1, y.send(d, r)
                } catch (k) {
                    if (E < 2)r(-1, k); else throw k
                }
            }
            return T
        },
        param: function (e, n) {
            var r = [], i = function (e, t) {
                t = H.isFunction(t) ? t() : t, r[r.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t)
            };
            n === t && (n = H.ajaxSettings.traditional);
            if (H.isArray(e) || e.jquery && !H.isPlainObject(e))H.each(e, function () {
                i(this.name, this.value)
            }); else for (var s in e)c(s, e[s], n, i);
            return r.join("&").replace(Rt, "+")
        }
    }), H.extend({active: 0, lastModified: {}, etag: {}});
    var ln = H.now(), cn = /(\=)\?(&|$)|\?\?/i;
    H.ajaxSetup({
        jsonp: "callback", jsonpCallback: function () {
            return H.expando + "_" + ln++
        }
    }), H.ajaxPrefilter("json jsonp", function (t, n, r) {
        var i = typeof t.data == "string" && /^application\/x\-www\-form\-urlencoded/.test(t.contentType);
        if (t.dataTypes[0] === "jsonp" || t.jsonp !== !1 && (cn.test(t.url) || i && cn.test(t.data))) {
            var s, o = t.jsonpCallback = H.isFunction(t.jsonpCallback) ? t.jsonpCallback() : t.jsonpCallback, u = e[o], a = t.url, f = t.data, l = "$1" + o + "$2";
            t.jsonp !== !1 && (a = a.replace(cn, l), t.url === a && (i && (f = f.replace(cn, l)), t.data === f && (a += (/\?/.test(a) ? "&" : "?") + t.jsonp + "=" + o))), t.url = a, t.data = f, e[o] = function (e) {
                s = [e]
            }, r.always(function () {
                e[o] = u, s && H.isFunction(u) && e[o](s[0])
            }), t.converters["script json"] = function () {
                s || H.error(o + " was not called");
                return s[0]
            }, t.dataTypes[0] = "json";
            return "script"
        }
    }), H.ajaxSetup({
        accepts: {script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},
        contents: {script: /javascript|ecmascript/},
        converters: {
            "text script": function (e) {
                H.globalEval(e);
                return e
            }
        }
    }), H.ajaxPrefilter("script", function (e) {
        e.cache === t && (e.cache = !1), e.crossDomain && (e.type = "GET", e.global = !1)
    }), H.ajaxTransport("script", function (e) {
        if (e.crossDomain) {
            var n, r = _.head || _.getElementsByTagName("head")[0] || _.documentElement;
            return {
                send: function (i, s) {
                    n = _.createElement("script"), n.async = "async", e.scriptCharset && (n.charset = e.scriptCharset), n.src = e.url, n.onload = n.onreadystatechange = function (e, i) {
                        if (i || !n.readyState || /loaded|complete/.test(n.readyState))n.onload = n.onreadystatechange = null, r && n.parentNode && r.removeChild(n), n = t, i || s(200, "success")
                    }, r.insertBefore(n, r.firstChild)
                }, abort: function () {
                    n && n.onload(0, 1)
                }
            }
        }
    });
    var hn = e.ActiveXObject ? function () {
        for (var e in dn)dn[e](0, 1)
    } : !1, pn = 0, dn;
    H.ajaxSettings.xhr = e.ActiveXObject ? function () {
        return !this.isLocal && a() || u()
    } : a, function (e) {
        H.extend(H.support, {ajax: !!e, cors: !!e && "withCredentials" in e})
    }(H.ajaxSettings.xhr()), H.support.ajax && H.ajaxTransport(function (n) {
        if (!n.crossDomain || H.support.cors) {
            var r;
            return {
                send: function (i, s) {
                    var o = n.xhr(), u, a;
                    n.username ? o.open(n.type, n.url, n.async, n.username, n.password) : o.open(n.type, n.url, n.async);
                    if (n.xhrFields)for (a in n.xhrFields)o[a] = n.xhrFields[a];
                    n.mimeType && o.overrideMimeType && o.overrideMimeType(n.mimeType), !n.crossDomain && !i["X-Requested-With"] && (i["X-Requested-With"] = "XMLHttpRequest");
                    try {
                        for (a in i)o.setRequestHeader(a, i[a])
                    } catch (f) {
                    }
                    o.send(n.hasContent && n.data || null), r = function (e, i) {
                        var a, f, l, c, h;
                        try {
                            if (r && (i || o.readyState === 4)) {
                                r = t, u && (o.onreadystatechange = H.noop, hn && delete dn[u]);
                                if (i)o.readyState !== 4 && o.abort(); else {
                                    a = o.status, l = o.getAllResponseHeaders(), c = {}, h = o.responseXML, h && h.documentElement && (c.xml = h);
                                    try {
                                        c.text = o.responseText
                                    } catch (e) {
                                    }
                                    try {
                                        f = o.statusText
                                    } catch (p) {
                                        f = ""
                                    }
                                    !a && n.isLocal && !n.crossDomain ? a = c.text ? 200 : 404 : a === 1223 && (a = 204)
                                }
                            }
                        } catch (d) {
                            i || s(-1, d)
                        }
                        c && s(a, f, c, l)
                    }, !n.async || o.readyState === 4 ? r() : (u = ++pn, hn && (dn || (dn = {}, H(e).unload(hn)), dn[u] = r), o.onreadystatechange = r)
                }, abort: function () {
                    r && r(0, 1)
                }
            }
        }
    });
    var vn = {}, mn, gn, yn = /^(?:toggle|show|hide)$/, bn = /^([+\-]=)?([\d+.\-]+)([a-z%]*)$/i, wn, En = [["height", "marginTop", "marginBottom", "paddingTop", "paddingBottom"], ["width", "marginLeft", "marginRight", "paddingLeft", "paddingRight"], ["opacity"]], Sn;
    H.fn.extend({
        show: function (e, t, n) {
            var s, o;
            if (e || e === 0)return this.animate(i("show", 3), e, t, n);
            for (var u = 0, a = this.length; u < a; u++)s = this[u], s.style && (o = s.style.display, !H._data(s, "olddisplay") && o === "none" && (o = s.style.display = ""), (o === "" && H.css(s, "display") === "none" || !H.contains(s.ownerDocument.documentElement, s)) && H._data(s, "olddisplay", r(s.nodeName)));
            for (u = 0; u < a; u++) {
                s = this[u];
                if (s.style) {
                    o = s.style.display;
                    if (o === "" || o === "none")s.style.display = H._data(s, "olddisplay") || ""
                }
            }
            return this
        }, hide: function (e, t, n) {
            if (e || e === 0)return this.animate(i("hide", 3), e, t, n);
            var r, s, o = 0, u = this.length;
            for (; o < u; o++)r = this[o], r.style && (s = H.css(r, "display"), s !== "none" && !H._data(r, "olddisplay") && H._data(r, "olddisplay", s));
            for (o = 0; o < u; o++)this[o].style && (this[o].style.display = "none");
            return this
        }, _toggle: H.fn.toggle, toggle: function (e, t, n) {
            var r = typeof e == "boolean";
            H.isFunction(e) && H.isFunction(t) ? this._toggle.apply(this, arguments) : e == null || r ? this.each(function () {
                var t = r ? e : H(this).is(":hidden");
                H(this)[t ? "show" : "hide"]()
            }) : this.animate(i("toggle", 3), e, t, n);
            return this
        }, fadeTo: function (e, t, n, r) {
            return this.filter(":hidden").css("opacity", 0).show().end().animate({opacity: t}, e, n, r)
        }, animate: function (e, t, n, i) {
            function s() {
                o.queue === !1 && H._mark(this);
                var t = H.extend({}, o), n = this.nodeType === 1, i = n && H(this).is(":hidden"), s, u, a, f, l, c, h, p, d, v, m;
                t.animatedProperties = {};
                for (a in e) {
                    s = H.camelCase(a), a !== s && (e[s] = e[a], delete e[a]);
                    if ((l = H.cssHooks[s]) && "expand" in l) {
                        c = l.expand(e[s]), delete e[s];
                        for (a in c)a in e || (e[a] = c[a])
                    }
                }
                for (s in e) {
                    u = e[s], H.isArray(u) ? (t.animatedProperties[s] = u[1], u = e[s] = u[0]) : t.animatedProperties[s] = t.specialEasing && t.specialEasing[s] || t.easing || "swing";
                    if (u === "hide" && i || u === "show" && !i)return t.complete.call(this);
                    n && (s === "height" || s === "width") && (t.overflow = [this.style.overflow, this.style.overflowX, this.style.overflowY], H.css(this, "display") === "inline" && H.css(this, "float") === "none" && (!H.support.inlineBlockNeedsLayout || r(this.nodeName) === "inline" ? this.style.display = "inline-block" : this.style.zoom = 1))
                }
                t.overflow != null && (this.style.overflow = "hidden");
                for (a in e)f = new H.fx(this, t, a), u = e[a], yn.test(u) ? (m = H._data(this, "toggle" + a) || (u === "toggle" ? i ? "show" : "hide" : 0), m ? (H._data(this, "toggle" + a, m === "show" ? "hide" : "show"), f[m]()) : f[u]()) : (h = bn.exec(u), p = f.cur(), h ? (d = parseFloat(h[2]), v = h[3] || (H.cssNumber[a] ? "" : "px"), v !== "px" && (H.style(this, a, (d || 1) + v), p = (d || 1) / f.cur() * p, H.style(this, a, p + v)), h[1] && (d = (h[1] === "-=" ? -1 : 1) * d + p), f.custom(p, d, v)) : f.custom(p, u, ""));
                return !0
            }

            var o = H.speed(t, n, i);
            if (H.isEmptyObject(e))return this.each(o.complete, [!1]);
            e = H.extend({}, e);
            return o.queue === !1 ? this.each(s) : this.queue(o.queue, s)
        }, stop: function (e, n, r) {
            typeof e != "string" && (r = n, n = e, e = t), n && e !== !1 && this.queue(e || "fx", []);
            return this.each(function () {
                function t(e, t, n) {
                    var i = t[n];
                    H.removeData(e, n, !0), i.stop(r)
                }

                var n, i = !1, s = H.timers, o = H._data(this);
                r || H._unmark(!0, this);
                if (e == null)for (n in o)o[n] && o[n].stop && n.indexOf(".run") === n.length - 4 && t(this, o, n); else o[n = e + ".run"] && o[n].stop && t(this, o, n);
                for (n = s.length; n--;)s[n].elem === this && (e == null || s[n].queue === e) && (r ? s[n](!0) : s[n].saveState(), i = !0, s.splice(n, 1));
                (!r || !i) && H.dequeue(this, e)
            })
        }
    }), H.each({
        slideDown: i("show", 1),
        slideUp: i("hide", 1),
        slideToggle: i("toggle", 1),
        fadeIn: {opacity: "show"},
        fadeOut: {opacity: "hide"},
        fadeToggle: {opacity: "toggle"}
    }, function (e, t) {
        H.fn[e] = function (e, n, r) {
            return this.animate(t, e, n, r)
        }
    }), H.extend({
        speed: function (e, t, n) {
            var r = e && typeof e == "object" ? H.extend({}, e) : {
                complete: n || !n && t || H.isFunction(e) && e,
                duration: e,
                easing: n && t || t && !H.isFunction(t) && t
            };
            r.duration = H.fx.off ? 0 : typeof r.duration == "number" ? r.duration : r.duration in H.fx.speeds ? H.fx.speeds[r.duration] : H.fx.speeds._default;
            if (r.queue == null || r.queue === !0)r.queue = "fx";
            r.old = r.complete, r.complete = function (e) {
                H.isFunction(r.old) && r.old.call(this), r.queue ? H.dequeue(this, r.queue) : e !== !1 && H._unmark(this)
            };
            return r
        }, easing: {
            linear: function (e) {
                return e
            }, swing: function (e) {
                return -Math.cos(e * Math.PI) / 2 + .5
            }
        }, timers: [], fx: function (e, t, n) {
            this.options = t, this.elem = e, this.prop = n, t.orig = t.orig || {}
        }
    }), H.fx.prototype = {
        update: function () {
            this.options.step && this.options.step.call(this.elem, this.now, this), (H.fx.step[this.prop] || H.fx.step._default)(this)
        }, cur: function () {
            if (this.elem[this.prop] != null && (!this.elem.style || this.elem.style[this.prop] == null))return this.elem[this.prop];
            var e, t = H.css(this.elem, this.prop);
            return isNaN(e = parseFloat(t)) ? !t || t === "auto" ? 0 : t : e
        }, custom: function (e, n, r) {
            function i(e) {
                return s.step(e)
            }

            var s = this, u = H.fx;
            this.startTime = Sn || o(), this.end = n, this.now = this.start = e, this.pos = this.state = 0, this.unit = r || this.unit || (H.cssNumber[this.prop] ? "" : "px"), i.queue = this.options.queue, i.elem = this.elem, i.saveState = function () {
                H._data(s.elem, "fxshow" + s.prop) === t && (s.options.hide ? H._data(s.elem, "fxshow" + s.prop, s.start) : s.options.show && H._data(s.elem, "fxshow" + s.prop, s.end))
            }, i() && H.timers.push(i) && !wn && (wn = setInterval(u.tick, u.interval))
        }, show: function () {
            var e = H._data(this.elem, "fxshow" + this.prop);
            this.options.orig[this.prop] = e || H.style(this.elem, this.prop), this.options.show = !0, e !== t ? this.custom(this.cur(), e) : this.custom(this.prop === "width" || this.prop === "height" ? 1 : 0, this.cur()), H(this.elem).show()
        }, hide: function () {
            this.options.orig[this.prop] = H._data(this.elem, "fxshow" + this.prop) || H.style(this.elem, this.prop), this.options.hide = !0, this.custom(this.cur(), 0)
        }, step: function (e) {
            var t, n, r, i = Sn || o(), s = !0, u = this.elem, a = this.options;
            if (e || i >= a.duration + this.startTime) {
                this.now = this.end, this.pos = this.state = 1, this.update(), a.animatedProperties[this.prop] = !0;
                for (t in a.animatedProperties)a.animatedProperties[t] !== !0 && (s = !1);
                if (s) {
                    a.overflow != null && !H.support.shrinkWrapBlocks && H.each(["", "X", "Y"], function (e, t) {
                        u.style["overflow" + t] = a.overflow[e]
                    }), a.hide && H(u).hide();
                    if (a.hide || a.show)for (t in a.animatedProperties)H.style(u, t, a.orig[t]), H.removeData(u, "fxshow" + t, !0), H.removeData(u, "toggle" + t, !0);
                    r = a.complete, r && (a.complete = !1, r.call(u))
                }
                return !1
            }
            a.duration == Infinity ? this.now = i : (n = i - this.startTime, this.state = n / a.duration, this.pos = H.easing[a.animatedProperties[this.prop]](this.state, n, 0, 1, a.duration), this.now = this.start + (this.end - this.start) * this.pos), this.update();
            return !0
        }
    }, H.extend(H.fx, {
        tick: function () {
            var e, t = H.timers, n = 0;
            for (; n < t.length; n++)e = t[n], !e() && t[n] === e && t.splice(n--, 1);
            t.length || H.fx.stop()
        }, interval: 13, stop: function () {
            clearInterval(wn), wn = null
        }, speeds: {slow: 600, fast: 200, _default: 400}, step: {
            opacity: function (e) {
                H.style(e.elem, "opacity", e.now)
            }, _default: function (e) {
                e.elem.style && e.elem.style[e.prop] != null ? e.elem.style[e.prop] = e.now + e.unit : e.elem[e.prop] = e.now
            }
        }
    }), H.each(En.concat.apply([], En), function (e, t) {
        t.indexOf("margin") && (H.fx.step[t] = function (e) {
            H.style(e.elem, t, Math.max(0, e.now) + e.unit)
        })
    }), H.expr && H.expr.filters && (H.expr.filters.animated = function (e) {
        return H.grep(H.timers, function (t) {
            return e === t.elem
        }).length
    });
    var xn, Tn = /^t(?:able|d|h)$/i, Nn = /^(?:body|html)$/i;
    "getBoundingClientRect" in _.documentElement ? xn = function (e, t, r, i) {
        try {
            i = e.getBoundingClientRect()
        } catch (s) {
        }
        if (!i || !H.contains(r, e))return i ? {top: i.top, left: i.left} : {top: 0, left: 0};
        var o = t.body, u = n(t), a = r.clientTop || o.clientTop || 0, f = r.clientLeft || o.clientLeft || 0, l = u.pageYOffset || H.support.boxModel && r.scrollTop || o.scrollTop, c = u.pageXOffset || H.support.boxModel && r.scrollLeft || o.scrollLeft, h = i.top + l - a, p = i.left + c - f;
        return {top: h, left: p}
    } : xn = function (e, t, n) {
        var r, i = e.offsetParent, s = e, o = t.body, u = t.defaultView, a = u ? u.getComputedStyle(e, null) : e.currentStyle, f = e.offsetTop, l = e.offsetLeft;
        while ((e = e.parentNode) && e !== o && e !== n) {
            if (H.support.fixedPosition && a.position === "fixed")break;
            r = u ? u.getComputedStyle(e, null) : e.currentStyle, f -= e.scrollTop, l -= e.scrollLeft, e === i && (f += e.offsetTop, l += e.offsetLeft, H.support.doesNotAddBorder && (!H.support.doesAddBorderForTableAndCells || !Tn.test(e.nodeName)) && (f += parseFloat(r.borderTopWidth) || 0, l += parseFloat(r.borderLeftWidth) || 0), s = i, i = e.offsetParent), H.support.subtractsBorderForOverflowNotVisible && r.overflow !== "visible" && (f += parseFloat(r.borderTopWidth) || 0, l += parseFloat(r.borderLeftWidth) || 0), a = r
        }
        if (a.position === "relative" || a.position === "static")f += o.offsetTop, l += o.offsetLeft;
        H.support.fixedPosition && a.position === "fixed" && (f += Math.max(n.scrollTop, o.scrollTop), l += Math.max(n.scrollLeft, o.scrollLeft));
        return {top: f, left: l}
    }, H.fn.offset = function (e) {
        if (arguments.length)return e === t ? this : this.each(function (t) {
            H.offset.setOffset(this, e, t)
        });
        var n = this[0], r = n && n.ownerDocument;
        if (!r)return null;
        if (n === r.body)return H.offset.bodyOffset(n);
        return xn(n, r, r.documentElement)
    }, H.offset = {
        bodyOffset: function (e) {
            var t = e.offsetTop, n = e.offsetLeft;
            H.support.doesNotIncludeMarginInBodyOffset && (t += parseFloat(H.css(e, "marginTop")) || 0, n += parseFloat(H.css(e, "marginLeft")) || 0);
            return {top: t, left: n}
        }, setOffset: function (e, t, n) {
            var r = H.css(e, "position");
            r === "static" && (e.style.position = "relative");
            var i = H(e), s = i.offset(), o = H.css(e, "top"), u = H.css(e, "left"), a = (r === "absolute" || r === "fixed") && H.inArray("auto", [o, u]) > -1, f = {}, l = {}, c, h;
            a ? (l = i.position(), c = l.top, h = l.left) : (c = parseFloat(o) || 0, h = parseFloat(u) || 0), H.isFunction(t) && (t = t.call(e, n, s)), t.top != null && (f.top = t.top - s.top + c), t.left != null && (f.left = t.left - s.left + h), "using" in t ? t.using.call(e, f) : i.css(f)
        }
    }, H.fn.extend({
        position: function () {
            if (!this[0])return null;
            var e = this[0], t = this.offsetParent(), n = this.offset(), r = Nn.test(t[0].nodeName) ? {
                top: 0,
                left: 0
            } : t.offset();
            n.top -= parseFloat(H.css(e, "marginTop")) || 0, n.left -= parseFloat(H.css(e, "marginLeft")) || 0, r.top += parseFloat(H.css(t[0], "borderTopWidth")) || 0, r.left += parseFloat(H.css(t[0], "borderLeftWidth")) || 0;
            return {top: n.top - r.top, left: n.left - r.left}
        }, offsetParent: function () {
            return this.map(function () {
                var e = this.offsetParent || _.body;
                while (e && !Nn.test(e.nodeName) && H.css(e, "position") === "static")e = e.offsetParent;
                return e
            })
        }
    }), H.each({scrollLeft: "pageXOffset", scrollTop: "pageYOffset"}, function (e, r) {
        var i = /Y/.test(r);
        H.fn[e] = function (s) {
            return H.access(this, function (e, s, o) {
                var u = n(e);
                if (o === t)return u ? r in u ? u[r] : H.support.boxModel && u.document.documentElement[s] || u.document.body[s] : e[s];
                u ? u.scrollTo(i ? H(u).scrollLeft() : o, i ? o : H(u).scrollTop()) : e[s] = o
            }, e, s, arguments.length, null)
        }
    }), H.each({Height: "height", Width: "width"}, function (e, n) {
        var r = "client" + e, i = "scroll" + e, s = "offset" + e;
        H.fn["inner" + e] = function () {
            var e = this[0];
            return e ? e.style ? parseFloat(H.css(e, n, "padding")) : this[n]() : null
        }, H.fn["outer" + e] = function (e) {
            var t = this[0];
            return t ? t.style ? parseFloat(H.css(t, n, e ? "margin" : "border")) : this[n]() : null
        }, H.fn[n] = function (e) {
            return H.access(this, function (e, n, o) {
                var u, a, f, l;
                if (H.isWindow(e)) {
                    u = e.document, a = u.documentElement[r];
                    return H.support.boxModel && a || u.body && u.body[r] || a
                }
                if (e.nodeType === 9) {
                    u = e.documentElement;
                    if (u[r] >= u[i])return u[r];
                    return Math.max(e.body[i], u[i], e.body[s], u[s])
                }
                if (o === t) {
                    f = H.css(e, n), l = parseFloat(f);
                    return H.isNumeric(l) ? l : f
                }
                H(e).css(n, o)
            }, n, e, arguments.length, null)
        }
    }), e.jQuery = e.$ = H, typeof define == "function" && define.amd && define.amd.jQuery && define("jquery", [], function () {
        return H
    })
})(window);
(function (e, t) {
    function n(t, n) {
        var i = t.nodeName.toLowerCase();
        if ("area" === i) {
            n = t.parentNode;
            i = n.name;
            if (!t.href || !i || n.nodeName.toLowerCase() !== "map")return false;
            t = e("img[usemap=#" + i + "]")[0];
            return !!t && r(t)
        }
        return (/input|select|textarea|button|object/.test(i) ? !t.disabled : "a" == i ? t.href || n : n) && r(t)
    }

    function r(t) {
        return !e(t).parents().andSelf().filter(function () {
            return e.curCSS(this, "visibility") === "hidden" || e.expr.filters.hidden(this)
        }).length
    }

    e.ui = e.ui || {};
    if (!e.ui.version) {
        e.extend(e.ui, {
            version: "1.8.16",
            keyCode: {
                ALT: 18,
                BACKSPACE: 8,
                CAPS_LOCK: 20,
                COMMA: 188,
                COMMAND: 91,
                COMMAND_LEFT: 91,
                COMMAND_RIGHT: 93,
                CONTROL: 17,
                DELETE: 46,
                DOWN: 40,
                END: 35,
                ENTER: 13,
                ESCAPE: 27,
                HOME: 36,
                INSERT: 45,
                LEFT: 37,
                MENU: 93,
                NUMPAD_ADD: 107,
                NUMPAD_DECIMAL: 110,
                NUMPAD_DIVIDE: 111,
                NUMPAD_ENTER: 108,
                NUMPAD_MULTIPLY: 106,
                NUMPAD_SUBTRACT: 109,
                PAGE_DOWN: 34,
                PAGE_UP: 33,
                PERIOD: 190,
                RIGHT: 39,
                SHIFT: 16,
                SPACE: 32,
                TAB: 9,
                UP: 38,
                WINDOWS: 91
            }
        });
        e.fn.extend({
            propAttr: e.fn.prop || e.fn.attr, _focus: e.fn.focus, focus: function (t, n) {
                return typeof t === "number" ? this.each(function () {
                    var r = this;
                    setTimeout(function () {
                        e(r).focus();
                        n && n.call(r)
                    }, t)
                }) : this._focus.apply(this, arguments)
            }, scrollParent: function () {
                var t;
                t = e.browser.msie && /(static|relative)/.test(this.css("position")) || /absolute/.test(this.css("position")) ? this.parents().filter(function () {
                    return /(relative|absolute|fixed)/.test(e.curCSS(this, "position", 1)) && /(auto|scroll)/.test(e.curCSS(this, "overflow", 1) + e.curCSS(this, "overflow-y", 1) + e.curCSS(this, "overflow-x", 1))
                }).eq(0) : this.parents().filter(function () {
                    return /(auto|scroll)/.test(e.curCSS(this, "overflow", 1) + e.curCSS(this, "overflow-y", 1) + e.curCSS(this, "overflow-x", 1))
                }).eq(0);
                return /fixed/.test(this.css("position")) || !t.length ? e(document) : t
            }, zIndex: function (n) {
                if (n !== t)return this.css("zIndex", n);
                if (this.length) {
                    n = e(this[0]);
                    for (var r; n.length && n[0] !== document;) {
                        r = n.css("position");
                        if (r === "absolute" || r === "relative" || r === "fixed") {
                            r = parseInt(n.css("zIndex"), 10);
                            if (!isNaN(r) && r !== 0)return r
                        }
                        n = n.parent()
                    }
                }
                return 0
            }, disableSelection: function () {
                return this.bind((e.support.selectstart ? "selectstart" : "mousedown") + ".ui-disableSelection", function (e) {
                    e.preventDefault()
                })
            }, enableSelection: function () {
                return this.unbind(".ui-disableSelection")
            }
        });
        e.each(["Width", "Height"], function (n, r) {
            function i(t, n, r, i) {
                e.each(s, function () {
                    n -= parseFloat(e.curCSS(t, "padding" + this, true)) || 0;
                    if (r)n -= parseFloat(e.curCSS(t, "border" + this + "Width", true)) || 0;
                    if (i)n -= parseFloat(e.curCSS(t, "margin" + this, true)) || 0
                });
                return n
            }

            var s = r === "Width" ? ["Left", "Right"] : ["Top", "Bottom"], o = r.toLowerCase(), u = {
                innerWidth: e.fn.innerWidth,
                innerHeight: e.fn.innerHeight,
                outerWidth: e.fn.outerWidth,
                outerHeight: e.fn.outerHeight
            };
            e.fn["inner" + r] = function (n) {
                if (n === t)return u["inner" + r].call(this);
                return this.each(function () {
                    e(this).css(o, i(this, n) + "px")
                })
            };
            e.fn["outer" + r] = function (t, n) {
                if (typeof t !== "number")return u["outer" + r].call(this, t);
                return this.each(function () {
                    e(this).css(o, i(this, t, true, n) + "px")
                })
            }
        });
        e.extend(e.expr[":"], {
            data: function (t, n, r) {
                return !!e.data(t, r[3])
            }, focusable: function (t) {
                return n(t, !isNaN(e.attr(t, "tabindex")))
            }, tabbable: function (t) {
                var r = e.attr(t, "tabindex"), i = isNaN(r);
                return (i || r >= 0) && n(t, !i)
            }
        });
        e(function () {
            var t = document.body, n = t.appendChild(n = document.createElement("div"));
            e.extend(n.style, {minHeight: "100px", height: "auto", padding: 0, borderWidth: 0});
            e.support.minHeight = n.offsetHeight === 100;
            e.support.selectstart = "onselectstart" in n;
            t.removeChild(n).style.display = "none"
        });
        e.extend(e.ui, {
            plugin: {
                add: function (t, n, r) {
                    t = e.ui[t].prototype;
                    for (var i in r) {
                        t.plugins[i] = t.plugins[i] || [];
                        t.plugins[i].push([n, r[i]])
                    }
                }, call: function (e, t, n) {
                    if ((t = e.plugins[t]) && e.element[0].parentNode)for (var r = 0; r < t.length; r++)e.options[t[r][0]] && t[r][1].apply(e.element, n)
                }
            }, contains: function (e, t) {
                return document.compareDocumentPosition ? e.compareDocumentPosition(t) & 16 : e !== t && e.contains(t)
            }, hasScroll: function (t, n) {
                if (e(t).css("overflow") === "hidden")return false;
                n = n && n === "left" ? "scrollLeft" : "scrollTop";
                var r = false;
                if (t[n] > 0)return true;
                t[n] = 1;
                r = t[n] > 0;
                t[n] = 0;
                return r
            }, isOverAxis: function (e, t, n) {
                return e > t && e < t + n
            }, isOver: function (t, n, r, i, s, o) {
                return e.ui.isOverAxis(t, r, s) && e.ui.isOverAxis(n, i, o)
            }
        })
    }
})(jQuery);
(function (e, t) {
    if (e.cleanData) {
        var n = e.cleanData;
        e.cleanData = function (t) {
            for (var r = 0, i; (i = t[r]) != null; r++)try {
                e(i).triggerHandler("remove")
            } catch (s) {
            }
            n(t)
        }
    } else {
        var r = e.fn.remove;
        e.fn.remove = function (t, n) {
            return this.each(function () {
                if (!n)if (!t || e.filter(t, [this]).length)e("*", this).add([this]).each(function () {
                    try {
                        e(this).triggerHandler("remove")
                    } catch (t) {
                    }
                });
                return r.call(e(this), t, n)
            })
        }
    }
    e.widget = function (t, n, r) {
        var i = t.split(".")[0], s;
        t = t.split(".")[1];
        s = i + "-" + t;
        if (!r) {
            r = n;
            n = e.Widget
        }
        e.expr[":"][s] = function (n) {
            return !!e.data(n, t)
        };
        e[i] = e[i] || {};
        e[i][t] = function (e, t) {
            arguments.length && this._createWidget(e, t)
        };
        n = new n;
        n.options = e.extend(true, {}, n.options);
        e[i][t].prototype = e.extend(true, n, {
            namespace: i,
            widgetName: t,
            widgetEventPrefix: e[i][t].prototype.widgetEventPrefix || t,
            widgetBaseClass: s
        }, r);
        e.widget.bridge(t, e[i][t])
    };
    e.widget.bridge = function (n, r) {
        e.fn[n] = function (i) {
            var s = typeof i === "string", o = Array.prototype.slice.call(arguments, 1), u = this;
            i = !s && o.length ? e.extend.apply(null, [true, i].concat(o)) : i;
            if (s && i.charAt(0) === "_")return u;
            s ? this.each(function () {
                var r = e.data(this, n), s = r && e.isFunction(r[i]) ? r[i].apply(r, o) : r;
                if (s !== r && s !== t) {
                    u = s;
                    return false
                }
            }) : this.each(function () {
                var t = e.data(this, n);
                t ? t.option(i || {})._init() : e.data(this, n, new r(i, this))
            });
            return u
        }
    };
    e.Widget = function (e, t) {
        arguments.length && this._createWidget(e, t)
    };
    e.Widget.prototype = {
        widgetName: "widget",
        widgetEventPrefix: "",
        options: {disabled: false},
        _createWidget: function (t, n) {
            e.data(n, this.widgetName, this);
            this.element = e(n);
            this.options = e.extend(true, {}, this.options, this._getCreateOptions(), t);
            var r = this;
            this.element.bind("remove." + this.widgetName, function () {
                r.destroy()
            });
            this._create();
            this._trigger("create");
            this._init()
        },
        _getCreateOptions: function () {
            return e.metadata && e.metadata.get(this.element[0])[this.widgetName]
        },
        _create: function () {
        },
        _init: function () {
        },
        destroy: function () {
            this.element.unbind("." + this.widgetName).removeData(this.widgetName);
            this.widget().unbind("." + this.widgetName).removeAttr("aria-disabled").removeClass(this.widgetBaseClass + "-disabled ui-state-disabled")
        },
        widget: function () {
            return this.element
        },
        option: function (n, r) {
            var i = n;
            if (arguments.length === 0)return e.extend({}, this.options);
            if (typeof n === "string") {
                if (r === t)return this.options[n];
                i = {};
                i[n] = r
            }
            this._setOptions(i);
            return this
        },
        _setOptions: function (t) {
            var n = this;
            e.each(t, function (e, t) {
                n._setOption(e, t)
            });
            return this
        },
        _setOption: function (e, t) {
            this.options[e] = t;
            if (e === "disabled")this.widget()[t ? "addClass" : "removeClass"](this.widgetBaseClass + "-disabled ui-state-disabled").attr("aria-disabled", t);
            return this
        },
        enable: function () {
            return this._setOption("disabled", false)
        },
        disable: function () {
            return this._setOption("disabled", true)
        },
        _trigger: function (t, n, r) {
            var i = this.options[t];
            n = e.Event(n);
            n.type = (t === this.widgetEventPrefix ? t : this.widgetEventPrefix + t).toLowerCase();
            r = r || {};
            if (n.originalEvent) {
                t = e.event.props.length;
                for (var s; t;) {
                    s = e.event.props[--t];
                    n[s] = n.originalEvent[s]
                }
            }
            this.element.trigger(n, r);
            return !(e.isFunction(i) && i.call(this.element[0], n, r) === false || n.isDefaultPrevented())
        }
    }
})(jQuery);
(function (e) {
    var t = false;
    e(document).mouseup(function () {
        t = false
    });
    e.widget("ui.mouse", {
        options: {cancel: ":input,option", distance: 1, delay: 0}, _mouseInit: function () {
            var t = this;
            this.element.bind("mousedown." + this.widgetName, function (e) {
                return t._mouseDown(e)
            }).bind("click." + this.widgetName, function (n) {
                if (true === e.data(n.target, t.widgetName + ".preventClickEvent")) {
                    e.removeData(n.target, t.widgetName + ".preventClickEvent");
                    n.stopImmediatePropagation();
                    return false
                }
            });
            this.started = false
        }, _mouseDestroy: function () {
            this.element.unbind("." + this.widgetName)
        }, _mouseDown: function (n) {
            if (!t) {
                this._mouseStarted && this._mouseUp(n);
                this._mouseDownEvent = n;
                var r = this, i = n.which == 1, s = typeof this.options.cancel == "string" && n.target.nodeName ? e(n.target).closest(this.options.cancel).length : false;
                if (!i || s || !this._mouseCapture(n))return true;
                this.mouseDelayMet = !this.options.delay;
                if (!this.mouseDelayMet)this._mouseDelayTimer = setTimeout(function () {
                    r.mouseDelayMet = true
                }, this.options.delay);
                if (this._mouseDistanceMet(n) && this._mouseDelayMet(n)) {
                    this._mouseStarted = this._mouseStart(n) !== false;
                    if (!this._mouseStarted) {
                        n.preventDefault();
                        return true
                    }
                }
                true === e.data(n.target, this.widgetName + ".preventClickEvent") && e.removeData(n.target, this.widgetName + ".preventClickEvent");
                this._mouseMoveDelegate = function (e) {
                    return r._mouseMove(e)
                };
                this._mouseUpDelegate = function (e) {
                    return r._mouseUp(e)
                };
                e(document).bind("mousemove." + this.widgetName, this._mouseMoveDelegate).bind("mouseup." + this.widgetName, this._mouseUpDelegate);
                n.preventDefault();
                return t = true
            }
        }, _mouseMove: function (t) {
            if (e.browser.msie && !(document.documentMode >= 9) && !t.button)return this._mouseUp(t);
            if (this._mouseStarted) {
                this._mouseDrag(t);
                return t.preventDefault()
            }
            if (this._mouseDistanceMet(t) && this._mouseDelayMet(t))(this._mouseStarted = this._mouseStart(this._mouseDownEvent, t) !== false) ? this._mouseDrag(t) : this._mouseUp(t);
            return !this._mouseStarted
        }, _mouseUp: function (t) {
            e(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate);
            if (this._mouseStarted) {
                this._mouseStarted = false;
                t.target == this._mouseDownEvent.target && e.data(t.target, this.widgetName + ".preventClickEvent", true);
                this._mouseStop(t)
            }
            return false
        }, _mouseDistanceMet: function (e) {
            return Math.max(Math.abs(this._mouseDownEvent.pageX - e.pageX), Math.abs(this._mouseDownEvent.pageY - e.pageY)) >= this.options.distance
        }, _mouseDelayMet: function () {
            return this.mouseDelayMet
        }, _mouseStart: function () {
        }, _mouseDrag: function () {
        }, _mouseStop: function () {
        }, _mouseCapture: function () {
            return true
        }
    })
})(jQuery);
(function (e) {
    e.ui = e.ui || {};
    var t = /left|center|right/, n = /top|center|bottom/, r = e.fn.position, i = e.fn.offset;
    e.fn.position = function (i) {
        if (!i || !i.of)return r.apply(this, arguments);
        i = e.extend({}, i);
        var s = e(i.of), u = s[0], a = (i.collision || "flip").split(" "), f = i.offset ? i.offset.split(" ") : [0, 0], l, h, p;
        if (u.nodeType === 9) {
            l = s.width();
            h = s.height();
            p = {top: 0, left: 0}
        } else if (u.setTimeout) {
            l = s.width();
            h = s.height();
            p = {top: s.scrollTop(), left: s.scrollLeft()}
        } else if (u.preventDefault) {
            i.at = "left top";
            l = h = 0;
            p = {top: i.of.pageY, left: i.of.pageX}
        } else {
            l = s.outerWidth();
            h = s.outerHeight();
            p = s.offset()
        }
        e.each(["my", "at"], function () {
            var e = (i[this] || "").split(" ");
            if (e.length === 1)e = t.test(e[0]) ? e.concat(["center"]) : n.test(e[0]) ? ["center"].concat(e) : ["center", "center"];
            e[0] = t.test(e[0]) ? e[0] : "center";
            e[1] = n.test(e[1]) ? e[1] : "center";
            i[this] = e
        });
        if (a.length === 1)a[1] = a[0];
        f[0] = parseInt(f[0], 10) || 0;
        if (f.length === 1)f[1] = f[0];
        f[1] = parseInt(f[1], 10) || 0;
        if (i.at[0] === "right")p.left += l; else if (i.at[0] === "center")p.left += l / 2;
        if (i.at[1] === "bottom")p.top += h; else if (i.at[1] === "center")p.top += h / 2;
        p.left += f[0];
        p.top += f[1];
        return this.each(function () {
            var t = e(this), n = t.outerWidth(), r = t.outerHeight(), s = parseInt(e.curCSS(this, "marginLeft", true)) || 0, o = parseInt(e.curCSS(this, "marginTop", true)) || 0, u = n + s + (parseInt(e.curCSS(this, "marginRight", true)) || 0), d = r + o + (parseInt(e.curCSS(this, "marginBottom", true)) || 0), v = e.extend({}, p), m;
            if (i.my[0] === "right")v.left -= n; else if (i.my[0] === "center")v.left -= n / 2;
            if (i.my[1] === "bottom")v.top -= r; else if (i.my[1] === "center")v.top -= r / 2;
            v.left = Math.round(v.left);
            v.top = Math.round(v.top);
            m = {left: v.left - s, top: v.top - o};
            e.each(["left", "top"], function (t, s) {
                e.ui.position[a[t]] && e.ui.position[a[t]][s](v, {
                    targetWidth: l,
                    targetHeight: h,
                    elemWidth: n,
                    elemHeight: r,
                    collisionPosition: m,
                    collisionWidth: u,
                    collisionHeight: d,
                    offset: f,
                    my: i.my,
                    at: i.at
                })
            });
            e.fn.bgiframe && t.bgiframe();
            t.offset(e.extend(v, {using: i.using}))
        })
    };
    e.ui.position = {
        fit: {
            left: function (t, n) {
                var r = e(window);
                r = n.collisionPosition.left + n.collisionWidth - r.width() - r.scrollLeft();
                t.left = r > 0 ? t.left - r : Math.max(t.left - n.collisionPosition.left, t.left)
            }, top: function (t, n) {
                var r = e(window);
                r = n.collisionPosition.top + n.collisionHeight - r.height() - r.scrollTop();
                t.top = r > 0 ? t.top - r : Math.max(t.top - n.collisionPosition.top, t.top)
            }
        }, flip: {
            left: function (t, n) {
                if (n.at[0] !== "center") {
                    var r = e(window);
                    r = n.collisionPosition.left + n.collisionWidth - r.width() - r.scrollLeft();
                    var i = n.my[0] === "left" ? -n.elemWidth : n.my[0] === "right" ? n.elemWidth : 0, s = n.at[0] === "left" ? n.targetWidth : -n.targetWidth, o = -2 * n.offset[0];
                    t.left += n.collisionPosition.left < 0 ? i + s + o : r > 0 ? i + s + o : 0
                }
            }, top: function (t, n) {
                if (n.at[1] !== "center") {
                    var r = e(window);
                    r = n.collisionPosition.top + n.collisionHeight - r.height() - r.scrollTop();
                    var i = n.my[1] === "top" ? -n.elemHeight : n.my[1] === "bottom" ? n.elemHeight : 0, s = n.at[1] === "top" ? n.targetHeight : -n.targetHeight, o = -2 * n.offset[1];
                    t.top += n.collisionPosition.top < 0 ? i + s + o : r > 0 ? i + s + o : 0
                }
            }
        }
    };
    if (!e.offset.setOffset) {
        e.offset.setOffset = function (t, n) {
            if (/static/.test(e.curCSS(t, "position")))t.style.position = "relative";
            var r = e(t), i = r.offset(), s = parseInt(e.curCSS(t, "top", true), 10) || 0, o = parseInt(e.curCSS(t, "left", true), 10) || 0;
            i = {top: n.top - i.top + s, left: n.left - i.left + o};
            "using" in n ? n.using.call(t, i) : r.css(i)
        };
        e.fn.offset = function (t) {
            var n = this[0];
            if (!n || !n.ownerDocument)return null;
            if (t)return this.each(function () {
                e.offset.setOffset(this, t)
            });
            return i.call(this)
        }
    }
})(jQuery);
(function (e) {
    e.widget("ui.draggable", e.ui.mouse, {
        widgetEventPrefix: "drag",
        options: {
            addClasses: true,
            appendTo: "parent",
            axis: false,
            connectToSortable: false,
            containment: false,
            cursor: "auto",
            cursorAt: false,
            grid: false,
            handle: false,
            helper: "original",
            iframeFix: false,
            opacity: false,
            refreshPositions: false,
            revert: false,
            revertDuration: 500,
            scope: "default",
            scroll: true,
            scrollSensitivity: 20,
            scrollSpeed: 20,
            snap: false,
            snapMode: "both",
            snapTolerance: 20,
            stack: false,
            zIndex: false
        },
        _create: function () {
            if (this.options.helper == "original" && !/^(?:r|a|f)/.test(this.element.css("position")))this.element[0].style.position = "relative";
            this.options.addClasses && this.element.addClass("ui-draggable");
            this.options.disabled && this.element.addClass("ui-draggable-disabled");
            this._mouseInit()
        },
        destroy: function () {
            if (this.element.data("draggable")) {
                this.element.removeData("draggable").unbind(".draggable").removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled");
                this._mouseDestroy();
                return this
            }
        },
        _mouseCapture: function (t) {
            var n = this.options;
            if (this.helper || n.disabled || e(t.target).is(".ui-resizable-handle"))return false;
            this.handle = this._getHandle(t);
            if (!this.handle)return false;
            if (n.iframeFix)e(n.iframeFix === true ? "iframe" : n.iframeFix).each(function () {
                e('<div class="ui-draggable-iframeFix" style="background: #fff;"></div>').css({
                    width: this.offsetWidth + "px",
                    height: this.offsetHeight + "px",
                    position: "absolute",
                    opacity: "0.001",
                    zIndex: 1e3
                }).css(e(this).offset()).appendTo("body")
            });
            return true
        },
        _mouseStart: function (t) {
            var n = this.options;
            this.helper = this._createHelper(t);
            this._cacheHelperProportions();
            if (e.ui.ddmanager)e.ui.ddmanager.current = this;
            this._cacheMargins();
            this.cssPosition = this.helper.css("position");
            this.scrollParent = this.helper.scrollParent();
            this.offset = this.positionAbs = this.element.offset();
            this.offset = {top: this.offset.top - this.margins.top, left: this.offset.left - this.margins.left};
            e.extend(this.offset, {
                click: {left: t.pageX - this.offset.left, top: t.pageY - this.offset.top},
                parent: this._getParentOffset(),
                relative: this._getRelativeOffset()
            });
            this.originalPosition = this.position = this._generatePosition(t);
            this.originalPageX = t.pageX;
            this.originalPageY = t.pageY;
            n.cursorAt && this._adjustOffsetFromHelper(n.cursorAt);
            n.containment && this._setContainment();
            if (this._trigger("start", t) === false) {
                this._clear();
                return false
            }
            this._cacheHelperProportions();
            e.ui.ddmanager && !n.dropBehaviour && e.ui.ddmanager.prepareOffsets(this, t);
            this.helper.addClass("ui-draggable-dragging");
            this._mouseDrag(t, true);
            e.ui.ddmanager && e.ui.ddmanager.dragStart(this, t);
            return true
        },
        _mouseDrag: function (t, n) {
            this.position = this._generatePosition(t);
            this.positionAbs = this._convertPositionTo("absolute");
            if (!n) {
                n = this._uiHash();
                if (this._trigger("drag", t, n) === false) {
                    this._mouseUp({});
                    return false
                }
                this.position = n.position
            }
            if (!this.options.axis || this.options.axis != "y")this.helper[0].style.left = this.position.left + "px";
            if (!this.options.axis || this.options.axis != "x")this.helper[0].style.top = this.position.top + "px";
            e.ui.ddmanager && e.ui.ddmanager.drag(this, t);
            return false
        },
        _mouseStop: function (t) {
            var n = false;
            if (e.ui.ddmanager && !this.options.dropBehaviour)n = e.ui.ddmanager.drop(this, t);
            if (this.dropped) {
                n = this.dropped;
                this.dropped = false
            }
            if ((!this.element[0] || !this.element[0].parentNode) && this.options.helper == "original")return false;
            if (this.options.revert == "invalid" && !n || this.options.revert == "valid" && n || this.options.revert === true || e.isFunction(this.options.revert) && this.options.revert.call(this.element, n)) {
                var r = this;
                e(this.helper).animate(this.originalPosition, parseInt(this.options.revertDuration, 10), function () {
                    r._trigger("stop", t) !== false && r._clear()
                })
            } else this._trigger("stop", t) !== false && this._clear();
            return false
        },
        _mouseUp: function (t) {
            this.options.iframeFix === true && e("div.ui-draggable-iframeFix").each(function () {
                this.parentNode.removeChild(this)
            });
            e.ui.ddmanager && e.ui.ddmanager.dragStop(this, t);
            return e.ui.mouse.prototype._mouseUp.call(this, t)
        },
        cancel: function () {
            this.helper.is(".ui-draggable-dragging") ? this._mouseUp({}) : this._clear();
            return this
        },
        _getHandle: function (t) {
            var n = !this.options.handle || !e(this.options.handle, this.element).length ? true : false;
            e(this.options.handle, this.element).find("*").andSelf().each(function () {
                if (this == t.target)n = true
            });
            return n
        },
        _createHelper: function (t) {
            var n = this.options;
            t = e.isFunction(n.helper) ? e(n.helper.apply(this.element[0], [t])) : n.helper == "clone" ? this.element.clone().removeAttr("id") : this.element;
            t.parents("body").length || t.appendTo(n.appendTo == "parent" ? this.element[0].parentNode : n.appendTo);
            t[0] != this.element[0] && !/(fixed|absolute)/.test(t.css("position")) && t.css("position", "absolute");
            return t
        },
        _adjustOffsetFromHelper: function (t) {
            if (typeof t == "string")t = t.split(" ");
            if (e.isArray(t))t = {left: +t[0], top: +t[1] || 0};
            if ("left" in t)this.offset.click.left = t.left + this.margins.left;
            if ("right" in t)this.offset.click.left = this.helperProportions.width - t.right + this.margins.left;
            if ("top" in t)this.offset.click.top = t.top + this.margins.top;
            if ("bottom" in t)this.offset.click.top = this.helperProportions.height - t.bottom + this.margins.top
        },
        _getParentOffset: function () {
            this.offsetParent = this.helper.offsetParent();
            var t = this.offsetParent.offset();
            if (this.cssPosition == "absolute" && this.scrollParent[0] != document && e.ui.contains(this.scrollParent[0], this.offsetParent[0])) {
                t.left += this.scrollParent.scrollLeft();
                t.top += this.scrollParent.scrollTop()
            }
            if (this.offsetParent[0] == document.body || this.offsetParent[0].tagName && this.offsetParent[0].tagName.toLowerCase() == "html" && e.browser.msie)t = {
                top: 0,
                left: 0
            };
            return {
                top: t.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
                left: t.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
            }
        },
        _getRelativeOffset: function () {
            if (this.cssPosition == "relative") {
                var e = this.element.position();
                return {
                    top: e.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),
                    left: e.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()
                }
            } else return {top: 0, left: 0}
        },
        _cacheMargins: function () {
            this.margins = {
                left: parseInt(this.element.css("marginLeft"), 10) || 0,
                top: parseInt(this.element.css("marginTop"), 10) || 0,
                right: parseInt(this.element.css("marginRight"), 10) || 0,
                bottom: parseInt(this.element.css("marginBottom"), 10) || 0
            }
        },
        _cacheHelperProportions: function () {
            this.helperProportions = {width: this.helper.outerWidth(), height: this.helper.outerHeight()}
        },
        _setContainment: function () {
            var t = this.options;
            if (t.containment == "parent")t.containment = this.helper[0].parentNode;
            if (t.containment == "document" || t.containment == "window")this.containment = [t.containment == "document" ? 0 : e(window).scrollLeft() - this.offset.relative.left - this.offset.parent.left, t.containment == "document" ? 0 : e(window).scrollTop() - this.offset.relative.top - this.offset.parent.top, (t.containment == "document" ? 0 : e(window).scrollLeft()) + e(t.containment == "document" ? document : window).width() - this.helperProportions.width - this.margins.left, (t.containment == "document" ? 0 : e(window).scrollTop()) + (e(t.containment == "document" ? document : window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top];
            if (!/^(document|window|parent)$/.test(t.containment) && t.containment.constructor != Array) {
                t = e(t.containment);
                var n = t[0];
                if (n) {
                    t.offset();
                    var r = e(n).css("overflow") != "hidden";
                    this.containment = [(parseInt(e(n).css("borderLeftWidth"), 10) || 0) + (parseInt(e(n).css("paddingLeft"), 10) || 0), (parseInt(e(n).css("borderTopWidth"), 10) || 0) + (parseInt(e(n).css("paddingTop"), 10) || 0), (r ? Math.max(n.scrollWidth, n.offsetWidth) : n.offsetWidth) - (parseInt(e(n).css("borderLeftWidth"), 10) || 0) - (parseInt(e(n).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left - this.margins.right, (r ? Math.max(n.scrollHeight, n.offsetHeight) : n.offsetHeight) - (parseInt(e(n).css("borderTopWidth"), 10) || 0) - (parseInt(e(n).css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top - this.margins.bottom];
                    this.relative_container = t
                }
            } else if (t.containment.constructor == Array)this.containment = t.containment
        },
        _convertPositionTo: function (t, n) {
            if (!n)n = this.position;
            t = t == "absolute" ? 1 : -1;
            var r = this.cssPosition == "absolute" && !(this.scrollParent[0] != document && e.ui.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent, i = /(html|body)/i.test(r[0].tagName);
            return {
                top: n.top + this.offset.relative.top * t + this.offset.parent.top * t - (e.browser.safari && e.browser.version < 526 && this.cssPosition == "fixed" ? 0 : (this.cssPosition == "fixed" ? -this.scrollParent.scrollTop() : i ? 0 : r.scrollTop()) * t),
                left: n.left + this.offset.relative.left * t + this.offset.parent.left * t - (e.browser.safari && e.browser.version < 526 && this.cssPosition == "fixed" ? 0 : (this.cssPosition == "fixed" ? -this.scrollParent.scrollLeft() : i ? 0 : r.scrollLeft()) * t)
            }
        },
        _generatePosition: function (t) {
            var n = this.options, r = this.cssPosition == "absolute" && !(this.scrollParent[0] != document && e.ui.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent, i = /(html|body)/i.test(r[0].tagName), s = t.pageX, o = t.pageY;
            if (this.originalPosition) {
                var u;
                if (this.containment) {
                    if (this.relative_container) {
                        u = this.relative_container.offset();
                        u = [this.containment[0] + u.left, this.containment[1] + u.top, this.containment[2] + u.left, this.containment[3] + u.top]
                    } else u = this.containment;
                    if (t.pageX - this.offset.click.left < u[0])s = u[0] + this.offset.click.left;
                    if (t.pageY - this.offset.click.top < u[1])o = u[1] + this.offset.click.top;
                    if (t.pageX - this.offset.click.left > u[2])s = u[2] + this.offset.click.left;
                    if (t.pageY - this.offset.click.top > u[3])o = u[3] + this.offset.click.top
                }
                if (n.grid) {
                    o = n.grid[1] ? this.originalPageY + Math.round((o - this.originalPageY) / n.grid[1]) * n.grid[1] : this.originalPageY;
                    o = u ? !(o - this.offset.click.top < u[1] || o - this.offset.click.top > u[3]) ? o : !(o - this.offset.click.top < u[1]) ? o - n.grid[1] : o + n.grid[1] : o;
                    s = n.grid[0] ? this.originalPageX + Math.round((s - this.originalPageX) / n.grid[0]) * n.grid[0] : this.originalPageX;
                    s = u ? !(s - this.offset.click.left < u[0] || s - this.offset.click.left > u[2]) ? s : !(s - this.offset.click.left < u[0]) ? s - n.grid[0] : s + n.grid[0] : s
                }
            }
            return {
                top: o - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + (e.browser.safari && e.browser.version < 526 && this.cssPosition == "fixed" ? 0 : this.cssPosition == "fixed" ? -this.scrollParent.scrollTop() : i ? 0 : r.scrollTop()),
                left: s - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + (e.browser.safari && e.browser.version < 526 && this.cssPosition == "fixed" ? 0 : this.cssPosition == "fixed" ? -this.scrollParent.scrollLeft() : i ? 0 : r.scrollLeft())
            }
        },
        _clear: function () {
            this.helper.removeClass("ui-draggable-dragging");
            this.helper[0] != this.element[0] && !this.cancelHelperRemoval && this.helper.remove();
            this.helper = null;
            this.cancelHelperRemoval = false
        },
        _trigger: function (t, n, r) {
            r = r || this._uiHash();
            e.ui.plugin.call(this, t, [n, r]);
            if (t == "drag")this.positionAbs = this._convertPositionTo("absolute");
            return e.Widget.prototype._trigger.call(this, t, n, r)
        },
        plugins: {},
        _uiHash: function () {
            return {
                helper: this.helper,
                position: this.position,
                originalPosition: this.originalPosition,
                offset: this.positionAbs
            }
        }
    });
    e.extend(e.ui.draggable, {version: "1.8.16"});
    e.ui.plugin.add("draggable", "connectToSortable", {
        start: function (t, n) {
            var r = e(this).data("draggable"), i = r.options, s = e.extend({}, n, {item: r.element});
            r.sortables = [];
            e(i.connectToSortable).each(function () {
                var n = e.data(this, "sortable");
                if (n && !n.options.disabled) {
                    r.sortables.push({instance: n, shouldRevert: n.options.revert});
                    n.refreshPositions();
                    n._trigger("activate", t, s)
                }
            })
        }, stop: function (t, n) {
            var r = e(this).data("draggable"), i = e.extend({}, n, {item: r.element});
            e.each(r.sortables, function () {
                if (this.instance.isOver) {
                    this.instance.isOver = 0;
                    r.cancelHelperRemoval = true;
                    this.instance.cancelHelperRemoval = false;
                    if (this.shouldRevert)this.instance.options.revert = true;
                    this.instance._mouseStop(t);
                    this.instance.options.helper = this.instance.options._helper;
                    r.options.helper == "original" && this.instance.currentItem.css({top: "auto", left: "auto"})
                } else {
                    this.instance.cancelHelperRemoval = false;
                    this.instance._trigger("deactivate", t, i)
                }
            })
        }, drag: function (t, n) {
            var r = e(this).data("draggable"), i = this;
            e.each(r.sortables, function () {
                this.instance.positionAbs = r.positionAbs;
                this.instance.helperProportions = r.helperProportions;
                this.instance.offset.click = r.offset.click;
                if (this.instance._intersectsWith(this.instance.containerCache)) {
                    if (!this.instance.isOver) {
                        this.instance.isOver = 1;
                        this.instance.currentItem = e(i).clone().removeAttr("id").appendTo(this.instance.element).data("sortable-item", true);
                        this.instance.options._helper = this.instance.options.helper;
                        this.instance.options.helper = function () {
                            return n.helper[0]
                        };
                        t.target = this.instance.currentItem[0];
                        this.instance._mouseCapture(t, true);
                        this.instance._mouseStart(t, true, true);
                        this.instance.offset.click.top = r.offset.click.top;
                        this.instance.offset.click.left = r.offset.click.left;
                        this.instance.offset.parent.left -= r.offset.parent.left - this.instance.offset.parent.left;
                        this.instance.offset.parent.top -= r.offset.parent.top - this.instance.offset.parent.top;
                        r._trigger("toSortable", t);
                        r.dropped = this.instance.element;
                        r.currentItem = r.element;
                        this.instance.fromOutside = r
                    }
                    this.instance.currentItem && this.instance._mouseDrag(t)
                } else if (this.instance.isOver) {
                    this.instance.isOver = 0;
                    this.instance.cancelHelperRemoval = true;
                    this.instance.options.revert = false;
                    this.instance._trigger("out", t, this.instance._uiHash(this.instance));
                    this.instance._mouseStop(t, true);
                    this.instance.options.helper = this.instance.options._helper;
                    this.instance.currentItem.remove();
                    this.instance.placeholder && this.instance.placeholder.remove();
                    r._trigger("fromSortable", t);
                    r.dropped = false
                }
            })
        }
    });
    e.ui.plugin.add("draggable", "cursor", {
        start: function () {
            var t = e("body"), n = e(this).data("draggable").options;
            if (t.css("cursor"))n._cursor = t.css("cursor");
            t.css("cursor", n.cursor)
        }, stop: function () {
            var t = e(this).data("draggable").options;
            t._cursor && e("body").css("cursor", t._cursor)
        }
    });
    e.ui.plugin.add("draggable", "opacity", {
        start: function (t, n) {
            t = e(n.helper);
            n = e(this).data("draggable").options;
            if (t.css("opacity"))n._opacity = t.css("opacity");
            t.css("opacity", n.opacity)
        }, stop: function (t, n) {
            t = e(this).data("draggable").options;
            t._opacity && e(n.helper).css("opacity", t._opacity)
        }
    });
    e.ui.plugin.add("draggable", "scroll", {
        start: function () {
            var t = e(this).data("draggable");
            if (t.scrollParent[0] != document && t.scrollParent[0].tagName != "HTML")t.overflowOffset = t.scrollParent.offset()
        }, drag: function (t) {
            var n = e(this).data("draggable"), r = n.options, i = false;
            if (n.scrollParent[0] != document && n.scrollParent[0].tagName != "HTML") {
                if (!r.axis || r.axis != "x")if (n.overflowOffset.top + n.scrollParent[0].offsetHeight - t.pageY < r.scrollSensitivity)n.scrollParent[0].scrollTop = i = n.scrollParent[0].scrollTop + r.scrollSpeed; else if (t.pageY - n.overflowOffset.top < r.scrollSensitivity)n.scrollParent[0].scrollTop = i = n.scrollParent[0].scrollTop - r.scrollSpeed;
                if (!r.axis || r.axis != "y")if (n.overflowOffset.left + n.scrollParent[0].offsetWidth - t.pageX < r.scrollSensitivity)n.scrollParent[0].scrollLeft = i = n.scrollParent[0].scrollLeft + r.scrollSpeed; else if (t.pageX - n.overflowOffset.left < r.scrollSensitivity)n.scrollParent[0].scrollLeft = i = n.scrollParent[0].scrollLeft - r.scrollSpeed
            } else {
                if (!r.axis || r.axis != "x")if (t.pageY - e(document).scrollTop() < r.scrollSensitivity)i = e(document).scrollTop(e(document).scrollTop() - r.scrollSpeed); else if (e(window).height() - (t.pageY - e(document).scrollTop()) < r.scrollSensitivity)i = e(document).scrollTop(e(document).scrollTop() + r.scrollSpeed);
                if (!r.axis || r.axis != "y")if (t.pageX - e(document).scrollLeft() < r.scrollSensitivity)i = e(document).scrollLeft(e(document).scrollLeft() - r.scrollSpeed); else if (e(window).width() - (t.pageX - e(document).scrollLeft()) < r.scrollSensitivity)i = e(document).scrollLeft(e(document).scrollLeft() + r.scrollSpeed)
            }
            i !== false && e.ui.ddmanager && !r.dropBehaviour && e.ui.ddmanager.prepareOffsets(n, t)
        }
    });
    e.ui.plugin.add("draggable", "snap", {
        start: function () {
            var t = e(this).data("draggable"), n = t.options;
            t.snapElements = [];
            e(n.snap.constructor != String ? n.snap.items || ":data(draggable)" : n.snap).each(function () {
                var n = e(this), r = n.offset();
                this != t.element[0] && t.snapElements.push({
                    item: this,
                    width: n.outerWidth(),
                    height: n.outerHeight(),
                    top: r.top,
                    left: r.left
                })
            })
        }, drag: function (t, n) {
            for (var r = e(this).data("draggable"), i = r.options, s = i.snapTolerance, o = n.offset.left, u = o + r.helperProportions.width, a = n.offset.top, f = a + r.helperProportions.height, l = r.snapElements.length - 1; l >= 0; l--) {
                var c = r.snapElements[l].left, h = c + r.snapElements[l].width, p = r.snapElements[l].top, v = p + r.snapElements[l].height;
                if (c - s < o && o < h + s && p - s < a && a < v + s || c - s < o && o < h + s && p - s < f && f < v + s || c - s < u && u < h + s && p - s < a && a < v + s || c - s < u && u < h + s && p - s < f && f < v + s) {
                    if (i.snapMode != "inner") {
                        var m = Math.abs(p - f) <= s, g = Math.abs(v - a) <= s, y = Math.abs(c - u) <= s, b = Math.abs(h - o) <= s;
                        if (m)n.position.top = r._convertPositionTo("relative", {
                                top: p - r.helperProportions.height,
                                left: 0
                            }).top - r.margins.top;
                        if (g)n.position.top = r._convertPositionTo("relative", {top: v, left: 0}).top - r.margins.top;
                        if (y)n.position.left = r._convertPositionTo("relative", {
                                top: 0,
                                left: c - r.helperProportions.width
                            }).left - r.margins.left;
                        if (b)n.position.left = r._convertPositionTo("relative", {
                                top: 0,
                                left: h
                            }).left - r.margins.left
                    }
                    var w = m || g || y || b;
                    if (i.snapMode != "outer") {
                        m = Math.abs(p - a) <= s;
                        g = Math.abs(v - f) <= s;
                        y = Math.abs(c - o) <= s;
                        b = Math.abs(h - u) <= s;
                        if (m)n.position.top = r._convertPositionTo("relative", {top: p, left: 0}).top - r.margins.top;
                        if (g)n.position.top = r._convertPositionTo("relative", {
                                top: v - r.helperProportions.height,
                                left: 0
                            }).top - r.margins.top;
                        if (y)n.position.left = r._convertPositionTo("relative", {
                                top: 0,
                                left: c
                            }).left - r.margins.left;
                        if (b)n.position.left = r._convertPositionTo("relative", {
                                top: 0,
                                left: h - r.helperProportions.width
                            }).left - r.margins.left
                    }
                    if (!r.snapElements[l].snapping && (m || g || y || b || w))r.options.snap.snap && r.options.snap.snap.call(r.element, t, e.extend(r._uiHash(), {snapItem: r.snapElements[l].item}));
                    r.snapElements[l].snapping = m || g || y || b || w
                } else {
                    r.snapElements[l].snapping && r.options.snap.release && r.options.snap.release.call(r.element, t, e.extend(r._uiHash(), {snapItem: r.snapElements[l].item}));
                    r.snapElements[l].snapping = false
                }
            }
        }
    });
    e.ui.plugin.add("draggable", "stack", {
        start: function () {
            var t = e(this).data("draggable").options;
            t = e.makeArray(e(t.stack)).sort(function (t, n) {
                return (parseInt(e(t).css("zIndex"), 10) || 0) - (parseInt(e(n).css("zIndex"), 10) || 0)
            });
            if (t.length) {
                var n = parseInt(t[0].style.zIndex) || 0;
                e(t).each(function (e) {
                    this.style.zIndex = n + e
                });
                this[0].style.zIndex = n + t.length
            }
        }
    });
    e.ui.plugin.add("draggable", "zIndex", {
        start: function (t, n) {
            t = e(n.helper);
            n = e(this).data("draggable").options;
            if (t.css("zIndex"))n._zIndex = t.css("zIndex");
            t.css("zIndex", n.zIndex)
        }, stop: function (t, n) {
            t = e(this).data("draggable").options;
            t._zIndex && e(n.helper).css("zIndex", t._zIndex)
        }
    })
})(jQuery);
(function (e) {
    e.widget("ui.droppable", {
        widgetEventPrefix: "drop",
        options: {
            accept: "*",
            activeClass: false,
            addClasses: true,
            greedy: false,
            hoverClass: false,
            scope: "default",
            tolerance: "intersect"
        },
        _create: function () {
            var t = this.options, n = t.accept;
            this.isover = 0;
            this.isout = 1;
            this.accept = e.isFunction(n) ? n : function (e) {
                return e.is(n)
            };
            this.proportions = {width: this.element[0].offsetWidth, height: this.element[0].offsetHeight};
            e.ui.ddmanager.droppables[t.scope] = e.ui.ddmanager.droppables[t.scope] || [];
            e.ui.ddmanager.droppables[t.scope].push(this);
            t.addClasses && this.element.addClass("ui-droppable")
        },
        destroy: function () {
            for (var t = e.ui.ddmanager.droppables[this.options.scope], n = 0; n < t.length; n++)t[n] == this && t.splice(n, 1);
            this.element.removeClass("ui-droppable ui-droppable-disabled").removeData("droppable").unbind(".droppable");
            return this
        },
        _setOption: function (t, n) {
            if (t == "accept")this.accept = e.isFunction(n) ? n : function (e) {
                return e.is(n)
            };
            e.Widget.prototype._setOption.apply(this, arguments)
        },
        _activate: function (t) {
            var n = e.ui.ddmanager.current;
            this.options.activeClass && this.element.addClass(this.options.activeClass);
            n && this._trigger("activate", t, this.ui(n))
        },
        _deactivate: function (t) {
            var n = e.ui.ddmanager.current;
            this.options.activeClass && this.element.removeClass(this.options.activeClass);
            n && this._trigger("deactivate", t, this.ui(n))
        },
        _over: function (t) {
            var n = e.ui.ddmanager.current;
            if (!(!n || (n.currentItem || n.element)[0] == this.element[0]))if (this.accept.call(this.element[0], n.currentItem || n.element)) {
                this.options.hoverClass && this.element.addClass(this.options.hoverClass);
                this._trigger("over", t, this.ui(n))
            }
        },
        _out: function (t) {
            var n = e.ui.ddmanager.current;
            if (!(!n || (n.currentItem || n.element)[0] == this.element[0]))if (this.accept.call(this.element[0], n.currentItem || n.element)) {
                this.options.hoverClass && this.element.removeClass(this.options.hoverClass);
                this._trigger("out", t, this.ui(n))
            }
        },
        _drop: function (t, n) {
            var r = n || e.ui.ddmanager.current;
            if (!r || (r.currentItem || r.element)[0] == this.element[0])return false;
            var i = false;
            this.element.find(":data(droppable)").not(".ui-draggable-dragging").each(function () {
                var t = e.data(this, "droppable");
                if (t.options.greedy && !t.options.disabled && t.options.scope == r.options.scope && t.accept.call(t.element[0], r.currentItem || r.element) && e.ui.intersect(r, e.extend(t, {offset: t.element.offset()}), t.options.tolerance)) {
                    i = true;
                    return false
                }
            });
            if (i)return false;
            if (this.accept.call(this.element[0], r.currentItem || r.element)) {
                this.options.activeClass && this.element.removeClass(this.options.activeClass);
                this.options.hoverClass && this.element.removeClass(this.options.hoverClass);
                this._trigger("drop", t, this.ui(r));
                return this.element
            }
            return false
        },
        ui: function (e) {
            return {
                draggable: e.currentItem || e.element,
                helper: e.helper,
                position: e.position,
                offset: e.positionAbs
            }
        }
    });
    e.extend(e.ui.droppable, {version: "1.8.16"});
    e.ui.intersect = function (t, n, r) {
        if (!n.offset)return false;
        var i = (t.positionAbs || t.position.absolute).left, s = i + t.helperProportions.width, o = (t.positionAbs || t.position.absolute).top, u = o + t.helperProportions.height, a = n.offset.left, f = a + n.proportions.width, l = n.offset.top, c = l + n.proportions.height;
        switch (r) {
            case"fit":
                return a <= i && s <= f && l <= o && u <= c;
            case"intersect":
                return a < i + t.helperProportions.width / 2 && s - t.helperProportions.width / 2 < f && l < o + t.helperProportions.height / 2 && u - t.helperProportions.height / 2 < c;
            case"pointer":
                return e.ui.isOver((t.positionAbs || t.position.absolute).top + (t.clickOffset || t.offset.click).top, (t.positionAbs || t.position.absolute).left + (t.clickOffset || t.offset.click).left, l, a, n.proportions.height, n.proportions.width);
            case"touch":
                return (o >= l && o <= c || u >= l && u <= c || o < l && u > c) && (i >= a && i <= f || s >= a && s <= f || i < a && s > f);
            default:
                return false
        }
    };
    e.ui.ddmanager = {
        current: null, droppables: {"default": []}, prepareOffsets: function (t, n) {
            var r = e.ui.ddmanager.droppables[t.options.scope] || [], i = n ? n.type : null, s = (t.currentItem || t.element).find(":data(droppable)").andSelf(), o = 0;
            e:for (; o < r.length; o++)if (!(r[o].options.disabled || t && !r[o].accept.call(r[o].element[0], t.currentItem || t.element))) {
                for (var u = 0; u < s.length; u++)if (s[u] == r[o].element[0]) {
                    r[o].proportions.height = 0;
                    continue e
                }
                r[o].visible = r[o].element.css("display") != "none";
                if (r[o].visible) {
                    i == "mousedown" && r[o]._activate.call(r[o], n);
                    r[o].offset = r[o].element.offset();
                    r[o].proportions = {width: r[o].element[0].offsetWidth, height: r[o].element[0].offsetHeight}
                }
            }
        }, drop: function (t, n) {
            var r = false;
            e.each(e.ui.ddmanager.droppables[t.options.scope] || [], function () {
                if (this.options) {
                    if (!this.options.disabled && this.visible && e.ui.intersect(t, this, this.options.tolerance))r = r || this._drop.call(this, n);
                    if (!this.options.disabled && this.visible && this.accept.call(this.element[0], t.currentItem || t.element)) {
                        this.isout = 1;
                        this.isover = 0;
                        this._deactivate.call(this, n)
                    }
                }
            });
            return r
        }, dragStart: function (t, n) {
            t.element.parents(":not(body,html)").bind("scroll.droppable", function () {
                t.options.refreshPositions || e.ui.ddmanager.prepareOffsets(t, n)
            })
        }, drag: function (t, n) {
            t.options.refreshPositions && e.ui.ddmanager.prepareOffsets(t, n);
            e.each(e.ui.ddmanager.droppables[t.options.scope] || [], function () {
                if (!(this.options.disabled || this.greedyChild || !this.visible)) {
                    var r = e.ui.intersect(t, this, this.options.tolerance);
                    if (r = !r && this.isover == 1 ? "isout" : r && this.isover == 0 ? "isover" : null) {
                        var i;
                        if (this.options.greedy) {
                            var s = this.element.parents(":data(droppable):eq(0)");
                            if (s.length) {
                                i = e.data(s[0], "droppable");
                                i.greedyChild = r == "isover" ? 1 : 0
                            }
                        }
                        if (i && r == "isover") {
                            i.isover = 0;
                            i.isout = 1;
                            i._out.call(i, n)
                        }
                        this[r] = 1;
                        this[r == "isout" ? "isover" : "isout"] = 0;
                        this[r == "isover" ? "_over" : "_out"].call(this, n);
                        if (i && r == "isout") {
                            i.isout = 0;
                            i.isover = 1;
                            i._over.call(i, n)
                        }
                    }
                }
            })
        }, dragStop: function (t, n) {
            t.element.parents(":not(body,html)").unbind("scroll.droppable");
            t.options.refreshPositions || e.ui.ddmanager.prepareOffsets(t, n)
        }
    }
})(jQuery);
(function (e) {
    e.widget("ui.resizable", e.ui.mouse, {
        widgetEventPrefix: "resize",
        options: {
            alsoResize: false,
            animate: false,
            animateDuration: "slow",
            animateEasing: "swing",
            aspectRatio: false,
            autoHide: false,
            containment: false,
            ghost: false,
            grid: false,
            handles: "e,s,se",
            helper: false,
            maxHeight: null,
            maxWidth: null,
            minHeight: 10,
            minWidth: 10,
            zIndex: 1e3
        },
        _create: function () {
            var t = this, n = this.options;
            this.element.addClass("ui-resizable");
            e.extend(this, {
                _aspectRatio: !!n.aspectRatio,
                aspectRatio: n.aspectRatio,
                originalElement: this.element,
                _proportionallyResizeElements: [],
                _helper: n.helper || n.ghost || n.animate ? n.helper || "ui-resizable-helper" : null
            });
            if (this.element[0].nodeName.match(/canvas|textarea|input|select|button|img/i)) {
                /relative/.test(this.element.css("position")) && e.browser.opera && this.element.css({
                    position: "relative",
                    top: "auto",
                    left: "auto"
                });
                this.element.wrap(e('<div class="ui-wrapper" style="overflow: hidden;"></div>').css({
                    position: this.element.css("position"),
                    width: this.element.outerWidth(),
                    height: this.element.outerHeight(),
                    top: this.element.css("top"),
                    left: this.element.css("left")
                }));
                this.element = this.element.parent().data("resizable", this.element.data("resizable"));
                this.elementIsWrapper = true;
                this.element.css({
                    marginLeft: this.originalElement.css("marginLeft"),
                    marginTop: this.originalElement.css("marginTop"),
                    marginRight: this.originalElement.css("marginRight"),
                    marginBottom: this.originalElement.css("marginBottom")
                });
                this.originalElement.css({marginLeft: 0, marginTop: 0, marginRight: 0, marginBottom: 0});
                this.originalResizeStyle = this.originalElement.css("resize");
                this.originalElement.css("resize", "none");
                this._proportionallyResizeElements.push(this.originalElement.css({
                    position: "static",
                    zoom: 1,
                    display: "block"
                }));
                this.originalElement.css({margin: this.originalElement.css("margin")});
                this._proportionallyResize()
            }
            this.handles = n.handles || (!e(".ui-resizable-handle", this.element).length ? "e,s,se" : {
                    n: ".ui-resizable-n",
                    e: ".ui-resizable-e",
                    s: ".ui-resizable-s",
                    w: ".ui-resizable-w",
                    se: ".ui-resizable-se",
                    sw: ".ui-resizable-sw",
                    ne: ".ui-resizable-ne",
                    nw: ".ui-resizable-nw"
                });
            if (this.handles.constructor == String) {
                if (this.handles == "all")this.handles = "n,e,s,w,se,sw,ne,nw";
                var r = this.handles.split(",");
                this.handles = {};
                for (var i = 0; i < r.length; i++) {
                    var s = e.trim(r[i]), o = e('<div class="ui-resizable-handle ' + ("ui-resizable-" + s) + '"></div>');
                    /sw|se|ne|nw/.test(s) && o.css({zIndex: ++n.zIndex});
                    "se" == s && o.addClass("ui-icon ui-icon-gripsmall-diagonal-se");
                    this.handles[s] = ".ui-resizable-" + s;
                    this.element.append(o)
                }
            }
            this._renderAxis = function (t) {
                t = t || this.element;
                for (var n in this.handles) {
                    if (this.handles[n].constructor == String)this.handles[n] = e(this.handles[n], this.element).show();
                    if (this.elementIsWrapper && this.originalElement[0].nodeName.match(/textarea|input|select|button/i)) {
                        var r = e(this.handles[n], this.element), i = 0;
                        i = /sw|ne|nw|se|n|s/.test(n) ? r.outerHeight() : r.outerWidth();
                        r = ["padding", /ne|nw|n/.test(n) ? "Top" : /se|sw|s/.test(n) ? "Bottom" : /^e$/.test(n) ? "Right" : "Left"].join("");
                        t.css(r, i);
                        this._proportionallyResize()
                    }
                    e(this.handles[n])
                }
            };
            this._renderAxis(this.element);
            this._handles = e(".ui-resizable-handle", this.element).disableSelection();
            this._handles.mouseover(function () {
                if (!t.resizing) {
                    if (this.className)var e = this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i);
                    t.axis = e && e[1] ? e[1] : "se"
                }
            });
            if (n.autoHide) {
                this._handles.hide();
                e(this.element).addClass("ui-resizable-autohide").hover(function () {
                    if (!n.disabled) {
                        e(this).removeClass("ui-resizable-autohide");
                        t._handles.show()
                    }
                }, function () {
                    if (!n.disabled)if (!t.resizing) {
                        e(this).addClass("ui-resizable-autohide");
                        t._handles.hide()
                    }
                })
            }
            this._mouseInit()
        },
        destroy: function () {
            this._mouseDestroy();
            var t = function (t) {
                e(t).removeClass("ui-resizable ui-resizable-disabled ui-resizable-resizing").removeData("resizable").unbind(".resizable").find(".ui-resizable-handle").remove()
            };
            if (this.elementIsWrapper) {
                t(this.element);
                var n = this.element;
                n.after(this.originalElement.css({
                    position: n.css("position"),
                    width: n.outerWidth(),
                    height: n.outerHeight(),
                    top: n.css("top"),
                    left: n.css("left")
                })).remove()
            }
            this.originalElement.css("resize", this.originalResizeStyle);
            t(this.originalElement);
            return this
        },
        _mouseCapture: function (t) {
            var n = false;
            for (var r in this.handles)if (e(this.handles[r])[0] == t.target)n = true;
            return !this.options.disabled && n
        },
        _mouseStart: function (n) {
            var r = this.options, i = this.element.position(), s = this.element;
            this.resizing = true;
            this.documentScroll = {top: e(document).scrollTop(), left: e(document).scrollLeft()};
            if (s.is(".ui-draggable") || /absolute/.test(s.css("position")))s.css({
                position: "absolute",
                top: i.top,
                left: i.left
            });
            e.browser.opera && /relative/.test(s.css("position")) && s.css({
                position: "relative",
                top: "auto",
                left: "auto"
            });
            this._renderProxy();
            i = t(this.helper.css("left"));
            var o = t(this.helper.css("top"));
            if (r.containment) {
                i += e(r.containment).scrollLeft() || 0;
                o += e(r.containment).scrollTop() || 0
            }
            this.offset = this.helper.offset();
            this.position = {left: i, top: o};
            this.size = this._helper ? {width: s.outerWidth(), height: s.outerHeight()} : {
                width: s.width(),
                height: s.height()
            };
            this.originalSize = this._helper ? {width: s.outerWidth(), height: s.outerHeight()} : {
                width: s.width(),
                height: s.height()
            };
            this.originalPosition = {left: i, top: o};
            this.sizeDiff = {width: s.outerWidth() - s.width(), height: s.outerHeight() - s.height()};
            this.originalMousePosition = {left: n.pageX, top: n.pageY};
            this.aspectRatio = typeof r.aspectRatio == "number" ? r.aspectRatio : this.originalSize.width / this.originalSize.height || 1;
            r = e(".ui-resizable-" + this.axis).css("cursor");
            e("body").css("cursor", r == "auto" ? this.axis + "-resize" : r);
            s.addClass("ui-resizable-resizing");
            this._propagate("start", n);
            return true
        },
        _mouseDrag: function (e) {
            var t = this.helper, n = this.originalMousePosition, r = this._change[this.axis];
            if (!r)return false;
            n = r.apply(this, [e, e.pageX - n.left || 0, e.pageY - n.top || 0]);
            this._updateVirtualBoundaries(e.shiftKey);
            if (this._aspectRatio || e.shiftKey)n = this._updateRatio(n, e);
            n = this._respectSize(n, e);
            this._propagate("resize", e);
            t.css({
                top: this.position.top + "px",
                left: this.position.left + "px",
                width: this.size.width + "px",
                height: this.size.height + "px"
            });
            !this._helper && this._proportionallyResizeElements.length && this._proportionallyResize();
            this._updateCache(n);
            this._trigger("resize", e, this.ui());
            return false
        },
        _mouseStop: function (t) {
            this.resizing = false;
            var n = this.options, r = this;
            if (this._helper) {
                var i = this._proportionallyResizeElements, s = i.length && /textarea/i.test(i[0].nodeName);
                i = s && e.ui.hasScroll(i[0], "left") ? 0 : r.sizeDiff.height;
                s = s ? 0 : r.sizeDiff.width;
                s = {width: r.helper.width() - s, height: r.helper.height() - i};
                i = parseInt(r.element.css("left"), 10) + (r.position.left - r.originalPosition.left) || null;
                var o = parseInt(r.element.css("top"), 10) + (r.position.top - r.originalPosition.top) || null;
                n.animate || this.element.css(e.extend(s, {top: o, left: i}));
                r.helper.height(r.size.height);
                r.helper.width(r.size.width);
                this._helper && !n.animate && this._proportionallyResize()
            }
            e("body").css("cursor", "auto");
            this.element.removeClass("ui-resizable-resizing");
            this._propagate("stop", t);
            this._helper && this.helper.remove();
            return false
        },
        _updateVirtualBoundaries: function (e) {
            var t = this.options, r, i, s;
            t = {
                minWidth: n(t.minWidth) ? t.minWidth : 0,
                maxWidth: n(t.maxWidth) ? t.maxWidth : Infinity,
                minHeight: n(t.minHeight) ? t.minHeight : 0,
                maxHeight: n(t.maxHeight) ? t.maxHeight : Infinity
            };
            if (this._aspectRatio || e) {
                e = t.minHeight * this.aspectRatio;
                i = t.minWidth / this.aspectRatio;
                r = t.maxHeight * this.aspectRatio;
                s = t.maxWidth / this.aspectRatio;
                if (e > t.minWidth)t.minWidth = e;
                if (i > t.minHeight)t.minHeight = i;
                if (r < t.maxWidth)t.maxWidth = r;
                if (s < t.maxHeight)t.maxHeight = s
            }
            this._vBoundaries = t
        },
        _updateCache: function (e) {
            this.offset = this.helper.offset();
            if (n(e.left))this.position.left = e.left;
            if (n(e.top))this.position.top = e.top;
            if (n(e.height))this.size.height = e.height;
            if (n(e.width))this.size.width = e.width
        },
        _updateRatio: function (e) {
            var t = this.position, r = this.size, i = this.axis;
            if (n(e.height))e.width = e.height * this.aspectRatio; else if (n(e.width))e.height = e.width / this.aspectRatio;
            if (i == "sw") {
                e.left = t.left + (r.width - e.width);
                e.top = null
            }
            if (i == "nw") {
                e.top = t.top + (r.height - e.height);
                e.left = t.left + (r.width - e.width)
            }
            return e
        },
        _respectSize: function (e) {
            var t = this._vBoundaries, r = this.axis, i = n(e.width) && t.maxWidth && t.maxWidth < e.width, s = n(e.height) && t.maxHeight && t.maxHeight < e.height, o = n(e.width) && t.minWidth && t.minWidth > e.width, u = n(e.height) && t.minHeight && t.minHeight > e.height;
            if (o)e.width = t.minWidth;
            if (u)e.height = t.minHeight;
            if (i)e.width = t.maxWidth;
            if (s)e.height = t.maxHeight;
            var a = this.originalPosition.left + this.originalSize.width, f = this.position.top + this.size.height, l = /sw|nw|w/.test(r);
            r = /nw|ne|n/.test(r);
            if (o && l)e.left = a - t.minWidth;
            if (i && l)e.left = a - t.maxWidth;
            if (u && r)e.top = f - t.minHeight;
            if (s && r)e.top = f - t.maxHeight;
            if ((t = !e.width && !e.height) && !e.left && e.top)e.top = null; else if (t && !e.top && e.left)e.left = null;
            return e
        },
        _proportionallyResize: function () {
            if (this._proportionallyResizeElements.length)for (var t = this.helper || this.element, n = 0; n < this._proportionallyResizeElements.length; n++) {
                var r = this._proportionallyResizeElements[n];
                if (!this.borderDif) {
                    var i = [r.css("borderTopWidth"), r.css("borderRightWidth"), r.css("borderBottomWidth"), r.css("borderLeftWidth")], s = [r.css("paddingTop"), r.css("paddingRight"), r.css("paddingBottom"), r.css("paddingLeft")];
                    this.borderDif = e.map(i, function (e, t) {
                        e = parseInt(e, 10) || 0;
                        t = parseInt(s[t], 10) || 0;
                        return e + t
                    })
                }
                e.browser.msie && (e(t).is(":hidden") || e(t).parents(":hidden").length) || r.css({
                    height: t.height() - this.borderDif[0] - this.borderDif[2] || 0,
                    width: t.width() - this.borderDif[1] - this.borderDif[3] || 0
                })
            }
        },
        _renderProxy: function () {
            var t = this.options;
            this.elementOffset = this.element.offset();
            if (this._helper) {
                this.helper = this.helper || e('<div style="overflow:hidden;"></div>');
                var n = e.browser.msie && e.browser.version < 7, r = n ? 1 : 0;
                n = n ? 2 : -1;
                this.helper.addClass(this._helper).css({
                    width: this.element.outerWidth() + n,
                    height: this.element.outerHeight() + n,
                    position: "absolute",
                    left: this.elementOffset.left - r + "px",
                    top: this.elementOffset.top - r + "px",
                    zIndex: ++t.zIndex
                });
                this.helper.appendTo("body").disableSelection()
            } else this.helper = this.element
        },
        _change: {
            e: function (e, t) {
                return {width: this.originalSize.width + t}
            }, w: function (e, t) {
                return {left: this.originalPosition.left + t, width: this.originalSize.width - t}
            }, n: function (e, t, n) {
                return {top: this.originalPosition.top + n, height: this.originalSize.height - n}
            }, s: function (e, t, n) {
                return {height: this.originalSize.height + n}
            }, se: function (t, n, r) {
                return e.extend(this._change.s.apply(this, arguments), this._change.e.apply(this, [t, n, r]))
            }, sw: function (t, n, r) {
                return e.extend(this._change.s.apply(this, arguments), this._change.w.apply(this, [t, n, r]))
            }, ne: function (t, n, r) {
                return e.extend(this._change.n.apply(this, arguments), this._change.e.apply(this, [t, n, r]))
            }, nw: function (t, n, r) {
                return e.extend(this._change.n.apply(this, arguments), this._change.w.apply(this, [t, n, r]))
            }
        },
        _propagate: function (t, n) {
            e.ui.plugin.call(this, t, [n, this.ui()]);
            t != "resize" && this._trigger(t, n, this.ui())
        },
        plugins: {},
        ui: function () {
            return {
                originalElement: this.originalElement,
                element: this.element,
                helper: this.helper,
                position: this.position,
                size: this.size,
                originalSize: this.originalSize,
                originalPosition: this.originalPosition
            }
        }
    });
    e.extend(e.ui.resizable, {version: "1.8.16"});
    e.ui.plugin.add("resizable", "alsoResize", {
        start: function () {
            var t = e(this).data("resizable").options, n = function (t) {
                e(t).each(function () {
                    var t = e(this);
                    t.data("resizable-alsoresize", {
                        width: parseInt(t.width(), 10),
                        height: parseInt(t.height(), 10),
                        left: parseInt(t.css("left"), 10),
                        top: parseInt(t.css("top"), 10),
                        position: t.css("position")
                    })
                })
            };
            if (typeof t.alsoResize == "object" && !t.alsoResize.parentNode)if (t.alsoResize.length) {
                t.alsoResize = t.alsoResize[0];
                n(t.alsoResize)
            } else e.each(t.alsoResize, function (e) {
                n(e)
            }); else n(t.alsoResize)
        }, resize: function (t, n) {
            var r = e(this).data("resizable");
            t = r.options;
            var i = r.originalSize, s = r.originalPosition, o = {
                height: r.size.height - i.height || 0,
                width: r.size.width - i.width || 0,
                top: r.position.top - s.top || 0,
                left: r.position.left - s.left || 0
            }, u = function (t, i) {
                e(t).each(function () {
                    var t = e(this), s = e(this).data("resizable-alsoresize"), u = {}, f = i && i.length ? i : t.parents(n.originalElement[0]).length ? ["width", "height"] : ["width", "height", "top", "left"];
                    e.each(f, function (e, t) {
                        if ((e = (s[t] || 0) + (o[t] || 0)) && e >= 0)u[t] = e || null
                    });
                    if (e.browser.opera && /relative/.test(t.css("position"))) {
                        r._revertToRelativePosition = true;
                        t.css({position: "absolute", top: "auto", left: "auto"})
                    }
                    t.css(u)
                })
            };
            typeof t.alsoResize == "object" && !t.alsoResize.nodeType ? e.each(t.alsoResize, function (e, t) {
                u(e, t)
            }) : u(t.alsoResize)
        }, stop: function () {
            var t = e(this).data("resizable"), n = t.options, r = function (t) {
                e(t).each(function () {
                    var t = e(this);
                    t.css({position: t.data("resizable-alsoresize").position})
                })
            };
            if (t._revertToRelativePosition) {
                t._revertToRelativePosition = false;
                typeof n.alsoResize == "object" && !n.alsoResize.nodeType ? e.each(n.alsoResize, function (e) {
                    r(e)
                }) : r(n.alsoResize)
            }
            e(this).removeData("resizable-alsoresize")
        }
    });
    e.ui.plugin.add("resizable", "animate", {
        stop: function (t) {
            var n = e(this).data("resizable"), r = n.options, i = n._proportionallyResizeElements, s = i.length && /textarea/i.test(i[0].nodeName), o = s && e.ui.hasScroll(i[0], "left") ? 0 : n.sizeDiff.height;
            s = {width: n.size.width - (s ? 0 : n.sizeDiff.width), height: n.size.height - o};
            o = parseInt(n.element.css("left"), 10) + (n.position.left - n.originalPosition.left) || null;
            var u = parseInt(n.element.css("top"), 10) + (n.position.top - n.originalPosition.top) || null;
            n.element.animate(e.extend(s, u && o ? {top: u, left: o} : {}), {
                duration: r.animateDuration,
                easing: r.animateEasing,
                step: function () {
                    var r = {
                        width: parseInt(n.element.css("width"), 10),
                        height: parseInt(n.element.css("height"), 10),
                        top: parseInt(n.element.css("top"), 10),
                        left: parseInt(n.element.css("left"), 10)
                    };
                    i && i.length && e(i[0]).css({width: r.width, height: r.height});
                    n._updateCache(r);
                    n._propagate("resize", t)
                }
            })
        }
    });
    e.ui.plugin.add("resizable", "containment", {
        start: function () {
            var n = e(this).data("resizable"), r = n.element, i = n.options.containment;
            if (r = i instanceof e ? i.get(0) : /parent/.test(i) ? r.parent().get(0) : i) {
                n.containerElement = e(r);
                if (/document/.test(i) || i == document) {
                    n.containerOffset = {left: 0, top: 0};
                    n.containerPosition = {left: 0, top: 0};
                    n.parentData = {
                        element: e(document),
                        left: 0,
                        top: 0,
                        width: e(document).width(),
                        height: e(document).height() || document.body.parentNode.scrollHeight
                    }
                } else {
                    var s = e(r), o = [];
                    e(["Top", "Right", "Left", "Bottom"]).each(function (e, n) {
                        o[e] = t(s.css("padding" + n))
                    });
                    n.containerOffset = s.offset();
                    n.containerPosition = s.position();
                    n.containerSize = {height: s.innerHeight() - o[3], width: s.innerWidth() - o[1]};
                    i = n.containerOffset;
                    var u = n.containerSize.height, a = n.containerSize.width;
                    a = e.ui.hasScroll(r, "left") ? r.scrollWidth : a;
                    u = e.ui.hasScroll(r) ? r.scrollHeight : u;
                    n.parentData = {element: r, left: i.left, top: i.top, width: a, height: u}
                }
            }
        }, resize: function (t) {
            var n = e(this).data("resizable"), r = n.options, i = n.containerOffset, s = n.position;
            t = n._aspectRatio || t.shiftKey;
            var o = {top: 0, left: 0}, u = n.containerElement;
            if (u[0] != document && /static/.test(u.css("position")))o = i;
            if (s.left < (n._helper ? i.left : 0)) {
                n.size.width += n._helper ? n.position.left - i.left : n.position.left - o.left;
                if (t)n.size.height = n.size.width / r.aspectRatio;
                n.position.left = r.helper ? i.left : 0
            }
            if (s.top < (n._helper ? i.top : 0)) {
                n.size.height += n._helper ? n.position.top - i.top : n.position.top;
                if (t)n.size.width = n.size.height * r.aspectRatio;
                n.position.top = n._helper ? i.top : 0
            }
            n.offset.left = n.parentData.left + n.position.left;
            n.offset.top = n.parentData.top + n.position.top;
            r = Math.abs((n._helper ? n.offset.left - o.left : n.offset.left - o.left) + n.sizeDiff.width);
            i = Math.abs((n._helper ? n.offset.top - o.top : n.offset.top - i.top) + n.sizeDiff.height);
            s = n.containerElement.get(0) == n.element.parent().get(0);
            o = /relative|absolute/.test(n.containerElement.css("position"));
            if (s && o)r -= n.parentData.left;
            if (r + n.size.width >= n.parentData.width) {
                n.size.width = n.parentData.width - r;
                if (t)n.size.height = n.size.width / n.aspectRatio
            }
            if (i + n.size.height >= n.parentData.height) {
                n.size.height = n.parentData.height - i;
                if (t)n.size.width = n.size.height * n.aspectRatio
            }
        }, stop: function () {
            var t = e(this).data("resizable"), n = t.options, r = t.containerOffset, i = t.containerPosition, s = t.containerElement, o = e(t.helper), u = o.offset(), a = o.outerWidth() - t.sizeDiff.width;
            o = o.outerHeight() - t.sizeDiff.height;
            t._helper && !n.animate && /relative/.test(s.css("position")) && e(this).css({
                left: u.left - i.left - r.left,
                width: a,
                height: o
            });
            t._helper && !n.animate && /static/.test(s.css("position")) && e(this).css({
                left: u.left - i.left - r.left,
                width: a,
                height: o
            })
        }
    });
    e.ui.plugin.add("resizable", "ghost", {
        start: function () {
            var t = e(this).data("resizable"), n = t.options, r = t.size;
            t.ghost = t.originalElement.clone();
            t.ghost.css({
                opacity: .25,
                display: "block",
                position: "relative",
                height: r.height,
                width: r.width,
                margin: 0,
                left: 0,
                top: 0
            }).addClass("ui-resizable-ghost").addClass(typeof n.ghost == "string" ? n.ghost : "");
            t.ghost.appendTo(t.helper)
        }, resize: function () {
            var t = e(this).data("resizable");
            t.ghost && t.ghost.css({position: "relative", height: t.size.height, width: t.size.width})
        }, stop: function () {
            var t = e(this).data("resizable");
            t.ghost && t.helper && t.helper.get(0).removeChild(t.ghost.get(0))
        }
    });
    e.ui.plugin.add("resizable", "grid", {
        resize: function () {
            var t = e(this).data("resizable"), n = t.options, r = t.size, i = t.originalSize, s = t.originalPosition, o = t.axis;
            n.grid = typeof n.grid == "number" ? [n.grid, n.grid] : n.grid;
            var u = Math.round((r.width - i.width) / (n.grid[0] || 1)) * (n.grid[0] || 1);
            n = Math.round((r.height - i.height) / (n.grid[1] || 1)) * (n.grid[1] || 1);
            if (/^(se|s|e)$/.test(o)) {
                t.size.width = i.width + u;
                t.size.height = i.height + n
            } else if (/^(ne)$/.test(o)) {
                t.size.width = i.width + u;
                t.size.height = i.height + n;
                t.position.top = s.top - n
            } else {
                if (/^(sw)$/.test(o)) {
                    t.size.width = i.width + u;
                    t.size.height = i.height + n
                } else {
                    t.size.width = i.width + u;
                    t.size.height = i.height + n;
                    t.position.top = s.top - n
                }
                t.position.left = s.left - u
            }
        }
    });
    var t = function (e) {
        return parseInt(e, 10) || 0
    }, n = function (e) {
        return !isNaN(parseInt(e, 10))
    }
})(jQuery);
(function (e) {
    e.widget("ui.selectable", e.ui.mouse, {
        options: {
            appendTo: "body",
            autoRefresh: true,
            distance: 0,
            filter: "*",
            tolerance: "touch"
        }, _create: function () {
            var t = this;
            this.element.addClass("ui-selectable");
            this.dragged = false;
            var n;
            this.refresh = function () {
                n = e(t.options.filter, t.element[0]);
                n.each(function () {
                    var t = e(this), n = t.offset();
                    e.data(this, "selectable-item", {
                        element: this,
                        $element: t,
                        left: n.left,
                        top: n.top,
                        right: n.left + t.outerWidth(),
                        bottom: n.top + t.outerHeight(),
                        startselected: false,
                        selected: t.hasClass("ui-selected"),
                        selecting: t.hasClass("ui-selecting"),
                        unselecting: t.hasClass("ui-unselecting")
                    })
                })
            };
            this.refresh();
            this.selectees = n.addClass("ui-selectee");
            this._mouseInit();
            this.helper = e("<div class='ui-selectable-helper'></div>")
        }, destroy: function () {
            this.selectees.removeClass("ui-selectee").removeData("selectable-item");
            this.element.removeClass("ui-selectable ui-selectable-disabled").removeData("selectable").unbind(".selectable");
            this._mouseDestroy();
            return this
        }, _mouseStart: function (t) {
            var n = this;
            this.opos = [t.pageX, t.pageY];
            if (!this.options.disabled) {
                var r = this.options;
                this.selectees = e(r.filter, this.element[0]);
                this._trigger("start", t);
                e(r.appendTo).append(this.helper);
                this.helper.css({left: t.clientX, top: t.clientY, width: 0, height: 0});
                r.autoRefresh && this.refresh();
                this.selectees.filter(".ui-selected").each(function () {
                    var r = e.data(this, "selectable-item");
                    r.startselected = true;
                    if (!t.metaKey) {
                        r.$element.removeClass("ui-selected");
                        r.selected = false;
                        r.$element.addClass("ui-unselecting");
                        r.unselecting = true;
                        n._trigger("unselecting", t, {unselecting: r.element})
                    }
                });
                e(t.target).parents().andSelf().each(function () {
                    var r = e.data(this, "selectable-item");
                    if (r) {
                        var i = !t.metaKey || !r.$element.hasClass("ui-selected");
                        r.$element.removeClass(i ? "ui-unselecting" : "ui-selected").addClass(i ? "ui-selecting" : "ui-unselecting");
                        r.unselecting = !i;
                        r.selecting = i;
                        (r.selected = i) ? n._trigger("selecting", t, {selecting: r.element}) : n._trigger("unselecting", t, {unselecting: r.element});
                        return false
                    }
                })
            }
        }, _mouseDrag: function (t) {
            var n = this;
            this.dragged = true;
            if (!this.options.disabled) {
                var r = this.options, i = this.opos[0], s = this.opos[1], o = t.pageX, u = t.pageY;
                if (i > o) {
                    var a = o;
                    o = i;
                    i = a
                }
                if (s > u) {
                    a = u;
                    u = s;
                    s = a
                }
                this.helper.css({left: i, top: s, width: o - i, height: u - s});
                this.selectees.each(function () {
                    var a = e.data(this, "selectable-item");
                    if (!(!a || a.element == n.element[0])) {
                        var l = false;
                        if (r.tolerance == "touch")l = !(a.left > o || a.right < i || a.top > u || a.bottom < s); else if (r.tolerance == "fit")l = a.left > i && a.right < o && a.top > s && a.bottom < u;
                        if (l) {
                            if (a.selected) {
                                a.$element.removeClass("ui-selected");
                                a.selected = false
                            }
                            if (a.unselecting) {
                                a.$element.removeClass("ui-unselecting");
                                a.unselecting = false
                            }
                            if (!a.selecting) {
                                a.$element.addClass("ui-selecting");
                                a.selecting = true;
                                n._trigger("selecting", t, {selecting: a.element})
                            }
                        } else {
                            if (a.selecting)if (t.metaKey && a.startselected) {
                                a.$element.removeClass("ui-selecting");
                                a.selecting = false;
                                a.$element.addClass("ui-selected");
                                a.selected = true
                            } else {
                                a.$element.removeClass("ui-selecting");
                                a.selecting = false;
                                if (a.startselected) {
                                    a.$element.addClass("ui-unselecting");
                                    a.unselecting = true
                                }
                                n._trigger("unselecting", t, {unselecting: a.element})
                            }
                            if (a.selected)if (!t.metaKey && !a.startselected) {
                                a.$element.removeClass("ui-selected");
                                a.selected = false;
                                a.$element.addClass("ui-unselecting");
                                a.unselecting = true;
                                n._trigger("unselecting", t, {unselecting: a.element})
                            }
                        }
                    }
                });
                return false
            }
        }, _mouseStop: function (t) {
            var n = this;
            this.dragged = false;
            e(".ui-unselecting", this.element[0]).each(function () {
                var r = e.data(this, "selectable-item");
                r.$element.removeClass("ui-unselecting");
                r.unselecting = false;
                r.startselected = false;
                n._trigger("unselected", t, {unselected: r.element})
            });
            e(".ui-selecting", this.element[0]).each(function () {
                var r = e.data(this, "selectable-item");
                r.$element.removeClass("ui-selecting").addClass("ui-selected");
                r.selecting = false;
                r.selected = true;
                r.startselected = true;
                n._trigger("selected", t, {selected: r.element})
            });
            this._trigger("stop", t);
            this.helper.remove();
            return false
        }
    });
    e.extend(e.ui.selectable, {version: "1.8.16"})
})(jQuery);
(function (e) {
    e.widget("ui.sortable", e.ui.mouse, {
        widgetEventPrefix: "sort",
        options: {
            appendTo: "parent",
            axis: false,
            connectWith: false,
            containment: false,
            cursor: "auto",
            cursorAt: false,
            dropOnEmpty: true,
            forcePlaceholderSize: false,
            forceHelperSize: false,
            grid: false,
            handle: false,
            helper: "original",
            items: "> *",
            opacity: false,
            placeholder: false,
            revert: false,
            scroll: true,
            scrollSensitivity: 20,
            scrollSpeed: 20,
            scope: "default",
            tolerance: "intersect",
            zIndex: 1e3
        },
        _create: function () {
            var e = this.options;
            this.containerCache = {};
            this.element.addClass("ui-sortable");
            this.refresh();
            this.floating = this.items.length ? e.axis === "x" || /left|right/.test(this.items[0].item.css("float")) || /inline|table-cell/.test(this.items[0].item.css("display")) : false;
            this.offset = this.element.offset();
            this._mouseInit()
        },
        destroy: function () {
            this.element.removeClass("ui-sortable ui-sortable-disabled").removeData("sortable").unbind(".sortable");
            this._mouseDestroy();
            for (var e = this.items.length - 1; e >= 0; e--)this.items[e].item.removeData("sortable-item");
            return this
        },
        _setOption: function (t, n) {
            if (t === "disabled") {
                this.options[t] = n;
                this.widget()[n ? "addClass" : "removeClass"]("ui-sortable-disabled")
            } else e.Widget.prototype._setOption.apply(this, arguments)
        },
        _mouseCapture: function (t, n) {
            if (this.reverting)return false;
            if (this.options.disabled || this.options.type == "static")return false;
            this._refreshItems(t);
            var r = null, i = this;
            e(t.target).parents().each(function () {
                if (e.data(this, "sortable-item") == i) {
                    r = e(this);
                    return false
                }
            });
            if (e.data(t.target, "sortable-item") == i)r = e(t.target);
            if (!r)return false;
            if (this.options.handle && !n) {
                var s = false;
                e(this.options.handle, r).find("*").andSelf().each(function () {
                    if (this == t.target)s = true
                });
                if (!s)return false
            }
            this.currentItem = r;
            this._removeCurrentsFromItems();
            return true
        },
        _mouseStart: function (t, n, r) {
            n = this.options;
            var i = this;
            this.currentContainer = this;
            this.refreshPositions();
            this.helper = this._createHelper(t);
            this._cacheHelperProportions();
            this._cacheMargins();
            this.scrollParent = this.helper.scrollParent();
            this.offset = this.currentItem.offset();
            this.offset = {top: this.offset.top - this.margins.top, left: this.offset.left - this.margins.left};
            this.helper.css("position", "absolute");
            this.cssPosition = this.helper.css("position");
            e.extend(this.offset, {
                click: {left: t.pageX - this.offset.left, top: t.pageY - this.offset.top},
                parent: this._getParentOffset(),
                relative: this._getRelativeOffset()
            });
            this.originalPosition = this._generatePosition(t);
            this.originalPageX = t.pageX;
            this.originalPageY = t.pageY;
            n.cursorAt && this._adjustOffsetFromHelper(n.cursorAt);
            this.domPosition = {prev: this.currentItem.prev()[0], parent: this.currentItem.parent()[0]};
            this.helper[0] != this.currentItem[0] && this.currentItem.hide();
            this._createPlaceholder();
            n.containment && this._setContainment();
            if (n.cursor) {
                if (e("body").css("cursor"))this._storedCursor = e("body").css("cursor");
                e("body").css("cursor", n.cursor)
            }
            if (n.opacity) {
                if (this.helper.css("opacity"))this._storedOpacity = this.helper.css("opacity");
                this.helper.css("opacity", n.opacity)
            }
            if (n.zIndex) {
                if (this.helper.css("zIndex"))this._storedZIndex = this.helper.css("zIndex");
                this.helper.css("zIndex", n.zIndex)
            }
            if (this.scrollParent[0] != document && this.scrollParent[0].tagName != "HTML")this.overflowOffset = this.scrollParent.offset();
            this._trigger("start", t, this._uiHash());
            this._preserveHelperProportions || this._cacheHelperProportions();
            if (!r)for (r = this.containers.length - 1; r >= 0; r--)this.containers[r]._trigger("activate", t, i._uiHash(this));
            if (e.ui.ddmanager)e.ui.ddmanager.current = this;
            e.ui.ddmanager && !n.dropBehaviour && e.ui.ddmanager.prepareOffsets(this, t);
            this.dragging = true;
            this.helper.addClass("ui-sortable-helper");
            this._mouseDrag(t);
            return true
        },
        _mouseDrag: function (t) {
            this.position = this._generatePosition(t);
            this.positionAbs = this._convertPositionTo("absolute");
            if (!this.lastPositionAbs)this.lastPositionAbs = this.positionAbs;
            if (this.options.scroll) {
                var n = this.options, r = false;
                if (this.scrollParent[0] != document && this.scrollParent[0].tagName != "HTML") {
                    if (this.overflowOffset.top + this.scrollParent[0].offsetHeight - t.pageY < n.scrollSensitivity)this.scrollParent[0].scrollTop = r = this.scrollParent[0].scrollTop + n.scrollSpeed; else if (t.pageY - this.overflowOffset.top < n.scrollSensitivity)this.scrollParent[0].scrollTop = r = this.scrollParent[0].scrollTop - n.scrollSpeed;
                    if (this.overflowOffset.left + this.scrollParent[0].offsetWidth - t.pageX < n.scrollSensitivity)this.scrollParent[0].scrollLeft = r = this.scrollParent[0].scrollLeft + n.scrollSpeed; else if (t.pageX - this.overflowOffset.left < n.scrollSensitivity)this.scrollParent[0].scrollLeft = r = this.scrollParent[0].scrollLeft - n.scrollSpeed
                } else {
                    if (t.pageY - e(document).scrollTop() < n.scrollSensitivity)r = e(document).scrollTop(e(document).scrollTop() - n.scrollSpeed); else if (e(window).height() - (t.pageY - e(document).scrollTop()) < n.scrollSensitivity)r = e(document).scrollTop(e(document).scrollTop() + n.scrollSpeed);
                    if (t.pageX - e(document).scrollLeft() < n.scrollSensitivity)r = e(document).scrollLeft(e(document).scrollLeft() - n.scrollSpeed); else if (e(window).width() - (t.pageX - e(document).scrollLeft()) < n.scrollSensitivity)r = e(document).scrollLeft(e(document).scrollLeft() + n.scrollSpeed)
                }
                r !== false && e.ui.ddmanager && !n.dropBehaviour && e.ui.ddmanager.prepareOffsets(this, t)
            }
            this.positionAbs = this._convertPositionTo("absolute");
            if (!this.options.axis || this.options.axis != "y")this.helper[0].style.left = this.position.left + "px";
            if (!this.options.axis || this.options.axis != "x")this.helper[0].style.top = this.position.top + "px";
            for (n = this.items.length - 1; n >= 0; n--) {
                r = this.items[n];
                var i = r.item[0], s = this._intersectsWithPointer(r);
                if (s)if (i != this.currentItem[0] && this.placeholder[s == 1 ? "next" : "prev"]()[0] != i && !e.ui.contains(this.placeholder[0], i) && (this.options.type == "semi-dynamic" ? !e.ui.contains(this.element[0], i) : true)) {
                    this.direction = s == 1 ? "down" : "up";
                    if (this.options.tolerance == "pointer" || this._intersectsWithSides(r))this._rearrange(t, r); else break;
                    this._trigger("change", t, this._uiHash());
                    break
                }
            }
            this._contactContainers(t);
            e.ui.ddmanager && e.ui.ddmanager.drag(this, t);
            this._trigger("sort", t, this._uiHash());
            this.lastPositionAbs = this.positionAbs;
            return false
        },
        _mouseStop: function (t, n) {
            if (t) {
                e.ui.ddmanager && !this.options.dropBehaviour && e.ui.ddmanager.drop(this, t);
                if (this.options.revert) {
                    var r = this;
                    n = r.placeholder.offset();
                    r.reverting = true;
                    e(this.helper).animate({
                        left: n.left - this.offset.parent.left - r.margins.left + (this.offsetParent[0] == document.body ? 0 : this.offsetParent[0].scrollLeft),
                        top: n.top - this.offset.parent.top - r.margins.top + (this.offsetParent[0] == document.body ? 0 : this.offsetParent[0].scrollTop)
                    }, parseInt(this.options.revert, 10) || 500, function () {
                        r._clear(t)
                    })
                } else this._clear(t, n);
                return false
            }
        },
        cancel: function () {
            var t = this;
            if (this.dragging) {
                this._mouseUp({target: null});
                this.options.helper == "original" ? this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper") : this.currentItem.show();
                for (var n = this.containers.length - 1; n >= 0; n--) {
                    this.containers[n]._trigger("deactivate", null, t._uiHash(this));
                    if (this.containers[n].containerCache.over) {
                        this.containers[n]._trigger("out", null, t._uiHash(this));
                        this.containers[n].containerCache.over = 0
                    }
                }
            }
            if (this.placeholder) {
                this.placeholder[0].parentNode && this.placeholder[0].parentNode.removeChild(this.placeholder[0]);
                this.options.helper != "original" && this.helper && this.helper[0].parentNode && this.helper.remove();
                e.extend(this, {helper: null, dragging: false, reverting: false, _noFinalSort: null});
                this.domPosition.prev ? e(this.domPosition.prev).after(this.currentItem) : e(this.domPosition.parent).prepend(this.currentItem)
            }
            return this
        },
        serialize: function (t) {
            var n = this._getItemsAsjQuery(t && t.connected), r = [];
            t = t || {};
            e(n).each(function () {
                var n = (e(t.item || this).attr(t.attribute || "id") || "").match(t.expression || /(.+)[-=_](.+)/);
                if (n)r.push((t.key || n[1] + "[]") + "=" + (t.key && t.expression ? n[1] : n[2]))
            });
            !r.length && t.key && r.push(t.key + "=");
            return r.join("&")
        },
        toArray: function (t) {
            var n = this._getItemsAsjQuery(t && t.connected), r = [];
            t = t || {};
            n.each(function () {
                r.push(e(t.item || this).attr(t.attribute || "id") || "")
            });
            return r
        },
        _intersectsWith: function (e) {
            var t = this.positionAbs.left, n = t + this.helperProportions.width, r = this.positionAbs.top, i = r + this.helperProportions.height, s = e.left, o = s + e.width, u = e.top, a = u + e.height, f = this.offset.click.top, l = this.offset.click.left;
            f = r + f > u && r + f < a && t + l > s && t + l < o;
            return this.options.tolerance == "pointer" || this.options.forcePointerForContainers || this.options.tolerance != "pointer" && this.helperProportions[this.floating ? "width" : "height"] > e[this.floating ? "width" : "height"] ? f : s < t + this.helperProportions.width / 2 && n - this.helperProportions.width / 2 < o && u < r + this.helperProportions.height / 2 && i - this.helperProportions.height / 2 < a
        },
        _intersectsWithPointer: function (t) {
            var n = e.ui.isOverAxis(this.positionAbs.top + this.offset.click.top, t.top, t.height);
            t = e.ui.isOverAxis(this.positionAbs.left + this.offset.click.left, t.left, t.width);
            n = n && t;
            t = this._getDragVerticalDirection();
            var r = this._getDragHorizontalDirection();
            if (!n)return false;
            return this.floating ? r && r == "right" || t == "down" ? 2 : 1 : t && (t == "down" ? 2 : 1)
        },
        _intersectsWithSides: function (t) {
            var n = e.ui.isOverAxis(this.positionAbs.top + this.offset.click.top, t.top + t.height / 2, t.height);
            t = e.ui.isOverAxis(this.positionAbs.left + this.offset.click.left, t.left + t.width / 2, t.width);
            var r = this._getDragVerticalDirection(), i = this._getDragHorizontalDirection();
            return this.floating && i ? i == "right" && t || i == "left" && !t : r && (r == "down" && n || r == "up" && !n)
        },
        _getDragVerticalDirection: function () {
            var e = this.positionAbs.top - this.lastPositionAbs.top;
            return e != 0 && (e > 0 ? "down" : "up")
        },
        _getDragHorizontalDirection: function () {
            var e = this.positionAbs.left - this.lastPositionAbs.left;
            return e != 0 && (e > 0 ? "right" : "left")
        },
        refresh: function (e) {
            this._refreshItems(e);
            this.refreshPositions();
            return this
        },
        _connectWith: function () {
            var e = this.options;
            return e.connectWith.constructor == String ? [e.connectWith] : e.connectWith
        },
        _getItemsAsjQuery: function (t) {
            var n = [], r = [], i = this._connectWith();
            if (i && t)for (t = i.length - 1; t >= 0; t--)for (var s = e(i[t]), o = s.length - 1; o >= 0; o--) {
                var u = e.data(s[o], "sortable");
                if (u && u != this && !u.options.disabled)r.push([e.isFunction(u.options.items) ? u.options.items.call(u.element) : e(u.options.items, u.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), u])
            }
            r.push([e.isFunction(this.options.items) ? this.options.items.call(this.element, null, {
                options: this.options,
                item: this.currentItem
            }) : e(this.options.items, this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), this]);
            for (t = r.length - 1; t >= 0; t--)r[t][0].each(function () {
                n.push(this)
            });
            return e(n)
        },
        _removeCurrentsFromItems: function () {
            for (var e = this.currentItem.find(":data(sortable-item)"), t = 0; t < this.items.length; t++)for (var n = 0; n < e.length; n++)e[n] == this.items[t].item[0] && this.items.splice(t, 1)
        },
        _refreshItems: function (t) {
            this.items = [];
            this.containers = [this];
            var n = this.items, r = [[e.isFunction(this.options.items) ? this.options.items.call(this.element[0], t, {item: this.currentItem}) : e(this.options.items, this.element), this]], i = this._connectWith();
            if (i)for (var s = i.length - 1; s >= 0; s--)for (var o = e(i[s]), u = o.length - 1; u >= 0; u--) {
                var a = e.data(o[u], "sortable");
                if (a && a != this && !a.options.disabled) {
                    r.push([e.isFunction(a.options.items) ? a.options.items.call(a.element[0], t, {item: this.currentItem}) : e(a.options.items, a.element), a]);
                    this.containers.push(a)
                }
            }
            for (s = r.length - 1; s >= 0; s--) {
                t = r[s][1];
                i = r[s][0];
                u = 0;
                for (o = i.length; u < o; u++) {
                    a = e(i[u]);
                    a.data("sortable-item", t);
                    n.push({item: a, instance: t, width: 0, height: 0, left: 0, top: 0})
                }
            }
        },
        refreshPositions: function (t) {
            if (this.offsetParent && this.helper)this.offset.parent = this._getParentOffset();
            for (var n = this.items.length - 1; n >= 0; n--) {
                var r = this.items[n];
                if (!(r.instance != this.currentContainer && this.currentContainer && r.item[0] != this.currentItem[0])) {
                    var i = this.options.toleranceElement ? e(this.options.toleranceElement, r.item) : r.item;
                    if (!t) {
                        r.width = i.outerWidth();
                        r.height = i.outerHeight()
                    }
                    i = i.offset();
                    r.left = i.left;
                    r.top = i.top
                }
            }
            if (this.options.custom && this.options.custom.refreshContainers)this.options.custom.refreshContainers.call(this); else for (n = this.containers.length - 1; n >= 0; n--) {
                i = this.containers[n].element.offset();
                this.containers[n].containerCache.left = i.left;
                this.containers[n].containerCache.top = i.top;
                this.containers[n].containerCache.width = this.containers[n].element.outerWidth();
                this.containers[n].containerCache.height = this.containers[n].element.outerHeight()
            }
            return this
        },
        _createPlaceholder: function (t) {
            var n = t || this, r = n.options;
            if (!r.placeholder || r.placeholder.constructor == String) {
                var i = r.placeholder;
                r.placeholder = {
                    element: function () {
                        var t = e(document.createElement(n.currentItem[0].nodeName)).addClass(i || n.currentItem[0].className + " ui-sortable-placeholder").removeClass("ui-sortable-helper")[0];
                        if (!i)t.style.visibility = "hidden";
                        return t
                    }, update: function (e, t) {
                        if (!(i && !r.forcePlaceholderSize)) {
                            t.height() || t.height(n.currentItem.innerHeight() - parseInt(n.currentItem.css("paddingTop") || 0, 10) - parseInt(n.currentItem.css("paddingBottom") || 0, 10));
                            t.width() || t.width(n.currentItem.innerWidth() - parseInt(n.currentItem.css("paddingLeft") || 0, 10) - parseInt(n.currentItem.css("paddingRight") || 0, 10))
                        }
                    }
                }
            }
            n.placeholder = e(r.placeholder.element.call(n.element, n.currentItem));
            n.currentItem.after(n.placeholder);
            r.placeholder.update(n, n.placeholder)
        },
        _contactContainers: function (t) {
            for (var n = null, r = null, i = this.containers.length - 1; i >= 0; i--)if (!e.ui.contains(this.currentItem[0], this.containers[i].element[0]))if (this._intersectsWith(this.containers[i].containerCache)) {
                if (!(n && e.ui.contains(this.containers[i].element[0], n.element[0]))) {
                    n = this.containers[i];
                    r = i
                }
            } else if (this.containers[i].containerCache.over) {
                this.containers[i]._trigger("out", t, this._uiHash(this));
                this.containers[i].containerCache.over = 0
            }
            if (n)if (this.containers.length === 1) {
                this.containers[r]._trigger("over", t, this._uiHash(this));
                this.containers[r].containerCache.over = 1
            } else if (this.currentContainer != this.containers[r]) {
                n = 1e4;
                i = null;
                for (var s = this.positionAbs[this.containers[r].floating ? "left" : "top"], o = this.items.length - 1; o >= 0; o--)if (e.ui.contains(this.containers[r].element[0], this.items[o].item[0])) {
                    var u = this.items[o][this.containers[r].floating ? "left" : "top"];
                    if (Math.abs(u - s) < n) {
                        n = Math.abs(u - s);
                        i = this.items[o]
                    }
                }
                if (i || this.options.dropOnEmpty) {
                    this.currentContainer = this.containers[r];
                    i ? this._rearrange(t, i, null, true) : this._rearrange(t, null, this.containers[r].element, true);
                    this._trigger("change", t, this._uiHash());
                    this.containers[r]._trigger("change", t, this._uiHash(this));
                    this.options.placeholder.update(this.currentContainer, this.placeholder);
                    this.containers[r]._trigger("over", t, this._uiHash(this));
                    this.containers[r].containerCache.over = 1
                }
            }
        },
        _createHelper: function (t) {
            var n = this.options;
            t = e.isFunction(n.helper) ? e(n.helper.apply(this.element[0], [t, this.currentItem])) : n.helper == "clone" ? this.currentItem.clone() : this.currentItem;
            t.parents("body").length || e(n.appendTo != "parent" ? n.appendTo : this.currentItem[0].parentNode)[0].appendChild(t[0]);
            if (t[0] == this.currentItem[0])this._storedCSS = {
                width: this.currentItem[0].style.width,
                height: this.currentItem[0].style.height,
                position: this.currentItem.css("position"),
                top: this.currentItem.css("top"),
                left: this.currentItem.css("left")
            };
            if (t[0].style.width == "" || n.forceHelperSize)t.width(this.currentItem.width());
            if (t[0].style.height == "" || n.forceHelperSize)t.height(this.currentItem.height());
            return t
        },
        _adjustOffsetFromHelper: function (t) {
            if (typeof t == "string")t = t.split(" ");
            if (e.isArray(t))t = {left: +t[0], top: +t[1] || 0};
            if ("left" in t)this.offset.click.left = t.left + this.margins.left;
            if ("right" in t)this.offset.click.left = this.helperProportions.width - t.right + this.margins.left;
            if ("top" in t)this.offset.click.top = t.top + this.margins.top;
            if ("bottom" in t)this.offset.click.top = this.helperProportions.height - t.bottom + this.margins.top
        },
        _getParentOffset: function () {
            this.offsetParent = this.helper.offsetParent();
            var t = this.offsetParent.offset();
            if (this.cssPosition == "absolute" && this.scrollParent[0] != document && e.ui.contains(this.scrollParent[0], this.offsetParent[0])) {
                t.left += this.scrollParent.scrollLeft();
                t.top += this.scrollParent.scrollTop()
            }
            if (this.offsetParent[0] == document.body || this.offsetParent[0].tagName && this.offsetParent[0].tagName.toLowerCase() == "html" && e.browser.msie)t = {
                top: 0,
                left: 0
            };
            return {
                top: t.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
                left: t.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
            }
        },
        _getRelativeOffset: function () {
            if (this.cssPosition == "relative") {
                var e = this.currentItem.position();
                return {
                    top: e.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),
                    left: e.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()
                }
            } else return {top: 0, left: 0}
        },
        _cacheMargins: function () {
            this.margins = {
                left: parseInt(this.currentItem.css("marginLeft"), 10) || 0,
                top: parseInt(this.currentItem.css("marginTop"), 10) || 0
            }
        },
        _cacheHelperProportions: function () {
            this.helperProportions = {width: this.helper.outerWidth(), height: this.helper.outerHeight()}
        },
        _setContainment: function () {
            var t = this.options;
            if (t.containment == "parent")t.containment = this.helper[0].parentNode;
            if (t.containment == "document" || t.containment == "window")this.containment = [0 - this.offset.relative.left - this.offset.parent.left, 0 - this.offset.relative.top - this.offset.parent.top, e(t.containment == "document" ? document : window).width() - this.helperProportions.width - this.margins.left, (e(t.containment == "document" ? document : window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top];
            if (!/^(document|window|parent)$/.test(t.containment)) {
                var n = e(t.containment)[0];
                t = e(t.containment).offset();
                var r = e(n).css("overflow") != "hidden";
                this.containment = [t.left + (parseInt(e(n).css("borderLeftWidth"), 10) || 0) + (parseInt(e(n).css("paddingLeft"), 10) || 0) - this.margins.left, t.top + (parseInt(e(n).css("borderTopWidth"), 10) || 0) + (parseInt(e(n).css("paddingTop"), 10) || 0) - this.margins.top, t.left + (r ? Math.max(n.scrollWidth, n.offsetWidth) : n.offsetWidth) - (parseInt(e(n).css("borderLeftWidth"), 10) || 0) - (parseInt(e(n).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left, t.top + (r ? Math.max(n.scrollHeight, n.offsetHeight) : n.offsetHeight) - (parseInt(e(n).css("borderTopWidth"), 10) || 0) - (parseInt(e(n).css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top]
            }
        },
        _convertPositionTo: function (t, n) {
            if (!n)n = this.position;
            t = t == "absolute" ? 1 : -1;
            var r = this.cssPosition == "absolute" && !(this.scrollParent[0] != document && e.ui.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent, i = /(html|body)/i.test(r[0].tagName);
            return {
                top: n.top + this.offset.relative.top * t + this.offset.parent.top * t - (e.browser.safari && this.cssPosition == "fixed" ? 0 : (this.cssPosition == "fixed" ? -this.scrollParent.scrollTop() : i ? 0 : r.scrollTop()) * t),
                left: n.left + this.offset.relative.left * t + this.offset.parent.left * t - (e.browser.safari && this.cssPosition == "fixed" ? 0 : (this.cssPosition == "fixed" ? -this.scrollParent.scrollLeft() : i ? 0 : r.scrollLeft()) * t)
            }
        },
        _generatePosition: function (t) {
            var n = this.options, r = this.cssPosition == "absolute" && !(this.scrollParent[0] != document && e.ui.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent, i = /(html|body)/i.test(r[0].tagName);
            if (this.cssPosition == "relative" && !(this.scrollParent[0] != document && this.scrollParent[0] != this.offsetParent[0]))this.offset.relative = this._getRelativeOffset();
            var s = t.pageX, o = t.pageY;
            if (this.originalPosition) {
                if (this.containment) {
                    if (t.pageX - this.offset.click.left < this.containment[0])s = this.containment[0] + this.offset.click.left;
                    if (t.pageY - this.offset.click.top < this.containment[1])o = this.containment[1] + this.offset.click.top;
                    if (t.pageX - this.offset.click.left > this.containment[2])s = this.containment[2] + this.offset.click.left;
                    if (t.pageY - this.offset.click.top > this.containment[3])o = this.containment[3] + this.offset.click.top
                }
                if (n.grid) {
                    o = this.originalPageY + Math.round((o - this.originalPageY) / n.grid[1]) * n.grid[1];
                    o = this.containment ? !(o - this.offset.click.top < this.containment[1] || o - this.offset.click.top > this.containment[3]) ? o : !(o - this.offset.click.top < this.containment[1]) ? o - n.grid[1] : o + n.grid[1] : o;
                    s = this.originalPageX + Math.round((s - this.originalPageX) / n.grid[0]) * n.grid[0];
                    s = this.containment ? !(s - this.offset.click.left < this.containment[0] || s - this.offset.click.left > this.containment[2]) ? s : !(s - this.offset.click.left < this.containment[0]) ? s - n.grid[0] : s + n.grid[0] : s
                }
            }
            return {
                top: o - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + (e.browser.safari && this.cssPosition == "fixed" ? 0 : this.cssPosition == "fixed" ? -this.scrollParent.scrollTop() : i ? 0 : r.scrollTop()),
                left: s - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + (e.browser.safari && this.cssPosition == "fixed" ? 0 : this.cssPosition == "fixed" ? -this.scrollParent.scrollLeft() : i ? 0 : r.scrollLeft())
            }
        },
        _rearrange: function (e, t, n, r) {
            n ? n[0].appendChild(this.placeholder[0]) : t.item[0].parentNode.insertBefore(this.placeholder[0], this.direction == "down" ? t.item[0] : t.item[0].nextSibling);
            this.counter = this.counter ? ++this.counter : 1;
            var i = this, s = this.counter;
            window.setTimeout(function () {
                s == i.counter && i.refreshPositions(!r)
            }, 0)
        },
        _clear: function (t, n) {
            this.reverting = false;
            var r = [];
            !this._noFinalSort && this.currentItem.parent().length && this.placeholder.before(this.currentItem);
            this._noFinalSort = null;
            if (this.helper[0] == this.currentItem[0]) {
                for (var i in this._storedCSS)if (this._storedCSS[i] == "auto" || this._storedCSS[i] == "static")this._storedCSS[i] = "";
                this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper")
            } else this.currentItem.show();
            this.fromOutside && !n && r.push(function (e) {
                this._trigger("receive", e, this._uiHash(this.fromOutside))
            });
            if ((this.fromOutside || this.domPosition.prev != this.currentItem.prev().not(".ui-sortable-helper")[0] || this.domPosition.parent != this.currentItem.parent()[0]) && !n)r.push(function (e) {
                this._trigger("update", e, this._uiHash())
            });
            if (!e.ui.contains(this.element[0], this.currentItem[0])) {
                n || r.push(function (e) {
                    this._trigger("remove", e, this._uiHash())
                });
                for (i = this.containers.length - 1; i >= 0; i--)if (e.ui.contains(this.containers[i].element[0], this.currentItem[0]) && !n) {
                    r.push(function (e) {
                        return function (t) {
                            e._trigger("receive", t, this._uiHash(this))
                        }
                    }.call(this, this.containers[i]));
                    r.push(function (e) {
                        return function (t) {
                            e._trigger("update", t, this._uiHash(this))
                        }
                    }.call(this, this.containers[i]))
                }
            }
            for (i = this.containers.length - 1; i >= 0; i--) {
                n || r.push(function (e) {
                    return function (t) {
                        e._trigger("deactivate", t, this._uiHash(this))
                    }
                }.call(this, this.containers[i]));
                if (this.containers[i].containerCache.over) {
                    r.push(function (e) {
                        return function (t) {
                            e._trigger("out", t, this._uiHash(this))
                        }
                    }.call(this, this.containers[i]));
                    this.containers[i].containerCache.over = 0
                }
            }
            this._storedCursor && e("body").css("cursor", this._storedCursor);
            this._storedOpacity && this.helper.css("opacity", this._storedOpacity);
            if (this._storedZIndex)this.helper.css("zIndex", this._storedZIndex == "auto" ? "" : this._storedZIndex);
            this.dragging = false;
            if (this.cancelHelperRemoval) {
                if (!n) {
                    this._trigger("beforeStop", t, this._uiHash());
                    for (i = 0; i < r.length; i++)r[i].call(this, t);
                    this._trigger("stop", t, this._uiHash())
                }
                return false
            }
            n || this._trigger("beforeStop", t, this._uiHash());
            this.placeholder[0].parentNode.removeChild(this.placeholder[0]);
            this.helper[0] != this.currentItem[0] && this.helper.remove();
            this.helper = null;
            if (!n) {
                for (i = 0; i < r.length; i++)r[i].call(this, t);
                this._trigger("stop", t, this._uiHash())
            }
            this.fromOutside = false;
            return true
        },
        _trigger: function () {
            e.Widget.prototype._trigger.apply(this, arguments) === false && this.cancel()
        },
        _uiHash: function (t) {
            var n = t || this;
            return {
                helper: n.helper,
                placeholder: n.placeholder || e([]),
                position: n.position,
                originalPosition: n.originalPosition,
                offset: n.positionAbs,
                item: n.currentItem,
                sender: t ? t.element : null
            }
        }
    });
    e.extend(e.ui.sortable, {version: "1.8.16"})
})(jQuery);
(function (e) {
    e.widget("ui.accordion", {
        options: {
            active: 0,
            animated: "slide",
            autoHeight: true,
            clearStyle: false,
            collapsible: false,
            event: "click",
            fillSpace: false,
            header: "> li > :first-child,> :not(li):even",
            icons: {header: "ui-icon-triangle-1-e", headerSelected: "ui-icon-triangle-1-s"},
            navigation: false,
            navigationFilter: function () {
                return this.href.toLowerCase() === location.href.toLowerCase()
            }
        }, _create: function () {
            var t = this, n = t.options;
            t.running = 0;
            t.element.addClass("ui-accordion ui-widget ui-helper-reset").children("li").addClass("ui-accordion-li-fix");
            t.headers = t.element.find(n.header).addClass("ui-accordion-header ui-helper-reset ui-state-default ui-corner-all").bind("mouseenter.accordion", function () {
                n.disabled || e(this).addClass("ui-state-hover")
            }).bind("mouseleave.accordion", function () {
                n.disabled || e(this).removeClass("ui-state-hover")
            }).bind("focus.accordion", function () {
                n.disabled || e(this).addClass("ui-state-focus")
            }).bind("blur.accordion", function () {
                n.disabled || e(this).removeClass("ui-state-focus")
            });
            t.headers.next().addClass("ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom");
            if (n.navigation) {
                var r = t.element.find("a").filter(n.navigationFilter).eq(0);
                if (r.length) {
                    var i = r.closest(".ui-accordion-header");
                    t.active = i.length ? i : r.closest(".ui-accordion-content").prev()
                }
            }
            t.active = t._findActive(t.active || n.active).addClass("ui-state-default ui-state-active").toggleClass("ui-corner-all").toggleClass("ui-corner-top");
            t.active.next().addClass("ui-accordion-content-active");
            t._createIcons();
            t.resize();
            t.element.attr("role", "tablist");
            t.headers.attr("role", "tab").bind("keydown.accordion", function (e) {
                return t._keydown(e)
            }).next().attr("role", "tabpanel");
            t.headers.not(t.active || "").attr({
                "aria-expanded": "false",
                "aria-selected": "false",
                tabIndex: -1
            }).next().hide();
            t.active.length ? t.active.attr({
                "aria-expanded": "true",
                "aria-selected": "true",
                tabIndex: 0
            }) : t.headers.eq(0).attr("tabIndex", 0);
            e.browser.safari || t.headers.find("a").attr("tabIndex", -1);
            n.event && t.headers.bind(n.event.split(" ").join(".accordion ") + ".accordion", function (e) {
                t._clickHandler.call(t, e, this);
                e.preventDefault()
            })
        }, _createIcons: function () {
            var t = this.options;
            if (t.icons) {
                e("<span></span>").addClass("ui-icon " + t.icons.header).prependTo(this.headers);
                this.active.children(".ui-icon").toggleClass(t.icons.header).toggleClass(t.icons.headerSelected);
                this.element.addClass("ui-accordion-icons")
            }
        }, _destroyIcons: function () {
            this.headers.children(".ui-icon").remove();
            this.element.removeClass("ui-accordion-icons")
        }, destroy: function () {
            var t = this.options;
            this.element.removeClass("ui-accordion ui-widget ui-helper-reset").removeAttr("role");
            this.headers.unbind(".accordion").removeClass("ui-accordion-header ui-accordion-disabled ui-helper-reset ui-state-default ui-corner-all ui-state-active ui-state-disabled ui-corner-top").removeAttr("role").removeAttr("aria-expanded").removeAttr("aria-selected").removeAttr("tabIndex");
            this.headers.find("a").removeAttr("tabIndex");
            this._destroyIcons();
            var n = this.headers.next().css("display", "").removeAttr("role").removeClass("ui-helper-reset ui-widget-content ui-corner-bottom ui-accordion-content ui-accordion-content-active ui-accordion-disabled ui-state-disabled");
            if (t.autoHeight || t.fillHeight)n.css("height", "");
            return e.Widget.prototype.destroy.call(this)
        }, _setOption: function (t, n) {
            e.Widget.prototype._setOption.apply(this, arguments);
            t == "active" && this.activate(n);
            if (t == "icons") {
                this._destroyIcons();
                n && this._createIcons()
            }
            if (t == "disabled")this.headers.add(this.headers.next())[n ? "addClass" : "removeClass"]("ui-accordion-disabled ui-state-disabled")
        }, _keydown: function (t) {
            if (!(this.options.disabled || t.altKey || t.ctrlKey)) {
                var n = e.ui.keyCode, r = this.headers.length, i = this.headers.index(t.target), s = false;
                switch (t.keyCode) {
                    case n.RIGHT:
                    case n.DOWN:
                        s = this.headers[(i + 1) % r];
                        break;
                    case n.LEFT:
                    case n.UP:
                        s = this.headers[(i - 1 + r) % r];
                        break;
                    case n.SPACE:
                    case n.ENTER:
                        this._clickHandler({target: t.target}, t.target);
                        t.preventDefault()
                }
                if (s) {
                    e(t.target).attr("tabIndex", -1);
                    e(s).attr("tabIndex", 0);
                    s.focus();
                    return false
                }
                return true
            }
        }, resize: function () {
            var t = this.options, n;
            if (t.fillSpace) {
                if (e.browser.msie) {
                    var r = this.element.parent().css("overflow");
                    this.element.parent().css("overflow", "hidden")
                }
                n = this.element.parent().height();
                e.browser.msie && this.element.parent().css("overflow", r);
                this.headers.each(function () {
                    n -= e(this).outerHeight(true)
                });
                this.headers.next().each(function () {
                    e(this).height(Math.max(0, n - e(this).innerHeight() + e(this).height()))
                }).css("overflow", "auto")
            } else if (t.autoHeight) {
                n = 0;
                this.headers.next().each(function () {
                    n = Math.max(n, e(this).height("").height())
                }).height(n)
            }
            return this
        }, activate: function (e) {
            this.options.active = e;
            e = this._findActive(e)[0];
            this._clickHandler({target: e}, e);
            return this
        }, _findActive: function (t) {
            return t ? typeof t === "number" ? this.headers.filter(":eq(" + t + ")") : this.headers.not(this.headers.not(t)) : t === false ? e([]) : this.headers.filter(":eq(0)")
        }, _clickHandler: function (t, n) {
            var r = this.options;
            if (!r.disabled)if (t.target) {
                t = e(t.currentTarget || n);
                n = t[0] === this.active[0];
                r.active = r.collapsible && n ? false : this.headers.index(t);
                if (!(this.running || !r.collapsible && n)) {
                    var i = this.active;
                    a = t.next();
                    o = this.active.next();
                    u = {
                        options: r,
                        newHeader: n && r.collapsible ? e([]) : t,
                        oldHeader: this.active,
                        newContent: n && r.collapsible ? e([]) : a,
                        oldContent: o
                    };
                    var s = this.headers.index(this.active[0]) > this.headers.index(t[0]);
                    this.active = n ? e([]) : t;
                    this._toggle(a, o, u, n, s);
                    i.removeClass("ui-state-active ui-corner-top").addClass("ui-state-default ui-corner-all").children(".ui-icon").removeClass(r.icons.headerSelected).addClass(r.icons.header);
                    if (!n) {
                        t.removeClass("ui-state-default ui-corner-all").addClass("ui-state-active ui-corner-top").children(".ui-icon").removeClass(r.icons.header).addClass(r.icons.headerSelected);
                        t.next().addClass("ui-accordion-content-active")
                    }
                }
            } else if (r.collapsible) {
                this.active.removeClass("ui-state-active ui-corner-top").addClass("ui-state-default ui-corner-all").children(".ui-icon").removeClass(r.icons.headerSelected).addClass(r.icons.header);
                this.active.next().addClass("ui-accordion-content-active");
                var o = this.active.next(), u = {
                    options: r,
                    newHeader: e([]),
                    oldHeader: r.active,
                    newContent: e([]),
                    oldContent: o
                }, a = this.active = e([]);
                this._toggle(a, o, u)
            }
        }, _toggle: function (t, n, r, i, s) {
            var o = this, u = o.options;
            o.toShow = t;
            o.toHide = n;
            o.data = r;
            var a = function () {
                if (o)return o._completed.apply(o, arguments)
            };
            o._trigger("changestart", null, o.data);
            o.running = n.size() === 0 ? t.size() : n.size();
            if (u.animated) {
                r = {};
                r = u.collapsible && i ? {
                    toShow: e([]),
                    toHide: n,
                    complete: a,
                    down: s,
                    autoHeight: u.autoHeight || u.fillSpace
                } : {toShow: t, toHide: n, complete: a, down: s, autoHeight: u.autoHeight || u.fillSpace};
                if (!u.proxied)u.proxied = u.animated;
                if (!u.proxiedDuration)u.proxiedDuration = u.duration;
                u.animated = e.isFunction(u.proxied) ? u.proxied(r) : u.proxied;
                u.duration = e.isFunction(u.proxiedDuration) ? u.proxiedDuration(r) : u.proxiedDuration;
                i = e.ui.accordion.animations;
                var f = u.duration, l = u.animated;
                if (l && !i[l] && !e.easing[l])l = "slide";
                i[l] || (i[l] = function (e) {
                    this.slide(e, {easing: l, duration: f || 700})
                });
                i[l](r)
            } else {
                if (u.collapsible && i)t.toggle(); else {
                    n.hide();
                    t.show()
                }
                a(true)
            }
            n.prev().attr({"aria-expanded": "false", "aria-selected": "false", tabIndex: -1}).blur();
            t.prev().attr({"aria-expanded": "true", "aria-selected": "true", tabIndex: 0}).focus()
        }, _completed: function (e) {
            this.running = e ? 0 : --this.running;
            if (!this.running) {
                this.options.clearStyle && this.toShow.add(this.toHide).css({height: "", overflow: ""});
                this.toHide.removeClass("ui-accordion-content-active");
                if (this.toHide.length)this.toHide.parent()[0].className = this.toHide.parent()[0].className;
                this._trigger("change", null, this.data)
            }
        }
    });
    e.extend(e.ui.accordion, {
        version: "1.8.16", animations: {
            slide: function (t, n) {
                t = e.extend({easing: "swing", duration: 300}, t, n);
                if (t.toHide.size())if (t.toShow.size()) {
                    var r = t.toShow.css("overflow"), i = 0, s = {}, o = {}, u;
                    n = t.toShow;
                    u = n[0].style.width;
                    n.width(parseInt(n.parent().width(), 10) - parseInt(n.css("paddingLeft"), 10) - parseInt(n.css("paddingRight"), 10) - (parseInt(n.css("borderLeftWidth"), 10) || 0) - (parseInt(n.css("borderRightWidth"), 10) || 0));
                    e.each(["height", "paddingTop", "paddingBottom"], function (n, r) {
                        o[r] = "hide";
                        n = ("" + e.css(t.toShow[0], r)).match(/^([\d+-.]+)(.*)$/);
                        s[r] = {value: n[1], unit: n[2] || "px"}
                    });
                    t.toShow.css({height: 0, overflow: "hidden"}).show();
                    t.toHide.filter(":hidden").each(t.complete).end().filter(":visible").animate(o, {
                        step: function (e, n) {
                            if (n.prop == "height")i = n.end - n.start === 0 ? 0 : (n.now - n.start) / (n.end - n.start);
                            t.toShow[0].style[n.prop] = i * s[n.prop].value + s[n.prop].unit
                        }, duration: t.duration, easing: t.easing, complete: function () {
                            t.autoHeight || t.toShow.css("height", "");
                            t.toShow.css({width: u, overflow: r});
                            t.complete()
                        }
                    })
                } else t.toHide.animate({
                    height: "hide",
                    paddingTop: "hide",
                    paddingBottom: "hide"
                }, t); else t.toShow.animate({height: "show", paddingTop: "show", paddingBottom: "show"}, t)
            }, bounceslide: function (e) {
                this.slide(e, {easing: e.down ? "easeOutBounce" : "swing", duration: e.down ? 1e3 : 200})
            }
        }
    })
})(jQuery);
(function (e) {
    var t = 0;
    e.widget("ui.autocomplete", {
        options: {
            appendTo: "body",
            autoFocus: false,
            delay: 300,
            minLength: 1,
            position: {my: "left top", at: "left bottom", collision: "none"},
            source: null
        }, pending: 0, _create: function () {
            var t = this, n = this.element[0].ownerDocument, r;
            this.element.addClass("ui-autocomplete-input").attr("autocomplete", "off").attr({
                role: "textbox",
                "aria-autocomplete": "list",
                "aria-haspopup": "true"
            }).bind("keydown.autocomplete", function (n) {
                if (!(t.options.disabled || t.element.propAttr("readOnly"))) {
                    r = false;
                    var i = e.ui.keyCode;
                    switch (n.keyCode) {
                        case i.PAGE_UP:
                            t._move("previousPage", n);
                            break;
                        case i.PAGE_DOWN:
                            t._move("nextPage", n);
                            break;
                        case i.UP:
                            t._move("previous", n);
                            n.preventDefault();
                            break;
                        case i.DOWN:
                            t._move("next", n);
                            n.preventDefault();
                            break;
                        case i.ENTER:
                        case i.NUMPAD_ENTER:
                            if (t.menu.active) {
                                r = true;
                                n.preventDefault()
                            }
                            ;
                        case i.TAB:
                            if (!t.menu.active)return;
                            t.menu.select(n);
                            break;
                        case i.ESCAPE:
                            t.element.val(t.term);
                            t.close(n);
                            break;
                        default:
                            clearTimeout(t.searching);
                            t.searching = setTimeout(function () {
                                if (t.term != t.element.val()) {
                                    t.selectedItem = null;
                                    t.search(null, n)
                                }
                            }, t.options.delay);
                            break
                    }
                }
            }).bind("keypress.autocomplete", function (e) {
                if (r) {
                    r = false;
                    e.preventDefault()
                }
            }).bind("focus.autocomplete", function () {
                if (!t.options.disabled) {
                    t.selectedItem = null;
                    t.previous = t.element.val()
                }
            }).bind("blur.autocomplete", function (e) {
                if (!t.options.disabled) {
                    clearTimeout(t.searching);
                    t.closing = setTimeout(function () {
                        t.close(e);
                        t._change(e)
                    }, 150)
                }
            });
            this._initSource();
            this.response = function () {
                return t._response.apply(t, arguments)
            };
            this.menu = e("<ul></ul>").addClass("ui-autocomplete").appendTo(e(this.options.appendTo || "body", n)[0]).mousedown(function (n) {
                var r = t.menu.element[0];
                e(n.target).closest(".ui-menu-item").length || setTimeout(function () {
                    e(document).one("mousedown", function (n) {
                        n.target !== t.element[0] && n.target !== r && !e.ui.contains(r, n.target) && t.close()
                    })
                }, 1);
                setTimeout(function () {
                    clearTimeout(t.closing)
                }, 13)
            }).menu({
                focus: function (e, n) {
                    n = n.item.data("item.autocomplete");
                    false !== t._trigger("focus", e, {item: n}) && /^key/.test(e.originalEvent.type) && t.element.val(n.value)
                }, selected: function (e, r) {
                    var i = r.item.data("item.autocomplete"), s = t.previous;
                    if (t.element[0] !== n.activeElement) {
                        t.element.focus();
                        t.previous = s;
                        setTimeout(function () {
                            t.previous = s;
                            t.selectedItem = i
                        }, 1)
                    }
                    false !== t._trigger("select", e, {item: i}) && t.element.val(i.value);
                    t.term = t.element.val();
                    t.close(e);
                    t.selectedItem = i
                }, blur: function () {
                    t.menu.element.is(":visible") && t.element.val() !== t.term && t.element.val(t.term)
                }
            }).zIndex(this.element.zIndex() + 1).css({top: 0, left: 0}).hide().data("menu");
            e.fn.bgiframe && this.menu.element.bgiframe()
        }, destroy: function () {
            this.element.removeClass("ui-autocomplete-input").removeAttr("autocomplete").removeAttr("role").removeAttr("aria-autocomplete").removeAttr("aria-haspopup");
            this.menu.element.remove();
            e.Widget.prototype.destroy.call(this)
        }, _setOption: function (t, n) {
            e.Widget.prototype._setOption.apply(this, arguments);
            t === "source" && this._initSource();
            if (t === "appendTo")this.menu.element.appendTo(e(n || "body", this.element[0].ownerDocument)[0]);
            t === "disabled" && n && this.xhr && this.xhr.abort()
        }, _initSource: function () {
            var n = this, r, i;
            if (e.isArray(this.options.source)) {
                r = this.options.source;
                this.source = function (t, n) {
                    n(e.ui.autocomplete.filter(r, t.term))
                }
            } else if (typeof this.options.source === "string") {
                i = this.options.source;
                this.source = function (r, s) {
                    n.xhr && n.xhr.abort();
                    n.xhr = e.ajax({
                        url: i, data: r, dataType: "json", autocompleteRequest: ++t, success: function (e) {
                            this.autocompleteRequest === t && s(e)
                        }, error: function () {
                            this.autocompleteRequest === t && s([])
                        }
                    })
                }
            } else this.source = this.options.source
        }, search: function (e, t) {
            e = e != null ? e : this.element.val();
            this.term = this.element.val();
            if (e.length < this.options.minLength)return this.close(t);
            clearTimeout(this.closing);
            if (this._trigger("search", t) !== false)return this._search(e)
        }, _search: function (e) {
            this.pending++;
            this.element.addClass("ui-autocomplete-loading");
            this.source({term: e}, this.response)
        }, _response: function (e) {
            if (!this.options.disabled && e && e.length) {
                e = this._normalize(e);
                this._suggest(e);
                this._trigger("open")
            } else this.close();
            this.pending--;
            this.pending || this.element.removeClass("ui-autocomplete-loading")
        }, close: function (e) {
            clearTimeout(this.closing);
            if (this.menu.element.is(":visible")) {
                this.menu.element.hide();
                this.menu.deactivate();
                this._trigger("close", e)
            }
        }, _change: function (e) {
            this.previous !== this.element.val() && this._trigger("change", e, {item: this.selectedItem})
        }, _normalize: function (t) {
            if (t.length && t[0].label && t[0].value)return t;
            return e.map(t, function (t) {
                if (typeof t === "string")return {label: t, value: t};
                return e.extend({label: t.label || t.value, value: t.value || t.label}, t)
            })
        }, _suggest: function (t) {
            var n = this.menu.element.empty().zIndex(this.element.zIndex() + 1);
            this._renderMenu(n, t);
            this.menu.deactivate();
            this.menu.refresh();
            n.show();
            this._resizeMenu();
            n.position(e.extend({of: this.element}, this.options.position));
            this.options.autoFocus && this.menu.next(new e.Event("mouseover"))
        }, _resizeMenu: function () {
            var e = this.menu.element;
            e.outerWidth(Math.max(e.width("").outerWidth(), this.element.outerWidth()))
        }, _renderMenu: function (t, n) {
            var r = this;
            e.each(n, function (e, n) {
                r._renderItem(t, n)
            })
        }, _renderItem: function (t, n) {
            return e("<li></li>").data("item.autocomplete", n).append(e("<a></a>").text(n.label)).appendTo(t)
        }, _move: function (e, t) {
            if (this.menu.element.is(":visible"))if (this.menu.first() && /^previous/.test(e) || this.menu.last() && /^next/.test(e)) {
                this.element.val(this.term);
                this.menu.deactivate()
            } else this.menu[e](t); else this.search(null, t)
        }, widget: function () {
            return this.menu.element
        }
    });
    e.extend(e.ui.autocomplete, {
        escapeRegex: function (e) {
            return e.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")
        }, filter: function (t, n) {
            var r = new RegExp(e.ui.autocomplete.escapeRegex(n), "i");
            return e.grep(t, function (e) {
                return r.test(e.label || e.value || e)
            })
        }
    })
})(jQuery);
(function (e) {
    e.widget("ui.menu", {
        _create: function () {
            var t = this;
            this.element.addClass("ui-menu ui-widget ui-widget-content ui-corner-all").attr({
                role: "listbox",
                "aria-activedescendant": "ui-active-menuitem"
            }).click(function (n) {
                if (e(n.target).closest(".ui-menu-item a").length) {
                    n.preventDefault();
                    t.select(n)
                }
            });
            this.refresh()
        }, refresh: function () {
            var t = this;
            this.element.children("li:not(.ui-menu-item):has(a)").addClass("ui-menu-item").attr("role", "menuitem").children("a").addClass("ui-corner-all").attr("tabindex", -1).mouseenter(function (n) {
                t.activate(n, e(this).parent())
            }).mouseleave(function () {
                t.deactivate()
            })
        }, activate: function (e, t) {
            this.deactivate();
            if (this.hasScroll()) {
                var n = t.offset().top - this.element.offset().top, r = this.element.scrollTop(), i = this.element.height();
                if (n < 0)this.element.scrollTop(r + n); else n >= i && this.element.scrollTop(r + n - i + t.height())
            }
            this.active = t.eq(0).children("a").addClass("ui-state-hover").attr("id", "ui-active-menuitem").end();
            this._trigger("focus", e, {item: t})
        }, deactivate: function () {
            if (this.active) {
                this.active.children("a").removeClass("ui-state-hover").removeAttr("id");
                this._trigger("blur");
                this.active = null
            }
        }, next: function (e) {
            this.move("next", ".ui-menu-item:first", e)
        }, previous: function (e) {
            this.move("prev", ".ui-menu-item:last", e)
        }, first: function () {
            return this.active && !this.active.prevAll(".ui-menu-item").length
        }, last: function () {
            return this.active && !this.active.nextAll(".ui-menu-item").length
        }, move: function (e, t, n) {
            if (this.active) {
                e = this.active[e + "All"](".ui-menu-item").eq(0);
                e.length ? this.activate(n, e) : this.activate(n, this.element.children(t))
            } else this.activate(n, this.element.children(t))
        }, nextPage: function (t) {
            if (this.hasScroll())if (!this.active || this.last())this.activate(t, this.element.children(".ui-menu-item:first")); else {
                var n = this.active.offset().top, r = this.element.height(), i = this.element.children(".ui-menu-item").filter(function () {
                    var t = e(this).offset().top - n - r + e(this).height();
                    return t < 10 && t > -10
                });
                i.length || (i = this.element.children(".ui-menu-item:last"));
                this.activate(t, i)
            } else this.activate(t, this.element.children(".ui-menu-item").filter(!this.active || this.last() ? ":first" : ":last"))
        }, previousPage: function (t) {
            if (this.hasScroll())if (!this.active || this.first())this.activate(t, this.element.children(".ui-menu-item:last")); else {
                var n = this.active.offset().top, r = this.element.height();
                result = this.element.children(".ui-menu-item").filter(function () {
                    var t = e(this).offset().top - n + r - e(this).height();
                    return t < 10 && t > -10
                });
                result.length || (result = this.element.children(".ui-menu-item:first"));
                this.activate(t, result)
            } else this.activate(t, this.element.children(".ui-menu-item").filter(!this.active || this.first() ? ":last" : ":first"))
        }, hasScroll: function () {
            return this.element.height() < this.element[e.fn.prop ? "prop" : "attr"]("scrollHeight")
        }, select: function (e) {
            this._trigger("selected", e, {item: this.active})
        }
    })
})(jQuery);
(function (e) {
    var t, n, r, i, s = function () {
        var t = e(this).find(":ui-button");
        setTimeout(function () {
            t.button("refresh")
        }, 1)
    }, o = function (t) {
        var n = t.name, r = t.form, i = e([]);
        if (n)i = r ? e(r).find("[name='" + n + "']") : e("[name='" + n + "']", t.ownerDocument).filter(function () {
            return !this.form
        });
        return i
    };
    e.widget("ui.button", {
        options: {disabled: null, text: true, label: null, icons: {primary: null, secondary: null}},
        _create: function () {
            this.element.closest("form").unbind("reset.button").bind("reset.button", s);
            if (typeof this.options.disabled !== "boolean")this.options.disabled = this.element.propAttr("disabled");
            this._determineButtonType();
            this.hasTitle = !!this.buttonElement.attr("title");
            var u = this, a = this.options, f = this.type === "checkbox" || this.type === "radio", c = "ui-state-hover" + (!f ? " ui-state-active" : "");
            if (a.label === null)a.label = this.buttonElement.html();
            if (this.element.is(":disabled"))a.disabled = true;
            this.buttonElement.addClass("ui-button ui-widget ui-state-default ui-corner-all").attr("role", "button").bind("mouseenter.button", function () {
                if (!a.disabled) {
                    e(this).addClass("ui-state-hover");
                    this === t && e(this).addClass("ui-state-active")
                }
            }).bind("mouseleave.button", function () {
                a.disabled || e(this).removeClass(c)
            }).bind("click.button", function (e) {
                if (a.disabled) {
                    e.preventDefault();
                    e.stopImmediatePropagation()
                }
            });
            this.element.bind("focus.button", function () {
                u.buttonElement.addClass("ui-state-focus")
            }).bind("blur.button", function () {
                u.buttonElement.removeClass("ui-state-focus")
            });
            if (f) {
                this.element.bind("change.button", function () {
                    i || u.refresh()
                });
                this.buttonElement.bind("mousedown.button", function (e) {
                    if (!a.disabled) {
                        i = false;
                        n = e.pageX;
                        r = e.pageY
                    }
                }).bind("mouseup.button", function (e) {
                    if (!a.disabled)if (n !== e.pageX || r !== e.pageY)i = true
                })
            }
            if (this.type === "checkbox")this.buttonElement.bind("click.button", function () {
                if (a.disabled || i)return false;
                e(this).toggleClass("ui-state-active");
                u.buttonElement.attr("aria-pressed", u.element[0].checked)
            }); else if (this.type === "radio")this.buttonElement.bind("click.button", function () {
                if (a.disabled || i)return false;
                e(this).addClass("ui-state-active");
                u.buttonElement.attr("aria-pressed", "true");
                var t = u.element[0];
                o(t).not(t).map(function () {
                    return e(this).button("widget")[0]
                }).removeClass("ui-state-active").attr("aria-pressed", "false")
            }); else {
                this.buttonElement.bind("mousedown.button", function () {
                    if (a.disabled)return false;
                    e(this).addClass("ui-state-active");
                    t = this;
                    e(document).one("mouseup", function () {
                        t = null
                    })
                }).bind("mouseup.button", function () {
                    if (a.disabled)return false;
                    e(this).removeClass("ui-state-active")
                }).bind("keydown.button", function (t) {
                    if (a.disabled)return false;
                    if (t.keyCode == e.ui.keyCode.SPACE || t.keyCode == e.ui.keyCode.ENTER)e(this).addClass("ui-state-active")
                }).bind("keyup.button", function () {
                    e(this).removeClass("ui-state-active")
                });
                this.buttonElement.is("a") && this.buttonElement.keyup(function (t) {
                    t.keyCode === e.ui.keyCode.SPACE && e(this).click()
                })
            }
            this._setOption("disabled", a.disabled);
            this._resetButton()
        },
        _determineButtonType: function () {
            this.type = this.element.is(":checkbox") ? "checkbox" : this.element.is(":radio") ? "radio" : this.element.is("input") ? "input" : "button";
            if (this.type === "checkbox" || this.type === "radio") {
                var e = this.element.parents().filter(":last"), t = "label[for='" + this.element.attr("id") + "']";
                this.buttonElement = e.find(t);
                if (!this.buttonElement.length) {
                    e = e.length ? e.siblings() : this.element.siblings();
                    this.buttonElement = e.filter(t);
                    if (!this.buttonElement.length)this.buttonElement = e.find(t)
                }
                this.element.addClass("ui-helper-hidden-accessible");
                (e = this.element.is(":checked")) && this.buttonElement.addClass("ui-state-active");
                this.buttonElement.attr("aria-pressed", e)
            } else this.buttonElement = this.element
        },
        widget: function () {
            return this.buttonElement
        },
        destroy: function () {
            this.element.removeClass("ui-helper-hidden-accessible");
            this.buttonElement.removeClass("ui-button ui-widget ui-state-default ui-corner-all ui-state-hover ui-state-active  ui-button-icons-only ui-button-icon-only ui-button-text-icons ui-button-text-icon-primary ui-button-text-icon-secondary ui-button-text-only").removeAttr("role").removeAttr("aria-pressed").html(this.buttonElement.find(".ui-button-text").html());
            this.hasTitle || this.buttonElement.removeAttr("title");
            e.Widget.prototype.destroy.call(this)
        },
        _setOption: function (t, n) {
            e.Widget.prototype._setOption.apply(this, arguments);
            if (t === "disabled")n ? this.element.propAttr("disabled", true) : this.element.propAttr("disabled", false); else this._resetButton()
        },
        refresh: function () {
            var t = this.element.is(":disabled");
            t !== this.options.disabled && this._setOption("disabled", t);
            if (this.type === "radio")o(this.element[0]).each(function () {
                e(this).is(":checked") ? e(this).button("widget").addClass("ui-state-active").attr("aria-pressed", "true") : e(this).button("widget").removeClass("ui-state-active").attr("aria-pressed", "false")
            }); else if (this.type === "checkbox")this.element.is(":checked") ? this.buttonElement.addClass("ui-state-active").attr("aria-pressed", "true") : this.buttonElement.removeClass("ui-state-active").attr("aria-pressed", "false")
        },
        _resetButton: function () {
            if (this.type === "input")this.options.label && this.element.val(this.options.label); else {
                var t = this.buttonElement.removeClass("ui-button-icons-only ui-button-icon-only ui-button-text-icons ui-button-text-icon-primary ui-button-text-icon-secondary ui-button-text-only"), n = e("<span></span>").addClass("ui-button-text").html(this.options.label).appendTo(t.empty()).text(), r = this.options.icons, i = r.primary && r.secondary, s = [];
                if (r.primary || r.secondary) {
                    if (this.options.text)s.push("ui-button-text-icon" + (i ? "s" : r.primary ? "-primary" : "-secondary"));
                    r.primary && t.prepend("<span class='ui-button-icon-primary ui-icon " + r.primary + "'></span>");
                    r.secondary && t.append("<span class='ui-button-icon-secondary ui-icon " + r.secondary + "'></span>");
                    if (!this.options.text) {
                        s.push(i ? "ui-button-icons-only" : "ui-button-icon-only");
                        this.hasTitle || t.attr("title", n)
                    }
                } else s.push("ui-button-text-only");
                t.addClass(s.join(" "))
            }
        }
    });
    e.widget("ui.buttonset", {
        options: {items: ":button, :submit, :reset, :checkbox, :radio, a, :data(button)"},
        _create: function () {
            this.element.addClass("ui-buttonset")
        },
        _init: function () {
            this.refresh()
        },
        _setOption: function (t, n) {
            t === "disabled" && this.buttons.button("option", t, n);
            e.Widget.prototype._setOption.apply(this, arguments)
        },
        refresh: function () {
            var t = this.element.css("direction") === "ltr";
            this.buttons = this.element.find(this.options.items).filter(":ui-button").button("refresh").end().not(":ui-button").button().end().map(function () {
                return e(this).button("widget")[0]
            }).removeClass("ui-corner-all ui-corner-left ui-corner-right").filter(":first").addClass(t ? "ui-corner-left" : "ui-corner-right").end().filter(":last").addClass(t ? "ui-corner-right" : "ui-corner-left").end().end()
        },
        destroy: function () {
            this.element.removeClass("ui-buttonset");
            this.buttons.map(function () {
                return e(this).button("widget")[0]
            }).removeClass("ui-corner-left ui-corner-right").end().button("destroy");
            e.Widget.prototype.destroy.call(this)
        }
    })
})(jQuery);
(function (e, t) {
    var n = {
        buttons: true,
        height: true,
        maxHeight: true,
        maxWidth: true,
        minHeight: true,
        minWidth: true,
        width: true
    }, r = {maxHeight: true, maxWidth: true, minHeight: true, minWidth: true}, i = e.attrFn || {
            val: true,
            css: true,
            html: true,
            text: true,
            data: true,
            width: true,
            height: true,
            offset: true,
            click: true
        };
    e.widget("ui.dialog", {
        options: {
            autoOpen: true,
            buttons: {},
            closeOnEscape: true,
            closeText: "close",
            dialogClass: "",
            draggable: true,
            hide: null,
            height: "auto",
            maxHeight: false,
            maxWidth: false,
            minHeight: 150,
            minWidth: 150,
            modal: false,
            position: {
                my: "center", at: "center", collision: "fit", using: function (t) {
                    var n = e(this).css(t).offset().top;
                    n < 0 && e(this).css("top", t.top - n)
                }
            },
            resizable: true,
            show: null,
            stack: true,
            title: "",
            width: 300,
            zIndex: 1e3
        }, _create: function () {
            this.originalTitle = this.element.attr("title");
            if (typeof this.originalTitle !== "string")this.originalTitle = "";
            this.options.title = this.options.title || this.originalTitle;
            var t = this, n = t.options, r = n.title || "&#160;", i = e.ui.dialog.getTitleId(t.element), s = (t.uiDialog = e("<div></div>")).appendTo(document.body).hide().addClass("ui-dialog ui-widget ui-widget-content ui-corner-all " + n.dialogClass).css({zIndex: n.zIndex}).attr("tabIndex", -1).css("outline", 0).keydown(function (r) {
                if (n.closeOnEscape && !r.isDefaultPrevented() && r.keyCode && r.keyCode === e.ui.keyCode.ESCAPE) {
                    t.close(r);
                    r.preventDefault()
                }
            }).attr({role: "dialog", "aria-labelledby": i}).mousedown(function (e) {
                t.moveToTop(false, e)
            });
            t.element.show().removeAttr("title").addClass("ui-dialog-content ui-widget-content").appendTo(s);
            var o = (t.uiDialogTitlebar = e("<div></div>")).addClass("ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix").prependTo(s), u = e('<a href="#"></a>').addClass("ui-dialog-titlebar-close ui-corner-all").attr("role", "button").hover(function () {
                u.addClass("ui-state-hover")
            }, function () {
                u.removeClass("ui-state-hover")
            }).focus(function () {
                u.addClass("ui-state-focus")
            }).blur(function () {
                u.removeClass("ui-state-focus")
            }).click(function (e) {
                t.close(e);
                return false
            }).appendTo(o);
            (t.uiDialogTitlebarCloseText = e("<span></span>")).addClass("ui-icon ui-icon-closethick").text(n.closeText).appendTo(u);
            e("<span></span>").addClass("ui-dialog-title").attr("id", i).html(r).prependTo(o);
            if (e.isFunction(n.beforeclose) && !e.isFunction(n.beforeClose))n.beforeClose = n.beforeclose;
            o.find("*").add(o).disableSelection();
            n.draggable && e.fn.draggable && t._makeDraggable();
            n.resizable && e.fn.resizable && t._makeResizable();
            t._createButtons(n.buttons);
            t._isOpen = false;
            e.fn.bgiframe && s.bgiframe()
        }, _init: function () {
            this.options.autoOpen && this.open()
        }, destroy: function () {
            var e = this;
            e.overlay && e.overlay.destroy();
            e.uiDialog.hide();
            e.element.unbind(".dialog").removeData("dialog").removeClass("ui-dialog-content ui-widget-content").hide().appendTo("body");
            e.uiDialog.remove();
            e.originalTitle && e.element.attr("title", e.originalTitle);
            return e
        }, widget: function () {
            return this.uiDialog
        }, close: function (t) {
            var n = this, r, i;
            if (false !== n._trigger("beforeClose", t)) {
                n.overlay && n.overlay.destroy();
                n.uiDialog.unbind("keypress.ui-dialog");
                n._isOpen = false;
                if (n.options.hide)n.uiDialog.hide(n.options.hide, function () {
                    n._trigger("close", t)
                }); else {
                    n.uiDialog.hide();
                    n._trigger("close", t)
                }
                e.ui.dialog.overlay.resize();
                if (n.options.modal) {
                    r = 0;
                    e(".ui-dialog").each(function () {
                        if (this !== n.uiDialog[0]) {
                            i = e(this).css("z-index");
                            isNaN(i) || (r = Math.max(r, i))
                        }
                    });
                    e.ui.dialog.maxZ = r
                }
                return n
            }
        }, isOpen: function () {
            return this._isOpen
        }, moveToTop: function (t, n) {
            var r = this, i = r.options;
            if (i.modal && !t || !i.stack && !i.modal)return r._trigger("focus", n);
            if (i.zIndex > e.ui.dialog.maxZ)e.ui.dialog.maxZ = i.zIndex;
            if (r.overlay) {
                e.ui.dialog.maxZ += 1;
                r.overlay.$el.css("z-index", e.ui.dialog.overlay.maxZ = e.ui.dialog.maxZ)
            }
            t = {scrollTop: r.element.scrollTop(), scrollLeft: r.element.scrollLeft()};
            e.ui.dialog.maxZ += 1;
            r.uiDialog.css("z-index", e.ui.dialog.maxZ);
            r.element.attr(t);
            r._trigger("focus", n);
            return r
        }, open: function () {
            if (!this._isOpen) {
                var t = this, n = t.options, r = t.uiDialog;
                t.overlay = n.modal ? new e.ui.dialog.overlay(t) : null;
                t._size();
                t._position(n.position);
                r.show(n.show);
                t.moveToTop(true);
                n.modal && r.bind("keypress.ui-dialog", function (t) {
                    if (t.keyCode === e.ui.keyCode.TAB) {
                        var n = e(":tabbable", this), r = n.filter(":first");
                        n = n.filter(":last");
                        if (t.target === n[0] && !t.shiftKey) {
                            r.focus(1);
                            return false
                        } else if (t.target === r[0] && t.shiftKey) {
                            n.focus(1);
                            return false
                        }
                    }
                });
                e(t.element.find(":tabbable").get().concat(r.find(".ui-dialog-buttonpane :tabbable").get().concat(r.get()))).eq(0).focus();
                t._isOpen = true;
                t._trigger("open");
                return t
            }
        }, _createButtons: function (t) {
            var n = this, r = false, s = e("<div></div>").addClass("ui-dialog-buttonpane ui-widget-content ui-helper-clearfix"), u = e("<div></div>").addClass("ui-dialog-buttonset").appendTo(s);
            n.uiDialog.find(".ui-dialog-buttonpane").remove();
            typeof t === "object" && t !== null && e.each(t, function () {
                return !(r = true)
            });
            if (r) {
                e.each(t, function (t, r) {
                    r = e.isFunction(r) ? {click: r, text: t} : r;
                    var s = e('<button type="button"></button>').click(function () {
                        r.click.apply(n.element[0], arguments)
                    }).appendTo(u);
                    e.each(r, function (e, t) {
                        if (e !== "click")e in i ? s[e](t) : s.attr(e, t)
                    });
                    e.fn.button && s.button()
                });
                s.appendTo(n.uiDialog)
            }
        }, _makeDraggable: function () {
            function t(e) {
                return {position: e.position, offset: e.offset}
            }

            var n = this, r = n.options, i = e(document), s;
            n.uiDialog.draggable({
                cancel: ".ui-dialog-content, .ui-dialog-titlebar-close",
                handle: ".ui-dialog-titlebar",
                containment: "document",
                start: function (i, o) {
                    s = r.height === "auto" ? "auto" : e(this).height();
                    e(this).height(e(this).height()).addClass("ui-dialog-dragging");
                    n._trigger("dragStart", i, t(o))
                },
                drag: function (e, r) {
                    n._trigger("drag", e, t(r))
                },
                stop: function (o, u) {
                    r.position = [u.position.left - i.scrollLeft(), u.position.top - i.scrollTop()];
                    e(this).removeClass("ui-dialog-dragging").height(s);
                    n._trigger("dragStop", o, t(u));
                    e.ui.dialog.overlay.resize()
                }
            })
        }, _makeResizable: function (n) {
            function r(e) {
                return {
                    originalPosition: e.originalPosition,
                    originalSize: e.originalSize,
                    position: e.position,
                    size: e.size
                }
            }

            n = n === t ? this.options.resizable : n;
            var i = this, s = i.options, o = i.uiDialog.css("position");
            n = typeof n === "string" ? n : "n,e,s,w,se,sw,ne,nw";
            i.uiDialog.resizable({
                cancel: ".ui-dialog-content",
                containment: "document",
                alsoResize: i.element,
                maxWidth: s.maxWidth,
                maxHeight: s.maxHeight,
                minWidth: s.minWidth,
                minHeight: i._minHeight(),
                handles: n,
                start: function (t, n) {
                    e(this).addClass("ui-dialog-resizing");
                    i._trigger("resizeStart", t, r(n))
                },
                resize: function (e, t) {
                    i._trigger("resize", e, r(t))
                },
                stop: function (t, n) {
                    e(this).removeClass("ui-dialog-resizing");
                    s.height = e(this).height();
                    s.width = e(this).width();
                    i._trigger("resizeStop", t, r(n));
                    e.ui.dialog.overlay.resize()
                }
            }).css("position", o).find(".ui-resizable-se").addClass("ui-icon ui-icon-grip-diagonal-se")
        }, _minHeight: function () {
            var e = this.options;
            return e.height === "auto" ? e.minHeight : Math.min(e.minHeight, e.height)
        }, _position: function (t) {
            var n = [], r = [0, 0], i;
            if (t) {
                if (typeof t === "string" || typeof t === "object" && "0" in t) {
                    n = t.split ? t.split(" ") : [t[0], t[1]];
                    if (n.length === 1)n[1] = n[0];
                    e.each(["left", "top"], function (e, t) {
                        if (+n[e] === n[e]) {
                            r[e] = n[e];
                            n[e] = t
                        }
                    });
                    t = {my: n.join(" "), at: n.join(" "), offset: r.join(" ")}
                }
                t = e.extend({}, e.ui.dialog.prototype.options.position, t)
            } else t = e.ui.dialog.prototype.options.position;
            (i = this.uiDialog.is(":visible")) || this.uiDialog.show();
            this.uiDialog.css({top: 0, left: 0}).position(e.extend({of: window}, t));
            i || this.uiDialog.hide()
        }, _setOptions: function (t) {
            var i = this, s = {}, o = false;
            e.each(t, function (e, t) {
                i._setOption(e, t);
                if (e in n)o = true;
                if (e in r)s[e] = t
            });
            o && this._size();
            this.uiDialog.is(":data(resizable)") && this.uiDialog.resizable("option", s)
        }, _setOption: function (t, n) {
            var r = this, i = r.uiDialog;
            switch (t) {
                case"beforeclose":
                    t = "beforeClose";
                    break;
                case"buttons":
                    r._createButtons(n);
                    break;
                case"closeText":
                    r.uiDialogTitlebarCloseText.text("" + n);
                    break;
                case"dialogClass":
                    i.removeClass(r.options.dialogClass).addClass("ui-dialog ui-widget ui-widget-content ui-corner-all " + n);
                    break;
                case"disabled":
                    n ? i.addClass("ui-dialog-disabled") : i.removeClass("ui-dialog-disabled");
                    break;
                case"draggable":
                    var s = i.is(":data(draggable)");
                    s && !n && i.draggable("destroy");
                    !s && n && r._makeDraggable();
                    break;
                case"position":
                    r._position(n);
                    break;
                case"resizable":
                    (s = i.is(":data(resizable)")) && !n && i.resizable("destroy");
                    s && typeof n === "string" && i.resizable("option", "handles", n);
                    !s && n !== false && r._makeResizable(n);
                    break;
                case"title":
                    e(".ui-dialog-title", r.uiDialogTitlebar).html("" + (n || "&#160;"));
                    break
            }
            e.Widget.prototype._setOption.apply(r, arguments)
        }, _size: function () {
            var t = this.options, n, r, i = this.uiDialog.is(":visible");
            this.element.show().css({width: "auto", minHeight: 0, height: 0});
            if (t.minWidth > t.width)t.width = t.minWidth;
            n = this.uiDialog.css({height: "auto", width: t.width}).height();
            r = Math.max(0, t.minHeight - n);
            if (t.height === "auto")if (e.support.minHeight)this.element.css({minHeight: r, height: "auto"}); else {
                this.uiDialog.show();
                t = this.element.css("height", "auto").height();
                i || this.uiDialog.hide();
                this.element.height(Math.max(t, r))
            } else this.element.height(Math.max(t.height - n, 0));
            this.uiDialog.is(":data(resizable)") && this.uiDialog.resizable("option", "minHeight", this._minHeight())
        }
    });
    e.extend(e.ui.dialog, {
        version: "1.8.16", uuid: 0, maxZ: 0, getTitleId: function (e) {
            e = e.attr("id");
            if (!e) {
                this.uuid += 1;
                e = this.uuid
            }
            return "ui-dialog-title-" + e
        }, overlay: function (t) {
            this.$el = e.ui.dialog.overlay.create(t)
        }
    });
    e.extend(e.ui.dialog.overlay, {
        instances: [],
        oldInstances: [],
        maxZ: 0,
        events: e.map("focus,mousedown,mouseup,keydown,keypress,click".split(","), function (e) {
            return e + ".dialog-overlay"
        }).join(" "),
        create: function (t) {
            if (this.instances.length === 0) {
                setTimeout(function () {
                    e.ui.dialog.overlay.instances.length && e(document).bind(e.ui.dialog.overlay.events, function (t) {
                        if (e(t.target).zIndex() < e.ui.dialog.overlay.maxZ)return false
                    })
                }, 1);
                e(document).bind("keydown.dialog-overlay", function (n) {
                    if (t.options.closeOnEscape && !n.isDefaultPrevented() && n.keyCode && n.keyCode === e.ui.keyCode.ESCAPE) {
                        t.close(n);
                        n.preventDefault()
                    }
                });
                e(window).bind("resize.dialog-overlay", e.ui.dialog.overlay.resize)
            }
            var n = (this.oldInstances.pop() || e("<div></div>").addClass("ui-widget-overlay")).appendTo(document.body).css({
                width: this.width(),
                height: this.height()
            });
            e.fn.bgiframe && n.bgiframe();
            this.instances.push(n);
            return n
        },
        destroy: function (t) {
            var n = e.inArray(t, this.instances);
            n != -1 && this.oldInstances.push(this.instances.splice(n, 1)[0]);
            this.instances.length === 0 && e([document, window]).unbind(".dialog-overlay");
            t.remove();
            var r = 0;
            e.each(this.instances, function () {
                r = Math.max(r, this.css("z-index"))
            });
            this.maxZ = r
        },
        height: function () {
            var t, n;
            if (e.browser.msie && e.browser.version < 7) {
                t = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
                n = Math.max(document.documentElement.offsetHeight, document.body.offsetHeight);
                return t < n ? e(window).height() + "px" : t + "px"
            } else return e(document).height() + "px"
        },
        width: function () {
            var t, n;
            if (e.browser.msie) {
                t = Math.max(document.documentElement.scrollWidth, document.body.scrollWidth);
                n = Math.max(document.documentElement.offsetWidth, document.body.offsetWidth);
                return t < n ? e(window).width() + "px" : t + "px"
            } else return e(document).width() + "px"
        },
        resize: function () {
            var t = e([]);
            e.each(e.ui.dialog.overlay.instances, function () {
                t = t.add(this)
            });
            t.css({width: 0, height: 0}).css({width: e.ui.dialog.overlay.width(), height: e.ui.dialog.overlay.height()})
        }
    });
    e.extend(e.ui.dialog.overlay.prototype, {
        destroy: function () {
            e.ui.dialog.overlay.destroy(this.$el)
        }
    })
})(jQuery);
(function (e) {
    e.widget("ui.slider", e.ui.mouse, {
        widgetEventPrefix: "slide",
        options: {
            animate: false,
            distance: 0,
            max: 100,
            min: 0,
            orientation: "horizontal",
            range: false,
            step: 1,
            value: 0,
            values: null
        },
        _create: function () {
            var t = this, n = this.options, r = this.element.find(".ui-slider-handle").addClass("ui-state-default ui-corner-all"), i = n.values && n.values.length || 1, s = [];
            this._mouseSliding = this._keySliding = false;
            this._animateOff = true;
            this._handleIndex = null;
            this._detectOrientation();
            this._mouseInit();
            this.element.addClass("ui-slider ui-slider-" + this.orientation + " ui-widget ui-widget-content ui-corner-all" + (n.disabled ? " ui-slider-disabled ui-disabled" : ""));
            this.range = e([]);
            if (n.range) {
                if (n.range === true) {
                    if (!n.values)n.values = [this._valueMin(), this._valueMin()];
                    if (n.values.length && n.values.length !== 2)n.values = [n.values[0], n.values[0]]
                }
                this.range = e("<div></div>").appendTo(this.element).addClass("ui-slider-range ui-widget-header" + (n.range === "min" || n.range === "max" ? " ui-slider-range-" + n.range : ""))
            }
            for (var o = r.length; o < i; o += 1)s.push("<a class='ui-slider-handle ui-state-default ui-corner-all' href='#'></a>");
            this.handles = r.add(e(s.join("")).appendTo(t.element));
            this.handle = this.handles.eq(0);
            this.handles.add(this.range).filter("a").click(function (e) {
                e.preventDefault()
            }).hover(function () {
                n.disabled || e(this).addClass("ui-state-hover")
            }, function () {
                e(this).removeClass("ui-state-hover")
            }).focus(function () {
                if (n.disabled)e(this).blur(); else {
                    e(".ui-slider .ui-state-focus").removeClass("ui-state-focus");
                    e(this).addClass("ui-state-focus")
                }
            }).blur(function () {
                e(this).removeClass("ui-state-focus")
            });
            this.handles.each(function (t) {
                e(this).data("index.ui-slider-handle", t)
            });
            this.handles.keydown(function (n) {
                var r = true, i = e(this).data("index.ui-slider-handle"), s, o, u;
                if (!t.options.disabled) {
                    switch (n.keyCode) {
                        case e.ui.keyCode.HOME:
                        case e.ui.keyCode.END:
                        case e.ui.keyCode.PAGE_UP:
                        case e.ui.keyCode.PAGE_DOWN:
                        case e.ui.keyCode.UP:
                        case e.ui.keyCode.RIGHT:
                        case e.ui.keyCode.DOWN:
                        case e.ui.keyCode.LEFT:
                            r = false;
                            if (!t._keySliding) {
                                t._keySliding = true;
                                e(this).addClass("ui-state-active");
                                s = t._start(n, i);
                                if (s === false)return
                            }
                            break
                    }
                    u = t.options.step;
                    s = t.options.values && t.options.values.length ? o = t.values(i) : o = t.value();
                    switch (n.keyCode) {
                        case e.ui.keyCode.HOME:
                            o = t._valueMin();
                            break;
                        case e.ui.keyCode.END:
                            o = t._valueMax();
                            break;
                        case e.ui.keyCode.PAGE_UP:
                            o = t._trimAlignValue(s + (t._valueMax() - t._valueMin()) / 5);
                            break;
                        case e.ui.keyCode.PAGE_DOWN:
                            o = t._trimAlignValue(s - (t._valueMax() - t._valueMin()) / 5);
                            break;
                        case e.ui.keyCode.UP:
                        case e.ui.keyCode.RIGHT:
                            if (s === t._valueMax())return;
                            o = t._trimAlignValue(s + u);
                            break;
                        case e.ui.keyCode.DOWN:
                        case e.ui.keyCode.LEFT:
                            if (s === t._valueMin())return;
                            o = t._trimAlignValue(s - u);
                            break
                    }
                    t._slide(n, i, o);
                    return r
                }
            }).keyup(function (n) {
                var r = e(this).data("index.ui-slider-handle");
                if (t._keySliding) {
                    t._keySliding = false;
                    t._stop(n, r);
                    t._change(n, r);
                    e(this).removeClass("ui-state-active")
                }
            });
            this._refreshValue();
            this._animateOff = false
        },
        destroy: function () {
            this.handles.remove();
            this.range.remove();
            this.element.removeClass("ui-slider ui-slider-horizontal ui-slider-vertical ui-slider-disabled ui-widget ui-widget-content ui-corner-all").removeData("slider").unbind(".slider");
            this._mouseDestroy();
            return this
        },
        _mouseCapture: function (t) {
            var n = this.options, r, i, s, o, u;
            if (n.disabled)return false;
            this.elementSize = {width: this.element.outerWidth(), height: this.element.outerHeight()};
            this.elementOffset = this.element.offset();
            r = this._normValueFromMouse({x: t.pageX, y: t.pageY});
            i = this._valueMax() - this._valueMin() + 1;
            o = this;
            this.handles.each(function (t) {
                var n = Math.abs(r - o.values(t));
                if (i > n) {
                    i = n;
                    s = e(this);
                    u = t
                }
            });
            if (n.range === true && this.values(1) === n.min) {
                u += 1;
                s = e(this.handles[u])
            }
            if (this._start(t, u) === false)return false;
            this._mouseSliding = true;
            o._handleIndex = u;
            s.addClass("ui-state-active").focus();
            n = s.offset();
            this._clickOffset = !e(t.target).parents().andSelf().is(".ui-slider-handle") ? {
                left: 0,
                top: 0
            } : {
                left: t.pageX - n.left - s.width() / 2,
                top: t.pageY - n.top - s.height() / 2 - (parseInt(s.css("borderTopWidth"), 10) || 0) - (parseInt(s.css("borderBottomWidth"), 10) || 0) + (parseInt(s.css("marginTop"), 10) || 0)
            };
            this.handles.hasClass("ui-state-hover") || this._slide(t, u, r);
            return this._animateOff = true
        },
        _mouseStart: function () {
            return true
        },
        _mouseDrag: function (e) {
            var t = this._normValueFromMouse({x: e.pageX, y: e.pageY});
            this._slide(e, this._handleIndex, t);
            return false
        },
        _mouseStop: function (e) {
            this.handles.removeClass("ui-state-active");
            this._mouseSliding = false;
            this._stop(e, this._handleIndex);
            this._change(e, this._handleIndex);
            this._clickOffset = this._handleIndex = null;
            return this._animateOff = false
        },
        _detectOrientation: function () {
            this.orientation = this.options.orientation === "vertical" ? "vertical" : "horizontal"
        },
        _normValueFromMouse: function (e) {
            var t;
            if (this.orientation === "horizontal") {
                t = this.elementSize.width;
                e = e.x - this.elementOffset.left - (this._clickOffset ? this._clickOffset.left : 0)
            } else {
                t = this.elementSize.height;
                e = e.y - this.elementOffset.top - (this._clickOffset ? this._clickOffset.top : 0)
            }
            t = e / t;
            if (t > 1)t = 1;
            if (t < 0)t = 0;
            if (this.orientation === "vertical")t = 1 - t;
            e = this._valueMax() - this._valueMin();
            return this._trimAlignValue(this._valueMin() + t * e)
        },
        _start: function (e, t) {
            var n = {handle: this.handles[t], value: this.value()};
            if (this.options.values && this.options.values.length) {
                n.value = this.values(t);
                n.values = this.values()
            }
            return this._trigger("start", e, n)
        },
        _slide: function (e, t, n) {
            var r;
            if (this.options.values && this.options.values.length) {
                r = this.values(t ? 0 : 1);
                if (this.options.values.length === 2 && this.options.range === true && (t === 0 && n > r || t === 1 && n < r))n = r;
                if (n !== this.values(t)) {
                    r = this.values();
                    r[t] = n;
                    e = this._trigger("slide", e, {handle: this.handles[t], value: n, values: r});
                    this.values(t ? 0 : 1);
                    e !== false && this.values(t, n, true)
                }
            } else if (n !== this.value()) {
                e = this._trigger("slide", e, {handle: this.handles[t], value: n});
                e !== false && this.value(n)
            }
        },
        _stop: function (e, t) {
            var n = {handle: this.handles[t], value: this.value()};
            if (this.options.values && this.options.values.length) {
                n.value = this.values(t);
                n.values = this.values()
            }
            this._trigger("stop", e, n)
        },
        _change: function (e, t) {
            if (!this._keySliding && !this._mouseSliding) {
                var n = {handle: this.handles[t], value: this.value()};
                if (this.options.values && this.options.values.length) {
                    n.value = this.values(t);
                    n.values = this.values()
                }
                this._trigger("change", e, n)
            }
        },
        value: function (e) {
            if (arguments.length) {
                this.options.value = this._trimAlignValue(e);
                this._refreshValue();
                this._change(null, 0)
            } else return this._value()
        },
        values: function (t, n) {
            var r, i, s;
            if (arguments.length > 1) {
                this.options.values[t] = this._trimAlignValue(n);
                this._refreshValue();
                this._change(null, t)
            } else if (arguments.length)if (e.isArray(arguments[0])) {
                r = this.options.values;
                i = arguments[0];
                for (s = 0; s < r.length; s += 1) {
                    r[s] = this._trimAlignValue(i[s]);
                    this._change(null, s)
                }
                this._refreshValue()
            } else return this.options.values && this.options.values.length ? this._values(t) : this.value(); else return this._values()
        },
        _setOption: function (t, n) {
            var r, i = 0;
            if (e.isArray(this.options.values))i = this.options.values.length;
            e.Widget.prototype._setOption.apply(this, arguments);
            switch (t) {
                case"disabled":
                    if (n) {
                        this.handles.filter(".ui-state-focus").blur();
                        this.handles.removeClass("ui-state-hover");
                        this.handles.propAttr("disabled", true);
                        this.element.addClass("ui-disabled")
                    } else {
                        this.handles.propAttr("disabled", false);
                        this.element.removeClass("ui-disabled")
                    }
                    break;
                case"orientation":
                    this._detectOrientation();
                    this.element.removeClass("ui-slider-horizontal ui-slider-vertical").addClass("ui-slider-" + this.orientation);
                    this._refreshValue();
                    break;
                case"value":
                    this._animateOff = true;
                    this._refreshValue();
                    this._change(null, 0);
                    this._animateOff = false;
                    break;
                case"values":
                    this._animateOff = true;
                    this._refreshValue();
                    for (r = 0; r < i; r += 1)this._change(null, r);
                    this._animateOff = false;
                    break
            }
        },
        _value: function () {
            var e = this.options.value;
            return e = this._trimAlignValue(e)
        },
        _values: function (e) {
            var t, n;
            if (arguments.length) {
                t = this.options.values[e];
                return t = this._trimAlignValue(t)
            } else {
                t = this.options.values.slice();
                for (n = 0; n < t.length; n += 1)t[n] = this._trimAlignValue(t[n]);
                return t
            }
        },
        _trimAlignValue: function (e) {
            if (e <= this._valueMin())return this._valueMin();
            if (e >= this._valueMax())return this._valueMax();
            var t = this.options.step > 0 ? this.options.step : 1, n = (e - this._valueMin()) % t;
            e = e - n;
            if (Math.abs(n) * 2 >= t)e += n > 0 ? t : -t;
            return parseFloat(e.toFixed(5))
        },
        _valueMin: function () {
            return this.options.min
        },
        _valueMax: function () {
            return this.options.max
        },
        _refreshValue: function () {
            var t = this.options.range, n = this.options, r = this, i = !this._animateOff ? n.animate : false, s, o = {}, u, a, f, l;
            if (this.options.values && this.options.values.length)this.handles.each(function (t) {
                s = (r.values(t) - r._valueMin()) / (r._valueMax() - r._valueMin()) * 100;
                o[r.orientation === "horizontal" ? "left" : "bottom"] = s + "%";
                e(this).stop(1, 1)[i ? "animate" : "css"](o, n.animate);
                if (r.options.range === true)if (r.orientation === "horizontal") {
                    if (t === 0)r.range.stop(1, 1)[i ? "animate" : "css"]({left: s + "%"}, n.animate);
                    if (t === 1)r.range[i ? "animate" : "css"]({width: s - u + "%"}, {
                        queue: false,
                        duration: n.animate
                    })
                } else {
                    if (t === 0)r.range.stop(1, 1)[i ? "animate" : "css"]({bottom: s + "%"}, n.animate);
                    if (t === 1)r.range[i ? "animate" : "css"]({height: s - u + "%"}, {
                        queue: false,
                        duration: n.animate
                    })
                }
                u = s
            }); else {
                a = this.value();
                f = this._valueMin();
                l = this._valueMax();
                s = l !== f ? (a - f) / (l - f) * 100 : 0;
                o[r.orientation === "horizontal" ? "left" : "bottom"] = s + "%";
                this.handle.stop(1, 1)[i ? "animate" : "css"](o, n.animate);
                if (t === "min" && this.orientation === "horizontal")this.range.stop(1, 1)[i ? "animate" : "css"]({width: s + "%"}, n.animate);
                if (t === "max" && this.orientation === "horizontal")this.range[i ? "animate" : "css"]({width: 100 - s + "%"}, {
                    queue: false,
                    duration: n.animate
                });
                if (t === "min" && this.orientation === "vertical")this.range.stop(1, 1)[i ? "animate" : "css"]({height: s + "%"}, n.animate);
                if (t === "max" && this.orientation === "vertical")this.range[i ? "animate" : "css"]({height: 100 - s + "%"}, {
                    queue: false,
                    duration: n.animate
                })
            }
        }
    });
    e.extend(e.ui.slider, {version: "1.8.16"})
})(jQuery);
(function (e, n) {
    function r() {
        return ++s
    }

    function i() {
        return ++o
    }

    var s = 0, o = 0;
    e.widget("ui.tabs", {
        options: {
            add: null,
            ajaxOptions: null,
            cache: false,
            cookie: null,
            collapsible: false,
            disable: null,
            disabled: [],
            enable: null,
            event: "click",
            fx: null,
            idPrefix: "ui-tabs-",
            load: null,
            panelTemplate: "<div></div>",
            remove: null,
            select: null,
            show: null,
            spinner: "<em>Loading&#8230;</em>",
            tabTemplate: "<li><a href='#{href}'><span>#{label}</span></a></li>"
        }, _create: function () {
            this._tabify(true)
        }, _setOption: function (e, t) {
            if (e == "selected")this.options.collapsible && t == this.options.selected || this.select(t); else {
                this.options[e] = t;
                this._tabify()
            }
        }, _tabId: function (e) {
            return e.title && e.title.replace(/\s/g, "_").replace(/[^\w\u00c0-\uFFFF-]/g, "") || this.options.idPrefix + r()
        }, _sanitizeSelector: function (e) {
            return e.replace(/:/g, "\\:")
        }, _cookie: function () {
            var t = this.cookie || (this.cookie = this.options.cookie.name || "ui-tabs-" + i());
            return e.cookie.apply(null, [t].concat(e.makeArray(arguments)))
        }, _ui: function (e, t) {
            return {tab: e, panel: t, index: this.anchors.index(e)}
        }, _cleanup: function () {
            this.lis.filter(".ui-state-processing").removeClass("ui-state-processing").find("span:data(label.tabs)").each(function () {
                var t = e(this);
                t.html(t.data("label.tabs")).removeData("label.tabs")
            })
        }, _tabify: function (t) {
            function r(t, n) {
                t.css("display", "");
                !e.support.opacity && n.opacity && t[0].style.removeAttribute("filter")
            }

            var i = this, s = this.options, o = /^#.+/;
            this.list = this.element.find("ol,ul").eq(0);
            this.lis = e(" > li:has(a[href])", this.list);
            this.anchors = this.lis.map(function () {
                return e("a", this)[0]
            });
            this.panels = e([]);
            this.anchors.each(function (t, n) {
                var r = e(n).attr("href"), u = r.split("#")[0], a;
                if (u && (u === location.toString().split("#")[0] || (a = e("base")[0]) && u === a.href)) {
                    r = n.hash;
                    n.href = r
                }
                if (o.test(r))i.panels = i.panels.add(i.element.find(i._sanitizeSelector(r))); else if (r && r !== "#") {
                    e.data(n, "href.tabs", r);
                    e.data(n, "load.tabs", r.replace(/#.*$/, ""));
                    r = i._tabId(n);
                    n.href = "#" + r;
                    n = i.element.find("#" + r);
                    if (!n.length) {
                        n = e(s.panelTemplate).attr("id", r).addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").insertAfter(i.panels[t - 1] || i.list);
                        n.data("destroy.tabs", true)
                    }
                    i.panels = i.panels.add(n)
                } else s.disabled.push(t)
            });
            if (t) {
                this.element.addClass("ui-tabs ui-widget ui-widget-content ui-corner-all");
                this.list.addClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all");
                this.lis.addClass("ui-state-default ui-corner-top");
                this.panels.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom");
                if (s.selected === n) {
                    location.hash && this.anchors.each(function (e, t) {
                        if (t.hash == location.hash) {
                            s.selected = e;
                            return false
                        }
                    });
                    if (typeof s.selected !== "number" && s.cookie)s.selected = parseInt(i._cookie(), 10);
                    if (typeof s.selected !== "number" && this.lis.filter(".ui-tabs-selected").length)s.selected = this.lis.index(this.lis.filter(".ui-tabs-selected"));
                    s.selected = s.selected || (this.lis.length ? 0 : -1)
                } else if (s.selected === null)s.selected = -1;
                s.selected = s.selected >= 0 && this.anchors[s.selected] || s.selected < 0 ? s.selected : 0;
                s.disabled = e.unique(s.disabled.concat(e.map(this.lis.filter(".ui-state-disabled"), function (e) {
                    return i.lis.index(e)
                }))).sort();
                e.inArray(s.selected, s.disabled) != -1 && s.disabled.splice(e.inArray(s.selected, s.disabled), 1);
                this.panels.addClass("ui-tabs-hide");
                this.lis.removeClass("ui-tabs-selected ui-state-active");
                if (s.selected >= 0 && this.anchors.length) {
                    i.element.find(i._sanitizeSelector(i.anchors[s.selected].hash)).removeClass("ui-tabs-hide");
                    this.lis.eq(s.selected).addClass("ui-tabs-selected ui-state-active");
                    i.element.queue("tabs", function () {
                        i._trigger("show", null, i._ui(i.anchors[s.selected], i.element.find(i._sanitizeSelector(i.anchors[s.selected].hash))[0]))
                    });
                    this.load(s.selected)
                }
                e(window).bind("unload", function () {
                    i.lis.add(i.anchors).unbind(".tabs");
                    i.lis = i.anchors = i.panels = null
                })
            } else s.selected = this.lis.index(this.lis.filter(".ui-tabs-selected"));
            this.element[s.collapsible ? "addClass" : "removeClass"]("ui-tabs-collapsible");
            s.cookie && this._cookie(s.selected, s.cookie);
            t = 0;
            for (var u; u = this.lis[t]; t++)e(u)[e.inArray(t, s.disabled) != -1 && !e(u).hasClass("ui-tabs-selected") ? "addClass" : "removeClass"]("ui-state-disabled");
            s.cache === false && this.anchors.removeData("cache.tabs");
            this.lis.add(this.anchors).unbind(".tabs");
            if (s.event !== "mouseover") {
                var a = function (e, t) {
                    t.is(":not(.ui-state-disabled)") && t.addClass("ui-state-" + e)
                }, f = function (e, t) {
                    t.removeClass("ui-state-" + e)
                };
                this.lis.bind("mouseover.tabs", function () {
                    a("hover", e(this))
                });
                this.lis.bind("mouseout.tabs", function () {
                    f("hover", e(this))
                });
                this.anchors.bind("focus.tabs", function () {
                    a("focus", e(this).closest("li"))
                });
                this.anchors.bind("blur.tabs", function () {
                    f("focus", e(this).closest("li"))
                })
            }
            var l, c;
            if (s.fx)if (e.isArray(s.fx)) {
                l = s.fx[0];
                c = s.fx[1]
            } else l = c = s.fx;
            var h = c ? function (t, n) {
                e(t).closest("li").addClass("ui-tabs-selected ui-state-active");
                n.hide().removeClass("ui-tabs-hide").animate(c, c.duration || "normal", function () {
                    r(n, c);
                    i._trigger("show", null, i._ui(t, n[0]))
                })
            } : function (t, n) {
                e(t).closest("li").addClass("ui-tabs-selected ui-state-active");
                n.removeClass("ui-tabs-hide");
                i._trigger("show", null, i._ui(t, n[0]))
            }, v = l ? function (e, t) {
                t.animate(l, l.duration || "normal", function () {
                    i.lis.removeClass("ui-tabs-selected ui-state-active");
                    t.addClass("ui-tabs-hide");
                    r(t, l);
                    i.element.dequeue("tabs")
                })
            } : function (e, t) {
                i.lis.removeClass("ui-tabs-selected ui-state-active");
                t.addClass("ui-tabs-hide");
                i.element.dequeue("tabs")
            };
            this.anchors.bind(s.event + ".tabs", function () {
                var t = this, n = e(t).closest("li"), r = i.panels.filter(":not(.ui-tabs-hide)"), o = i.element.find(i._sanitizeSelector(t.hash));
                if (n.hasClass("ui-tabs-selected") && !s.collapsible || n.hasClass("ui-state-disabled") || n.hasClass("ui-state-processing") || i.panels.filter(":animated").length || i._trigger("select", null, i._ui(this, o[0])) === false) {
                    this.blur();
                    return false
                }
                s.selected = i.anchors.index(this);
                i.abort();
                if (s.collapsible)if (n.hasClass("ui-tabs-selected")) {
                    s.selected = -1;
                    s.cookie && i._cookie(s.selected, s.cookie);
                    i.element.queue("tabs", function () {
                        v(t, r)
                    }).dequeue("tabs");
                    this.blur();
                    return false
                } else if (!r.length) {
                    s.cookie && i._cookie(s.selected, s.cookie);
                    i.element.queue("tabs", function () {
                        h(t, o)
                    });
                    i.load(i.anchors.index(this));
                    this.blur();
                    return false
                }
                s.cookie && i._cookie(s.selected, s.cookie);
                if (o.length) {
                    r.length && i.element.queue("tabs", function () {
                        v(t, r)
                    });
                    i.element.queue("tabs", function () {
                        h(t, o)
                    });
                    i.load(i.anchors.index(this))
                } else throw"jQuery UI Tabs: Mismatching fragment identifier.";
                e.browser.msie && this.blur()
            });
            this.anchors.bind("click.tabs", function () {
                return false
            })
        }, _getIndex: function (e) {
            if (typeof e == "string")e = this.anchors.index(this.anchors.filter("[href$=" + e + "]"));
            return e
        }, destroy: function () {
            var t = this.options;
            this.abort();
            this.element.unbind(".tabs").removeClass("ui-tabs ui-widget ui-widget-content ui-corner-all ui-tabs-collapsible").removeData("tabs");
            this.list.removeClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all");
            this.anchors.each(function () {
                var t = e.data(this, "href.tabs");
                if (t)this.href = t;
                var n = e(this).unbind(".tabs");
                e.each(["href", "load", "cache"], function (e, t) {
                    n.removeData(t + ".tabs")
                })
            });
            this.lis.unbind(".tabs").add(this.panels).each(function () {
                e.data(this, "destroy.tabs") ? e(this).remove() : e(this).removeClass("ui-state-default ui-corner-top ui-tabs-selected ui-state-active ui-state-hover ui-state-focus ui-state-disabled ui-tabs-panel ui-widget-content ui-corner-bottom ui-tabs-hide")
            });
            t.cookie && this._cookie(null, t.cookie);
            return this
        }, add: function (t, r, i) {
            if (i === n)i = this.anchors.length;
            var s = this, o = this.options;
            r = e(o.tabTemplate.replace(/#\{href\}/g, t).replace(/#\{label\}/g, r));
            t = !t.indexOf("#") ? t.replace("#", "") : this._tabId(e("a", r)[0]);
            r.addClass("ui-state-default ui-corner-top").data("destroy.tabs", true);
            var u = s.element.find("#" + t);
            u.length || (u = e(o.panelTemplate).attr("id", t).data("destroy.tabs", true));
            u.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom ui-tabs-hide");
            if (i >= this.lis.length) {
                r.appendTo(this.list);
                u.appendTo(this.list[0].parentNode)
            } else {
                r.insertBefore(this.lis[i]);
                u.insertBefore(this.panels[i])
            }
            o.disabled = e.map(o.disabled, function (e) {
                return e >= i ? ++e : e
            });
            this._tabify();
            if (this.anchors.length == 1) {
                o.selected = 0;
                r.addClass("ui-tabs-selected ui-state-active");
                u.removeClass("ui-tabs-hide");
                this.element.queue("tabs", function () {
                    s._trigger("show", null, s._ui(s.anchors[0], s.panels[0]))
                });
                this.load(0)
            }
            this._trigger("add", null, this._ui(this.anchors[i], this.panels[i]));
            return this
        }, remove: function (t) {
            t = this._getIndex(t);
            var n = this.options, r = this.lis.eq(t).remove(), i = this.panels.eq(t).remove();
            if (r.hasClass("ui-tabs-selected") && this.anchors.length > 1)this.select(t + (t + 1 < this.anchors.length ? 1 : -1));
            n.disabled = e.map(e.grep(n.disabled, function (e) {
                return e != t
            }), function (e) {
                return e >= t ? --e : e
            });
            this._tabify();
            this._trigger("remove", null, this._ui(r.find("a")[0], i[0]));
            return this
        }, enable: function (t) {
            t = this._getIndex(t);
            var n = this.options;
            if (e.inArray(t, n.disabled) != -1) {
                this.lis.eq(t).removeClass("ui-state-disabled");
                n.disabled = e.grep(n.disabled, function (e) {
                    return e != t
                });
                this._trigger("enable", null, this._ui(this.anchors[t], this.panels[t]));
                return this
            }
        }, disable: function (e) {
            e = this._getIndex(e);
            var t = this.options;
            if (e != t.selected) {
                this.lis.eq(e).addClass("ui-state-disabled");
                t.disabled.push(e);
                t.disabled.sort();
                this._trigger("disable", null, this._ui(this.anchors[e], this.panels[e]))
            }
            return this
        }, select: function (e) {
            e = this._getIndex(e);
            if (e == -1)if (this.options.collapsible && this.options.selected != -1)e = this.options.selected; else return this;
            this.anchors.eq(e).trigger(this.options.event + ".tabs");
            return this
        }, load: function (t) {
            t = this._getIndex(t);
            var n = this, r = this.options, i = this.anchors.eq(t)[0], s = e.data(i, "load.tabs");
            this.abort();
            if (!s || this.element.queue("tabs").length !== 0 && e.data(i, "cache.tabs"))this.element.dequeue("tabs"); else {
                this.lis.eq(t).addClass("ui-state-processing");
                if (r.spinner) {
                    var o = e("span", i);
                    o.data("label.tabs", o.html()).html(r.spinner)
                }
                this.xhr = e.ajax(e.extend({}, r.ajaxOptions, {
                    url: s, success: function (s, o) {
                        n.element.find(n._sanitizeSelector(i.hash)).html(s);
                        n._cleanup();
                        r.cache && e.data(i, "cache.tabs", true);
                        n._trigger("load", null, n._ui(n.anchors[t], n.panels[t]));
                        try {
                            r.ajaxOptions.success(s, o)
                        } catch (u) {
                        }
                    }, error: function (e, s) {
                        n._cleanup();
                        n._trigger("load", null, n._ui(n.anchors[t], n.panels[t]));
                        try {
                            r.ajaxOptions.error(e, s, t, i)
                        } catch (o) {
                        }
                    }
                }));
                n.element.dequeue("tabs");
                return this
            }
        }, abort: function () {
            this.element.queue([]);
            this.panels.stop(false, true);
            this.element.queue("tabs", this.element.queue("tabs").splice(-2, 2));
            if (this.xhr) {
                this.xhr.abort();
                delete this.xhr
            }
            this._cleanup();
            return this
        }, url: function (e, t) {
            this.anchors.eq(e).removeData("cache.tabs").data("load.tabs", t);
            return this
        }, length: function () {
            return this.anchors.length
        }
    });
    e.extend(e.ui.tabs, {version: "1.8.16"});
    e.extend(e.ui.tabs.prototype, {
        rotation: null, rotate: function (e, n) {
            var r = this, i = this.options, s = r._rotate || (r._rotate = function (t) {
                    clearTimeout(r.rotation);
                    r.rotation = setTimeout(function () {
                        var e = i.selected;
                        r.select(++e < r.anchors.length ? e : 0)
                    }, e);
                    t && t.stopPropagation()
                });
            n = r._unrotate || (r._unrotate = !n ? function (e) {
                    e.clientX && r.rotate(null)
                } : function () {
                    t = i.selected;
                    s()
                });
            if (e) {
                this.element.bind("tabsshow", s);
                this.anchors.bind(i.event + ".tabs", n);
                s()
            } else {
                clearTimeout(r.rotation);
                this.element.unbind("tabsshow", s);
                this.anchors.unbind(i.event + ".tabs", n);
                delete this._rotate;
                delete this._unrotate
            }
            return this
        }
    })
})(jQuery);
(function (d, C) {
    function M() {
        this.debug = false;
        this._curInst = null;
        this._keyEvent = false;
        this._disabledInputs = [];
        this._inDialog = this._datepickerShowing = false;
        this._mainDivId = "ui-datepicker-div";
        this._inlineClass = "ui-datepicker-inline";
        this._appendClass = "ui-datepicker-append";
        this._triggerClass = "ui-datepicker-trigger";
        this._dialogClass = "ui-datepicker-dialog";
        this._disableClass = "ui-datepicker-disabled";
        this._unselectableClass = "ui-datepicker-unselectable";
        this._currentClass = "ui-datepicker-current-day";
        this._dayOverClass = "ui-datepicker-days-cell-over";
        this.regional = [];
        this.regional[""] = {
            closeText: "Done",
            prevText: "Prev",
            nextText: "Next",
            currentText: "Today",
            monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            dayNamesMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
            weekHeader: "Wk",
            dateFormat: "mm/dd/yy",
            firstDay: 0,
            isRTL: false,
            showMonthAfterYear: false,
            yearSuffix: ""
        };
        this._defaults = {
            showOn: "focus",
            showAnim: "fadeIn",
            showOptions: {},
            defaultDate: null,
            appendText: "",
            buttonText: "...",
            buttonImage: "",
            buttonImageOnly: false,
            hideIfNoPrevNext: false,
            navigationAsDateFormat: false,
            gotoCurrent: false,
            changeMonth: false,
            changeYear: false,
            yearRange: "c-10:c+10",
            showOtherMonths: false,
            selectOtherMonths: false,
            showWeek: false,
            calculateWeek: this.iso8601Week,
            shortYearCutoff: "+10",
            minDate: null,
            maxDate: null,
            duration: "fast",
            beforeShowDay: null,
            beforeShow: null,
            onSelect: null,
            onChangeMonthYear: null,
            onClose: null,
            numberOfMonths: 1,
            showCurrentAtPos: 0,
            stepMonths: 1,
            stepBigMonths: 12,
            altField: "",
            altFormat: "",
            constrainInput: true,
            showButtonPanel: false,
            autoSize: false,
            disabled: false
        };
        d.extend(this._defaults, this.regional[""]);
        this.dpDiv = N(d('<div id="' + this._mainDivId + '" class="ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"></div>'))
    }

    function N(e) {
        return e.bind("mouseout", function (e) {
            e = d(e.target).closest("button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a");
            e.length && e.removeClass("ui-state-hover ui-datepicker-prev-hover ui-datepicker-next-hover")
        }).bind("mouseover", function (t) {
            t = d(t.target).closest("button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a");
            if (!(d.datepicker._isDisabledDatepicker(J.inline ? e.parent()[0] : J.input[0]) || !t.length)) {
                t.parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover");
                t.addClass("ui-state-hover");
                t.hasClass("ui-datepicker-prev") && t.addClass("ui-datepicker-prev-hover");
                t.hasClass("ui-datepicker-next") && t.addClass("ui-datepicker-next-hover")
            }
        })
    }

    function H(e, t) {
        d.extend(e, t);
        for (var n in t)if (t[n] == null || t[n] == C)e[n] = t[n];
        return e
    }

    d.extend(d.ui, {datepicker: {version: "1.8.16"}});
    var B = (new Date).getTime(), J;
    d.extend(M.prototype, {
        markerClassName: "hasDatepicker",
        maxRows: 4,
        log: function () {
            this.debug && console.log.apply("", arguments)
        },
        _widgetDatepicker: function () {
            return this.dpDiv
        },
        setDefaults: function (e) {
            H(this._defaults, e || {});
            return this
        },
        _attachDatepicker: function (a, b) {
            var c = null;
            for (var e in this._defaults) {
                var f = a.getAttribute("date:" + e);
                if (f) {
                    c = c || {};
                    try {
                        c[e] = eval(f)
                    } catch (h) {
                        c[e] = f
                    }
                }
            }
            e = a.nodeName.toLowerCase();
            f = e == "div" || e == "span";
            if (!a.id) {
                this.uuid += 1;
                a.id = "dp" + this.uuid
            }
            var i = this._newInst(d(a), f);
            i.settings = d.extend({}, b || {}, c || {});
            if (e == "input")this._connectDatepicker(a, i); else f && this._inlineDatepicker(a, i)
        },
        _newInst: function (e, t) {
            return {
                id: e[0].id.replace(/([^A-Za-z0-9_-])/g, "\\\\$1"),
                input: e,
                selectedDay: 0,
                selectedMonth: 0,
                selectedYear: 0,
                drawMonth: 0,
                drawYear: 0,
                inline: t,
                dpDiv: !t ? this.dpDiv : N(d('<div class="' + this._inlineClass + ' ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"></div>'))
            }
        },
        _connectDatepicker: function (e, t) {
            var n = d(e);
            t.append = d([]);
            t.trigger = d([]);
            if (!n.hasClass(this.markerClassName)) {
                this._attachments(n, t);
                n.addClass(this.markerClassName).keydown(this._doKeyDown).keypress(this._doKeyPress).keyup(this._doKeyUp).bind("setData.datepicker", function (e, n, r) {
                    t.settings[n] = r
                }).bind("getData.datepicker", function (e, n) {
                    return this._get(t, n)
                });
                this._autoSize(t);
                d.data(e, "datepicker", t);
                t.settings.disabled && this._disableDatepicker(e)
            }
        },
        _attachments: function (e, t) {
            var n = this._get(t, "appendText"), r = this._get(t, "isRTL");
            t.append && t.append.remove();
            if (n) {
                t.append = d('<span class="' + this._appendClass + '">' + n + "</span>");
                e[r ? "before" : "after"](t.append)
            }
            e.unbind("focus", this._showDatepicker);
            t.trigger && t.trigger.remove();
            n = this._get(t, "showOn");
            if (n == "focus" || n == "both")e.focus(this._showDatepicker);
            if (n == "button" || n == "both") {
                n = this._get(t, "buttonText");
                var i = this._get(t, "buttonImage");
                t.trigger = d(this._get(t, "buttonImageOnly") ? d("<img/>").addClass(this._triggerClass).attr({
                    src: i,
                    alt: n,
                    title: n
                }) : d('<button type="button"></button>').addClass(this._triggerClass).html(i == "" ? n : d("<img/>").attr({
                    src: i,
                    alt: n,
                    title: n
                })));
                e[r ? "before" : "after"](t.trigger);
                t.trigger.click(function () {
                    d.datepicker._datepickerShowing && d.datepicker._lastInput == e[0] ? d.datepicker._hideDatepicker() : d.datepicker._showDatepicker(e[0]);
                    return false
                })
            }
        },
        _autoSize: function (e) {
            if (this._get(e, "autoSize") && !e.inline) {
                var t = new Date(2009, 11, 20), n = this._get(e, "dateFormat");
                if (n.match(/[DM]/)) {
                    var r = function (e) {
                        for (var t = 0, n = 0, r = 0; r < e.length; r++)if (e[r].length > t) {
                            t = e[r].length;
                            n = r
                        }
                        return n
                    };
                    t.setMonth(r(this._get(e, n.match(/MM/) ? "monthNames" : "monthNamesShort")));
                    t.setDate(r(this._get(e, n.match(/DD/) ? "dayNames" : "dayNamesShort")) + 20 - t.getDay())
                }
                e.input.attr("size", this._formatDate(e, t).length)
            }
        },
        _inlineDatepicker: function (e, t) {
            var n = d(e);
            if (!n.hasClass(this.markerClassName)) {
                n.addClass(this.markerClassName).append(t.dpDiv).bind("setData.datepicker", function (e, n, r) {
                    t.settings[n] = r
                }).bind("getData.datepicker", function (e, n) {
                    return this._get(t, n)
                });
                d.data(e, "datepicker", t);
                this._setDate(t, this._getDefaultDate(t), true);
                this._updateDatepicker(t);
                this._updateAlternate(t);
                t.settings.disabled && this._disableDatepicker(e);
                t.dpDiv.css("display", "block")
            }
        },
        _dialogDatepicker: function (e, t, n, r, i) {
            e = this._dialogInst;
            if (!e) {
                this.uuid += 1;
                this._dialogInput = d('<input type="text" id="' + ("dp" + this.uuid) + '" style="position: absolute; top: -100px; width: 0px; z-index: -10;"/>');
                this._dialogInput.keydown(this._doKeyDown);
                d("body").append(this._dialogInput);
                e = this._dialogInst = this._newInst(this._dialogInput, false);
                e.settings = {};
                d.data(this._dialogInput[0], "datepicker", e)
            }
            H(e.settings, r || {});
            t = t && t.constructor == Date ? this._formatDate(e, t) : t;
            this._dialogInput.val(t);
            this._pos = i ? i.length ? i : [i.pageX, i.pageY] : null;
            if (!this._pos)this._pos = [document.documentElement.clientWidth / 2 - 100 + (document.documentElement.scrollLeft || document.body.scrollLeft), document.documentElement.clientHeight / 2 - 150 + (document.documentElement.scrollTop || document.body.scrollTop)];
            this._dialogInput.css("left", this._pos[0] + 20 + "px").css("top", this._pos[1] + "px");
            e.settings.onSelect = n;
            this._inDialog = true;
            this.dpDiv.addClass(this._dialogClass);
            this._showDatepicker(this._dialogInput[0]);
            d.blockUI && d.blockUI(this.dpDiv);
            d.data(this._dialogInput[0], "datepicker", e);
            return this
        },
        _destroyDatepicker: function (e) {
            var t = d(e), n = d.data(e, "datepicker");
            if (t.hasClass(this.markerClassName)) {
                var r = e.nodeName.toLowerCase();
                d.removeData(e, "datepicker");
                if (r == "input") {
                    n.append.remove();
                    n.trigger.remove();
                    t.removeClass(this.markerClassName).unbind("focus", this._showDatepicker).unbind("keydown", this._doKeyDown).unbind("keypress", this._doKeyPress).unbind("keyup", this._doKeyUp)
                } else if (r == "div" || r == "span")t.removeClass(this.markerClassName).empty()
            }
        },
        _enableDatepicker: function (e) {
            var t = d(e), n = d.data(e, "datepicker");
            if (t.hasClass(this.markerClassName)) {
                var r = e.nodeName.toLowerCase();
                if (r == "input") {
                    e.disabled = false;
                    n.trigger.filter("button").each(function () {
                        this.disabled = false
                    }).end().filter("img").css({opacity: "1.0", cursor: ""})
                } else if (r == "div" || r == "span") {
                    t = t.children("." + this._inlineClass);
                    t.children().removeClass("ui-state-disabled");
                    t.find("select.ui-datepicker-month, select.ui-datepicker-year").removeAttr("disabled")
                }
                this._disabledInputs = d.map(this._disabledInputs, function (t) {
                    return t == e ? null : t
                })
            }
        },
        _disableDatepicker: function (e) {
            var t = d(e), n = d.data(e, "datepicker");
            if (t.hasClass(this.markerClassName)) {
                var r = e.nodeName.toLowerCase();
                if (r == "input") {
                    e.disabled = true;
                    n.trigger.filter("button").each(function () {
                        this.disabled = true
                    }).end().filter("img").css({opacity: "0.5", cursor: "default"})
                } else if (r == "div" || r == "span") {
                    t = t.children("." + this._inlineClass);
                    t.children().addClass("ui-state-disabled");
                    t.find("select.ui-datepicker-month, select.ui-datepicker-year").attr("disabled", "disabled")
                }
                this._disabledInputs = d.map(this._disabledInputs, function (t) {
                    return t == e ? null : t
                });
                this._disabledInputs[this._disabledInputs.length] = e
            }
        },
        _isDisabledDatepicker: function (e) {
            if (!e)return false;
            for (var t = 0; t < this._disabledInputs.length; t++)if (this._disabledInputs[t] == e)return true;
            return false
        },
        _getInst: function (e) {
            try {
                return d.data(e, "datepicker")
            } catch (t) {
                throw"Missing instance data for this datepicker"
            }
        },
        _optionDatepicker: function (e, t, n) {
            var r = this._getInst(e);
            if (arguments.length == 2 && typeof t == "string")return t == "defaults" ? d.extend({}, d.datepicker._defaults) : r ? t == "all" ? d.extend({}, r.settings) : this._get(r, t) : null;
            var i = t || {};
            if (typeof t == "string") {
                i = {};
                i[t] = n
            }
            if (r) {
                this._curInst == r && this._hideDatepicker();
                var s = this._getDateDatepicker(e, true), o = this._getMinMaxDate(r, "min"), u = this._getMinMaxDate(r, "max");
                H(r.settings, i);
                if (o !== null && i.dateFormat !== C && i.minDate === C)r.settings.minDate = this._formatDate(r, o);
                if (u !== null && i.dateFormat !== C && i.maxDate === C)r.settings.maxDate = this._formatDate(r, u);
                this._attachments(d(e), r);
                this._autoSize(r);
                this._setDate(r, s);
                this._updateAlternate(r);
                this._updateDatepicker(r)
            }
        },
        _changeDatepicker: function (e, t, n) {
            this._optionDatepicker(e, t, n)
        },
        _refreshDatepicker: function (e) {
            (e = this._getInst(e)) && this._updateDatepicker(e)
        },
        _setDateDatepicker: function (e, t) {
            if (e = this._getInst(e)) {
                this._setDate(e, t);
                this._updateDatepicker(e);
                this._updateAlternate(e)
            }
        },
        _getDateDatepicker: function (e, t) {
            (e = this._getInst(e)) && !e.inline && this._setDateFromField(e, t);
            return e ? this._getDate(e) : null
        },
        _doKeyDown: function (e) {
            var t = d.datepicker._getInst(e.target), n = true, r = t.dpDiv.is(".ui-datepicker-rtl");
            t._keyEvent = true;
            if (d.datepicker._datepickerShowing)switch (e.keyCode) {
                case 9:
                    d.datepicker._hideDatepicker();
                    n = false;
                    break;
                case 13:
                    n = d("td." + d.datepicker._dayOverClass + ":not(." + d.datepicker._currentClass + ")", t.dpDiv);
                    n[0] && d.datepicker._selectDay(e.target, t.selectedMonth, t.selectedYear, n[0]);
                    if (e = d.datepicker._get(t, "onSelect")) {
                        n = d.datepicker._formatDate(t);
                        e.apply(t.input ? t.input[0] : null, [n, t])
                    } else d.datepicker._hideDatepicker();
                    return false;
                case 27:
                    d.datepicker._hideDatepicker();
                    break;
                case 33:
                    d.datepicker._adjustDate(e.target, e.ctrlKey ? -d.datepicker._get(t, "stepBigMonths") : -d.datepicker._get(t, "stepMonths"), "M");
                    break;
                case 34:
                    d.datepicker._adjustDate(e.target, e.ctrlKey ? +d.datepicker._get(t, "stepBigMonths") : +d.datepicker._get(t, "stepMonths"), "M");
                    break;
                case 35:
                    if (e.ctrlKey || e.metaKey)d.datepicker._clearDate(e.target);
                    n = e.ctrlKey || e.metaKey;
                    break;
                case 36:
                    if (e.ctrlKey || e.metaKey)d.datepicker._gotoToday(e.target);
                    n = e.ctrlKey || e.metaKey;
                    break;
                case 37:
                    if (e.ctrlKey || e.metaKey)d.datepicker._adjustDate(e.target, r ? +1 : -1, "D");
                    n = e.ctrlKey || e.metaKey;
                    if (e.originalEvent.altKey)d.datepicker._adjustDate(e.target, e.ctrlKey ? -d.datepicker._get(t, "stepBigMonths") : -d.datepicker._get(t, "stepMonths"), "M");
                    break;
                case 38:
                    if (e.ctrlKey || e.metaKey)d.datepicker._adjustDate(e.target, -7, "D");
                    n = e.ctrlKey || e.metaKey;
                    break;
                case 39:
                    if (e.ctrlKey || e.metaKey)d.datepicker._adjustDate(e.target, r ? -1 : +1, "D");
                    n = e.ctrlKey || e.metaKey;
                    if (e.originalEvent.altKey)d.datepicker._adjustDate(e.target, e.ctrlKey ? +d.datepicker._get(t, "stepBigMonths") : +d.datepicker._get(t, "stepMonths"), "M");
                    break;
                case 40:
                    if (e.ctrlKey || e.metaKey)d.datepicker._adjustDate(e.target, +7, "D");
                    n = e.ctrlKey || e.metaKey;
                    break;
                default:
                    n = false
            } else if (e.keyCode == 36 && e.ctrlKey)d.datepicker._showDatepicker(this); else n = false;
            if (n) {
                e.preventDefault();
                e.stopPropagation()
            }
        },
        _doKeyPress: function (e) {
            var t = d.datepicker._getInst(e.target);
            if (d.datepicker._get(t, "constrainInput")) {
                t = d.datepicker._possibleChars(d.datepicker._get(t, "dateFormat"));
                var n = String.fromCharCode(e.charCode == C ? e.keyCode : e.charCode);
                return e.ctrlKey || e.metaKey || n < " " || !t || t.indexOf(n) > -1
            }
        },
        _doKeyUp: function (e) {
            e = d.datepicker._getInst(e.target);
            if (e.input.val() != e.lastVal)try {
                if (d.datepicker.parseDate(d.datepicker._get(e, "dateFormat"), e.input ? e.input.val() : null, d.datepicker._getFormatConfig(e))) {
                    d.datepicker._setDateFromField(e);
                    d.datepicker._updateAlternate(e);
                    d.datepicker._updateDatepicker(e)
                }
            } catch (t) {
                d.datepicker.log(t)
            }
            return true
        },
        _showDatepicker: function (e) {
            e = e.target || e;
            if (e.nodeName.toLowerCase() != "input")e = d("input", e.parentNode)[0];
            if (!(d.datepicker._isDisabledDatepicker(e) || d.datepicker._lastInput == e)) {
                var t = d.datepicker._getInst(e);
                if (d.datepicker._curInst && d.datepicker._curInst != t) {
                    d.datepicker._datepickerShowing && d.datepicker._triggerOnClose(d.datepicker._curInst);
                    d.datepicker._curInst.dpDiv.stop(true, true)
                }
                var n = d.datepicker._get(t, "beforeShow");
                n = n ? n.apply(e, [e, t]) : {};
                if (n !== false) {
                    H(t.settings, n);
                    t.lastVal = null;
                    d.datepicker._lastInput = e;
                    d.datepicker._setDateFromField(t);
                    if (d.datepicker._inDialog)e.value = "";
                    if (!d.datepicker._pos) {
                        d.datepicker._pos = d.datepicker._findPos(e);
                        d.datepicker._pos[1] += e.offsetHeight
                    }
                    var r = false;
                    d(e).parents().each(function () {
                        r |= d(this).css("position") == "fixed";
                        return !r
                    });
                    if (r && d.browser.opera) {
                        d.datepicker._pos[0] -= document.documentElement.scrollLeft;
                        d.datepicker._pos[1] -= document.documentElement.scrollTop
                    }
                    n = {left: d.datepicker._pos[0], top: d.datepicker._pos[1]};
                    d.datepicker._pos = null;
                    t.dpDiv.empty();
                    t.dpDiv.css({position: "absolute", display: "block", top: "-1000px"});
                    d.datepicker._updateDatepicker(t);
                    n = d.datepicker._checkOffset(t, n, r);
                    t.dpDiv.css({
                        position: d.datepicker._inDialog && d.blockUI ? "static" : r ? "fixed" : "absolute",
                        display: "none",
                        left: n.left + "px",
                        top: n.top + "px"
                    });
                    if (!t.inline) {
                        n = d.datepicker._get(t, "showAnim");
                        var i = d.datepicker._get(t, "duration"), s = function () {
                            var e = t.dpDiv.find("iframe.ui-datepicker-cover");
                            if (e.length) {
                                var n = d.datepicker._getBorders(t.dpDiv);
                                e.css({
                                    left: -n[0],
                                    top: -n[1],
                                    width: t.dpDiv.outerWidth(),
                                    height: t.dpDiv.outerHeight()
                                })
                            }
                        };
                        t.dpDiv.zIndex(d(e).zIndex() + 1);
                        d.datepicker._datepickerShowing = true;
                        d.effects && d.effects[n] ? t.dpDiv.show(n, d.datepicker._get(t, "showOptions"), i, s) : t.dpDiv[n || "show"](n ? i : null, s);
                        if (!n || !i)s();
                        t.input.is(":visible") && !t.input.is(":disabled") && t.input.focus();
                        d.datepicker._curInst = t
                    }
                }
            }
        },
        _updateDatepicker: function (e) {
            this.maxRows = 4;
            var t = d.datepicker._getBorders(e.dpDiv);
            J = e;
            e.dpDiv.empty().append(this._generateHTML(e));
            var n = e.dpDiv.find("iframe.ui-datepicker-cover");
            n.length && n.css({left: -t[0], top: -t[1], width: e.dpDiv.outerWidth(), height: e.dpDiv.outerHeight()});
            e.dpDiv.find("." + this._dayOverClass + " a").mouseover();
            t = this._getNumberOfMonths(e);
            n = t[1];
            e.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width("");
            n > 1 && e.dpDiv.addClass("ui-datepicker-multi-" + n).css("width", 17 * n + "em");
            e.dpDiv[(t[0] != 1 || t[1] != 1 ? "add" : "remove") + "Class"]("ui-datepicker-multi");
            e.dpDiv[(this._get(e, "isRTL") ? "add" : "remove") + "Class"]("ui-datepicker-rtl");
            e == d.datepicker._curInst && d.datepicker._datepickerShowing && e.input && e.input.is(":visible") && !e.input.is(":disabled") && e.input[0] != document.activeElement && e.input.focus();
            if (e.yearshtml) {
                var r = e.yearshtml;
                setTimeout(function () {
                    r === e.yearshtml && e.yearshtml && e.dpDiv.find("select.ui-datepicker-year:first").replaceWith(e.yearshtml);
                    r = e.yearshtml = null
                }, 0)
            }
        },
        _getBorders: function (e) {
            var t = function (e) {
                return {thin: 1, medium: 2, thick: 3}[e] || e
            };
            return [parseFloat(t(e.css("border-left-width"))), parseFloat(t(e.css("border-top-width")))]
        },
        _checkOffset: function (e, t, n) {
            var r = e.dpDiv.outerWidth(), i = e.dpDiv.outerHeight(), s = e.input ? e.input.outerWidth() : 0, o = e.input ? e.input.outerHeight() : 0, u = document.documentElement.clientWidth + d(document).scrollLeft(), a = document.documentElement.clientHeight + d(document).scrollTop();
            t.left -= this._get(e, "isRTL") ? r - s : 0;
            t.left -= n && t.left == e.input.offset().left ? d(document).scrollLeft() : 0;
            t.top -= n && t.top == e.input.offset().top + o ? d(document).scrollTop() : 0;
            t.left -= Math.min(t.left, t.left + r > u && u > r ? Math.abs(t.left + r - u) : 0);
            t.top -= Math.min(t.top, t.top + i > a && a > i ? Math.abs(i + o) : 0);
            return t
        },
        _findPos: function (e) {
            for (var t = this._get(this._getInst(e), "isRTL"); e && (e.type == "hidden" || e.nodeType != 1 || d.expr.filters.hidden(e));)e = e[t ? "previousSibling" : "nextSibling"];
            e = d(e).offset();
            return [e.left, e.top]
        },
        _triggerOnClose: function (e) {
            var t = this._get(e, "onClose");
            if (t)t.apply(e.input ? e.input[0] : null, [e.input ? e.input.val() : "", e])
        },
        _hideDatepicker: function (e) {
            var t = this._curInst;
            if (!(!t || e && t != d.data(e, "datepicker")))if (this._datepickerShowing) {
                e = this._get(t, "showAnim");
                var n = this._get(t, "duration"), r = function () {
                    d.datepicker._tidyDialog(t);
                    this._curInst = null
                };
                d.effects && d.effects[e] ? t.dpDiv.hide(e, d.datepicker._get(t, "showOptions"), n, r) : t.dpDiv[e == "slideDown" ? "slideUp" : e == "fadeIn" ? "fadeOut" : "hide"](e ? n : null, r);
                e || r();
                d.datepicker._triggerOnClose(t);
                this._datepickerShowing = false;
                this._lastInput = null;
                if (this._inDialog) {
                    this._dialogInput.css({position: "absolute", left: "0", top: "-100px"});
                    if (d.blockUI) {
                        d.unblockUI();
                        d("body").append(this.dpDiv)
                    }
                }
                this._inDialog = false
            }
        },
        _tidyDialog: function (e) {
            e.dpDiv.removeClass(this._dialogClass).unbind(".ui-datepicker-calendar")
        },
        _checkExternalClick: function (e) {
            if (d.datepicker._curInst) {
                e = d(e.target);
                e[0].id != d.datepicker._mainDivId && e.parents("#" + d.datepicker._mainDivId).length == 0 && !e.hasClass(d.datepicker.markerClassName) && !e.hasClass(d.datepicker._triggerClass) && d.datepicker._datepickerShowing && !(d.datepicker._inDialog && d.blockUI) && d.datepicker._hideDatepicker()
            }
        },
        _adjustDate: function (e, t, n) {
            e = d(e);
            var r = this._getInst(e[0]);
            if (!this._isDisabledDatepicker(e[0])) {
                this._adjustInstDate(r, t + (n == "M" ? this._get(r, "showCurrentAtPos") : 0), n);
                this._updateDatepicker(r)
            }
        },
        _gotoToday: function (e) {
            e = d(e);
            var t = this._getInst(e[0]);
            if (this._get(t, "gotoCurrent") && t.currentDay) {
                t.selectedDay = t.currentDay;
                t.drawMonth = t.selectedMonth = t.currentMonth;
                t.drawYear = t.selectedYear = t.currentYear
            } else {
                var n = new Date;
                t.selectedDay = n.getDate();
                t.drawMonth = t.selectedMonth = n.getMonth();
                t.drawYear = t.selectedYear = n.getFullYear()
            }
            this._notifyChange(t);
            this._adjustDate(e)
        },
        _selectMonthYear: function (e, t, n) {
            e = d(e);
            var r = this._getInst(e[0]);
            r["selected" + (n == "M" ? "Month" : "Year")] = r["draw" + (n == "M" ? "Month" : "Year")] = parseInt(t.options[t.selectedIndex].value, 10);
            this._notifyChange(r);
            this._adjustDate(e)
        },
        _selectDay: function (e, t, n, r) {
            var i = d(e);
            if (!(d(r).hasClass(this._unselectableClass) || this._isDisabledDatepicker(i[0]))) {
                i = this._getInst(i[0]);
                i.selectedDay = i.currentDay = d("a", r).html();
                i.selectedMonth = i.currentMonth = t;
                i.selectedYear = i.currentYear = n;
                this._selectDate(e, this._formatDate(i, i.currentDay, i.currentMonth, i.currentYear))
            }
        },
        _clearDate: function (e) {
            e = d(e);
            this._getInst(e[0]);
            this._selectDate(e, "")
        },
        _selectDate: function (e, t) {
            e = this._getInst(d(e)[0]);
            t = t != null ? t : this._formatDate(e);
            e.input && e.input.val(t);
            this._updateAlternate(e);
            var n = this._get(e, "onSelect");
            if (n)n.apply(e.input ? e.input[0] : null, [t, e]); else e.input && e.input.trigger("change");
            if (e.inline)this._updateDatepicker(e); else {
                this._hideDatepicker();
                this._lastInput = e.input[0];
                typeof e.input[0] != "object" && e.input.focus();
                this._lastInput = null
            }
        },
        _updateAlternate: function (e) {
            var t = this._get(e, "altField");
            if (t) {
                var n = this._get(e, "altFormat") || this._get(e, "dateFormat"), r = this._getDate(e), i = this.formatDate(n, r, this._getFormatConfig(e));
                d(t).each(function () {
                    d(this).val(i)
                })
            }
        },
        noWeekends: function (e) {
            e = e.getDay();
            return [e > 0 && e < 6, ""]
        },
        iso8601Week: function (e) {
            e = new Date(e.getTime());
            e.setDate(e.getDate() + 4 - (e.getDay() || 7));
            var t = e.getTime();
            e.setMonth(0);
            e.setDate(1);
            return Math.floor(Math.round((t - e) / 864e5) / 7) + 1
        },
        parseDate: function (e, t, n) {
            if (e == null || t == null)throw"Invalid arguments";
            t = typeof t == "object" ? t.toString() : t + "";
            if (t == "")return null;
            var r = (n ? n.shortYearCutoff : null) || this._defaults.shortYearCutoff;
            r = typeof r != "string" ? r : (new Date).getFullYear() % 100 + parseInt(r, 10);
            for (var i = (n ? n.dayNamesShort : null) || this._defaults.dayNamesShort, s = (n ? n.dayNames : null) || this._defaults.dayNames, o = (n ? n.monthNamesShort : null) || this._defaults.monthNamesShort, u = (n ? n.monthNames : null) || this._defaults.monthNames, a = n = -1, f = -1, l = -1, c = false, h = function (t) {
                (t = y + 1 < e.length && e.charAt(y + 1) == t) && y++;
                return t
            }, p = function (e) {
                var n = h(e);
                e = new RegExp("^\\d{1," + (e == "@" ? 14 : e == "!" ? 20 : e == "y" && n ? 4 : e == "o" ? 3 : 2) + "}");
                e = t.substring(g).match(e);
                if (!e)throw"Missing number at position " + g;
                g += e[0].length;
                return parseInt(e[0], 10)
            }, v = function (e, n, r) {
                e = d.map(h(e) ? r : n, function (e, t) {
                    return [[t, e]]
                }).sort(function (e, t) {
                    return -(e[1].length - t[1].length)
                });
                var i = -1;
                d.each(e, function (e, n) {
                    e = n[1];
                    if (t.substr(g, e.length).toLowerCase() == e.toLowerCase()) {
                        i = n[0];
                        g += e.length;
                        return false
                    }
                });
                if (i != -1)return i + 1; else throw"Unknown name at position " + g
            }, m = function () {
                if (t.charAt(g) != e.charAt(y))throw"Unexpected literal at position " + g;
                g++
            }, g = 0, y = 0; y < e.length; y++)if (c)if (e.charAt(y) == "'" && !h("'"))c = false; else m(); else switch (e.charAt(y)) {
                case"d":
                    f = p("d");
                    break;
                case"D":
                    v("D", i, s);
                    break;
                case"o":
                    l = p("o");
                    break;
                case"m":
                    a = p("m");
                    break;
                case"M":
                    a = v("M", o, u);
                    break;
                case"y":
                    n = p("y");
                    break;
                case"@":
                    var b = new Date(p("@"));
                    n = b.getFullYear();
                    a = b.getMonth() + 1;
                    f = b.getDate();
                    break;
                case"!":
                    b = new Date((p("!") - this._ticksTo1970) / 1e4);
                    n = b.getFullYear();
                    a = b.getMonth() + 1;
                    f = b.getDate();
                    break;
                case"'":
                    if (h("'"))m(); else c = true;
                    break;
                default:
                    m()
            }
            if (g < t.length)throw"Extra/unparsed characters found in date: " + t.substring(g);
            if (n == -1)n = (new Date).getFullYear(); else if (n < 100)n += (new Date).getFullYear() - (new Date).getFullYear() % 100 + (n <= r ? 0 : -100);
            if (l > -1) {
                a = 1;
                f = l;
                do {
                    r = this._getDaysInMonth(n, a - 1);
                    if (f <= r)break;
                    a++;
                    f -= r
                } while (1)
            }
            b = this._daylightSavingAdjust(new Date(n, a - 1, f));
            if (b.getFullYear() != n || b.getMonth() + 1 != a || b.getDate() != f)throw"Invalid date";
            return b
        },
        ATOM: "yy-mm-dd",
        COOKIE: "D, dd M yy",
        ISO_8601: "yy-mm-dd",
        RFC_822: "D, d M y",
        RFC_850: "DD, dd-M-y",
        RFC_1036: "D, d M y",
        RFC_1123: "D, d M yy",
        RFC_2822: "D, d M yy",
        RSS: "D, d M y",
        TICKS: "!",
        TIMESTAMP: "@",
        W3C: "yy-mm-dd",
        _ticksTo1970: (718685 + Math.floor(492.5) - Math.floor(19.7) + Math.floor(4.925)) * 24 * 60 * 60 * 1e7,
        formatDate: function (e, t, n) {
            if (!t)return "";
            var r = (n ? n.dayNamesShort : null) || this._defaults.dayNamesShort, i = (n ? n.dayNames : null) || this._defaults.dayNames, s = (n ? n.monthNamesShort : null) || this._defaults.monthNamesShort;
            n = (n ? n.monthNames : null) || this._defaults.monthNames;
            var o = function (t) {
                (t = c + 1 < e.length && e.charAt(c + 1) == t) && c++;
                return t
            }, u = function (e, t, n) {
                t = "" + t;
                if (o(e))for (; t.length < n;)t = "0" + t;
                return t
            }, a = function (e, t, n, r) {
                return o(e) ? r[t] : n[t]
            }, f = "", l = false;
            if (t)for (var c = 0; c < e.length; c++)if (l)if (e.charAt(c) == "'" && !o("'"))l = false; else f += e.charAt(c); else switch (e.charAt(c)) {
                case"d":
                    f += u("d", t.getDate(), 2);
                    break;
                case"D":
                    f += a("D", t.getDay(), r, i);
                    break;
                case"o":
                    f += u("o", Math.round(((new Date(t.getFullYear(), t.getMonth(), t.getDate())).getTime() - (new Date(t.getFullYear(), 0, 0)).getTime()) / 864e5), 3);
                    break;
                case"m":
                    f += u("m", t.getMonth() + 1, 2);
                    break;
                case"M":
                    f += a("M", t.getMonth(), s, n);
                    break;
                case"y":
                    f += o("y") ? t.getFullYear() : (t.getYear() % 100 < 10 ? "0" : "") + t.getYear() % 100;
                    break;
                case"@":
                    f += t.getTime();
                    break;
                case"!":
                    f += t.getTime() * 1e4 + this._ticksTo1970;
                    break;
                case"'":
                    if (o("'"))f += "'"; else l = true;
                    break;
                default:
                    f += e.charAt(c)
            }
            return f
        },
        _possibleChars: function (e) {
            for (var t = "", n = false, r = function (t) {
                (t = i + 1 < e.length && e.charAt(i + 1) == t) && i++;
                return t
            }, i = 0; i < e.length; i++)if (n)if (e.charAt(i) == "'" && !r("'"))n = false; else t += e.charAt(i); else switch (e.charAt(i)) {
                case"d":
                case"m":
                case"y":
                case"@":
                    t += "0123456789";
                    break;
                case"D":
                case"M":
                    return null;
                case"'":
                    if (r("'"))t += "'"; else n = true;
                    break;
                default:
                    t += e.charAt(i)
            }
            return t
        },
        _get: function (e, t) {
            return e.settings[t] !== C ? e.settings[t] : this._defaults[t]
        },
        _setDateFromField: function (e, t) {
            if (e.input.val() != e.lastVal) {
                var n = this._get(e, "dateFormat"), r = e.lastVal = e.input ? e.input.val() : null, i, s;
                i = s = this._getDefaultDate(e);
                var o = this._getFormatConfig(e);
                try {
                    i = this.parseDate(n, r, o) || s
                } catch (u) {
                    this.log(u);
                    r = t ? "" : r
                }
                e.selectedDay = i.getDate();
                e.drawMonth = e.selectedMonth = i.getMonth();
                e.drawYear = e.selectedYear = i.getFullYear();
                e.currentDay = r ? i.getDate() : 0;
                e.currentMonth = r ? i.getMonth() : 0;
                e.currentYear = r ? i.getFullYear() : 0;
                this._adjustInstDate(e)
            }
        },
        _getDefaultDate: function (e) {
            return this._restrictMinMax(e, this._determineDate(e, this._get(e, "defaultDate"), new Date))
        },
        _determineDate: function (e, t, n) {
            var r = function (e) {
                var t = new Date;
                t.setDate(t.getDate() + e);
                return t
            }, i = function (t) {
                try {
                    return d.datepicker.parseDate(d.datepicker._get(e, "dateFormat"), t, d.datepicker._getFormatConfig(e))
                } catch (n) {
                }
                var r = (t.toLowerCase().match(/^c/) ? d.datepicker._getDate(e) : null) || new Date, i = r.getFullYear(), s = r.getMonth();
                r = r.getDate();
                for (var o = /([+-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g, u = o.exec(t); u;) {
                    switch (u[2] || "d") {
                        case"d":
                        case"D":
                            r += parseInt(u[1], 10);
                            break;
                        case"w":
                        case"W":
                            r += parseInt(u[1], 10) * 7;
                            break;
                        case"m":
                        case"M":
                            s += parseInt(u[1], 10);
                            r = Math.min(r, d.datepicker._getDaysInMonth(i, s));
                            break;
                        case"y":
                        case"Y":
                            i += parseInt(u[1], 10);
                            r = Math.min(r, d.datepicker._getDaysInMonth(i, s));
                            break
                    }
                    u = o.exec(t)
                }
                return new Date(i, s, r)
            };
            if (t = (t = t == null || t === "" ? n : typeof t == "string" ? i(t) : typeof t == "number" ? isNaN(t) ? n : r(t) : new Date(t.getTime())) && t.toString() == "Invalid Date" ? n : t) {
                t.setHours(0);
                t.setMinutes(0);
                t.setSeconds(0);
                t.setMilliseconds(0)
            }
            return this._daylightSavingAdjust(t)
        },
        _daylightSavingAdjust: function (e) {
            if (!e)return null;
            e.setHours(e.getHours() > 12 ? e.getHours() + 2 : 0);
            return e
        },
        _setDate: function (e, t, n) {
            var r = !t, i = e.selectedMonth, s = e.selectedYear;
            t = this._restrictMinMax(e, this._determineDate(e, t, new Date));
            e.selectedDay = e.currentDay = t.getDate();
            e.drawMonth = e.selectedMonth = e.currentMonth = t.getMonth();
            e.drawYear = e.selectedYear = e.currentYear = t.getFullYear();
            if ((i != e.selectedMonth || s != e.selectedYear) && !n)this._notifyChange(e);
            this._adjustInstDate(e);
            if (e.input)e.input.val(r ? "" : this._formatDate(e))
        },
        _getDate: function (e) {
            return !e.currentYear || e.input && e.input.val() == "" ? null : this._daylightSavingAdjust(new Date(e.currentYear, e.currentMonth, e.currentDay))
        },
        _generateHTML: function (e) {
            var t = new Date;
            t = this._daylightSavingAdjust(new Date(t.getFullYear(), t.getMonth(), t.getDate()));
            var n = this._get(e, "isRTL"), r = this._get(e, "showButtonPanel"), i = this._get(e, "hideIfNoPrevNext"), s = this._get(e, "navigationAsDateFormat"), o = this._getNumberOfMonths(e), u = this._get(e, "showCurrentAtPos"), a = this._get(e, "stepMonths"), f = o[0] != 1 || o[1] != 1, l = this._daylightSavingAdjust(!e.currentDay ? new Date(9999, 9, 9) : new Date(e.currentYear, e.currentMonth, e.currentDay)), c = this._getMinMaxDate(e, "min"), h = this._getMinMaxDate(e, "max");
            u = e.drawMonth - u;
            var p = e.drawYear;
            if (u < 0) {
                u += 12;
                p--
            }
            if (h) {
                var v = this._daylightSavingAdjust(new Date(h.getFullYear(), h.getMonth() - o[0] * o[1] + 1, h.getDate()));
                for (v = c && v < c ? c : v; this._daylightSavingAdjust(new Date(p, u, 1)) > v;) {
                    u--;
                    if (u < 0) {
                        u = 11;
                        p--
                    }
                }
            }
            e.drawMonth = u;
            e.drawYear = p;
            v = this._get(e, "prevText");
            v = !s ? v : this.formatDate(v, this._daylightSavingAdjust(new Date(p, u - a, 1)), this._getFormatConfig(e));
            v = this._canAdjustMonth(e, -1, p, u) ? '<a class="ui-datepicker-prev ui-corner-all" onclick="DP_jQuery_' + B + ".datepicker._adjustDate('#" + e.id + "', -" + a + ", 'M');\" title=\"" + v + '"><span class="ui-icon ui-icon-circle-triangle-' + (n ? "e" : "w") + '">' + v + "</span></a>" : i ? "" : '<a class="ui-datepicker-prev ui-corner-all ui-state-disabled" title="' + v + '"><span class="ui-icon ui-icon-circle-triangle-' + (n ? "e" : "w") + '">' + v + "</span></a>";
            var m = this._get(e, "nextText");
            m = !s ? m : this.formatDate(m, this._daylightSavingAdjust(new Date(p, u + a, 1)), this._getFormatConfig(e));
            i = this._canAdjustMonth(e, +1, p, u) ? '<a class="ui-datepicker-next ui-corner-all" onclick="DP_jQuery_' + B + ".datepicker._adjustDate('#" + e.id + "', +" + a + ", 'M');\" title=\"" + m + '"><span class="ui-icon ui-icon-circle-triangle-' + (n ? "w" : "e") + '">' + m + "</span></a>" : i ? "" : '<a class="ui-datepicker-next ui-corner-all ui-state-disabled" title="' + m + '"><span class="ui-icon ui-icon-circle-triangle-' + (n ? "w" : "e") + '">' + m + "</span></a>";
            a = this._get(e, "currentText");
            m = this._get(e, "gotoCurrent") && e.currentDay ? l : t;
            a = !s ? a : this.formatDate(a, m, this._getFormatConfig(e));
            s = !e.inline ? '<button type="button" class="ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all" onclick="DP_jQuery_' + B + '.datepicker._hideDatepicker();">' + this._get(e, "closeText") + "</button>" : "";
            r = r ? '<div class="ui-datepicker-buttonpane ui-widget-content">' + (n ? s : "") + (this._isInRange(e, m) ? '<button type="button" class="ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all" onclick="DP_jQuery_' + B + ".datepicker._gotoToday('#" + e.id + "');\">" + a + "</button>" : "") + (n ? "" : s) + "</div>" : "";
            s = parseInt(this._get(e, "firstDay"), 10);
            s = isNaN(s) ? 0 : s;
            a = this._get(e, "showWeek");
            m = this._get(e, "dayNames");
            this._get(e, "dayNamesShort");
            var g = this._get(e, "dayNamesMin"), y = this._get(e, "monthNames"), b = this._get(e, "monthNamesShort"), w = this._get(e, "beforeShowDay"), E = this._get(e, "showOtherMonths"), S = this._get(e, "selectOtherMonths");
            this._get(e, "calculateWeek");
            for (var x = this._getDefaultDate(e), T = "", N = 0; N < o[0]; N++) {
                var C = "";
                this.maxRows = 4;
                for (var k = 0; k < o[1]; k++) {
                    var L = this._daylightSavingAdjust(new Date(p, u, e.selectedDay)), A = " ui-corner-all", O = "";
                    if (f) {
                        O += '<div class="ui-datepicker-group';
                        if (o[1] > 1)switch (k) {
                            case 0:
                                O += " ui-datepicker-group-first";
                                A = " ui-corner-" + (n ? "right" : "left");
                                break;
                            case o[1] - 1:
                                O += " ui-datepicker-group-last";
                                A = " ui-corner-" + (n ? "left" : "right");
                                break;
                            default:
                                O += " ui-datepicker-group-middle";
                                A = "";
                                break
                        }
                        O += '">'
                    }
                    O += '<div class="ui-datepicker-header ui-widget-header ui-helper-clearfix' + A + '">' + (/all|left/.test(A) && N == 0 ? n ? i : v : "") + (/all|right/.test(A) && N == 0 ? n ? v : i : "") + this._generateMonthYearHeader(e, u, p, c, h, N > 0 || k > 0, y, b) + '</div><table class="ui-datepicker-calendar"><thead><tr>';
                    var M = a ? '<th class="ui-datepicker-week-col">' + this._get(e, "weekHeader") + "</th>" : "";
                    for (A = 0; A < 7; A++) {
                        var _ = (A + s) % 7;
                        M += "<th" + ((A + s + 6) % 7 >= 5 ? ' class="ui-datepicker-week-end"' : "") + '><span title="' + m[_] + '">' + g[_] + "</span></th>"
                    }
                    O += M + "</tr></thead><tbody>";
                    M = this._getDaysInMonth(p, u);
                    if (p == e.selectedYear && u == e.selectedMonth)e.selectedDay = Math.min(e.selectedDay, M);
                    A = (this._getFirstDayOfMonth(p, u) - s + 7) % 7;
                    M = Math.ceil((A + M) / 7);
                    this.maxRows = M = f ? this.maxRows > M ? this.maxRows : M : M;
                    _ = this._daylightSavingAdjust(new Date(p, u, 1 - A));
                    for (var D = 0; D < M; D++) {
                        O += "<tr>";
                        var P = !a ? "" : '<td class="ui-datepicker-week-col">' + this._get(e, "calculateWeek")(_) + "</td>";
                        for (A = 0; A < 7; A++) {
                            var H = w ? w.apply(e.input ? e.input[0] : null, [_]) : [true, ""], j = _.getMonth() != u, F = j && !S || !H[0] || c && _ < c || h && _ > h;
                            P += '<td class="' + ((A + s + 6) % 7 >= 5 ? " ui-datepicker-week-end" : "") + (j ? " ui-datepicker-other-month" : "") + (_.getTime() == L.getTime() && u == e.selectedMonth && e._keyEvent || x.getTime() == _.getTime() && x.getTime() == L.getTime() ? " " + this._dayOverClass : "") + (F ? " " + this._unselectableClass + " ui-state-disabled" : "") + (j && !E ? "" : " " + H[1] + (_.getTime() == l.getTime() ? " " + this._currentClass : "") + (_.getTime() == t.getTime() ? " ui-datepicker-today" : "")) + '"' + ((!j || E) && H[2] ? ' title="' + H[2] + '"' : "") + (F ? "" : ' onclick="DP_jQuery_' + B + ".datepicker._selectDay('#" + e.id + "'," + _.getMonth() + "," + _.getFullYear() + ', this);return false;"') + ">" + (j && !E ? "&#xa0;" : F ? '<span class="ui-state-default">' + _.getDate() + "</span>" : '<a class="ui-state-default' + (_.getTime() == t.getTime() ? " ui-state-highlight" : "") + (_.getTime() == l.getTime() ? " ui-state-active" : "") + (j ? " ui-priority-secondary" : "") + '" href="#">' + _.getDate() + "</a>") + "</td>";
                            _.setDate(_.getDate() + 1);
                            _ = this._daylightSavingAdjust(_)
                        }
                        O += P + "</tr>"
                    }
                    u++;
                    if (u > 11) {
                        u = 0;
                        p++
                    }
                    O += "</tbody></table>" + (f ? "</div>" + (o[0] > 0 && k == o[1] - 1 ? '<div class="ui-datepicker-row-break"></div>' : "") : "");
                    C += O
                }
                T += C
            }
            T += r + (d.browser.msie && parseInt(d.browser.version, 10) < 7 && !e.inline ? '<iframe src="javascript:false;" class="ui-datepicker-cover" frameborder="0"></iframe>' : "");
            e._keyEvent = false;
            return T
        },
        _generateMonthYearHeader: function (e, t, n, r, i, s, o, u) {
            var a = this._get(e, "changeMonth"), f = this._get(e, "changeYear"), l = this._get(e, "showMonthAfterYear"), c = '<div class="ui-datepicker-title">', h = "";
            if (s || !a)h += '<span class="ui-datepicker-month">' + o[t] + "</span>"; else {
                o = r && r.getFullYear() == n;
                var p = i && i.getFullYear() == n;
                h += '<select class="ui-datepicker-month" onchange="DP_jQuery_' + B + ".datepicker._selectMonthYear('#" + e.id + "', this, 'M');\" >";
                for (var d = 0; d < 12; d++)if ((!o || d >= r.getMonth()) && (!p || d <= i.getMonth()))h += '<option value="' + d + '"' + (d == t ? ' selected="selected"' : "") + ">" + u[d] + "</option>";
                h += "</select>"
            }
            l || (c += h + (s || !(a && f) ? "&#xa0;" : ""));
            if (!e.yearshtml) {
                e.yearshtml = "";
                if (s || !f)c += '<span class="ui-datepicker-year">' + n + "</span>"; else {
                    u = this._get(e, "yearRange").split(":");
                    var v = (new Date).getFullYear();
                    o = function (e) {
                        e = e.match(/c[+-].*/) ? n + parseInt(e.substring(1), 10) : e.match(/[+-].*/) ? v + parseInt(e, 10) : parseInt(e, 10);
                        return isNaN(e) ? v : e
                    };
                    t = o(u[0]);
                    u = Math.max(t, o(u[1] || ""));
                    t = r ? Math.max(t, r.getFullYear()) : t;
                    u = i ? Math.min(u, i.getFullYear()) : u;
                    for (e.yearshtml += '<select class="ui-datepicker-year" onchange="DP_jQuery_' + B + ".datepicker._selectMonthYear('#" + e.id + "', this, 'Y');\" >"; t <= u; t++)e.yearshtml += '<option value="' + t + '"' + (t == n ? ' selected="selected"' : "") + ">" + t + "</option>";
                    e.yearshtml += "</select>";
                    c += e.yearshtml;
                    e.yearshtml = null
                }
            }
            c += this._get(e, "yearSuffix");
            if (l)c += (s || !(a && f) ? "&#xa0;" : "") + h;
            c += "</div>";
            return c
        },
        _adjustInstDate: function (e, t, n) {
            var r = e.drawYear + (n == "Y" ? t : 0), i = e.drawMonth + (n == "M" ? t : 0);
            t = Math.min(e.selectedDay, this._getDaysInMonth(r, i)) + (n == "D" ? t : 0);
            r = this._restrictMinMax(e, this._daylightSavingAdjust(new Date(r, i, t)));
            e.selectedDay = r.getDate();
            e.drawMonth = e.selectedMonth = r.getMonth();
            e.drawYear = e.selectedYear = r.getFullYear();
            if (n == "M" || n == "Y")this._notifyChange(e)
        },
        _restrictMinMax: function (e, t) {
            var n = this._getMinMaxDate(e, "min");
            e = this._getMinMaxDate(e, "max");
            t = n && t < n ? n : t;
            return t = e && t > e ? e : t
        },
        _notifyChange: function (e) {
            var t = this._get(e, "onChangeMonthYear");
            if (t)t.apply(e.input ? e.input[0] : null, [e.selectedYear, e.selectedMonth + 1, e])
        },
        _getNumberOfMonths: function (e) {
            e = this._get(e, "numberOfMonths");
            return e == null ? [1, 1] : typeof e == "number" ? [1, e] : e
        },
        _getMinMaxDate: function (e, t) {
            return this._determineDate(e, this._get(e, t + "Date"), null)
        },
        _getDaysInMonth: function (e, t) {
            return 32 - this._daylightSavingAdjust(new Date(e, t, 32)).getDate()
        },
        _getFirstDayOfMonth: function (e, t) {
            return (new Date(e, t, 1)).getDay()
        },
        _canAdjustMonth: function (e, t, n, r) {
            var i = this._getNumberOfMonths(e);
            n = this._daylightSavingAdjust(new Date(n, r + (t < 0 ? t : i[0] * i[1]), 1));
            t < 0 && n.setDate(this._getDaysInMonth(n.getFullYear(), n.getMonth()));
            return this._isInRange(e, n)
        },
        _isInRange: function (e, t) {
            var n = this._getMinMaxDate(e, "min");
            e = this._getMinMaxDate(e, "max");
            return (!n || t.getTime() >= n.getTime()) && (!e || t.getTime() <= e.getTime())
        },
        _getFormatConfig: function (e) {
            var t = this._get(e, "shortYearCutoff");
            t = typeof t != "string" ? t : (new Date).getFullYear() % 100 + parseInt(t, 10);
            return {
                shortYearCutoff: t,
                dayNamesShort: this._get(e, "dayNamesShort"),
                dayNames: this._get(e, "dayNames"),
                monthNamesShort: this._get(e, "monthNamesShort"),
                monthNames: this._get(e, "monthNames")
            }
        },
        _formatDate: function (e, t, n, r) {
            if (!t) {
                e.currentDay = e.selectedDay;
                e.currentMonth = e.selectedMonth;
                e.currentYear = e.selectedYear
            }
            t = t ? typeof t == "object" ? t : this._daylightSavingAdjust(new Date(r, n, t)) : this._daylightSavingAdjust(new Date(e.currentYear, e.currentMonth, e.currentDay));
            return this.formatDate(this._get(e, "dateFormat"), t, this._getFormatConfig(e))
        }
    });
    d.fn.datepicker = function (e) {
        if (!this.length)return this;
        if (!d.datepicker.initialized) {
            d(document).mousedown(d.datepicker._checkExternalClick).find("body").append(d.datepicker.dpDiv);
            d.datepicker.initialized = true
        }
        var t = Array.prototype.slice.call(arguments, 1);
        if (typeof e == "string" && (e == "isDisabled" || e == "getDate" || e == "widget"))return d.datepicker["_" + e + "Datepicker"].apply(d.datepicker, [this[0]].concat(t));
        if (e == "option" && arguments.length == 2 && typeof arguments[1] == "string")return d.datepicker["_" + e + "Datepicker"].apply(d.datepicker, [this[0]].concat(t));
        return this.each(function () {
            typeof e == "string" ? d.datepicker["_" + e + "Datepicker"].apply(d.datepicker, [this].concat(t)) : d.datepicker._attachDatepicker(this, e)
        })
    };
    d.datepicker = new M;
    d.datepicker.initialized = false;
    d.datepicker.uuid = (new Date).getTime();
    d.datepicker.version = "1.8.16";
    window["DP_jQuery_" + B] = d
})(jQuery);
(function (e, t) {
    e.widget("ui.progressbar", {
        options: {value: 0, max: 100}, min: 0, _create: function () {
            this.element.addClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").attr({
                role: "progressbar",
                "aria-valuemin": this.min,
                "aria-valuemax": this.options.max,
                "aria-valuenow": this._value()
            });
            this.valueDiv = e("<div class='ui-progressbar-value ui-widget-header ui-corner-left'></div>").appendTo(this.element);
            this.oldValue = this._value();
            this._refreshValue()
        }, destroy: function () {
            this.element.removeClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").removeAttr("role").removeAttr("aria-valuemin").removeAttr("aria-valuemax").removeAttr("aria-valuenow");
            this.valueDiv.remove();
            e.Widget.prototype.destroy.apply(this, arguments)
        }, value: function (e) {
            if (e === t)return this._value();
            this._setOption("value", e);
            return this
        }, _setOption: function (t, n) {
            if (t === "value") {
                this.options.value = n;
                this._refreshValue();
                this._value() === this.options.max && this._trigger("complete")
            }
            e.Widget.prototype._setOption.apply(this, arguments)
        }, _value: function () {
            var e = this.options.value;
            if (typeof e !== "number")e = 0;
            return Math.min(this.options.max, Math.max(this.min, e))
        }, _percentage: function () {
            return 100 * this._value() / this.options.max
        }, _refreshValue: function () {
            var e = this.value(), t = this._percentage();
            if (this.oldValue !== e) {
                this.oldValue = e;
                this._trigger("change")
            }
            this.valueDiv.toggle(e > this.min).toggleClass("ui-corner-right", e === this.options.max).width(t.toFixed(0) + "%");
            this.element.attr("aria-valuenow", e)
        }
    });
    e.extend(e.ui.progressbar, {version: "1.8.16"})
})(jQuery);
jQuery.effects || function (e, t) {
    function n(t) {
        var n;
        if (t && t.constructor == Array && t.length == 3)return t;
        if (n = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(t))return [parseInt(n[1], 10), parseInt(n[2], 10), parseInt(n[3], 10)];
        if (n = /rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(t))return [parseFloat(n[1]) * 2.55, parseFloat(n[2]) * 2.55, parseFloat(n[3]) * 2.55];
        if (n = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(t))return [parseInt(n[1], 16), parseInt(n[2], 16), parseInt(n[3], 16)];
        if (n = /#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(t))return [parseInt(n[1] + n[1], 16), parseInt(n[2] + n[2], 16), parseInt(n[3] + n[3], 16)];
        if (/rgba\(0, 0, 0, 0\)/.exec(t))return f.transparent;
        return f[e.trim(t).toLowerCase()]
    }

    function r(t, r) {
        var i;
        do {
            i = e.curCSS(t, r);
            if (i != "" && i != "transparent" || e.nodeName(t, "body"))break;
            r = "backgroundColor"
        } while (t = t.parentNode);
        return n(i)
    }

    function i() {
        var e = document.defaultView ? document.defaultView.getComputedStyle(this, null) : this.currentStyle, t = {}, n, r;
        if (e && e.length && e[0] && e[e[0]])for (var i = e.length; i--;) {
            n = e[i];
            if (typeof e[n] == "string") {
                r = n.replace(/\-(\w)/g, function (e, t) {
                    return t.toUpperCase()
                });
                t[r] = e[n]
            }
        } else for (n in e)if (typeof e[n] === "string")t[n] = e[n];
        return t
    }

    function s(t) {
        var n, r;
        for (n in t) {
            r = t[n];
            if (r == null || e.isFunction(r) || n in c || /scrollbar/.test(n) || !/color/i.test(n) && isNaN(parseFloat(r)))delete t[n]
        }
        return t
    }

    function o(e, t) {
        var n = {_: 0}, r;
        for (r in t)if (e[r] != t[r])n[r] = t[r];
        return n
    }

    function u(t, n, r, i) {
        if (typeof t == "object") {
            i = n;
            r = null;
            n = t;
            t = n.effect
        }
        if (e.isFunction(n)) {
            i = n;
            r = null;
            n = {}
        }
        if (typeof n == "number" || e.fx.speeds[n]) {
            i = r;
            r = n;
            n = {}
        }
        if (e.isFunction(r)) {
            i = r;
            r = null
        }
        n = n || {};
        r = r || n.duration;
        r = e.fx.off ? 0 : typeof r == "number" ? r : r in e.fx.speeds ? e.fx.speeds[r] : e.fx.speeds._default;
        i = i || n.complete;
        return [t, n, r, i]
    }

    function a(t) {
        if (!t || typeof t === "number" || e.fx.speeds[t])return true;
        if (typeof t === "string" && !e.effects[t])return true;
        return false
    }

    e.effects = {};
    e.each(["backgroundColor", "borderBottomColor", "borderLeftColor", "borderRightColor", "borderTopColor", "borderColor", "color", "outlineColor"], function (t, i) {
        e.fx.step[i] = function (e) {
            if (!e.colorInit) {
                e.start = r(e.elem, i);
                e.end = n(e.end);
                e.colorInit = true
            }
            e.elem.style[i] = "rgb(" + Math.max(Math.min(parseInt(e.pos * (e.end[0] - e.start[0]) + e.start[0], 10), 255), 0) + "," + Math.max(Math.min(parseInt(e.pos * (e.end[1] - e.start[1]) + e.start[1], 10), 255), 0) + "," + Math.max(Math.min(parseInt(e.pos * (e.end[2] - e.start[2]) + e.start[2], 10), 255), 0) + ")"
        }
    });
    var f = {
        aqua: [0, 255, 255],
        azure: [240, 255, 255],
        beige: [245, 245, 220],
        black: [0, 0, 0],
        blue: [0, 0, 255],
        brown: [165, 42, 42],
        cyan: [0, 255, 255],
        darkblue: [0, 0, 139],
        darkcyan: [0, 139, 139],
        darkgrey: [169, 169, 169],
        darkgreen: [0, 100, 0],
        darkkhaki: [189, 183, 107],
        darkmagenta: [139, 0, 139],
        darkolivegreen: [85, 107, 47],
        darkorange: [255, 140, 0],
        darkorchid: [153, 50, 204],
        darkred: [139, 0, 0],
        darksalmon: [233, 150, 122],
        darkviolet: [148, 0, 211],
        fuchsia: [255, 0, 255],
        gold: [255, 215, 0],
        green: [0, 128, 0],
        indigo: [75, 0, 130],
        khaki: [240, 230, 140],
        lightblue: [173, 216, 230],
        lightcyan: [224, 255, 255],
        lightgreen: [144, 238, 144],
        lightgrey: [211, 211, 211],
        lightpink: [255, 182, 193],
        lightyellow: [255, 255, 224],
        lime: [0, 255, 0],
        magenta: [255, 0, 255],
        maroon: [128, 0, 0],
        navy: [0, 0, 128],
        olive: [128, 128, 0],
        orange: [255, 165, 0],
        pink: [255, 192, 203],
        purple: [128, 0, 128],
        violet: [128, 0, 128],
        red: [255, 0, 0],
        silver: [192, 192, 192],
        white: [255, 255, 255],
        yellow: [255, 255, 0],
        transparent: [255, 255, 255]
    }, l = ["add", "remove", "toggle"], c = {
        border: 1,
        borderBottom: 1,
        borderColor: 1,
        borderLeft: 1,
        borderRight: 1,
        borderTop: 1,
        borderWidth: 1,
        margin: 1,
        padding: 1
    };
    e.effects.animateClass = function (t, n, r, u) {
        if (e.isFunction(r)) {
            u = r;
            r = null
        }
        return this.queue(function () {
            var a = e(this), f = a.attr("style") || " ", c = s(i.call(this)), h, v = a.attr("class");
            e.each(l, function (e, n) {
                t[n] && a[n + "Class"](t[n])
            });
            h = s(i.call(this));
            a.attr("class", v);
            a.animate(o(c, h), {
                queue: false, duration: n, easing: r, complete: function () {
                    e.each(l, function (e, n) {
                        t[n] && a[n + "Class"](t[n])
                    });
                    if (typeof a.attr("style") == "object") {
                        a.attr("style").cssText = "";
                        a.attr("style").cssText = f
                    } else a.attr("style", f);
                    u && u.apply(this, arguments);
                    e.dequeue(this)
                }
            })
        })
    };
    e.fn.extend({
        _addClass: e.fn.addClass, addClass: function (t, n, r, i) {
            return n ? e.effects.animateClass.apply(this, [{add: t}, n, r, i]) : this._addClass(t)
        }, _removeClass: e.fn.removeClass, removeClass: function (t, n, r, i) {
            return n ? e.effects.animateClass.apply(this, [{remove: t}, n, r, i]) : this._removeClass(t)
        }, _toggleClass: e.fn.toggleClass, toggleClass: function (n, r, i, s, o) {
            return typeof r == "boolean" || r === t ? i ? e.effects.animateClass.apply(this, [r ? {add: n} : {remove: n}, i, s, o]) : this._toggleClass(n, r) : e.effects.animateClass.apply(this, [{toggle: n}, r, i, s])
        }, switchClass: function (t, n, r, i, s) {
            return e.effects.animateClass.apply(this, [{add: n, remove: t}, r, i, s])
        }
    });
    e.extend(e.effects, {
        version: "1.8.16", save: function (e, t) {
            for (var n = 0; n < t.length; n++)t[n] !== null && e.data("ec.storage." + t[n], e[0].style[t[n]])
        }, restore: function (e, t) {
            for (var n = 0; n < t.length; n++)t[n] !== null && e.css(t[n], e.data("ec.storage." + t[n]))
        }, setMode: function (e, t) {
            if (t == "toggle")t = e.is(":hidden") ? "show" : "hide";
            return t
        }, getBaseline: function (e, t) {
            var n;
            switch (e[0]) {
                case"top":
                    n = 0;
                    break;
                case"middle":
                    n = .5;
                    break;
                case"bottom":
                    n = 1;
                    break;
                default:
                    n = e[0] / t.height
            }
            switch (e[1]) {
                case"left":
                    e = 0;
                    break;
                case"center":
                    e = .5;
                    break;
                case"right":
                    e = 1;
                    break;
                default:
                    e = e[1] / t.width
            }
            return {x: e, y: n}
        }, createWrapper: function (t) {
            if (t.parent().is(".ui-effects-wrapper"))return t.parent();
            var n = {
                width: t.outerWidth(true),
                height: t.outerHeight(true),
                "float": t.css("float")
            }, r = e("<div></div>").addClass("ui-effects-wrapper").css({
                fontSize: "100%",
                background: "transparent",
                border: "none",
                margin: 0,
                padding: 0
            }), i = document.activeElement;
            t.wrap(r);
            if (t[0] === i || e.contains(t[0], i))e(i).focus();
            r = t.parent();
            if (t.css("position") == "static") {
                r.css({position: "relative"});
                t.css({position: "relative"})
            } else {
                e.extend(n, {position: t.css("position"), zIndex: t.css("z-index")});
                e.each(["top", "left", "bottom", "right"], function (e, r) {
                    n[r] = t.css(r);
                    if (isNaN(parseInt(n[r], 10)))n[r] = "auto"
                });
                t.css({position: "relative", top: 0, left: 0, right: "auto", bottom: "auto"})
            }
            return r.css(n).show()
        }, removeWrapper: function (t) {
            var n, r = document.activeElement;
            if (t.parent().is(".ui-effects-wrapper")) {
                n = t.parent().replaceWith(t);
                if (t[0] === r || e.contains(t[0], r))e(r).focus();
                return n
            }
            return t
        }, setTransition: function (t, n, r, i) {
            i = i || {};
            e.each(n, function (e, n) {
                unit = t.cssUnit(n);
                if (unit[0] > 0)i[n] = unit[0] * r + unit[1]
            });
            return i
        }
    });
    e.fn.extend({
        effect: function (t) {
            var n = u.apply(this, arguments), r = {options: n[1], duration: n[2], callback: n[3]};
            n = r.options.mode;
            var i = e.effects[t];
            if (e.fx.off || !i)return n ? this[n](r.duration, r.callback) : this.each(function () {
                r.callback && r.callback.call(this)
            });
            return i.call(this, r)
        }, _show: e.fn.show, show: function (e) {
            if (a(e))return this._show.apply(this, arguments); else {
                var t = u.apply(this, arguments);
                t[1].mode = "show";
                return this.effect.apply(this, t)
            }
        }, _hide: e.fn.hide, hide: function (e) {
            if (a(e))return this._hide.apply(this, arguments); else {
                var t = u.apply(this, arguments);
                t[1].mode = "hide";
                return this.effect.apply(this, t)
            }
        }, __toggle: e.fn.toggle, toggle: function (t) {
            if (a(t) || typeof t === "boolean" || e.isFunction(t))return this.__toggle.apply(this, arguments); else {
                var n = u.apply(this, arguments);
                n[1].mode = "toggle";
                return this.effect.apply(this, n)
            }
        }, cssUnit: function (t) {
            var n = this.css(t), r = [];
            e.each(["em", "px", "%", "pt"], function (e, t) {
                if (n.indexOf(t) > 0)r = [parseFloat(n), t]
            });
            return r
        }
    });
    e.easing.jswing = e.easing.swing;
    e.extend(e.easing, {
        def: "easeOutQuad", swing: function (t, n, r, i, s) {
            return e.easing[e.easing.def](t, n, r, i, s)
        }, easeInQuad: function (e, t, n, r, i) {
            return r * (t /= i) * t + n
        }, easeOutQuad: function (e, t, n, r, i) {
            return -r * (t /= i) * (t - 2) + n
        }, easeInOutQuad: function (e, t, n, r, i) {
            if ((t /= i / 2) < 1)return r / 2 * t * t + n;
            return -r / 2 * (--t * (t - 2) - 1) + n
        }, easeInCubic: function (e, t, n, r, i) {
            return r * (t /= i) * t * t + n
        }, easeOutCubic: function (e, t, n, r, i) {
            return r * ((t = t / i - 1) * t * t + 1) + n
        }, easeInOutCubic: function (e, t, n, r, i) {
            if ((t /= i / 2) < 1)return r / 2 * t * t * t + n;
            return r / 2 * ((t -= 2) * t * t + 2) + n
        }, easeInQuart: function (e, t, n, r, i) {
            return r * (t /= i) * t * t * t + n
        }, easeOutQuart: function (e, t, n, r, i) {
            return -r * ((t = t / i - 1) * t * t * t - 1) + n
        }, easeInOutQuart: function (e, t, n, r, i) {
            if ((t /= i / 2) < 1)return r / 2 * t * t * t * t + n;
            return -r / 2 * ((t -= 2) * t * t * t - 2) + n
        }, easeInQuint: function (e, t, n, r, i) {
            return r * (t /= i) * t * t * t * t + n
        }, easeOutQuint: function (e, t, n, r, i) {
            return r * ((t = t / i - 1) * t * t * t * t + 1) + n
        }, easeInOutQuint: function (e, t, n, r, i) {
            if ((t /= i / 2) < 1)return r / 2 * t * t * t * t * t + n;
            return r / 2 * ((t -= 2) * t * t * t * t + 2) + n
        }, easeInSine: function (e, t, n, r, i) {
            return -r * Math.cos(t / i * (Math.PI / 2)) + r + n
        }, easeOutSine: function (e, t, n, r, i) {
            return r * Math.sin(t / i * (Math.PI / 2)) + n
        }, easeInOutSine: function (e, t, n, r, i) {
            return -r / 2 * (Math.cos(Math.PI * t / i) - 1) + n
        }, easeInExpo: function (e, t, n, r, i) {
            return t == 0 ? n : r * Math.pow(2, 10 * (t / i - 1)) + n
        }, easeOutExpo: function (e, t, n, r, i) {
            return t == i ? n + r : r * (-Math.pow(2, -10 * t / i) + 1) + n
        }, easeInOutExpo: function (e, t, n, r, i) {
            if (t == 0)return n;
            if (t == i)return n + r;
            if ((t /= i / 2) < 1)return r / 2 * Math.pow(2, 10 * (t - 1)) + n;
            return r / 2 * (-Math.pow(2, -10 * --t) + 2) + n
        }, easeInCirc: function (e, t, n, r, i) {
            return -r * (Math.sqrt(1 - (t /= i) * t) - 1) + n
        }, easeOutCirc: function (e, t, n, r, i) {
            return r * Math.sqrt(1 - (t = t / i - 1) * t) + n
        }, easeInOutCirc: function (e, t, n, r, i) {
            if ((t /= i / 2) < 1)return -r / 2 * (Math.sqrt(1 - t * t) - 1) + n;
            return r / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + n
        }, easeInElastic: function (e, t, n, r, i) {
            e = 1.70158;
            var s = 0, o = r;
            if (t == 0)return n;
            if ((t /= i) == 1)return n + r;
            s || (s = i * .3);
            if (o < Math.abs(r)) {
                o = r;
                e = s / 4
            } else e = s / (2 * Math.PI) * Math.asin(r / o);
            return -(o * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * i - e) * 2 * Math.PI / s)) + n
        }, easeOutElastic: function (e, t, n, r, i) {
            e = 1.70158;
            var s = 0, o = r;
            if (t == 0)return n;
            if ((t /= i) == 1)return n + r;
            s || (s = i * .3);
            if (o < Math.abs(r)) {
                o = r;
                e = s / 4
            } else e = s / (2 * Math.PI) * Math.asin(r / o);
            return o * Math.pow(2, -10 * t) * Math.sin((t * i - e) * 2 * Math.PI / s) + r + n
        }, easeInOutElastic: function (e, t, n, r, i) {
            e = 1.70158;
            var s = 0, o = r;
            if (t == 0)return n;
            if ((t /= i / 2) == 2)return n + r;
            s || (s = i * .3 * 1.5);
            if (o < Math.abs(r)) {
                o = r;
                e = s / 4
            } else e = s / (2 * Math.PI) * Math.asin(r / o);
            if (t < 1)return -.5 * o * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * i - e) * 2 * Math.PI / s) + n;
            return o * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * i - e) * 2 * Math.PI / s) * .5 + r + n
        }, easeInBack: function (e, n, r, i, s, o) {
            if (o == t)o = 1.70158;
            return i * (n /= s) * n * ((o + 1) * n - o) + r
        }, easeOutBack: function (e, n, r, i, s, o) {
            if (o == t)o = 1.70158;
            return i * ((n = n / s - 1) * n * ((o + 1) * n + o) + 1) + r
        }, easeInOutBack: function (e, n, r, i, s, o) {
            if (o == t)o = 1.70158;
            if ((n /= s / 2) < 1)return i / 2 * n * n * (((o *= 1.525) + 1) * n - o) + r;
            return i / 2 * ((n -= 2) * n * (((o *= 1.525) + 1) * n + o) + 2) + r
        }, easeInBounce: function (t, n, r, i, s) {
            return i - e.easing.easeOutBounce(t, s - n, 0, i, s) + r
        }, easeOutBounce: function (e, t, n, r, i) {
            return (t /= i) < 1 / 2.75 ? r * 7.5625 * t * t + n : t < 2 / 2.75 ? r * (7.5625 * (t -= 1.5 / 2.75) * t + .75) + n : t < 2.5 / 2.75 ? r * (7.5625 * (t -= 2.25 / 2.75) * t + .9375) + n : r * (7.5625 * (t -= 2.625 / 2.75) * t + .984375) + n
        }, easeInOutBounce: function (t, n, r, i, s) {
            if (n < s / 2)return e.easing.easeInBounce(t, n * 2, 0, i, s) * .5 + r;
            return e.easing.easeOutBounce(t, n * 2 - s, 0, i, s) * .5 + i * .5 + r
        }
    })
}(jQuery);
(function (e) {
    e.effects.blind = function (t) {
        return this.queue(function () {
            var n = e(this), r = ["position", "top", "bottom", "left", "right"], i = e.effects.setMode(n, t.options.mode || "hide"), s = t.options.direction || "vertical";
            e.effects.save(n, r);
            n.show();
            var o = e.effects.createWrapper(n).css({overflow: "hidden"}), u = s == "vertical" ? "height" : "width";
            s = s == "vertical" ? o.height() : o.width();
            i == "show" && o.css(u, 0);
            var a = {};
            a[u] = i == "show" ? s : 0;
            o.animate(a, t.duration, t.options.easing, function () {
                i == "hide" && n.hide();
                e.effects.restore(n, r);
                e.effects.removeWrapper(n);
                t.callback && t.callback.apply(n[0], arguments);
                n.dequeue()
            })
        })
    }
})(jQuery);
(function (e) {
    e.effects.bounce = function (t) {
        return this.queue(function () {
            var n = e(this), r = ["position", "top", "bottom", "left", "right"], i = e.effects.setMode(n, t.options.mode || "effect"), s = t.options.direction || "up", o = t.options.distance || 20, u = t.options.times || 5, a = t.duration || 250;
            /show|hide/.test(i) && r.push("opacity");
            e.effects.save(n, r);
            n.show();
            e.effects.createWrapper(n);
            var f = s == "up" || s == "down" ? "top" : "left";
            s = s == "up" || s == "left" ? "pos" : "neg";
            o = t.options.distance || (f == "top" ? n.outerHeight({margin: true}) / 3 : n.outerWidth({margin: true}) / 3);
            if (i == "show")n.css("opacity", 0).css(f, s == "pos" ? -o : o);
            if (i == "hide")o /= u * 2;
            i != "hide" && u--;
            if (i == "show") {
                var l = {opacity: 1};
                l[f] = (s == "pos" ? "+=" : "-=") + o;
                n.animate(l, a / 2, t.options.easing);
                o /= 2;
                u--
            }
            for (l = 0; l < u; l++) {
                var c = {}, h = {};
                c[f] = (s == "pos" ? "-=" : "+=") + o;
                h[f] = (s == "pos" ? "+=" : "-=") + o;
                n.animate(c, a / 2, t.options.easing).animate(h, a / 2, t.options.easing);
                o = i == "hide" ? o * 2 : o / 2
            }
            if (i == "hide") {
                l = {opacity: 0};
                l[f] = (s == "pos" ? "-=" : "+=") + o;
                n.animate(l, a / 2, t.options.easing, function () {
                    n.hide();
                    e.effects.restore(n, r);
                    e.effects.removeWrapper(n);
                    t.callback && t.callback.apply(this, arguments)
                })
            } else {
                c = {};
                h = {};
                c[f] = (s == "pos" ? "-=" : "+=") + o;
                h[f] = (s == "pos" ? "+=" : "-=") + o;
                n.animate(c, a / 2, t.options.easing).animate(h, a / 2, t.options.easing, function () {
                    e.effects.restore(n, r);
                    e.effects.removeWrapper(n);
                    t.callback && t.callback.apply(this, arguments)
                })
            }
            n.queue("fx", function () {
                n.dequeue()
            });
            n.dequeue()
        })
    }
})(jQuery);
(function (e) {
    e.effects.clip = function (t) {
        return this.queue(function () {
            var n = e(this), r = ["position", "top", "bottom", "left", "right", "height", "width"], i = e.effects.setMode(n, t.options.mode || "hide"), s = t.options.direction || "vertical";
            e.effects.save(n, r);
            n.show();
            var o = e.effects.createWrapper(n).css({overflow: "hidden"});
            o = n[0].tagName == "IMG" ? o : n;
            var u = {size: s == "vertical" ? "height" : "width", position: s == "vertical" ? "top" : "left"};
            s = s == "vertical" ? o.height() : o.width();
            if (i == "show") {
                o.css(u.size, 0);
                o.css(u.position, s / 2)
            }
            var a = {};
            a[u.size] = i == "show" ? s : 0;
            a[u.position] = i == "show" ? 0 : s / 2;
            o.animate(a, {
                queue: false, duration: t.duration, easing: t.options.easing, complete: function () {
                    i == "hide" && n.hide();
                    e.effects.restore(n, r);
                    e.effects.removeWrapper(n);
                    t.callback && t.callback.apply(n[0], arguments);
                    n.dequeue()
                }
            })
        })
    }
})(jQuery);
(function (e) {
    e.effects.drop = function (t) {
        return this.queue(function () {
            var n = e(this), r = ["position", "top", "bottom", "left", "right", "opacity"], i = e.effects.setMode(n, t.options.mode || "hide"), s = t.options.direction || "left";
            e.effects.save(n, r);
            n.show();
            e.effects.createWrapper(n);
            var o = s == "up" || s == "down" ? "top" : "left";
            s = s == "up" || s == "left" ? "pos" : "neg";
            var u = t.options.distance || (o == "top" ? n.outerHeight({margin: true}) / 2 : n.outerWidth({margin: true}) / 2);
            if (i == "show")n.css("opacity", 0).css(o, s == "pos" ? -u : u);
            var a = {opacity: i == "show" ? 1 : 0};
            a[o] = (i == "show" ? s == "pos" ? "+=" : "-=" : s == "pos" ? "-=" : "+=") + u;
            n.animate(a, {
                queue: false, duration: t.duration, easing: t.options.easing, complete: function () {
                    i == "hide" && n.hide();
                    e.effects.restore(n, r);
                    e.effects.removeWrapper(n);
                    t.callback && t.callback.apply(this, arguments);
                    n.dequeue()
                }
            })
        })
    }
})(jQuery);
(function (e) {
    e.effects.explode = function (t) {
        return this.queue(function () {
            var n = t.options.pieces ? Math.round(Math.sqrt(t.options.pieces)) : 3, r = t.options.pieces ? Math.round(Math.sqrt(t.options.pieces)) : 3;
            t.options.mode = t.options.mode == "toggle" ? e(this).is(":visible") ? "hide" : "show" : t.options.mode;
            var i = e(this).show().css("visibility", "hidden"), s = i.offset();
            s.top -= parseInt(i.css("marginTop"), 10) || 0;
            s.left -= parseInt(i.css("marginLeft"), 10) || 0;
            for (var o = i.outerWidth(true), u = i.outerHeight(true), f = 0; f < n; f++)for (var l = 0; l < r; l++)i.clone().appendTo("body").wrap("<div></div>").css({
                position: "absolute",
                visibility: "visible",
                left: -l * (o / r),
                top: -f * (u / n)
            }).parent().addClass("ui-effects-explode").css({
                position: "absolute",
                overflow: "hidden",
                width: o / r,
                height: u / n,
                left: s.left + l * (o / r) + (t.options.mode == "show" ? (l - Math.floor(r / 2)) * (o / r) : 0),
                top: s.top + f * (u / n) + (t.options.mode == "show" ? (f - Math.floor(n / 2)) * (u / n) : 0),
                opacity: t.options.mode == "show" ? 0 : 1
            }).animate({
                left: s.left + l * (o / r) + (t.options.mode == "show" ? 0 : (l - Math.floor(r / 2)) * (o / r)),
                top: s.top + f * (u / n) + (t.options.mode == "show" ? 0 : (f - Math.floor(n / 2)) * (u / n)),
                opacity: t.options.mode == "show" ? 1 : 0
            }, t.duration || 500);
            setTimeout(function () {
                t.options.mode == "show" ? i.css({visibility: "visible"}) : i.css({visibility: "visible"}).hide();
                t.callback && t.callback.apply(i[0]);
                i.dequeue();
                e("div.ui-effects-explode").remove()
            }, t.duration || 500)
        })
    }
})(jQuery);
(function (e) {
    e.effects.fade = function (t) {
        return this.queue(function () {
            var n = e(this), r = e.effects.setMode(n, t.options.mode || "hide");
            n.animate({opacity: r}, {
                queue: false,
                duration: t.duration,
                easing: t.options.easing,
                complete: function () {
                    t.callback && t.callback.apply(this, arguments);
                    n.dequeue()
                }
            })
        })
    }
})(jQuery);
(function (e) {
    e.effects.fold = function (t) {
        return this.queue(function () {
            var n = e(this), r = ["position", "top", "bottom", "left", "right"], i = e.effects.setMode(n, t.options.mode || "hide"), s = t.options.size || 15, o = !!t.options.horizFirst, u = t.duration ? t.duration / 2 : e.fx.speeds._default / 2;
            e.effects.save(n, r);
            n.show();
            var f = e.effects.createWrapper(n).css({overflow: "hidden"}), l = i == "show" != o, h = l ? ["width", "height"] : ["height", "width"];
            l = l ? [f.width(), f.height()] : [f.height(), f.width()];
            var p = /([0-9]+)%/.exec(s);
            if (p)s = parseInt(p[1], 10) / 100 * l[i == "hide" ? 0 : 1];
            if (i == "show")f.css(o ? {height: 0, width: s} : {height: s, width: 0});
            o = {};
            p = {};
            o[h[0]] = i == "show" ? l[0] : s;
            p[h[1]] = i == "show" ? l[1] : 0;
            f.animate(o, u, t.options.easing).animate(p, u, t.options.easing, function () {
                i == "hide" && n.hide();
                e.effects.restore(n, r);
                e.effects.removeWrapper(n);
                t.callback && t.callback.apply(n[0], arguments);
                n.dequeue()
            })
        })
    }
})(jQuery);
(function (e) {
    e.effects.highlight = function (t) {
        return this.queue(function () {
            var n = e(this), r = ["backgroundImage", "backgroundColor", "opacity"], i = e.effects.setMode(n, t.options.mode || "show"), s = {backgroundColor: n.css("backgroundColor")};
            if (i == "hide")s.opacity = 0;
            e.effects.save(n, r);
            n.show().css({
                backgroundImage: "none",
                backgroundColor: t.options.color || "#ffff99"
            }).animate(s, {
                queue: false, duration: t.duration, easing: t.options.easing, complete: function () {
                    i == "hide" && n.hide();
                    e.effects.restore(n, r);
                    i == "show" && !e.support.opacity && this.style.removeAttribute("filter");
                    t.callback && t.callback.apply(this, arguments);
                    n.dequeue()
                }
            })
        })
    }
})(jQuery);
(function (e) {
    e.effects.pulsate = function (t) {
        return this.queue(function () {
            var n = e(this), r = e.effects.setMode(n, t.options.mode || "show");
            times = (t.options.times || 5) * 2 - 1;
            duration = t.duration ? t.duration / 2 : e.fx.speeds._default / 2;
            isVisible = n.is(":visible");
            animateTo = 0;
            if (!isVisible) {
                n.css("opacity", 0).show();
                animateTo = 1
            }
            if (r == "hide" && isVisible || r == "show" && !isVisible)times--;
            for (r = 0; r < times; r++) {
                n.animate({opacity: animateTo}, duration, t.options.easing);
                animateTo = (animateTo + 1) % 2
            }
            n.animate({opacity: animateTo}, duration, t.options.easing, function () {
                animateTo == 0 && n.hide();
                t.callback && t.callback.apply(this, arguments)
            });
            n.queue("fx", function () {
                n.dequeue()
            }).dequeue()
        })
    }
})(jQuery);
(function (e) {
    e.effects.puff = function (t) {
        return this.queue(function () {
            var n = e(this), r = e.effects.setMode(n, t.options.mode || "hide"), i = parseInt(t.options.percent, 10) || 150, s = i / 100, o = {
                height: n.height(),
                width: n.width()
            };
            e.extend(t.options, {
                fade: true,
                mode: r,
                percent: r == "hide" ? i : 100,
                from: r == "hide" ? o : {height: o.height * s, width: o.width * s}
            });
            n.effect("scale", t.options, t.duration, t.callback);
            n.dequeue()
        })
    };
    e.effects.scale = function (t) {
        return this.queue(function () {
            var n = e(this), r = e.extend(true, {}, t.options), i = e.effects.setMode(n, t.options.mode || "effect"), s = parseInt(t.options.percent, 10) || (parseInt(t.options.percent, 10) == 0 ? 0 : i == "hide" ? 0 : 100), o = t.options.direction || "both", u = t.options.origin;
            if (i != "effect") {
                r.origin = u || ["middle", "center"];
                r.restore = true
            }
            u = {height: n.height(), width: n.width()};
            n.from = t.options.from || (i == "show" ? {height: 0, width: 0} : u);
            s = {y: o != "horizontal" ? s / 100 : 1, x: o != "vertical" ? s / 100 : 1};
            n.to = {height: u.height * s.y, width: u.width * s.x};
            if (t.options.fade) {
                if (i == "show") {
                    n.from.opacity = 0;
                    n.to.opacity = 1
                }
                if (i == "hide") {
                    n.from.opacity = 1;
                    n.to.opacity = 0
                }
            }
            r.from = n.from;
            r.to = n.to;
            r.mode = i;
            n.effect("size", r, t.duration, t.callback);
            n.dequeue()
        })
    };
    e.effects.size = function (t) {
        return this.queue(function () {
            var n = e(this), r = ["position", "top", "bottom", "left", "right", "width", "height", "overflow", "opacity"], i = ["position", "top", "bottom", "left", "right", "overflow", "opacity"], s = ["width", "height", "overflow"], o = ["fontSize"], u = ["borderTopWidth", "borderBottomWidth", "paddingTop", "paddingBottom"], a = ["borderLeftWidth", "borderRightWidth", "paddingLeft", "paddingRight"], f = e.effects.setMode(n, t.options.mode || "effect"), l = t.options.restore || false, h = t.options.scale || "both", p = t.options.origin, d = {
                height: n.height(),
                width: n.width()
            };
            n.from = t.options.from || d;
            n.to = t.options.to || d;
            if (p) {
                p = e.effects.getBaseline(p, d);
                n.from.top = (d.height - n.from.height) * p.y;
                n.from.left = (d.width - n.from.width) * p.x;
                n.to.top = (d.height - n.to.height) * p.y;
                n.to.left = (d.width - n.to.width) * p.x
            }
            var v = {
                from: {y: n.from.height / d.height, x: n.from.width / d.width},
                to: {y: n.to.height / d.height, x: n.to.width / d.width}
            };
            if (h == "box" || h == "both") {
                if (v.from.y != v.to.y) {
                    r = r.concat(u);
                    n.from = e.effects.setTransition(n, u, v.from.y, n.from);
                    n.to = e.effects.setTransition(n, u, v.to.y, n.to)
                }
                if (v.from.x != v.to.x) {
                    r = r.concat(a);
                    n.from = e.effects.setTransition(n, a, v.from.x, n.from);
                    n.to = e.effects.setTransition(n, a, v.to.x, n.to)
                }
            }
            if (h == "content" || h == "both")if (v.from.y != v.to.y) {
                r = r.concat(o);
                n.from = e.effects.setTransition(n, o, v.from.y, n.from);
                n.to = e.effects.setTransition(n, o, v.to.y, n.to)
            }
            e.effects.save(n, l ? r : i);
            n.show();
            e.effects.createWrapper(n);
            n.css("overflow", "hidden").css(n.from);
            if (h == "content" || h == "both") {
                u = u.concat(["marginTop", "marginBottom"]).concat(o);
                a = a.concat(["marginLeft", "marginRight"]);
                s = r.concat(u).concat(a);
                n.find("*[width]").each(function () {
                    child = e(this);
                    l && e.effects.save(child, s);
                    var n = {height: child.height(), width: child.width()};
                    child.from = {height: n.height * v.from.y, width: n.width * v.from.x};
                    child.to = {height: n.height * v.to.y, width: n.width * v.to.x};
                    if (v.from.y != v.to.y) {
                        child.from = e.effects.setTransition(child, u, v.from.y, child.from);
                        child.to = e.effects.setTransition(child, u, v.to.y, child.to)
                    }
                    if (v.from.x != v.to.x) {
                        child.from = e.effects.setTransition(child, a, v.from.x, child.from);
                        child.to = e.effects.setTransition(child, a, v.to.x, child.to)
                    }
                    child.css(child.from);
                    child.animate(child.to, t.duration, t.options.easing, function () {
                        l && e.effects.restore(child, s)
                    })
                })
            }
            n.animate(n.to, {
                queue: false, duration: t.duration, easing: t.options.easing, complete: function () {
                    n.to.opacity === 0 && n.css("opacity", n.from.opacity);
                    f == "hide" && n.hide();
                    e.effects.restore(n, l ? r : i);
                    e.effects.removeWrapper(n);
                    t.callback && t.callback.apply(this, arguments);
                    n.dequeue()
                }
            })
        })
    }
})(jQuery);
(function (e) {
    e.effects.shake = function (t) {
        return this.queue(function () {
            var n = e(this), r = ["position", "top", "bottom", "left", "right"];
            e.effects.setMode(n, t.options.mode || "effect");
            var i = t.options.direction || "left", s = t.options.distance || 20, o = t.options.times || 3, u = t.duration || t.options.duration || 140;
            e.effects.save(n, r);
            n.show();
            e.effects.createWrapper(n);
            var f = i == "up" || i == "down" ? "top" : "left", l = i == "up" || i == "left" ? "pos" : "neg";
            i = {};
            var c = {}, h = {};
            i[f] = (l == "pos" ? "-=" : "+=") + s;
            c[f] = (l == "pos" ? "+=" : "-=") + s * 2;
            h[f] = (l == "pos" ? "-=" : "+=") + s * 2;
            n.animate(i, u, t.options.easing);
            for (s = 1; s < o; s++)n.animate(c, u, t.options.easing).animate(h, u, t.options.easing);
            n.animate(c, u, t.options.easing).animate(i, u / 2, t.options.easing, function () {
                e.effects.restore(n, r);
                e.effects.removeWrapper(n);
                t.callback && t.callback.apply(this, arguments)
            });
            n.queue("fx", function () {
                n.dequeue()
            });
            n.dequeue()
        })
    }
})(jQuery);
(function (e) {
    e.effects.slide = function (t) {
        return this.queue(function () {
            var n = e(this), r = ["position", "top", "bottom", "left", "right"], i = e.effects.setMode(n, t.options.mode || "show"), s = t.options.direction || "left";
            e.effects.save(n, r);
            n.show();
            e.effects.createWrapper(n).css({overflow: "hidden"});
            var o = s == "up" || s == "down" ? "top" : "left";
            s = s == "up" || s == "left" ? "pos" : "neg";
            var u = t.options.distance || (o == "top" ? n.outerHeight({margin: true}) : n.outerWidth({margin: true}));
            if (i == "show")n.css(o, s == "pos" ? isNaN(u) ? "-" + u : -u : u);
            var a = {};
            a[o] = (i == "show" ? s == "pos" ? "+=" : "-=" : s == "pos" ? "-=" : "+=") + u;
            n.animate(a, {
                queue: false, duration: t.duration, easing: t.options.easing, complete: function () {
                    i == "hide" && n.hide();
                    e.effects.restore(n, r);
                    e.effects.removeWrapper(n);
                    t.callback && t.callback.apply(this, arguments);
                    n.dequeue()
                }
            })
        })
    }
})(jQuery);
(function (e) {
    e.effects.transfer = function (t) {
        return this.queue(function () {
            var n = e(this), r = e(t.options.to), i = r.offset();
            r = {top: i.top, left: i.left, height: r.innerHeight(), width: r.innerWidth()};
            i = n.offset();
            var s = e('<div class="ui-effects-transfer"></div>').appendTo(document.body).addClass(t.options.className).css({
                top: i.top,
                left: i.left,
                height: n.innerHeight(),
                width: n.innerWidth(),
                position: "absolute"
            }).animate(r, t.duration, t.options.easing, function () {
                s.remove();
                t.callback && t.callback.apply(n[0], arguments);
                n.dequeue()
            })
        })
    }
})(jQuery);
var type_offset = {1: 121, 3: 188, 4: 258, 5: 424, 11: 490, 13: 584, 36: 0};
var lastPage = "";
var lastTime = new Date(-300);
var lastMessageBoxLayer = 1e4;
MessageBox.prototype = {
    timer: null,
    msgbox: null,
    bindobj: null,
    incomingTimer: null,
    position: {},
    show: function (e, t, n, r, i) {
        if (this.Overlap == false && $(e).attr("hasMessageBox") == "yes")return;
        $(e).attr("hasMessageBox", "yes");
        if (typeof n == "undefined")n = 1e3;
        if (typeof r == "undefined")r = "msg";
        if (n == "button") {
            i = r;
            r = n;
            n = 1e3
        }
        var s = n;
        if (n == 0)s = 50;
        var o = r;
        if (r == "button")o = "question";
        var u = this;
        u.leftTimer = function () {
            if (r == "button")return;
            clearTimeout(u.timer);
            u.timer = setTimeout(function () {
                clearTimeout(u.timer);
                u.close(u)
            }, s)
        };
        u.incomingTimer = function () {
            clearTimeout(u.timer)
        };
        this.bindobj = e;
        this.msgbox = $('<div class="m_layer"><div class="bg"><div class="content"><div class="mini"><b class="' + o + '"></b>' + t + (r == "button" ? '<div class="btnbox"><a class="button ok">确认</a><a class="button cancel">取消</a></div>' : "") + "</div></div></div></div>").prependTo("body");
        this.msgbox.css("z-index", u.zIndex);
        if (this.evType == "over") {
            $(e).bind("mouseout", u.leftTimer);
            $(e).bind("mouseover", u.incomingTimer);
            this.msgbox.bind("mouseover", function () {
                clearTimeout(u.timer)
            });
            this.msgbox.bind("mouseout", u.leftTimer)
        } else {
            $(e).bind("blur", u.leftTimer)
        }
        var a = "down";
        if (this.focusShowPos != "down" && ($(e).offset().top + $(e).outerHeight() + this.msgbox.outerHeight() - $("body").scrollTop() > $(window).height() || this.focusShowPos == "up")) {
            a = "up";
            u.position.top = $(e).offset().top - this.msgbox.outerHeight()
        } else {
            u.position.top = $(e).offset().top + $(e).outerHeight()
        }
        u.position.left = $(e).offset().left;
        if (typeof u.sp_position != "undefined") {
            u.position = u.sp_position
        }
        this.msgbox.css("left", u.position.left + "px");
        this.msgbox.css("top", u.position.top + "px");
        this.msgbox.css("z-index", lastMessageBoxLayer++);
        this.msgbox.hide();
        if (r == "button") {
            this.msgbox.find(".ok").click(function () {
                if (typeof i == "undefined" || i(u) != false) {
                    u.close()
                }
            });
            this.msgbox.find(".cancel").click(function () {
                u.close()
            })
        }
        if (n != 0)u.leftTimer();
        if (typeof jQuery.ui != "undefined" && a == "up") {
            this.msgbox.show("slide", {direction: "up"}, 200)
        } else {
            this.msgbox.slideDown(200)
        }
        return this.msgbox
    },
    close: function () {
        var e = this;
        $(e.bindobj).attr("hasMessageBox", "");
        this.msgbox.slideUp(200);
        setTimeout(function () {
            e.msgbox.remove();
            if (e.evType == "over") {
                $(e.bindobj).unbind("mouseover", e.incomingTimer)
            }
            $(e.bindobj).unbind(e.evType == "over" ? "mouseout" : "blur", e.leftTimer)
        }, 200)
    }
};
var evCardTimer = null;
var searchKW = "";
var tmrCardError = null;
var card_obj = null;
var last_sug_user_start = 0;
var mouIntervals = null;
var timi = 0;
$(document).ready(function () {
    $num = $(".num li");
    $num.mouseover(function () {
        var e = $num.index($(this));
        if (e == 32) {
            return;
            timi = 1;
            clearInterval(mouIntervals);
            $(".nums").css({left: 175});
            $("#nums").html($(this).find("ul").html());
            $(".nums").slideDown(300);
            $("#zt-minibox").show()
        }
        if (e != 0) {
            timi = 1;
            clearInterval(mouIntervals);
            $(".nums").css({left: 90});
            $("#zt-minibox").hide();
            $("#nums").html($(this).find("ul").html());
            $(".nums").slideDown(300);
            return
        }
    });
    $(".nums").mouseover(function () {
        timi = 1;
        clearInterval(mouIntervals)
    });
    $(".nums").mouseout(numsout);
    $num.mouseout(numsout);
    $("#sp_order_alpha").click(function () {
        $(".s-alpha").slideDown(300)
    });
    $(".float_window .close").click(function () {
        $(".float_window").fadeOut(300)
    })
});
var cb_controler;
var scrollActivate = true;
if (!Array.prototype.shuffle) {
    Array.prototype.shuffle = function () {
        for (var e, t, n = this.length; n; e = parseInt(Math.random() * n), t = this[--n], this[n] = this[e], this[e] = t);
        return this
    }
}
$(function () {
    if (typeof countInfo != "undefined") {
        for (i in type_offset) {
            if (typeof countInfo["c" + i] != "undefined" && countInfo["c" + i]) {
                if (countInfo["c" + i] != 0) {
                    $(".addnew_" + i).html("+" + countInfo["c" + i]);
                    $(".addnew_" + i).fadeIn(500)
                }
            }
        }
    }
    if ("http:" == document.location.protocol) {
        $('<div id="cb_controler"></div>').appendTo("body");
        insertFlash("cb_controler", "http://static.hdslb.com/images/bili_notify.swf", 0, 0);
        cb_controler = $("#cb_controler_flash").get(0)
    }
    if ($(".search-keyword").length > 0) {
        var e = {
            source: function (e, t) {
                var n = e.term.split(" ");
                $.getJSON("/suggest?jsoncallback=?", {term: n[n.length - 1].replace(/　/g, ""), rnd: Math.random()}, t)
            }, search: function () {
                var e = this.value;
                var t = e.split(" ");
                if (t[t.length - 1].length < 1)return false;
                if (e.charCodeAt(0) < 255 && e.length < 1 || e.length > 40) {
                    return false
                }
            }, focus: function () {
                return false
            }, select: function (e, t) {
                this.value = t.item.value;
                $("#searchform").submit();
                return false
            }
        };
        $(".search-keyword").attr("autocomplete", "off");
        $(".search-keyword").autocomplete(e).data("autocomplete")._renderItem = function (e, t) {
            return $("<li></li>").data("item.autocomplete", t).append('<a style="text-align:left">' + t.value + '<em style="float:right;font-size:10px;"' + (t.match ? ' title="(Match Token: ' + t.match + ')"' : "") + ">" + (t.desc ? t.desc : t.ref + "个") + "</em></a>").appendTo(e)
        }
    }
    bindCardEvent();
    bindPOCoins($(".po"))
});
var SelectModule = function () {
    function t(t, i) {
        this.params = {}, "undefined" != typeof t && ("string" == typeof t || t instanceof $ ? (this.obj = $(t), this.params = i || {}) : (this.params = t, this.obj = $(this.params.item)), this.obj.length) && (this.obj.hasClass("b-slt") || (this.obj = this.obj.find(".b-slt")), this._active = !1, "undefined" != typeof this.params.onInit && this.params.onInit(this.obj), (0 == this.obj.children().length || this.params.selectorData) && (this.obj = this.createMenu(this.obj)), this.list = this.obj.find(".list"), this.init(), e.push(this))
    }

    var e = [];
    return window.bindSlt = t.bind = function (e, i) {
        return new t(e, i)
    }, t.create = function (t) {
        var e = $('<div class="b-slt"></div>');
        $("<span>").addClass("txt").appendTo(e), $("<div>").addClass("b-slt-arrow").appendTo(e);
        var i = $("<ul>").addClass("list").appendTo(e);
        t.wrapper && e.wrap(t.wrapper);
        for (var s = t.items || [], o = 0; o < s.length; o++) {
            var n = s[o], a = $("<li></li>").text(n.name).appendTo(i);
            if (n.selected && a.attr("selected", "selected"), n.attributes)for (var l in n.attributes)a.attr(l, n.attributes[l])
        }
        return t.wrapper && (e = e.parent()), e
    }, t.prototype.init = function () {
        var t = this.obj, e = this, i = this.list.find("[selected]");
        0 == i.length && (i = this.list.find("li").eq(0).attr("selected", "selected")), t.find(".txt").html(i.html()), t.off("mouseenter.selectMenu"), t.off("mouseleave.selectMenu"), t.off("click.selectMenu"), t.on("click.selectMenu", function (t) {
            e._tap(t)
        }), !1 === this.params.hover || (t.on("mouseenter.selectMenu", function (t) {
            e._mover(t)
        }), t.on("mouseleave.selectMenu", function (t) {
            e._mout(t)
        })), this.list.find("li").off("click.selectMenu"), this.list.on("click", "li", function (t) {
            t.stopPropagation(), e.select(t, $(this))
        }), t.data("select-menu", this)
    }, t.prototype._mover = function (t) {
        t.stopPropagation();
        for (var i = 0; i < e.length; i++)e[i]._mout(t);
        if (!this.obj.attr("disabled") && this.list.length) {
            var s = this;
            this.obj.addClass("on"), this.list.show(), this._active = !0, this.setPos(this.list), !1 === this.params.hover && ($(document).off("click.selectMenu"), $(document).one("click.selectMenu", function (t) {
                s._mout(t)
            }))
        }
    }, t.prototype._mout = function () {
        this.obj.removeClass("on"), this.list.hide(), this._active = !1, !1 === this.params.hover && $(document).off("click.selectMenu")
    }, t.prototype._tap = function (t) {
        this._active ? this._mout(t) : this._mover(t)
    }, t.prototype.select = function (t, e) {
        this._mout(t), (!e || this._change(e)) && ("undefined" == typeof e && (e = this.value()), this.change(e, t))
    }, t.prototype.change = function (t, e) {
        t = t || this.value(), "function" == typeof this.params.onChange && this.params.onChange.call(this, t, e)
    }, t.prototype._change = function (t) {
        return t.attr("selected") || t.attr("disabled") ? !1 : ($("li", this.list).removeAttr("selected"), t.attr("selected", "selected"), $(".txt", this.obj).html(t.html()), !0)
    }, t.prototype.value = function (t, e) {
        if (e) {
            var i = this.list.find("[" + t + '="' + e + '"]');
            return i.length && this._change(i), i
        }
        return t ? this.getSelected().attr(t) : this.getSelected()
    }, t.prototype.getSelected = function () {
        return this.list.find('[selected="selected"]')
    }, t.prototype.createMenu = function (t) {
        $("<span>").addClass("txt").appendTo(t), $("<div>").addClass("b-slt-arrow").appendTo(t);
        var e = this.params;
        if (this.list = $("<ul>").addClass("list").appendTo(t), "undefined" != typeof e.createList && e.createList(this.list), "undefined" != typeof e.selectorData)for (var i in e.selectorData)this.add(e.selectorData[i].name, e.selectorData[i].attributes);
        return t
    }, t.prototype.add = function (t, e) {
        var i = $("<li>").html(t).appendTo(this.list);
        if ("undefined" != typeof e)for (var s in e)i.attr(s, e[s]);
        return i
    }, t.prototype.setPos = function (t) {
        t.css(t.offset().left + t.width() - 10 > $(".z").width() ? {left: "auto", right: "-1px"} : {
            left: "-1px",
            right: "auto"
        })
    }, t.prototype.close = function (t) {
        null != t && (t.originalEvent ? $(".b-slt").each(function (t, e) {
            var i = $(e);
            $(".list", i).hide()
        }) : $(".list", t).hide())
    }, t.prototype.getList = function () {
        return this.obj.find(".list")
    }, t.prototype.reset = function () {
        var t = this.list.children().first();
        $("li", this.list).removeAttr("selected"), t.attr("selected", "selected"), $(".txt", this.obj).html(t.html()), t.attr("disabled") || this.change(t)
    }, t.prototype.disable = function () {
        this.obj.addClass("disabled"), this.obj.off("mouseenter.selectMenu"), this.obj.off("mouseleave.selectMenu"), this.obj.off("click.selectMenu"), this.list.find("li").off("click.selectMenu")
    }, t.prototype.enable = function () {
        this.obj.removeClass("disabled"), this.init()
    }, t
}();