$(function () {
    $(".toggle-mask>a").mouseover(function () {
        $(this).children("div").show();
    })
    $(".toggle-mask>a").mouseleave(function () {
        $(this).children("div").hide();
    })
    // 调接口
    $.ajax({
        url: "/newsList",
        type: 'get',
        dataType: 'json',
        async: false,
        success: function (res) {
            var str = '';
            $.each(res.newsList, function (i, v) {
                if (i < 10) {
                    str += '<li>' + v.news_title + '</li>';
                }
            })
            $(".content-news").append($(str));


            var str1 = '';
            $.each(res.newsList, function (i, v) {
                if (i < 3) {
                    str1 += '<div class="toggle-mask"><a href="healthdetails.html?id"><img src="' + v.news_img + '" alt=""><div class="mask">' + v.news_title + '</div>';
                }
            })
            $(".content-intro").append($(str1));
        }
    })
})