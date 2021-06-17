// alert("我是科室")
$(function() {
    function getValue() {
        // 获取信息内容
        var lcstr = location.search; // ?m=9
        var str1 = lcstr.substr(1, lcstr.length); // m=9&name=123
        var arr = str1.split("&");
        var results = [];
        for (var i = 0; i < arr.length; i++) {
            // alert(arr[i]);
            var newArr = arr[i].split("=");
            // alert(newArr[1]);
            results.push(newArr[1]);
        }
        return results.toString();
    }

    $.ajax({
        url: "http://localhost:1337/department_1",
        type: "post",
        data: { "m": getValue() },
        dataType: "json",
        success: function(data) {
            var str = ''
            $(".de_title").html(data.o_name1);
            $(".de_main").html(data.o_info);
            $.each(data.doctor, function(a, b) {
                str += '<div class="doctor_man"><a href="#"><img src="' + b.doctor_img + '"></a><p>' + b.name + '</p><p>' + b.doctor_hospital + '：' + b.doctor_professor + '</p></div>'
            })
            $(".doctor").append($(str))
        }

    })

})