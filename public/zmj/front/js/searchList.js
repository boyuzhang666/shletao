$(function () {
    mui('.mui-scroll-wrapper').scroll({
        indicators: false
    });

    //页面渲染
    var param = tools.getParam("key");
    var data = {
        proName : param,
        brandId : '',
        price : '',
        num : '',
        page : 1,
        pageSize : 10
    };
    function render(data) {
        $.ajax({
            type : 'get',
            url : '/product/queryProduct',
            data : data,
            success : function (msg) {
                $(".product_list ul").html('<div class="loading"></div>');
                var timer = setTimeout(function () {
                    $('.product_list ul').html(template('tpl',msg));
                },1000);
            }
        });
    }
    render(data);


    //点击搜索按钮，实现搜索功能
    $('.btn_search').on('click',function () {
        //吧所有a的黄色去掉，同时所有的排序去掉
        $('.nav li').removeClass('active').find('span').removeClass('fa-angle-up').addClass('fa-angle-down');
        data['price'] = '';
        data['num'] = '';
        var text = $('.text_search').val().trim();
        if(text.length == 0){
            mui.toast('请在搜索框输入内容');
        }
        data.proName = text;
        render(data);
    });

    //排序功能
    $('.nav li').on('click',function () {
        //如果是黄色，切换该黄色的箭头指向，
        //如果不是黄色，给该按钮加上黄色，并且清除其他按钮的黄色，并且其他箭头都指向下面
        if($(this).hasClass('active')){
            $(this).find('span').toggleClass('fa-angle-down').toggleClass('fa-angle-up');
        }else{
            $(this).addClass('active').siblings().removeClass('active').find('span').removeClass('fa-angle-up').addClass('fa-angle-down');
        }
        var type = $(this).data('type');
        var value = $(this).find('span').hasClass('fa-angle-up') ? 1 : 2;
        data[type] = value;
        render(data);
    });

    

});
