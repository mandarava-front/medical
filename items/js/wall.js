$(function() {

    msgListCreate();

    $("#submit").click(function(e) {
        e.stopPropagation()
        addMsg();

    })

    // 立即执行函数判断是否可以留言
    let time = setInterval(function() {
        isAbleMsg()
    }, 300);
})

function msgListCreate() {
    // 留言数据请求
    $.ajax({
        url: 'https://www.fastmock.site/mock/df683b01e605cb9506e7fe96fce5e23f/v1/message',
        type: 'get',
        dataType: 'json',
        success: function(data) {
            var str = '';
            $.each(data.msg, function(i, v) {
                str += `
                <li class="row">
                    <div class="media col-md-offset-1 col-md-10">
                        <div class="media-left">
                            <img class="media-object img-circle" src="../img/noLogin.jpg" alt="...">
                            </a>
                        </div>
                        <div class="media-body">
                            <h4>` + v.uname + `<small class="pull-right">` + v.msg_time + `</small></h4>
                            <p>` + v.msg + `</p>
                            <p>
                            <button type="button" class="btn btn-info btn-xs">回复</button>
                            </p>
                        </div>
                    </div>
                </li>
                `;
            });
            $(".showMsgList").append($(str));
        }
    })
}

function isAbleMsg() {
    // 登录判断
    if (isLogin()) {
        // 登录的逻辑
        $('#msgTextarea').removeAttr('disabled');
        $('#submit').removeAttr('disabled');
        $(".showmsg").show()
    } else {
        // 未登录的逻辑处理
        // 1、留言文本域不可用
        $('#msgTextarea').attr('disabled', 'disabled').attr('placeholder', '请您登录！');
        // 2、提交按钮不可点击
        $('#submit').attr('disabled', 'disabled');
        // 留言不可见
        $(".showmsg").hide()
    }
}

// 添加留言
function addMsg() {
    str1 = `
    <li class="row">
        <div class="media col-md-offset-1 col-md-10">
            <div class="media-left">
                <img class="media-object img-circle" src="../img/noLogin.jpg" alt="...">
                </a>
            </div>
            <div class="media-body">
                <h4>123456<small class="pull-right">2021-06-01  21:22:39</small></h4>
                <p>服务不错哦</p>
                <p>
                <button type="button" class="btn btn-info btn-xs">回复</button>
                </p>
            </div>
        </div>
    </li>
    `;
    $("#smn").append(str1)
    $.ajax({
        url: 'https://www.fastmock.site/mock/df683b01e605cb9506e7fe96fce5e23f/v1/addmsg',
        type: 'post',
        data: {
            "uname": localStorage.getItem("username"),
            "msg": $("#msgTextarea").val()
        },
        dataType: 'json',
        success: function(data) {
            if (data.msg == "ok") {
                alert("添加成功")
                $("#msgTextarea").val("")
            }
        }
    })
}