// $(function() {

//     msgListCreate();

//     // 立即执行函数判断是否可以留言
//     let time = setInterval(function() {
//         isAbleMsg()
//     }, 300);
// })

// function msgListCreate() {
//     // 留言数据请求
//     $.ajax({
//         url: '/message',
//         type: 'get',
//         dataType: 'json',
//         success: function(data) {
//             var str = '';
//             $.each(data.msg, function(i, v) {
//                 str += `
//                 <li class="row">
//                     <div class="media col-md-offset-1 col-md-10">
//                         <div class="media-left">
//                             <img class="media-object img-circle" src="` + v.msg_img + `" alt="...">
//                             </a>
//                         </div>
//                         <div class="media-body">
//                             <h4>` + v.msg_name + `<small class="pull-right">` + v.msg_time + `</small></h4>
//                             <p>` + v.msg_context + `</p>
//                             <p>
//                             <button type="button" class="btn btn-info btn-xs">回复</button>
//                             <small class="click pull-right"><span class="glyphicon glyphicon-thumbs-up"></span>&nbsp;` + v.msg_click + `</small>
//                             </p>
//                         </div>
//                     </div>
//                 </li>
//                 `;
//             });
//             $(".showMsgList").append($(str));
//         }
//     })
// }

// function isAbleMsg() {
//     // 登录判断
//     if (isLogin()) {
//         // 登录的逻辑
//         $('#msgTextarea').removeAttr('disabled');
//         $('#submit').removeAttr('disabled');
//     } else {
//         // 未登录的逻辑处理
//         // 1、留言文本域不可用
//         $('#msgTextarea').attr('disabled', 'disabled').attr('placeholder', '请您登录！');
//         // 2、提交按钮不可点击
//         $('#submit').attr('disabled', 'disabled');
//     }
// }



$(function() {

    var datareq = { p: '', c: '', a: '' };
    $(".addr").children("select:eq(0)").change(function() {
        if ($(this).val() !== '') {
            datareq.p = $(this).val()
        }
    })
    $(".addr").children("select:eq(1)").change(function() {
        datareq.c = $(this).val()
    })
    $(".addr").children("select:eq(2)").change(function() {
            if ($(this).val() !== '') {
                datareq.a = $(this).val()
                AjaxHospital(datareq, hospitaldata, 'hospital')
            }
        })
        //根据医院换科室


    //筛选条件
    choose(".hospital")
    choose(".depart")
    choose(".ill")
    let docnum = 10;
    //出诊专家请求
    $.ajax({
        url: "http://localhost:1337/todayProficient",
        data: '',
        type: 'post',
        dataType: 'json',
        success: function(data) {
            var todaystr = ''
            var str1 = ''
            console.log(data)
            for (var i = 0; i < docnum; i++) {
                todaystr += '<div class="doctor"><div class="imga"><img src="' + data[i].doctor_img + '" alt=""></div><div class="intr"><p class="name"><span>姓名：</span><span>' + data[i].name + '</span></p><p class="pro">医院职级：<span>' + data[i].doctor_hospital + '</span>     <span>' + data[i].doctor_professor + '</span>      <span>' + data[i].subject + '医生</span></p><p class="info">简介：' + data[i].info + '</p><button><a href="./register.html">预约</a></button></div></div>'
            }
            for (var j = data.length - 1; j > data.length - 5; j--) {
                console.log(data[j])

                str1 += ` <div class="recommend-detailBase">
                <div class="recommend-detailBase-avatar">
                    <img src="${data[j].doctor_img }">
                </div>
                <div class="recommend-detailBase-main-subtitle">
                        医师:${data[j].name}
                    </div>
                <div class="recommend-detailBase-main">
                    
                    <div class="recommend-detailBase-main-tagText">
                        <div class="widget-text-ellipsis-box widget-text-ellipsis-box--visible">
                            <div class="widget-text-ellipsis-text ">简介:${data[j].info.substr(0,44)+'...'} </div>
                            <div class="widget-text-ellipsis-text widget-text-ellipsis-placeholder widget-text-ellipsis-placeholder--maxline widget-text-ellipsis-placeholder--computed">
                                简介:
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>`
            }
            $(".rr3").append($(str1))
            $(".doc").append($(todaystr))
        }
    })
})


