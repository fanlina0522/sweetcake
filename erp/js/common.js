$(function(){
	// 获取登录用户信息   
  $.get(erp.baseUrl + 'getsession', function(response){
    if(!response.status){
      window.location.href = 'login.html';
    } else {
      $('.admin_icon').text(response.data);
    }
  }); 


  // 用户退出
  $('.quit_icon').click(function(){
    $.get(erp.baseUrl + 'removesession', function(response){
      if(!response.status){
        console.log(response)
        window.location.href = 'login.html';
      } 
    });
  })
})