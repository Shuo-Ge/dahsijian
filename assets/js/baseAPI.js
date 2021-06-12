//每次调用$.get()/$.post() $Ajax（）
// 先调用ajaxPrefilter

$.ajaxPrefilter(function (options) {

    options.url = 'http://api-breakingnews-web.itheima.net' + options.url
    console.log(options.url)
})