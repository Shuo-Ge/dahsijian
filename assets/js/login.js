$(function () {
    //点击去注册账号的连接
    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })

    //点击去登录的连接
    $('#link_login').on('click', function () {
        $('.reg-box').hide()
        $('.login-box').show()
    })

    // 从layui获取form 对象
    var form = layui.form
    var layer = layui.layer
    form.verify({
        // 通过form.verify自定义规则
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'],

        //两次密码相同规则
        repwd: function (value) {
            //通过形参拿到的是确认框中的内容
            //还需拿到密码框中的内容
            //判断失败则返回提示消息
            var pwd = $('.reg-box [name=password]').val()
            if (pwd != value) {
                return '两次密码不一致'
            }
        }
    })

    //注册表单的提交事件
    $('#form_reg').on('submit', function (e) {
        e.preventDefault()
        var data = { username: $('#form_reg [name=username]').val(), password: $('#form_reg [name=password]').val() }

        $.post('/api/reguser', data, function (res) {
            if (res.status != 0) {
                // return console.log(res.message)
                return layer.msg(res.message)
            }
            layer.msg("注册成功请登录")
            //模拟人点击的行为
            $('#link_login').click()
        })
    })
    //监听登录的提交事件
    $('#form_login').submit(function (e) {
        e.preventDefault()
        $.ajax({
            url: '/api/login',
            method: 'POST',
            //快速获取数据
            data: $(this).serialize(),
            success: function (res) {
                if (res.status != 0) {
                    return layer.msg("登录失败")
                }
                layer.msg("登录成功")
                //console.log(res.token);
                //登录成功得到的token字符串保存到localStorage中
                //跳转后台主页
                localStorage.setItem('tooken', res.token)
                location.href = '/index.html'
            }
        })
    })
})