$(function () {
   $('.btn_login').on('click',function () {
       var username = $('.username').val().trim();
       var password = $('.mui-input-password').val().trim();
       if(username == ''){
           mui.toast('请输入用户名');
           return ;
       }
       if(password == ''){
           mui.toast('请输入密码');
           return ;
       }
       $.ajax({
           type : "post",
           url : '/user/login',
           data : {
               username : username,
               password : password
           },
           success : function (msg) {
               console.log(msg);
               if(msg.success){
                    var search = location.search;
                    if(search.indexOf("retURL") > -1){
                        search = search.replace("?retURL=","");
                        location.href = search;
                    }else{
                        location.href = "user.html";
                    }
               }
               if(msg.error == 403){
                   mui.toast(msg.message);
               }
           }
       });
   });
});
