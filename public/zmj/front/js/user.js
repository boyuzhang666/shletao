$(function () {
    //渲染页面
    $.ajax({
        type : "get",
        url : "/user/queryUserMessage",
        success : function (msg) {
            console.log(msg);
            tools.checkLogin(msg);
            $('.user_info').html(template('tpl',msg));
        }
    });
    //退出功能
    $('.logout').on('click',function () {
        $.ajax({
            type : "get",
            url : "/user/logout",
            success : function (msg) {
                if(msg.success){
                    location.href = "login.html";
                }
            }
        });
    });
});
