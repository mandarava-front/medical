var commondata=''
$(function() {
    $.ajax({
        url:"http://localhost:1337/department",
        data:'',
        dataType:'JSON',
        type:'get',
        success:function(data){
            commondata=data
            $("#type").append(options(data))
            for(var i=0;i<data.length;i++){
                // console.log(data[i])
            }
        }

    })
function options(data){
    var str='';
    for(var i=0;i<data.length;i++){
        str+='<option value="'+data[i].id+'">'+data[i].o_name+'</option>'
    }
    return str
}

    // 预约登录验证
    $(function() {
        $("#line").click(function() {
            var informations={}
                // if (!localStorage.getItem("loginok")) {
                //     alert("请登录");
                //     console.log(localStorage)
                // } else{
                    // alert("yidengl")
                     informations={
                        name:$("input[type='name']").val(),
                        phone:$("input[type='tel']").val(),
                        email:$("input[type='email']").val(),
                        age:$("input[type='number']").val(),
                        method:$("input[type='radio']:checked").val(),
                        information:$("textarea").val(),
                        doctor:$("#df").val(),
                        date:$("input[type='date']").val(),
                        time:$("input[type='time']").val()
                }
                if(informations.name!==''&&informations.phone!==''&&informations.email!==''&&informations.age!==''&&informations.method!==''&&informations.information!==''&&informations.date!==''&&informations.time!==''&&informations.doctor!==''){
                    $.ajax({
                        url:'http://localhost:1337/order',
                        type:'post',
                        dataType:'JSON',
                        data:informations,
                        success:function(data){
                            console.log(data)
                        }
                    })
                }else{
                    alert("请填写完整信息")
                }
                // }
        })

    })
})
function fn(){
    let str='';
    for(var i=0;i<commondata.length;i++){
        if(commondata[i].id==$('#type').val()){
            let data=commondata[i].name
            for(var i=0;i<data.length;i++){
             str+='<option value="'+data[i].id+'">'+data[i].o_name1+'</option>'
            }
        }
    }
$('#area').append($(str))
}
 function bn(){
    let str='';
    $.ajax({
        url:"http://localhost:1337/todayProficient",
        data:'',
        type:'post',
        dataType:'json',
        success:function(data){
            for(var i=0;i<data.length;i++){
                str+='<option value="'+data[i].id+'">'+data[i].name+'</option>'
               }
            $('#df').append($(str))

        }
    })
   }       
