$(function () {
    var currentPage = 1,
        pageSize = 3;
    var $form = $('#form');
    
    //数据渲染
    function render() {
        $.ajax({
            type: "get",
            url: "/product/queryProductDetailList",
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            success: function (data) {
                var html = template("tpl", data);
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
    
    //校验
    //初始化表单验证
    $('#form').bootstrapValidator({
        excluded: [],
        /*提示的图标*/
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        /*属性对应的是表单元素的名字*/
        fields: {
            /*配置校验规则*/
            proName: {
                /*规则*/
                validators: {
                    notEmpty: {
                        message: '请输入商品名称'
                    },
                }
            },
            proDesc: {
                /*规则*/
                validators: {
                    notEmpty: {
                        message: '请输入商品描述'
                    },
                }
            },
            num: {
                /*规则*/
                validators: {
                    notEmpty: {
                        message: '请输入商品描述'
                    },
                    regexp: {
                        regexp: /^[1-9]\d*$/,
                        message: '请输入一个大于0的库存'
                    }
                }
            },
            size: {
                /*规则*/
                validators: {
                    notEmpty: {
                        message: '请输入商品尺码'
                    },
                    regexp: {
                        regexp: /^\d{2}-\d{2}$/,
                        message: '请输入正确尺码(30-50)'
                    }
                }
            },
            oldPrice: {
                /*规则*/
                validators: {
                    notEmpty: {
                        message: '请输入商品原价'
                    },
                }
            },
            price: {
                /*规则*/
                validators: {
                    notEmpty: {
                        message: '请输入商品折扣价'
                    },
                }
            },
            brandId: {
                /*规则*/
                validators: {
                    notEmpty: {
                        message: '请选择二级分类'
                    },
                }
            },
            productLogo: {
                validators: {
                    notEmpty: {
                        message: '必须上传三个图片'
                    },
                }
            }
        }
    });
    
    //点击添加 弹出模态框
    $('.btn_add').on('click', function () {
        $('#addModal').modal('show');
        //渲染二级分类
        $.ajax({
            type: "get",
            url: "/category/querySecondCategoryPaging",
            data: {
                page: 1,
                pageSize: 100
            },
            success: function (data) {
                $(".dropdown-menu").html(template("tpl2", data));
            }
        })
    })
    
    //选择二级分类
    $('.dropdown-menu').on('click', 'a', function () {
        $('.dropdown-text').text($(this).text());
        $('#brandId').val($(this).data('id'));
        //改成通过状态
        $form.data('bootstrapValidator').updateStatus('brandId', "VALID");
    })
    
    //初始图片文件上传 上传图片位置 img显示图片预览
    var imgArray = [];
    $('#fileupload').fileupload({
        dataType: 'json',
        //当文件上传成功,会执行这个回调函数
        done: function (e, data) {
            //console.log(data.result);
            $('.img_box').append('<img src="' + data.result.picAddr + '" width="100" height="100">');
            imgArray.push(data.result);
            //设置--上传图片--校验通过
            $form.data('bootstrapValidator').updateStatus("productLogo", "VALID");
        }
    });
    
    //校验完成后ajax提交
    $('#form').on('success.form.bv', function (e) {
        e.preventDefault();
        var param = $form.serialize();
        // console.log(param);
        // brandId=12&proName=123&proDesc=123&num=123&size=30-45&oldPrice=999&price=998&productLogo=
        //拼接接口所需所有参数
        param += '&pic1Name=' + imgArray[0].picName + '&pic1Addr='+ imgArray[0].picAddr;
        param += '&pic2Name=' + imgArray[1].picName + '&pic2Addr='+ imgArray[1].picAddr;
        param += '&pic3Name=' + imgArray[2].picName + '&pic3Addr='+ imgArray[2].picAddr;
        $.ajax({
            type: 'post',
            url: '/product/addProduct',
            data: param,
            success: function (data) {
                if(data.success){
                    $('#addModal').modal('hide');
                    currentPage = 1;
                    render();
                    
                    //重置表单 重置表单校验
                    $form[0].reset();
                    $form.data('bootstrapValidator').resetForm();
                    $('.dropdown-text').text('请选择二级分类');
                    $('.img_box img').remove();
                    imgArray = [];
                }
            }
        })
    })
    
    
})