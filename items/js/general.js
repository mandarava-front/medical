$(function () {
    $.ajax({
        url: "/newsList",
        type: 'get',
        dataType: 'json',
        async: false,
        success: function (res) {
            var str = '';
            var strs = '';
            var clicknum = 1;
            var lists = res.newsList.length;

            //观点推荐
            $.each(res.newsList, function (i, v) {
                if (i < 10) {
                    strs += '<li><a href="generaledtails.html?id=' + v.news_id + '" target="_blank"><span>' + (i + 1) + '</span>' + v.news_title + '</a></li>';
                }
            })
            //新闻资讯
            $.each(res.newsList, function (i, v) {
                str += `
                        <!-- 新闻列表item 开始 -->
                        <div class="media main-item">
                            <div class="media-left">
                                <a href="#" class="tip">` + v.news_tip + `</a>
                                <a href="generaledtails.html">
                                    <img class="media-object" src="` + v.news_img + `" alt="...">
                                </a>
                            </div>
                            <div class="media-body">
                                <h2><a href="generaledtails.html?id=` + v.news_id + `" target="_blank"
                                        title='` + v.news_title + `'>` + v.news_title + `</a>
                                </h2>
                                <div class="main-item-ds">
                                    <p>` + v.news_context + `</p>
                                </div>
                                <div class="main-item-tips">
                                    <div class="main-item-time">
                                        <i></i>
                                        <span>` + v.news_time + `</span>
                                    </div>
                                    <a class="main-item-like" href="generaledtails.html">
                                        <i></i>
                                        <span>` + v.news_num + `</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <!-- 新闻列表item 结束 -->`;
            })
            $('.viewpoint-body').append(strs);
            $('.news-list').append(str);
            $('.main-item').eq(4).nextAll('div').css("display", "none");
            $(".main-load-more").click(function () {
                clicknum++;
                $('.main-item').eq(5 * clicknum).prevAll('div').css("display", "block");
            })
        }
    })
})