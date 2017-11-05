$(function () {
    //var vCode = 0;
    //获取验证码
    $('.btn_getcode').on('click',function () {
        if($(this).hasClass('disabled')){
            return false;
        }
        $(this).addClass('disabled').html('验证码获取中...');
        var $_this = $(this);
        $.ajax({
            type : "get",
            url : "/user/vCode",
            success : function (msg) {
                console.log(msg.vCode);
                //vCode = msg.vCode;
                var num = 5;
                var timer = setInterval(function () {
                    $_this.html('还剩'+num+"秒，重新发送");
                    num--;
                    if(num < 0){
                        clearInterval(timer);
                        $_this.removeClass('disabled').html('获取验证码');
                    }
                },1000);
            }
        });
    });

    //注册按钮
    $('.btn_register').on('click',function () {
        var username = $('input[name="username"]').val();
        var pwd = $('input[name="password"]').val();
        var repwd = $('input[name="repassword"]').val();
        var mobile = $('input[name="mobile"]').val();
        var vCode = $('input[name="vCode"]').val();
        if(!username){
            mui.toast("请输入用户名");
            return false;
        }
        if(!pwd){
            mui.toast("请输入密码");
            return false;
        }
        if(!repwd){
            mui.toast("请输入确认密码");
            return false;
        }

        if(pwd != repwd){
            mui.toast("确认密码与密码不一致");
            return false;
        }

        if(!vCode){
            mui.toast("请输入验证码");
            return false;
        }
        if(!/^\d{6}$/.test(vCode)){
            mui.toast('请输入有效的验证码');
            return false;
        }
        if(!mobile){
            mui.toast("请输入手机号");
            return false;
        }
        // if(!/^1[34578]\d{9}$/.test(mobile)){
        //     mui.toast("请输入有效的手机号码");
        //     return false;
        // }
        $.ajax({
            type : "post",
            url : "/user/register",
            data : {
                username : username,
                password : pwd,
                mobile : mobile ,
                vCode : vCode
            },
            success : function (msg) {
                if(msg.success){
                    mui.toast("注册成功，即将跳转到登录页");
                    setTimeout(function () {
                        location.href = "login.html";
                    },2000);
                }else{
                    mui.toast(msg.message);
                }
            }
        });
    });




});
