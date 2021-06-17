// 下面的函数已经在html页面调用了



// banner图的函数封装
function banner() {
    // banner图接口数据
    $.ajax({
        // url: '/banner',
        url: 'http://localhost:1337/banner',

        type: 'get',
        dataType: 'json',
        success: function(res) {
            var imgStr = "", //banner图片
                imgIndexStr = ''; //索引器

            //数据拆分
            $.each(res, function(i, value) {
                // 遍历数组
                if (value.img_id == 0) {
                    imgIndexStr +=
                        '<li data-target="#carousel-example-generic" data-slide-to="' +
                        value.img_id + '" class="active"></li>';
                    imgStr +=
                        '<div class="item active"><img src="' + value.img_path + '" alt="..."></div>'
                        // <div class="carousel-caption"><h2><span class="tips"><a href="#">' +
                        // value.img_type + '</a></span><a href="#">' +
                        // value.img_title +
                        // '</a></h2><p>' + value.img_desc +
                        // '</p></div></div>';
                } else {
                    imgIndexStr +=
                        '<li data-target="#carousel-example-generic" data-slide-to="' +
                        value.img_id + '"></li>';
                    imgStr += '<div class="item"><img src="' + value.img_path + '" alt="..."></div>'
                        // '<div class="item"><img src="' + value.img_path +
                        //     '" alt="..."><div class="carousel-caption"><h2><span class="tips"><a href="#">' +
                        //     value.img_type + '</a></span><a href="#">' +
                        //     value.img_title +
                        //     '</a></h2><p>' + value.img_desc +
                        //     '</p></div></div>';
                }

            })
            $(".carousel-indicators").append($(imgIndexStr));
            $(".carousel-inner").append($(imgStr));
        }
    })

}

// 新闻列表的函数封装
function newsList() {
    // 新闻列表接口数据
    var obj = {};
    obj.speed = 5; //加载一次显示的数据条数
    obj.data = []; //用于接收数据的数组
    obj.loadMoreBtn = $('.main-load-more'); //点击按钮
    // 数据处理
    $.ajax({
            url: "http://localhost:1337/newsList",
            type: 'get',
            dataType: 'json',
            async: false,
            success: function(res) {
                $.each(res, function(i, v) {
                    obj.dataLen = res.length;
                    obj.maxLoad = Math.ceil(obj.dataLen / obj.speed); // 向上取整获取最大加载次数
                    obj.data.push(v);

                })
            }
        })
        // 加载更多
    loadMore(obj, function(data) {
        var str = '';
        for (let i = 0; i < data.length; i++) {
            if ((/.mp4$/).test(data[i].news_img)) {
                str += `
                    <!-- 新闻列表item 开始 -->
                    <div class="media main-item">
                        <div class="media-left">
                            <a href="#" class="tip">` + data[i]['news_tip'] + `</a>
                            <a href="news.html?id=` + data[i].news_id + `">
                                <video class="media-object" src="` + data[i]['news_img'] + `" alt="..."></video>
                            </a>
                        </div>
                        <div class="media-body">
                            <h2><a href="news.html?id=` + data[i].news_id + `" target="_blank"
                                    title='` + data[i]['news_title'] + `'>` + data[i]['news_title'] + `</a>
                            </h2>
                            <div class="main-item-ds">
                                <p>` + data[i]['news_context'] + `</p>
                            </div>
                            <div class="main-item-tips">
                                <div class="main-item-time">
                                    <i></i>
                                    <span>` + data[i]['news_time'] + `</span>
                                </div>
                                <a class="main-item-like" href="news.html?id=` + data[i].news_id + `">
                                    <i></i>
                                    <span>` + data[i]['news_num'] + `</span>
                                </a>
                            </div>
                        </div>
                    </div>
                   <!-- 新闻列表item 结束 -->`;
            } else {
                str += `
                <!-- 新闻列表item 开始 -->
                <div class="media main-item">
                    <div class="media-left">
                        <a href="#" class="tip">` + data[i]['news_tip'] + `</a>
                        <a href="news.html?id=` + data[i].news_id + `">
                            <img class="media-object" src="` + data[i]['news_img'] + `" alt="...">
                        </a>
                    </div>
                    <div class="media-body">
                        <h2><a href="news.html?id=` + data[i].news_id + `" target="_blank"
                                title='` + data[i]['news_title'] + `'>` + data[i]['news_title'] + `</a>
                        </h2>
                        <div class="main-item-ds">
                            <p>` + data[i]['news_context'] + `</p>
                        </div>
                        <div class="main-item-tips">
                            <div class="main-item-time">
                                <i></i>
                                <span>` + data[i]['news_time'] + `</span>
                            </div>
                            <a class="main-item-like" href="news.html?id=` + data[i].news_id + `">
                                <i></i>
                                <span>` + data[i]['news_num'] + `</span>
                            </a>
                        </div>
                    </div>
                </div>
     <!-- 新闻列表item 结束 -->`;

            }
        }
        $('.news-list').empty();
        $('.news-list').append($(str));
    });

}

//观点推荐封装
function opinion() {
    $.ajax({
        // data:'',
        url: "http://localhost:1337/opinion",
        dataType: 'json',
        type: 'post',
        success: function(data) {
            var str = '';
            $.each(data, function(i, v) {
                if (v.id <= 3) {
                    str += ' <li class="topThree"><a href="#"><span>' + v.id + '</span>' + v.opinion_author + '：' + v.opinion_title + '</a></li>'
                } else {
                    str += ' <li><a href="#"><span>' + v.id + '</span>' + v.opinion_author + '：' + v.opinion_title + '</a></li>'
                }
            })
            $(".viewpoint-body").append($(str))

        }

    })
}