// 导航的json数据
var navLink = {
    'child': [{
            'id': 1,
            'name': '首页',
            'url': 'index.html',
            'level': 0
        },
        {
            'id': 2,
            'name': '加盟医疗机构',
            'url': 'add.html',
            'level': 0,
            'child': [{
                'id': 11,
                'name': '科室',
                'url': 'add.html',
                'level': 2
            }, {
                'id': 12,
                'name': '专家',
                'url': '#aaa',
                'level': 2
            }, {
                'id': 13,
                'name': '专家挂号',
                'url': '#zhuanjiaguahao',
                'level': 2
            }]
        },
        {
            'id': 3,
            'name': '就诊服务',
            'url': 'service.html',
            'level': 0,
            'child': [{
                'id': 20,
                'name': '体检信息',
                'url': 'service.html',
                'level': 2
            }, {
                'id': 21,
                'name': '就诊须知',
                'url': 'visit.html',
                'level': 2
            }, {
                'id': 22,
                'name': '住院须知',
                'url': 'hospital.html',
                'level': 2
            }, {
                'id': 23,
                'name': '医保政策',
                'url': 'insurance.html',
                'level': 2
            }, {
                'id': 24,
                'name': '急救指南',
                'url': 'emergency.html',
                'level': 2
            }]
        },
        {
            'id': 4,
            'name': '医疗动态',
            'url': 'dynamic.html',
            'level': 0
        }, {
            'id': 5,
            'name': '帮助',
            'url': 'help.html',
            'level': 0,
            'child': [{
                'id': 15,
                'name': '主要流程',
                'url': 'help.html',
                'level': 2
            }, {
                'id': 16,
                'name': '提示信息',
                'url': 'info.html',
                'level': 2
            }, {
                'id': 17,
                'name': '医疗机构的加盟流程',
                'url': 'process.html',
                'level': 2
            }, {
                'id': 18,
                'name': '网站服务内容',
                'url': 'content.html',
                'level': 2
            }]
        },
        {
            'id': 6,
            'name': '保健知识',
            'url': 'health.html',
            'level': 0
        },
        {
            'id': 7,
            'name': '辅助功能',
            'url': 'function.html',
            'level': 0
        },
        {
            'id': 8,
            'name': '医疗常识',
            'url': 'general.html',
            'level': 0
        },
        {
            'id': 10,
            'name': '留言',
            'url': 'wall.html',
            'level': 0
        }
    ]
}

// 友情链接的json数据
var links = {
    'child': [{
        'id': 1,
        'name': 'CHIMA',
        'url': '#'
    }, {
        'id': 2,
        'name': '中华医学会',
        'url': '#'
    }, {
        'id': 3,
        'name': '中国中医科学院',
        'url': '#'
    }, {
        'id': 4,
        'name': '中国信息通信研究院',
        'url': '#'
    }, {
        'id': 5,
        'name': '中国健康管理协会',
        'url': '#'
    }, {
        'id': 6,
        'name': '中国医学科学院',
        'url': '#'
    }, {
        'id': 7,
        'name': '中国医院协会',
        'url': '#'
    }, {
        'id': 8,
        'name': '中国卫生信息学会',
        'url': '#'
    }, {
        'id': 9,
        'name': '中国妇女发展基金会',
        'url': '#'
    }, {
        'id': 10,
        'name': '中国标准化研究院',
        'url': '#'
    }, {
        'id': 11,
        'name': '中国电信',
        'url': '#'
    }, {
        'id': 12,
        'name': '中国移动',
        'url': '#'
    }, {
        'id': 13,
        'name': '中国老年保健医学研究会',
        'url': '#'
    }, {
        'id': 14,
        'name': '中国联通人民邮电出版社',
        'url': '#'
    }, {
        'id': 15,
        'name': '健康报社',
        'url': '#'
    }, {
        'id': 16,
        'name': '北京大学信息科学技术学院',
        'url': '#'
    }, {
        'id': 17,
        'name': '国家卫生计生委',
        'url': '#'
    }, {
        'id': 18,
        'name': '新华网',
        'url': '#'
    }, {
        'id': 19,
        'name': '智医疗网站地图',
        'url': '#'
    }, ]
}

/**
 * 二级导航处理函数
 * 调用示例：addNav($nav, navLink)
 * @param {Object} dom 二级导航的接受dom元素
 * @param {Object} data 导航的json数据
 */