//函数封装
//点击事件
function choose(chooseNode) {
    $(chooseNode).children(".choose-content").on('click', '.main-item', function() {
        $(this).addClass("main-checked")
        $(this).siblings(".main-item").removeClass("main-checked")
    })
}

//根据地点请求医院数据
function AjaxHospital(datas, fun, chose) {
    console.log(datas)
    $.ajax({
        url: "http://localhost:1337/area",
        data: datas,
        dataType: 'JSON',
        type: 'post',
        success: function(data) {
            fun(data, chose)
            $(".hospital").children(".choose-content").on('click', '.main-item', function() {
                for (var i = 0; i < data.length; i++) {
                    for (var key in data[i]) {
                        if (data[i][key] == $(this).text()) {
                            AjaxDepartment({ reqd: JSON.stringify(data[i].department) }, departdata, 'depart')
                        }
                    }
                }
            })
        }
    })
}
//根据医院请求科室数据
function AjaxDepartment(datas, fun, chose) {
    $.ajax({
        url: "http://localhost:1337/area_depart",
        data: datas,
        dataType: 'JSON',
        type: 'post',
        success: function(data) {
            fun(data, chose)
            $(".depart").children(".choose-content").on('click', '.main-item', function() {
                for (var i = 0; i < data.length; i++) {
                    for (var key in data[i]) {
                        if (data[i][key] == $(this).text()) {
                            illdata(data[i], 'ill')
                        }
                    }
                }
            })
        }
    })
}
//更新数据
function hospitaldata(data, chose) {
    var strhos = '<div class="main-item">不限</div>';
    $.each(data, (i, v) => {
        strhos += '<div class="main-item">' + v.hospital_name + '</div>'
    })
    $("." + chose + ">.choose-content>.main-item").remove()
    $("." + chose + ">.choose-content").append($(strhos))
        // $(strhos).replaceAll($(".hospital>.choose-content>.main-item"))
}
//更新科室数据
function departdata(data, chose) {
    var strhos = '<div class="main-item">不限</div>';
    $.each(data, (i, v) => {
        strhos += '<div class="main-item">' + v.o_name + '</div>'
    })
    $("." + chose + ">.choose-content>.main-item").remove()
    $("." + chose + ">.choose-content").append($(strhos))
        // $(strhos).replaceAll($(".hospital>.choose-content>.main-item"))
}
//更新疾病数据
function illdata(data, chose) {
    var strhos = '<div class="main-item">不限</div>';
    for (var i = 0; i < data.name.length; i++) {
        strhos += '<div class="main-item">' + data.name[i].o_name1 + '</div>'
    }
    $("." + chose + ">.choose-content>.main-item").remove()
    $("." + chose + ">.choose-content").append($(strhos))
    $(".ill").children(".choose-content").on('click', '.main-item', function() {
        var docshow = '';
        $(".recommend-container-bottom").empty()
        $(".component-recommend-container").empty()
        for (var i = 0; i < data.name.length; i++) {
            if (data.name[i].o_name1 == $(this).text()) {
                console.log(data.name[i].doctor)
                for (var j = 0; j < (data.name[i].doctor).length; j++) {
                    var v = data.name[i].doctor[j]
                    docshow += '<div class="recommend-detailBase"><div class="recommend-detailBase-avatar"><img src="' + v.doctor_img + '"></div><div class="recommend-detailBase-main"><div class="recommend-detailBase-main-subtitle">' + v.name + '医生</div> <div class="recommend-detailBase-main-tagText"><div class="widget-text-ellipsis-box widget-text-ellipsis-box--visible"><div class="widget-text-ellipsis-text ">简介:' + v.doctor_hospital + v.doctor_professor + ' </div><div class="widget-text-ellipsis-text widget-text-ellipsis-placeholder widget-text-ellipsis-placeholder--maxline widget-text-ellipsis-placeholder--computed">简介: </div></div></div></div></div>'
                }
            }
        }
        $(".recommend-container-bottom").append($(docshow))
    })

}