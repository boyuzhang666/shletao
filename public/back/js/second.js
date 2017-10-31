$(function () {
    
    var currentPage = 1;
    var pageSize = 2;
    
    //渲染数据
    function render() {
        $.ajax({
            type: 'get',
            url: '/category/querySecondCategoryPaging',
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
    
    //表单校验
    var $form = $("#form");
    $form.bootstrapValidator({
        //默认不校验的配置
        excluded: [],
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            categoryId: {
                validators: {
                    notEmpty: {
                        message: "请选择一级分类"
                    }
                }
            },
            brandName: {
                validators: {
                    notEmpty: {
                        message: "请输入二级分类的名称"
                    }
                }
            },
            brandLogo: {
                validators: {
                    notEmpty: {
                        message: "请上传图片"
                    }
                }
            }
        }
    });
    
    //点击添加分类显示模态框
    $('.btn_add').on('click', function () {
        $('#addModal').modal('show');
        //发送ajax 动态获取下拉菜单内容
        $.ajax({
            type: 'get',
            url: '/category/queryTopCategoryPaging',
            data: {
                page: 1,
                pageSize: 100
            },
            success: function (data) {
                //console.log(data);
                $('.dropdown-menu').html(template('templ2', data));
            }
        })
    })
    
    //选择一级分类,把内容填入 注册事件委托
    $('.dropdown-menu').on('click', 'a', function () {
        //选择后显示分类名
        $('.dropdown-text').html($(this).html());
        //categoryId填入隐藏域value
        $('#categoryId').val($(this).data('id'));
        //设置校验通过
        $form.data('bootstrapValidator').updateStatus("categoryId", "VALID");
    })
    
    //初始图片文件上传 上传图片位置 img显示图片预览
    $('#fileupload').fileupload({
        dataType: 'json',
        //当文件上传成功,会执行这个回调函数
        done: function (e, data) {
            // console.log(data.result);
            $('.img_box img').attr('src', data.result.picAddr);
            //brandLogo隐藏域val动态获取
            $('#brandLogo').val(data.result.picAddr);
            //设置--上传图片--校验通过
            $form.data('bootstrapValidator').updateStatus("brandLogo", "VALID");
        }
    });
    
    //发送ajax 添加二级分类
    $form.on('success.form.bv', function (e) {
        e.preventDefault();
        $.ajax({
            type: 'post',
            url: '/category/addSecondCategory',
            data: $form.serialize(),
            success: function (data) {
                //渲染添加后的列表
                if (data.success) {
                    $('#addModal').modal('hide');
                    currentPage = 1;
                    render();
                }
                //表单和校验重置
                $form[0].reset();
                $form.data('bootstrapValidator').resetForm();
                //手动把选择菜单和图片预览重置
                $('.dropdown-text').text('请选择');
                $('.img_box img').attr('src', 'images/none.png');
            }
        })
        
        
    })


})