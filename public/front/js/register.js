$(function () {
    
    //定义变量保存后台返回的验证码
    var returnCode;
    
    //1. 点击获取验证码
    $('.getvCode').on('click', function () {
        //1. 点击后先把按钮内文本改为 正在发送中 按钮禁用
        var _this = $(this);
        //如果已经禁用
        if (_this.hasClass('disabled')) {
            return false;
        }
        
        _this.addClass('disabled').html('正在发送中');
        
        $.ajax({
            type: 'get',
            url: '/user/vCode',
            success: function (data) {
                //{vCode: "112817"}
                // console.log(data);
                //2. 收到后台返回的验证码后改变按钮内文本
                returnCode = data.vCode;
                console.log(returnCode);
                var seconds = 5;
                var timer = setInterval(function () {
                    if (seconds === 0) {
                        clearInterval(timer);
                        _this.removeClass('disabled');
                        _this.html("点击再次发送验证码");
                        return false;
                    }
                    seconds--;
                    _this.html(seconds + "秒后重新发送验证码");
                }, 1000);
                
            }
        })
        
        
    });
    
    //2. 点击注册 校验表单
    $('.btn_register').on('click', function () {
        //获取所有的数据
        var username = $("[name='username']").val(),
            password = $("[name='password']").val(),
            confirmpwd = $("[name='confirmpwd']").val(),
            mobile = $("[name='mobile']").val(),
            vCode = $("[name='vCode']").val();
        
        if(!username) {
            mui.toast('请输入用户名');
            return false;
        }
        
        if(!password){
            mui.toast('密码不能为空');
            return false;
        }
        
        if(!confirmpwd){
            mui.toast('请再次输入密码');
            return false;
        }
    
        if(password !== confirmpwd){
            mui.toast('两次输入的密码不一致请重新输入');
            return false;
        }
        
        //正则验证手机号
        if(!/^1[34578]\d{9}$/.test(mobile)){
            mui.toast('请输入正确的手机号码');
            return false;
        }
        
        if(!vCode){
            mui.toast('请输入验证码');
            return false;
        }
        
        if(vCode !== returnCode){
            mui.toast('验证码错误,请重新获取验证码');
            return false;
        }
        
        //校验成功后发送ajax 完成注册
        $.ajax({
            type: 'post',
            url: '/user/register',
            data: {
                username: username,
                password: password,
                mobile: mobile,
                vCode: vCode
            },
            success: function (data) {
                if(data.success){
                    mui.toast("注册成功,即将跳转到登录页面");
                    setTimeout(function () {
                        location.href = "login.html";
                    }, 2000);
                }else{
                    mui.toast(data.message);
                }
            }
        })
        
        
    })
    
    
    
    
    
    
    
});
