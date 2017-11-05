

var tools = {
    getParamObj : function () {
        var obj = {};
        var search = location.search;
        search = search.slice(1);
        var arr = search.split("&");
        for(var i = 0;i < arr.length;i++){
            var k = arr[i].split("=")[0];
            var v = decodeURI(arr[i].split("=")[1]);
            obj[k] = v;
        }
        return obj;
    },
    getParam : function (k) {
        return this.getParamObj()[k];
    },
    checkLogin : function (msg) {
        if(msg.error === 400){
            location.href = "login.html?retURL="+location.href;
        }
    }
};
