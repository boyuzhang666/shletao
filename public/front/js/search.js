mui(".mui-scroll-wrapper").scroll({
    indicators: false
});


//1. 渲染localStorage中的搜索记录
// 获取本地存储中的搜索记录-转换成数组形式
function getHistory() {
    // 本地存储获取的是一个json字符串(localStorage中只能存储字符串)
    var search_history = localStorage.getItem('lt_search_history') || '[]';
    var arr = JSON.parse(search_history);
    //转换成json数组 渲染搜索记录
    // console.log(arr); //["NIKE", "阿迪", "锐步"]
    return arr;
}

function render() {
    $('.lt_history').html(template('tpl', {arr: getHistory()}));
}

render();

//2. 清空功能: 点击清空记录,清空搜索记录-清空localStorage,emptyHistory为动态渲染的,所以要注册事件委托
$('.lt_history').on('click', '.emptyHistory', function () {
    localStorage.removeItem('lt_search_history');
    render();
})


//3. 删除功能
// 为每个li注册点击事件, 通过获取点击的那一条Li, 在localStorage中删除该索引的记录
$('.lt_history').on('click', 'li', function () {
    //确认框
    var btnArray = ['确认', '取消'],
        _this = $(this);
    mui.confirm('确认要删除本条搜索记录吗?', "注意", btnArray, function (data) {
        if (data.index == 0) {
            index = _this.data('index');
            //index = $(this).data('index');
            console.log(index);
            var arr = getHistory();
            arr.splice(index, 1);
            var newArr = JSON.stringify(arr);
            localStorage.setItem('lt_search_history', newArr);
            render();
            mui.toast('操作成功');
        } else {
            mui.toast('操作取消');
        }
    })
    
})

//4. 添加功能
//① 点击搜索按钮 添加搜索记录 页面跳转
$('.search_btn').on('click', function () {
    var search_text = $(this).prev().val().trim();
    //如果输入内容为空,给出温馨提示
    if (search_text == "") {
        mui.alert('请输入搜索内容', '温馨提示');
        return;
    }
    // 需求:记录最多10条,添加时如果有相同的记录,把已存在记录删除,把新的搜索内容加入localStorage
    var arr = getHistory();
    var index = arr.indexOf(search_text);
    // 如果记录中有该条,先删除
    if (index > -1) {
        arr.splice(index, 1);
    }
    //如果条数大于10,删除最后一条 //array.unshift push shift pop
    if (arr.length >= 10) {
        arr.pop();
    }
    arr.unshift(search_text);
    localStorage.setItem('lt_search_history', JSON.stringify(arr));
    render();
    //页面跳转!!!
    location.href = "searchList.html?key=" + search_text;
})

//Enter键搜索
$('.lt_search input').on('keyup', function (e) {
    if (e.keyCode == 13) {
        $('.search_btn').trigger('click');
    }
})
