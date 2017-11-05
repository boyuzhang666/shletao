// 思路：1.搜索页面加载出来的时候，先去localstorage里面找搜索记录，将记录渲染在页面上。此时要判断有记录的时候显示记录，
// 没有记录的时候直接显示暂无数据，所有模板里面需要做判断
//2.点击搜索按钮需要做的事情：
// （1）将搜索框里面的文字存到localStorage里面，存的时候需要注意
//        ①localStorage里面做多存储十条数据，超过十条的时候，将最后一条删除，最新的加在最上面
//        ②有重复的将重复的删除，再添加到最上面
//（2）跳转到搜索列表页
$(function () {
    //localStorage.setItem("lt_search_history",'["李宁","耐克","阿迪"]')
    //获取localStorage里面的数据，转成数组，返回
    function getHistoryArr(){
        var history = localStorage.getItem("lt_search_history") || "[]";
        return JSON.parse(history);
    }
    //将搜索记录渲染出来
    function render(){
        var arr = getHistoryArr();
        $('.history').html(template('tpl',{arr:arr}));
    }
    render();
    //点击清空记录按钮，将localStorage里面的数据清空，并且重新渲染查询历史记录
    var btnArr = ['是','否'];
    $('.history').on('click','.empty_history_list',function () {
        mui.confirm('确定清空历史记录吗','',btnArr,function (data) {
            if(data.index == 0){
                localStorage.removeItem('lt_search_history');
                render();
                mui.toast("历史记录清楚成功");
            }else{
                mui.toast('操作取消');
            }
        });
    });
    //点击单条记录后面的删除按钮，将该条记录删除
    $('.history').on('click','.mui-icon-closeempty',function () {
        var $_this = $(this);
        mui.confirm('确定删除该记录吗？','',btnArr,function (data) {
            if(data.index == 0){
                var index = $_this.data('index');
                var arr = getHistoryArr();
                arr.splice(index,1);
                localStorage.setItem('lt_search_history',JSON.stringify(arr));
                render();
                mui.toast('删除成功');
            }else{
                mui.toast('取消操作');
            }
        });
    });
    //点击搜索按钮
    $('.btn_search').on('click',function () {
        var text = $('.text_search').val().trim();
        if(text === ''){
            mui.alert('请在输入框里输入内容');
            return ;
        }
        var arr = getHistoryArr();
        var index = arr.indexOf(text);
        if(index > -1){
            arr.splice(index,1);
        }
        if(arr.length >= 10){
            arr.pop();
        }
        arr.unshift(text);
        localStorage.setItem('lt_search_history',JSON.stringify(arr));
        location.href = "searchList.html?key="+text;
        $('.text_search').val("");
    });


});