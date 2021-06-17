$(function() {
    $.ajax({
        url: "http://localhost:1337/hospital",
        type: "POST",
        data: {},
        dataType: "json",
        success: function(data) {

            var str = ''
            $.each(data, function(i, v) {
                $.each(v, function(i, v) {
                    $.each(v,function(i,vx){
                        $.each(vx,function(i,v){
                            console.log(v)
                          for(var i=0;i<v.length;i++){
                             $.each(v[i],function(i,v){
                                 for(var i=0;i<v.length;i++){
                                    str += ' <div><img src="' + v[i].img + '"><div><h3>' + v[i].hospital_name + '</h3><a href="' + v[i].hospital_url + '">查看详情</a><div><span>简介：</span>' + v[i].info + '</div><p><span>等级：</span>' + v[i].level + '</p></div></div>'
                               
                                 }
                             })
                            }
                    })
                    })
                })
            })
            $("#show").append($(str))
        }
    })
})