function addNav(dom, data) {
    var str = '<span class="arrow"></span><li class="header-nav-item" style="width: 80px; text-align: right; font-weight: 700;"></li>';
    for (var key in data) {
        for (var k in data[key]) {
            var title = data[key][k]['name'];
            var url = data[key][k]['url']
            str += '<li class="header-nav-item"><a href="' + url + '" title="' + title + '">' + title + '</a></li>'
        }
    }
    dom.append($(str))
}


/**
 * 三级导航的处理函数
 * 调用示例：addSecondNav($secondNavDom, navLink, 2);
 * @param {Object} dom 三级导航的dom元素
 * @param {Object} data 导航数据
 * @param {Number} pid 所属二级导航的id
 */
function addSecondNav(dom, data, pid) {
    var str = '';
    for (var key in data) {
        for (var k in data[key]) {
            var d = data[key][k];
            // 判断二级导航是否存在
            if (!d['child']) { // 不存在跳出循环
                continue;
            } else {
                // 判断是否是需要的导航
                if (d['id'] == pid) {
                    for (var k1 in d['child']) {
                        var title = d['child'][k1]['name'];
                        var url = d['child'][k1]['url'];
                        if (k1 == 0) {
                            str += '<li class="menu-item active"><a href="' + url + '">' + title + '</a></li>';
                        } else {
                            str += '<li class="menu-item"><a href="' + url + '">' + title + '</a></li>';
                        }
                    }
                }
            }
        }
    }

    dom.append($(str));

    // 添加选中样式类
    secondNavActive(dom);
}


/**
 * 友情链接的处理函数
 * 调用示例：addLinks(links, $linkDom);
 * @param {JSON} linksData 友情链接的JSON数据
 * @param {Object} dom 友情链接的dom获取元素
 */
function addLinks(linksData, dom) {
    var str = '';
    for (var k in linksData) {
        for (var k1 in linksData[k]) {
            var title = linksData[k][k1]['name'];
            var url = linksData[k][k1]['url']
            str += '<li><a href="' + url + '" target="_blank">' + title + '</a></li>';
        }
    }
    dom.append($(str));
}

/**
 * 三级导航的样式类处理函数
 *
 * @param {Object} navDom 接受导航的dom元素
 */
function secondNavActive(navDom) {
    // 获取元素
    var list = navDom;
    // 分割截取网页url路径
    var urlArr = location.href.split('/');
    // 获取当前网址的html页面路径
    var p = urlArr[urlArr.length - 1];
    $.each(list.children(), function(i, v) {
        // 遍历清除active类
        if ($(v).hasClass('active')) {
            $(v).removeClass('active');
        }
        // 遍历查找当前所在的导航
        var aUrl = $(v).children('a').attr('href');
        if (p.indexOf(aUrl) != -1) { // 获取的p有可能带get参数
            // 如果截取的网页字符串与当前$(v)下的a标签的href属性值匹配，则添加active类
            $(v).addClass('active');
        }
    })
}

/**
 * 加载更多功能
 *  使用回调函数便于在页面点击事件发生的时候，数据动态改变
 * @param {object} obj 参数对象
 * @param {Function} success 回调函数
 * @returns fn 通过回调函数返回生成的data数据
 */
function loadMore(obj, success) {
    var btn = obj.loadMoreBtn, //触发按钮
        dataList = obj.data, //数据数组
        speed = obj.speed, //一次加载数据条数
        maxLoad = obj.maxLoad, //最多加载次数
        index = 0, //加载索引
        data = []; //返回的数据数组
    // 函数一运行，就加载默认条数的数据
    for (let i = 0; i < speed; i++) {
        data.push(dataList[i])
        index++;
    }
    // 加载更多按钮点击一次
    btn.click(function() {
            maxLoad--; //最大次数减一
            if (maxLoad >= 0) {
                for (let j = 0; j < speed; j++) {
                    if (dataList[index]) { //如果数据数组还有值，则push
                        data.push(dataList[index])
                    }
                    index++;
                }
                // 点击发生回调
                success(data);
            }
        })
        // 初始化回调
    success(data);
}

$(function() {
    // 获取二级导航的dom元素
    var $nav = $('.header-nav-list');
    // 调用二级导航的处理函数
    addNav($nav, navLink)
        // 获取友情链接的dom元素
    var $linkDom = $('.links>ul')
        // 调用友情链接的处理函数
    addLinks(links, $linkDom);
})