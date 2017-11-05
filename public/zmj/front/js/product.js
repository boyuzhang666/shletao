
$(function () {
    mui('.mui-scroll-wrapper').scroll({
        indicators: false
    });

    //渲染页面
    var productId = tools.getParam('productId');
    function render(){
        $.ajax({
            type : 'get',
            url : '/product/queryProductDetail',
            data : {id : productId},
            success : function (msg) {
                console.log(msg);
                var sizeLim = msg.size.split('-');
                var sizeArr = [];
                for(var i = sizeLim[0];i <= sizeLim[1];i++){
                    sizeArr.push(i);
                }
                msg.sizeArr = sizeArr;
                $('.content .mui-scroll').html(template('tpl',msg));
                //轮播图
                mui('.mui-slider').slider({
                    interval:1000
                });
                mui(".mui-numbox").numbox();
            }
        });
    }
    render();

    //选择尺码的时候，改变样式
    $('.content').on('click','.size span',function () {
        $(this).addClass('active').siblings().removeClass('active');
    });



    $('.add-car').on('click',function () {
        var num = $('.mui-numbox-input').val();
        var size = $('span.active').text();
        if(!size){
            mui.toast('请选择尺码');
            return;
        }
        if(!num){
            mui.toast('请选择数量');
        }
        $.ajax({
            type : 'post',
            url : '/cart/addCart',
            data : {productId : productId,num : num,size: size},
            success : function (msg) {
                tools.checkLogin(msg);
                if(msg.success){
                    mui.toast('添加成功了');
                }
                if(msg.error == 400){
                    location.href = "login.html?retURL="+location.href;
                }
            }
        });
    });



});