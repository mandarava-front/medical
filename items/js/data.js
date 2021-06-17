/**
 * mock数据
 * 生成类似于接口的虚拟数据
 * 

/**
 * 处理jq-AJAX传来的data数据
 * 该函数用于处理部分post请求的数据
 * 新闻详情接口、登录接口、注册接口
 *
 * @param {Object} jqData $.ajax的data属性传来的对象
 * @return {Object} 返回处理过后的类似于json数据的对象 
 */
function jqDataResolve(jqData) {
    var obj = {}; // 处理过后返回的对象
    // 获取JQ包含的对象
    var data = jqData.body;
    // 根据&拆解字符串
    var dataArr = data.split('&');
    for (let i = 0; i < dataArr.length; i++) {
        // 根据=再次分解
        var dataNewArr = dataArr[i].split('='); // 分解为一个长度为2的数组
        // dataNewArr[0]设置为obj的键，dataNewArr[1]设置为对应的值
        obj[dataNewArr[0]] = decodeURI(dataNewArr[1]); // 对象拼接处理
    }
    return obj;
}

/** 
 * banner图接口
 * 随机生成banner图
 */
// Mock.mock('/banner', "get", function() {
//     return Mock.mock({
//         'imgObj|5': [{
//             img_id: '@id', //图片id
//             img_path: "@image('200x100', '#9cc', '#333', 'png', 'hello world!')", // 图片路径
//             img_type: '@pick(["资讯", "业界", "国际"])', //banner图描述的标签
//             img_title: "@ctitle(10, 20)", //图片标题
//             img_desc: '@cparagraph(1, 3)', //图片描述
//         }]
//     });
// })

/** 
 * 新闻列表接口
 * 随机生成新闻列表接口
 */
Mock.mock('/newsList', 'get', function() {
    return Mock.mock({
        "newsList|20-100": [{
            news_id: '@id(4)', //新闻ID
            news_img: "@image('200x100', '#9cc', '#333', 'png', 'News list')", //新闻缩略图
            news_title: '@ctitle(5,20)', //新闻标题
            news_time: '@date("yyyy/MM/dd")', // 创建新闻时间
            news_tip: '@pick(["资讯", "观点", "分享"])', //新闻标签
            news_context: '@cparagraph(20,30)', //新闻概述
            news_num: '@integer(60, 100)', //新闻评论条数
        }]
    });
})

/** 
 * 新闻详情接口
 * 随机生成新闻详情接口
 */
// Mock.mock('/newsItem', 'post', function(data) {
//     var d = jqDataResolve(data);
//     var text = ""; // 新闻详情页的内容字符串
//     for (let i = 0; i < 5; i++) {
//         var num = parseInt(Math.random() * 10);
//         if (num / 2 == 0) {
//             text += '<p style="color: #333;font-size: 18px;line-height: 1.9;font-weight: inherit;">';
//             // 生成图片
//             text += '<img style="width: 100%;" src="' + Mock.mock("@image('200x100', '#9cc', '#333', 'png', 'news')") + '" alt="">'
//         } else {
//             text += '<p style="text-indent: 2em;color: #333;font-size: 18px;line-height: 1.9;font-weight: inherit;">';
//             // 生成一段文字
//             text += Mock.mock('@cparagraph()');
//         }
//         text += '</p>';
//     }
//     return {
//         "news_id": d.id, //新闻ID
//         "news_title": Mock.mock('@ctitle(5,20)'), //新闻标题
//         "news_author": Mock.mock("@cname"), //新闻作者
//         "news_tip": Mock.mock('@pick(["资讯", "观点", "分享"])'), //新闻标签
//         "news_time": Mock.mock('@date("yyyy/MM/dd")'), //新闻日期
//         "news_context": text, // 新闻内容
//     };
// })

/** 
 * 专家列表数据接口
 * 随机生成专家列表
 */
Mock.mock('/specialist', 'get', function() {
    return Mock.mock({
        'specList|30-50': [{
            'spec_id': '@id()', //专家ID
            'spec_name': '@cname', //专家姓名
            'spec_img': "@image('100x100', '#99CCFF', '#333', 'png', '老教授')", //专家头像
            'spec_depart': '@pick(["内科", "外科", "妇产科", "男科", "儿科", "五官科", "肿瘤科", "皮肤科", "牙科", "传染科", "中医科","麻醉医学科", "医学影像科", "精神科"])', //专家所属科室
            'spec_evaluate': '@pick(["住院医师", "主治医师", "副主任医师", "主任医师"])', //专家职称
            'spec_time': '@date("yyyy年MM月dd日")', //专家从业时间
            'spec_level': '@integer(1, 5)', //评价等级
        }]
    });
})

/** 
 * 留言板接口
 * 随机生成留言板的数据
 */
Mock.mock('/message', 'get', function() {
    return Mock.mock({
        'msg|3-20': [{
            'msg_id': "@id(3)", //留言ID
            'msg_name': "@cname", //留言人
            'msg_img': "@image('100x100', '#99CCFF', '#333', 'png', 'msg')", //留言人头像
            'msg_time': '@datetime("yyyy-MM-dd HH:mm:ss")', //留言日期
            'msg_context': '@cparagraph(1, 3)', //留言内容
            'msg_click': '@integer(1, 100)', //点击量
        }]
    });
})

/**
 * 登录数据模拟接口
 * 登录接口必须注册之后，在本地存储生成了username和userpwd信息才能调用。
 * 传入的数据必须包含用户名和密码，再根据本地存储的数据进行判断，来决定是否登录成功
 */
Mock.mock('/login', 'post', function(data) {
    // 获取用户名和密码
    var d = jqDataResolve(data);
    // 登录判断
    if (localStorage.getItem('username') == d.name && localStorage.getItem('userpwd') == d.pwd) { //如果本地存储的用户名和密码与用户输入的用户名一致，登录成功；否则算失败
        return Mock.mock({
            'userMsg|1': [{
                'user_id': '@id',
                'username': d.name,
                'userpwd': d.pwd,
                'isLogin': 'ok'
            }]
        })
    } else {
        return Mock.mock({
            'userMsg|1': [{
                'isLogin': 'no'
            }]
        })
    }

})

/**
 * 注册的模拟接口
 * 注册接口首先判断本地存储数据里面username字段是否等于用户传递过来的值，如果包含则表示已经注册，返回no
 * 未注册则先清除本地缓存的用户名、密码和邮箱的信息
 * 清除成功后将用户的值存入到本地存储
 */
Mock.mock('/register', 'post', function(data) {
    // 获取传来的用户数据对象
    var d = jqDataResolve(data);
    if (localStorage.getItem('username') != d.name) { //本地存储数据不包含用户名信息
        // 清除数据
        if (localStorage.getItem('username')) {
            localStorage.removeItem('username');
        }
        if (localStorage.getItem('userpwd')) {
            localStorage.removeItem('userpwd');
        }
        if (localStorage.getItem('useremail')) {
            localStorage.removeItem('useremail');
        }
        // 将获取到的数据存储在localStorage中
        if (d.name) {
            localStorage.setItem('username', d.name);
        }
        if (d.pwd) {
            localStorage.setItem('userpwd', d.pwd);
        }
        if (d.email) {
            localStorage.setItem('useremail', d.email);
        }
        // 设置用户头像
        localStorage.setItem('userImg', Mock.mock("@image('200x100', '#4A7BF7', 'user')"))
            // 数据组装
        return Mock.mock({
            'msg': 'ok'
        })
    } else {
        return Mock.mock({
            'msg': 'no'
        })
    }

})