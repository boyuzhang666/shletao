//区域滚动
var sc = mui('.mui-scroll-wrapper').scroll({
    deceleration: 0.0005,
    indicators:false
});

//渲染一级分类
var id = null;

$.ajax({
    type:'get',
    url: '/category/queryTopCategory',
    success:function (data) {
        var html = template('tpl1', data);
        $('.category-left ul').html(html);
        //渲染二级分类
        renderSecond(data.rows[0].id);
    }
})

//渲染二级分类
function renderSecond(id) {
    $.ajax({
        type: 'get',
        url: '/category/querySecondCategory',
        data: {
            id:id
        },
        success:function (data) {
            console.log(data);
            $('.category-right ul').html(template('tpl2', data));
        }
    })
}



//为每个li绑定事件委托 点击li 切换
$('.category-left').on('click', 'li', function () {
    $(this).addClass('now').siblings().removeClass('now');
    var id = $(this).data('id');
    renderSecond(id);
    
    //让右侧区域滚动的scrollTop 0
    sc[1].scrollTo(0,0,500);
})



