$(function () {
    //区域滚动
    mui(".mui-scroll-wrapper").scroll({
        indicators:false
    });
    
    //需获取productId,发送ajax请求productDetail
    var productId = tools.getParam('productId');
    
    //发送ajax 动态渲染 商品详情
    $.ajax({
        type: 'get',
        url: '/product/queryProductDetail',
        data: {
            id:productId
        },
        success: function (data) {
            console.log(data);
            //data.size = "35-40"
            //尺码渲染前处理
            data.size = data.size.split('-');
            var sizeArr = [];
            for (var i = data.size[0]; i <= data.size[1]; i++) {
                sizeArr.push(i);
            }
            data.size = sizeArr;
            $('.mui-scroll').html( template('tpl', data) );
            
            //slider loop
            mui('.mui-slider').slider({
                interval: 5000,
            })
            //动态生成的numbox需要手动初始化
            mui('.mui-numbox').numbox();
        }
    });
    
    //选择尺码
    $('.lt_content .mui-scroll').on('click', '.size span', function () {
        $(this).addClass('now').siblings().removeClass('now');
    });
    
    //点击添加购物车 判断如果未登录则跳转到login,同时把location.search传过去(为了登录后可以跳转回该商品页面) 已登录显示添加成功
    $('.add_cart').on('click', function () {
        var num = $('.mui-numbox-input').val(),
            size = $('.size .now').text();
        
        //判断是否登录
        $.ajax({
            type: 'post',
            url: '/cart/addCart',
            data:{
                productId: productId,
                num: num,
                size: size
            },
            success:function (data) {
                //{error: 400, message: "未登录！"}
                //点击添加购物车时 如果未登录 则跳转到login页面 同时把原url传入 登录成功后定位回到购物车页面
                if (data.error === 400){
                    location.href = "login.html?retUrl=" + location.href;
                }
                if(data.success) {
                    mui.toast("添加成功");
                }
            }
        })
    })
    
});