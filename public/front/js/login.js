$(function () {
    
    
    
    //点击登录 校验表单值  通过校验后发送ajax到接口
    $('.btn_login').on('click', function () {
        
        //表单值获取
        var username = $("[name='username']").val().trim(),
            password = $("[name='password']").val();
        
        //用户名密码不能为空
        if (!username) {
            mui.toast("请输入用户名");
            return false;
        }
        
        if (!password) {
            mui.toast("请输入密码");
            return false;
        }
        
        //发送ajax
        $.ajax({
            type: 'post',
            url: '/user/login',
            data: {
                username: username,
                password: password
            },
            
            success: function (data) {
                //{error: 403, message: "密码错误！"} {error: 403, message: "用户名不存在！"}
                //1. 登录失败 给出失败提示
                if (data.error === 403) {
                    mui.toast(data.message);
                }
                
                //2. 登录成功后 回跳到原商品页面(如果存在) 否则跳转到个人中心user.html
                if (data.success) {
                    var search = location.search;
                    //?retUrl=http://localhost:3000/preview/front/product.html?productId=2
                    //① 如果有retUrl 需要回跳到点击添加购物车的原商品页面
                    if (search.indexOf('retUrl') > -1) {
                        location.href = search.replace("?retUrl=", "");
                    } else {
                        location.href = "user.html";
                    }
                }
                
            }
            
        });
        
    })
    
    
});