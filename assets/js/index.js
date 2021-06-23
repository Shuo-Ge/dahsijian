$(function () {
    //调用getUserInfo获取用户基本信息
    getUserInfo()

    var layer = layui.layer
    $('#btnLogout').on('click', function () {
        //提示用户是否退出
        layer.confirm('是否退出?', { icon: 3, title: '提示' }, function (index) {
            //do something
            //第一件事清除本地存储的tooken
            localStorage.removeItem('tooken')
            //重新调到登录页面
            location.href = '/login.html'
            //关闭confim询问框
            layer.close(index);
        });
    })
})
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('tooken') || ''
        // },
        success: function (res) {
            console.log(res);
            if (res.status != 0) {
                return layui.layer.msg('获取失败')
            }
            //调用renderAvatar渲染用户头像
            renderAvatar(res.data)
        }


    })
}
//渲染用户的头像
function renderAvatar(user) {
    //获取用户的名称
    var name = user.nickname || user.username
    //设置欢迎文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    //渲染用户头像
    if (user.user_pic !== null) {
        // 渲染图片图像
        $('.layui-nav-img').attr('src', user_pic).show()
        $('.text-avatar').hide()
    } else {
        //渲染文本图像
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()


    }

}