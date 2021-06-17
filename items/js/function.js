$(function () {
    $(".nav_right .caissaapp span").mouseenter(function () {
        $(".caissaapp>.contents").css("display", "block");
    })
    $(".nav_right .caissaapp span").mouseleave(function () {
        $(".caissaapp>.contents").css("display", "none");
    })
    $(".nav_right .user span").mouseenter(function () {
        $(".user>.contents").css("display", "block");
    })
    $(".nav_right .user span").mouseleave(function () {
        $(".user>.contents").css("display", "none");
    })
    $(".nav_right .eyes span").mouseenter(function () {
        $(".eyes>.contents").css("display", "block");
    })
    $(".nav_right .eyes span").mouseleave(function () {
        $(".eyes>.contents").css("display", "none");
    })
    //返回顶部
    $("#gotop").click(function () {
        $('body,html').animate({
            scrollTop: 0
        }, 500);
        return false;
    });
    //登录接口
    loginInit();


    //新闻接口
    $.ajax({
        url: "/newsList",
        type: "get",
        dataType: "json",
        success: function (data) {
            var str = '';
            $.each(data.newsList, function (i, v) {
                str += '<div class="media main-item"><div class="media-left"><a href="news.html?id=' + v.news_tip + '" class="tip">分享</a><a href="news_info.html?id=' + v.news_id + '"><img class="media-object" src="' + v.news_img + '" alt="..."></a></div><div class="media-body"><h2><a href="news.html?id=' + v.news_id + '" target="_blank" title=' + v.news_title + '>' + v.news_title + '</a></h2><div class="main-item-ds"><p>' + v.news_context + '</p></div><div class="main-item-tips"><div class="main-item-time"><i></i><span>' + v.news_time + '</span></div><a class="main-item-like" href="#"><i></i><span>' + v.news_num + '</span></a></div></div></div>';
            })
            $(".news").append($(str));
        }
    })
})