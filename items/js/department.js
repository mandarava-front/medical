$(function() {
    $.ajax({
        url: "http://localhost:1337/department",
        type: "POST",
        data: {},
        dataType: "json",
        success: function(data) {
            var str = '';
            $.each(data, function(i, v) {
                var str1 = '';
                $.each(v.name, (i, v) => {
                    str1 += '<li ><a href="department_1.html?m=' + v.id + '">' + v.o_name1 + '</a></li>'
                })
                str += '<ol><a href="#">' + v.o_name + '</a></ol><ul class="one"></li>' + str1 + '</ul>'
            })
            $(".menu").append($(str))
        }
    })
})