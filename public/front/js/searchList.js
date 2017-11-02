$(function () {
    
    //初始化ajax传参对象
    var data = {
        proName: '',
        brandId: '',
        price: '',
        num: '',
        page: 1,
        pageSize: 10
    };
    
    //渲染func
    function render(data) {
        $.ajax({
            type: 'get',
            url: '/product/queryProduct',
            data: data,
            success: function (data) {
                // console.log(data);
                // 显示搜索loading效果,1s后再渲染
                setTimeout(function () {
                    $('.lt_product').html(template('tpl', data));
                }, 1000);
            }
        })
    }
    
    //获取地址栏传入参数 , 赋给ajax请求中的传入数据data对象中的proName
    data.proName = tools.getParam("key");
    $('.search_input').val(data.proName);
    render(data);
    
    //点击搜索按钮 把lt_sort下的a的所有now类去掉
    $('.search_btn').on('click', function () {
        // var key = $(this).prev().val();
        // 所有a的now类去掉 价格和库存的箭头重置
        $('.lt_sort a').removeClass('now');
        $('.lt_sort span').removeClass('fa-angle-up').addClass('fa-angle-down');
        // 获取搜索框文本
        var key = $('.search_input').val().trim();
        if(key == ""){
            mui.toast('请输入搜索内容');
        }
        //搜索效果
        $('.lt_product').html('<div class="loading"></div>')
        data.ProName = key;
        render(data);
    })
    
    //点击价格和库存排序功能
    $('.lt_sort a[data-type]').on('click', function () {
        var $this = $(this);
        var $span = $(this).find('span');
        
        //如果有now 则改变span箭头方向
        if ($this.hasClass('now')) {
            $span.toggleClass('fa-angle-down').toggleClass('fa-angle-up');
        } else {
            $this.addClass('now').siblings().removeClass('now');
            //所有span箭头向下
            $('.lt_sort span').removeClass('fa-angle-up').addClass('fa-angle-down');
        }
        
        //判断价格和库存升序降序
        var type = $this.data('type'),
            value = $span.hasClass('fa-angle-up') ? 1 : 2;
        
        data[type] = value;
        render(data);
        
    })
    
})