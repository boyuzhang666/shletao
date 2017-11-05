/**
 * Created by ChenJay on 2017/11/4.
 */
$(function () {
    //渲染页面
    mui.init({
        pullRefresh : {
            container:".mui-scroll-wrapper",//下拉刷新容器标识
            down : {
                auto: true,//可选,默认false.首次加载自动下拉刷新一次
                contentrefresh : "正在刷新...",//可选，正在刷新状态时，下拉刷新控件上显示的标题内容
                callback :function () {
                    $.ajax({
                        type : "get",
                        url : "/cart/queryCart",
                        success : function (msg) {
                            console.log(msg);
                            setTimeout(function () {
                                tools.checkLogin(msg);
                                $('#OA_task_2').html(template('tpl',{msg:msg}));
                                mui('.mui-scroll-wrapper').pullRefresh().endPulldownToRefresh();
                            },200);
                        }
                    });
                }
            }
        }
    });
    //点击删除按钮，删除当前记录
    $('#OA_task_2').on('tap','.del',function () {
        var $_this = $(this);
        mui.confirm('确定删除吗？','',['是','否'],function (e) {
            if(e.index == 1){
                mui.toast('操作取消');
            }else{
                var id = $_this.data('id');
                $.ajax({
                    type : "get",
                    url : "/cart/deleteCart",
                    data : {id : [id]},
                    success : function (msg) {
                        tools.checkLogin(msg);
                        if(msg.success){
                            mui(".mui-scroll-wrapper").pullRefresh().pulldownLoading();
                        }
                    }
                });
            }
        });
    });
    
    //编辑功能
    $('#OA_task_2').on('tap','.edit',function () {
        var id = $(this).data("id");
        var $_this = $(this);
        var msg = this.dataset;
        // console.log(msg);
        var html = template('tpl2',msg);
        html = html.replace(/\n/g,'');
        mui.confirm(html,'编辑商品',['是','否'],function (e) {
            if(e.index == 1){
                mui.toast('操作取消');
            }else{
                $.ajax({
                    type : "post",
                    url : '/cart/updateCart',
                    data : {
                        id : id,
                        size : $('span.active').html(),
                        num : $('.mui-numbox-input').val()
                    },
                    success : function (msg) {
                        tools.checkLogin(msg);
                        if(msg.success){
                            mui(".mui-scroll-wrapper").pullRefresh().pulldownLoading();
                        }
                    }
                });
            }
        });
        //重新给数量和尺码注册点击事件
        mui(".mui-numbox").numbox();
        $('.confirm_size span').on('tap',function () {
            $(this).addClass('active').siblings().removeClass('active');
        });
    });
   
    //计算总金额

    $('#OA_task_2').on('change','input[type="checkbox"]',function () {
        var total = 0;
        $(':checked').each(function (i,e) {
            total += $(this).data('num')*$(this).data('price');
        });
        $('.total_price').html(total);
    });



});