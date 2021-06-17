$(function(){
    $.ajax({
        url:"https://www.fastmock.site/mock/df683b01e605cb9506e7fe96fce5e23f/v1/news",
        type:"get",
        success:function(data){
            var s = '';
            $.each(data.newsList,function(i,v){
                s += '<a href ="dynamic_details.html?m='+v.news_id+'" class="box_a clearfix"><div class="box_left col-md-5"><img src="'+v.news_img+'" class="box_img"></div><div class="box_right col-md-7"><h2 class="box_biaoti">'+v.news_title+'</h2><p class="box_content">'+v.news_content+'</p><p class="box_time">'+v.news_time+'</p></div></a>';
            })
            $("#dynamic_box").html(s);
            var a = '';
            $.each(data.newsRedian,function(i,v){
                a += '<li class="lis">'+v.redian_content+'</li>'
            });
            $(".viewpoint-body").append(a);
        }
    })
})