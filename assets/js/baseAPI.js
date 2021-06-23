//每次调用$.get()/$.post() $Ajax（）
// 先调用ajaxPrefilter

$.ajaxPrefilter(function (options) {

    options.url = 'http://api-breakingnews-web.itheima.net' + options.url
    console.log(options.url)
    //统一为有权限的接口设置headers 请求头
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('tooken') || ''
        }

    }
    //全局统一挂载complete回调函数
    options.complete = function (res) {
        //不论成功还是失败们都会执行complete
        //在complete中可以使用responseJson拿到服务器响应拿到的数据
        if (res.responseJSON.status == 1 && res.responseJSON.message == '身份认证失败！') {
            //强制清空tooken
            localStorage.removeItem('tooken')
            //返回登录页面
            location.href = '/login.html'
        }
    }
})