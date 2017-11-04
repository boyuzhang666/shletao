$(function () {
    //id未传数组 可以删除 $(this) 模板内productsize小写
    
    //1. 添加下拉刷新渲染数据功能
    mui.init({
        pullRefresh: {
            container: ".mui-scroll-wrapper",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
            down: {
                style: 'circle',//必选，下拉刷新样式，目前支持原生5+ ‘circle’ 样式
                color: '#2BD009', //可选，默认“#2BD009” 下拉刷新控件颜色
                // height: '100px',//可选,默认50px.下拉刷新控件的高度,
                // range: '100px', //可选 默认100px,控件可下拉拖拽的范围
                // offset: '0px', //可选 默认0px,下拉刷新控件的起始位置
                auto: true,//可选,默认false.首次加载自动上拉刷新一次
                //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
                callback: function () {
                    // 渲染购物车列表
                    $.ajax({
                        type: 'get',
                        url: '/cart/queryCart',
                        success: function (data) {
                            console.log(data);
                            //返回的数据data是一个数组
                            tools.checkLogin(data);
                            setTimeout(function () {
                                $('#OA_task_2').html(template('cartList', {data: data}));
                                //下拉刷新结束
                                mui('.mui-scroll-wrapper').pullRefresh().endPulldownToRefresh();
                            }, 1000);
                        }
                    });
                },
            }
        }
    });
    
    //2. 删除功能，为了ios上一个bug，如果用到了下拉刷新或者上拉加载，mui禁用了click，需要使用tap
    $('#OA_task_2').on('tap', '.btn_del', function () {
        var _this = $(this),
            id = _this.data('id'),
            confirmArray = ["确定", "取消"];

        mui.confirm('确定要将该商品从购物车中删除吗?', '提示', confirmArray, function (e) {
            //确定-发送ajax 刷新列表
            if (e.index === 0) {
                $.ajax({
                    type: 'get',
                    url: '/cart/deleteCart',
                    data: {
                        id: id
                    },
                    success: function (data) {
                        //ajax数据完全返回后 检测用户是否已登录
                        tools.checkLogin(data);
                        //若已登录-下拉刷新重新渲染一次
                        if (data.success) {
                            //获取下拉刷新实例
                            var pullRefreshObject = mui('.mui-scroll-wrapper').pullRefresh();
                            //加载一次下拉刷新
                            pullRefreshObject.pulldownLoading();
                        }
                    }
                })
            } else {
                mui.toast('操作取消');
            }
            
            
        });
        
        
    });
    
    //3. 编辑功能
    $('#OA_task_2').on('tap', '.btn_edit', function () {
        
        //点击编辑按钮 弹出mui.confirm框
        var confirmArray = ['确定', '取消'],
            data = this.dataset,
            html = template('confirmBox', data);
        // console.log(html);
        mui.confirm(html, "提示", confirmArray, function (e) {
            if(e.index === 0) {
                console.log(e.index);
            }
        })

        
        
    });
    
    
    
    
    
    
    
    
    
});