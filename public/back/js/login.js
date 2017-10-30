$(function () {
    /*前端校验功能  bootstrap validator*/
    /*1.完整的表单结构  form   input  submit 这些元素*/
    /*2.表单元素需要对应的名字 name="username" */
    /*3.初始化表单验证组件 插件*/
    /*4.配置组件功能*/
    /*5.配置具体的属性需要的校验规则*/
    
    //1. 初始化表单校验插件
    $('#login').bootstrapValidator({
        /*提示的图标*/
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        /*属性对应的是表单元素的名字*/
        fields: {
            /*配置校验规则*/
            username: {
                /*规则*/
                validators: {
                    notEmpty: {
                        message: '用户名不能为空'
                    },
                    /*设置错误信息 和规则无关 和后台校验有关系*/
                    callback: {
                        message: '用户名错误'
                    }
                }
            },
            password: {
                validators: {
                    notEmpty: {
                        message: '密码不能为空'
                    },
                    stringLength: {
                        min: 6,
                        max: 18,
                        message: '密码在6-18个字符内'
                    },
                    callback: {
                        message: '密码不正确'
                    }
                }
            }
        }
        /*表单校验初始化后会触发success.form.bv*/
    });
    
    //2. 给表单注册一个校验成功的事件
    var validator = $("#login").data('bootstrapValidator');  //获取表单校验实例
    // 表单校验插件初始化后可获取表单校验的validator实例，通过validator实例调用一些方法来完成某些功能。
    
    $("#login").on('success.form.bv', function (e) {
        e.preventDefault();
        //使用ajax提交逻辑
        var $form = $(e.target);
        $.ajax({
            type: "post",
            url: "/employee/employeeLogin",
            data: $form.serialize(),
            dataType: "json",
            success: function (data) {
                //console.log(data);
                if (data.success) {
                    location.href = "index.html";
                } else {
                    
                    if (data.error == 1000) {
                        validator.updateStatus('username', 'INVALID', 'callback');
                    }
                    if (data.error == 1001) {
                        validator.updateStatus('password', 'INVALID', 'callback');
                    }
                    
                }
            }
        })
    });
    
    //3. 表单重置功能
    $("[type='reset']").on('click', function(){
        validator.resetForm();
    })
    
})
