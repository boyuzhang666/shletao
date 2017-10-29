
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

$(document).ajaxStart(function () {
    NProgress.start();
})


$(document).ajaxStop(function () {
    setTimeout(function () {
        //让进度条结束
        NProgress.done();
    }, 500);
});