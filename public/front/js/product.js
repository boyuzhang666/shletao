$(function () {
    //区域滚动
    mui(".mui-scroll-wrapper").scroll({
        indicators:false
    })
    
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
    })
    
})