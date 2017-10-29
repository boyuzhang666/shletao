
//校验用户是否登录的功能
//路径中，并没有login.html

// $(document).ajaxStart(function(){
//     //ajax调用开始时,显示进度条
//     NProgress.start();
// })
//
// $(document).ajaxStop(function(){
//     //ajax请求成功后,结束进度条
//     setTimeout(function(){
//         NProgress.done();
//     }, 500);
// })

//1. 登录进度条显示功能
$(document).ajaxStart(function () {
    NProgress.start();
})


$(document).ajaxStop(function () {
    setTimeout(function () {
        //让进度条结束
        NProgress.done();
    }, 500);
});

//2. icon_menu点击功能
$('.icon_menu').on('click', function(){
    $('.lt_aside').toggleClass('now');
    $('.lt_main').toggleClass('now');
})

//3. JS实现二级分类管理显示隐藏功能
$('.child').prev().on('click', function(){
    $(this).next().slideToggle();
})

//4. 共用退出功能(BS模态框组件 遮罩层效果)
$('.icon_logout').on('click', function(){
    $('#logoutModal').modal("show");
})
//确定退出
$('.btn_logout').on('click', function(){
    //发送一个ajax请求，告诉服务器我要退出了，服务器会清空你的session
    //查看文档logout接口
    $.ajax({
        type: 'get',
        url: "/employee/employeeLogout",
        success:function(data){
            if(data.success){
                window.location.href = "login.html";
            }
        }
    })
})
