$(function(){
    $.ajax({
        url:"https://www.fastmock.site/mock/df683b01e605cb9506e7fe96fce5e23f/v1/hospital_1",
        type:"POST",
        data:{"m":get()},
        dataType:"json",
        success:function(data){
            var str=''
            $.each(data,function(i,v){
           $.each(data.list,function(i,v){
           str=' <h3>'+v.h_name+'</h3><p>——'+v.h_level+'医院</p><div><p><span>简介：</span>'+v.h_title+'</p></div><h4><span>详细信息：</span>'+v.h_info+'</h4><h4><span>优势：</span>'+v.h_trait+'</h4><h5>'+v.h_address+'</h5><img src="' + data.list[i].h_img + '">'
          })
          $("#contents").append($(str))
          })
        }
})
})
function get(){
var s1=location.search;
var s2=s1.substr(1,s1.length);
var s3=s2.split("=");
return s3[1];
}