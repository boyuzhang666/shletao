var sc = mui('.mui-scroll-wrapper').scroll({
    indicators: false
});
//将左侧的数据从数据库中查询出来在页面上显示
$.ajax({
    type : 'get',
    url : '/category/queryTopCategory',
    success : function (msg) {
        $('.content_left ul').html(template('tpl',msg));
        var id = msg.rows[0].id;
        renderSecond(id);
    }
});
//给左侧的li标签绑定点击事件
$('.content_left ul').on('click','li',function () {
    $(this).addClass('active').siblings().removeClass('active');
    var id = $(this).data('id');
    renderSecond(id);
    sc[1].scrollTo(0,0,500);
});

//将右边的内容渲染出来
function renderSecond(id){
    $.ajax({
        type : 'get',
        url : '/category/querySecondCategory',
        data : {
            id : id
        },
        success : function (msg) {
            $('.content_right ul').html(template('tpl2',msg));
        }
    });
}