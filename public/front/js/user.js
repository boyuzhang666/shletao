$(function () {
    
    //1. 渲染个人中心
    $.ajax({
        type: 'get',
        url: '/user/queryUserMessage',
        success: function (data) {
            // console.log(data);
            // {id: 1, username: "itcast", password: "lueSGJZetyySpUndWjMBEg==", mobile: "15102324243", isDelete: 1}
            
            //检测是否已登录 未登录跳转到login.html?retUrl=...
            tools.checkLogin(data);
            
            //若已登录
            $('.userinfo').html( template('tpl', data) );
            
        }
        
    });
    
    
    //2. 退出功能
    $('.logout a').on('click', function () {
        
        var logoutArr = ['确认', '取消'],
            _this = $(this);
        mui.confirm('确定要退出系统吗?', '提示', logoutArr, function (e) {
            //确认:发送ajax
            if (e.index === 0) {
                $.ajax({
                    type: 'get',
                    url: '/user/logout',
                    success: function (data) {
                        if (data.success) {
                            location.href = "login.html";
                        }
                    }
                });
            } else {
                mui.toast('操作取消');
            }
            
            
        })
        
    })
    
    
});