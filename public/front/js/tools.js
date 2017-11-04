
//区域滚动
mui('.mui-scroll-wrapper').scroll({
    indicators: false,
});

//获取地址栏中的所有参数和值,存入对象
var tools = {
    //获取地址栏中所有的参数
    getParamObj: function () {
        var obj = {};
        var search = location.search;
        search = search.slice(1);
        var arr = search.split("&");
        
        arr.forEach(function (cv, i) {
            var key = cv.split('=')[0],
                value = decodeURI(cv.split('=')[1]);
            //encodeURI decodeURI URI中的中文会被encodeURI 需用decodeURI转换
            obj[key] = value;
        });
        return obj;
    },
    
    getParam: function (key) {
        //param key type[string]
        return this.getParamObj()[key];
    },
    
    checkLogin: function (data) {
        if (data.error === 400) {
            location.href = "login.html?retUrl=" + location.href;
        }
    }
};