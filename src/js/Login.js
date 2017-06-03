$(function() {

    //点击返回
    $('.iconWarp-left').on('click', function() {
        history.back();
    });
    // 点击判断
    $('.login_btn').click(function() {
        // 获取输入的值
        var my_nameg = $('.userName input').val()
        var my_pass = $('.passWord input').val()
        console.log(my_nameg,my_pass)
            // 发送ajax请求
        $.post(erp.baseUrl + 'html/Login', {
            'my_nameg': my_nameg,
            'my_pass': my_pass
        }, function(data) {
            console.log(data)
            //如果存在
            if(data[0]){
                    if (data[0].usename==my_nameg||data[0].password==my_pass) {

                    sessionStorage.setItem('name',my_nameg)  

                      setTimeout(function() {
                        alert('登录成功')
                        window.location.href = "car.html"
                    }, 1000);
                }else{
                     alert('请输入正确用户名密码')
                }
            }else{
                alert('请输入正确用户名密码')
            }
         });

    })


})

