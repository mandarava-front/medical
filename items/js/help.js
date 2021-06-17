function isIE() {
    if (!!window.ActiveXObject || "ActiveXObject" in window)
        return true;
    else
        return false;
}

$(document).ready(function() {
        //常见问题  后台读取
        $.ajax({
                url: "https://www.fastmock.site/mock/df683b01e605cb9506e7fe96fce5e23f/v1/helpquestion",
                type: "get",
                success: function(data) {
                    var questions_data = data;
                    str = "";
                    console.log("常见问题")
                    for (var i = 0; i < questions_data.length; i++) {
                        str += '<div class="faq_item"><p class="question" onclick="click_question(this);" >' + questions_data[i].question + '</p><p class="answer">' + questions_data[i].answer + '</p></div>';
                    }
                    $("#bt_que_lists").append(str);
                }
            })
            //对话存本地
            // localStorage.clear();
        try {
            var get_msg_list = localStorage.getItem("msg_lists");
        } catch (e) {
            get_msg_list = null;
        }
        if (!isIE()) {
            if (get_msg_list == null) {
                localStorage.setItem("msg_lists", JSON.stringify({}));
            } else {
                //本地获取聊天记录
                get_msg_list = JSON.parse(get_msg_list);
                var str = "";
                for (var i in get_msg_list) {
                    if ($.trim(get_msg_list[i].question) != "") {
                        str += '<div class="lem_question"><div class="left_lem_questionimg"><img src="../img/health-intro1.jpg" alt=""></div><div class="right_lem_questionmsg"><p>' + get_msg_list[i].question + '</p></div></div>';
                    } else {
                        str += '<div class="lem_answer"><div class="left_lem_answerimg"><img src="../img/u=2390322175,1120675000&fm=26&gp=0.jpg" alt=""></div><div class="right_lem_answermsg"><p>' + get_msg_list[i].answer + '</p></div></div>';
                    }

                }
                //聊天滚动到底部
                $("#le_msg_in").append(str);
                setTimeout(function() {
                    $("#le_msg").scrollTop(1000000);
                }, 100);
            }
        }
        //获取本地对话
        var todate = new Date();
        if (!isIE()) var reget_msg_list = JSON.parse(localStorage.getItem("msg_lists"));
        //发送消息
        var toinput = $("#em-widget-textarea");
        $("#em_widget_send").click(function() {
            str = '<div class="lem_question"><div class="left_lem_questionimg"><img src="../img/health-intro1.jpg" alt=""></div><div class="right_lem_questionmsg"><p>' + toinput.val() + '</p></div></div>';
            if ($.trim(toinput.val()) != '') {
                $("#le_msg_in").append(str);
                if (!isIE()) {
                    reget_msg_list[todate.getTime()] = { question: toinput.val(), answer: "" }; //写入本地对话 question
                    localStorage.setItem("msg_lists", JSON.stringify(reget_msg_list));
                }
                //天行机器人
                $.ajax({
                    url: "http://api.tianapi.com/txapi/robot/index",
                    type: "post",
                    data: { key: "ac8fcda7ae3749fe9fa2e898af196633", question: toinput.val(), mode: 0, priv: 1 },
                    success: function(data) {
                        str = '<div class="lem_answer"><div class="left_lem_answerimg"><img src="../img/u=2390322175,1120675000&fm=26&gp=0.jpg" alt=""></div><div class="right_lem_answermsg"><p>' + data.newslist[0].reply + '</p></div></div>';
                        if (!isIE()) {
                            reget_msg_list[todate.getTime() + 10] = { question: "", answer: data.newslist[0].reply } //写入本地对话 answer
                            localStorage.setItem("msg_lists", JSON.stringify(reget_msg_list));
                        }
                        if (data.newslist[0].reply != '') {
                            $("#le_msg_in").append(str);
                        }
                        $("#le_msg").scrollTop(100000);
                    }
                })
            }
            toinput.val("")
            $("#le_msg").scrollTop(100000);
        })
    })
    //常见问题隐藏
function click_question(e) {
    var sibli = $(e).siblings(".answer");
    if (sibli.hasClass("active")) {
        sibli.removeClass("active");
    } else {
        $(".faq_item").children(".answer").removeClass("active");
        sibli.addClass("active");
    }
}