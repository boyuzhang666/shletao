//artTemplate

$(function () {
    //发送ajax请求，获取后台的数据
    //  页号 每页数据条数
    var currentPage = 1;
    var pageSize = 30;
    
    function render() {
        $.ajax({
            type: "get",
            url: "/user/queryUser",
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            success: function (data) {
                //console.log(data);
                var html = template("templ", data);
                $("tbody").html(html);
                
                //bootstrapPaginator插件-基于bootstrap,实现分页显示功能
                $("#paginator").bootstrapPaginator({
                    bootstrapMajorVersion: 3,//指定bootstrap的版本
                    currentPage: currentPage,//指定了当前是第几页
                    size: "small",
                    totalPages: Math.ceil(data.total / pageSize),//计算总页数
                    onPageClicked: function (event, originalEvent, type, page) {
                        //为按钮绑定点击事件 page:当前点击的按钮值
                        currentPage = page;
                        render();
                    }
                });
                
            }
        });
    }
    
    render();
    
    $('tbody').on('click', '.btn', function () {
        $('#userModal').modal('show');
        var id = $(this).parent().data('id');
        var isDelete = $(this).parent().data('isDelete');
        isDelete = isDelete == 1 ? 0 : 1;
        
        $('.btn_confirm').off().on('click', function () {

            $.ajax({
                type: 'post',
                url: '/user/updateUser',
                data: {
                    id: id,
                    isDelete: isDelete
                },
                success: function (data) {
                    if (data.success) {
                        console.log(data);
                        $('#userModal').modal('hide');
                        render();
                    }
                }
            })
        })
    })
    
    
    // //demo 基于bootstrap的分页插件
    // $("#paginator").bootstrapPaginator({
    //     bootstrapMajorVersion: 3,//指定bootstrap的版本
    //     currentPage: 1,//指定了当前是第几页
    //     size: "small",
    //     totalPages: 5,
    //     // onPageClicked: function (event, originalEvent, type, page) {
    //     //     //为按钮绑定点击事件 page:当前点击的按钮值
    //     //     currentPage = page;
    //     //     render();
    //     // }
    //
    // });
    
    
})


