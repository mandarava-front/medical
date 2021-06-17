$(function() {
    $.ajax({
        url: 'https://www.fastmock.site/mock/df683b01e605cb9506e7fe96fce5e23f/v1/doctor',
        type: 'post',
        dataType: 'json',
        success: function(data) {
            console.log(data)
            var str = ''
            $.each(data.list, function(i, v) {
                switch (v.d_office) {
                    case "牙科":
                        $("#aj").append($(newdiv(v)))
                        break;
                    case "皮肤科":
                        $("#aj2").append($(newdiv(v)))
                        break;
                    case "内科":
                        $("#aj3").append($(newdiv(v)))
                        break;
                    case "外科":
                        $("#aj4").append($(newdiv(v)))
                        break;
                    case "妇产科":
                        $("#aj5").append($(newdiv(v)))
                        break;
                    case "男科":
                        $("#aj6").append($(newdiv(v)))
                        break;
                    case "儿科":
                        $("#aj7").append($(newdiv(v)))
                        break;
                    case "五官科":
                        $("#aj8").append($(newdiv(v)))
                        break;
                }

                function newdiv(v) {
                    return str += '<a href="doctor_1.html?m=' + newstr(data.list[i].id) + '"><div><img src="' + newstr(data.list[i].d_img) + '"><h3>' + newstr(data.list[i].d_name) + '</h3><p>' + data.list[i].d_hospital + '<p>所属科室：' + data.list[i].d_office + '</p></div></a>'
                }
            })

            $("#aj").append($(str))

            function newstr(di) {
                return di
            }
        }
    })
})