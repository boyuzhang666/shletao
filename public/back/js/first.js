$(function () {
    var currentPage = 1;
    var pageSize = 2;
    
    //渲染一级分类
    function render() {
        $.ajax({
            type: "get",
            url: "/category/queryTopCategoryPaging",
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            success: function (data) {
                //console.log(data);
                var html = template("templ1", data);
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
    
    //添加新分类模态框功能
    $('.btn_add').on('click', function(){
        $('#addModal').modal('show');
    })
    
    //初始化表单验证
    $('#form').bootstrapValidator({
        /*提示的图标*/
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        /*属性对应的是表单元素的名字*/
        fields: {
            /*配置校验规则*/
            categoryName: {
                /*规则*/
                validators: {
                    notEmpty: {
                        message: '新添加的一级分类名不能为空'
                    },
                }
            },
        }
    });
    
    //发送ajax提交
    $('#form').on('success.form.bv', function(){
        $.ajax({
            type:'post',
            url:'/category/addTopCategory',
            data:$('#form').serialize(),
            success:function(data){
                if(data.success){
                    $('#addModal').modal('hide');
                    render();
                }
            }
            
        })
        
        
    })
    
    
})

