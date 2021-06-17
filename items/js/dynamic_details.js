$(function(){
    var num=getId();
    $.ajax({
        url:"https://www.fastmock.site/mock/df683b01e605cb9506e7fe96fce5e23f/v1/news_detail",
        type:"get",
        dataType:'json',
        success:function(data){
            console.log(data);
            $.each(data.detail,function(i,v){
                if(data.detail[i].new_id==num){
                    $(".inner-title>h1").html(data.detail[i].new_title);
                    $(".inner-img>img").attr("src",data.detail[i].new_img);
                    $(".inner-text>p").html(data.detail[i].new_content);
                    $(".inner-under").html(data.detail[i].new_time);
                    return false;
                }
            })
        }
    });
})
function getId(){
    var url=location.search;
    var s1=url.substr(1,url.length);
    var s2=s1.split("=");
    return s2[1];
}