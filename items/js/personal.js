$(function() {
    var str = '';
    var str1 = '';
    $.ajax({
        url: "https://www.fastmock.site/mock/fe49c040f1078cf14bcd0b59503f86e6/hospital/information",
        type: "POST",
        data: {},
        dataType: "json",
        success: function(data) {
            var da = data.person;
            str = ' <div class="sculpture"><img src="' + da.sculpture + '"></div><div class="named"><h1>' + da.name + '</h1><p>欢迎使用智医疗平台</p></div>';

            str1 = '<table><tr><td>姓名</td><td>' + da.name + '</td><td>年龄</td><td>' + da.age + '</td><td>民族</td><td>' + da.nation + '</td><td>出生日期</td><td>' + da.birthday + '</td></tr><tr><td>性别</td><td>' + ((da.sex == true) ? '男' : '女') + '</td><td>身高</td><td>' + da.height + 'cm</td><td>体重</td><td>' + da.weight + 'kg</td><td>婚姻状况</td><td>' + ((da.marry == true) ? '是' : '否') + '</td></tr><tr><td>地址</td><td colspan=7>' + da.address + '</td></tr></table>';
            $(".top").append($(str));
            $(".info").append($(str1))
            $.each(da.appointment, function(i, v) {
                for (var i = 0; i < v.length; i++) {
                    var str2 = ' <tr><td>' + v[i].id + '</td><td>' + v[i].object + '</td><td>' + v[i].object_name + '</td><td>' + v[i].doctor_name + '</td><td>' + v[i].appoin_time + '</td><td>' + v[i].status + '</td></tr>';
                    $(".appointment>table").append($(str2))
                }
            });
            console.log(da.diagnosis)
            $.each(da.diagnosis, function(i, v) {
                console.log(v)
                for (var i = 0; i < v.length; i++) {
                    var str3 = ' <tr><td>' + v[i].id + '</td><td>' + v[i].object + '</td><td>' + v[i].object_name + '</td><td>' + v[i].doctor_name + '</td><td>' + v[i].appoin_time + '</td><td>' + v[i].status + '</td></tr>';
                    $(".diagnosis>table").append($(str3))
                }
            });

        }
    })
})