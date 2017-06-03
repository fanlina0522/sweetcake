require(['config'],function(){
	require(['jquery','confirm'],function(){
		$(function(){

			//表单验证
			var status1,status2,status3,status4 = false;

			$('#userName').on('blur',function(){
				var test1 = $('#userName').val();
				if(	/^[a-z0-9_-]{6,16}$/.test(test1)){
					$('#unameCheck').hide();
					status1 = true;
				}else{
					$('#unameCheck').html('用户名不符合6~12位数字字母或下划线组合')
					$('#unameCheck').show().slideDown();
					status1 = false;
				}
			})

			$('#phoneNumber').on('blur',function(){
				var test2 = $('#phoneNumber').val();
				if(	/^1[34578]\d{9}$/.test(test2)){
					$('#phoneCheck').hide();
					status2 = true;
				}else{
					$('#phoneCheck').html('手机号不合法')
					$('#phoneCheck').show().slideDown();
					status2 = false;
				}
			})

			$('#password').on('blur',function(){
				var test3 = $('#password').val();
				if(	/^[a-z0-9]{6,18}$/.test(test3)){
					$('#pswCheck').hide();
					status3 = true;
				}else{
					$('#pswCheck').html('密码不符合6~18位数字字母组合')
					$('#pswCheck').show().slideDown();
					status3 = false;
				}
			})

			$('#password_repeat').on('blur',function(){
				var test4 = $('#password').val();
				var test5 = $('#password_repeat').val();
				if(test4===test5){
					$('#pswRepeat').hide();
					status4 = true;
				}else{
					$('#pswRepeat').html('两次输入的密码不相同')
					$('#pswRepeat').show().slideDown();
					status4 = false;
				}
			})

			//表单提交
			$('#btnSubmit').on('click',function(){
				if(status1 & status2 & status3 & status4){

					var userName = $('#userName').val();
					var phoneNumber = $('#phoneNumber').val();
					var password = $('#password').val();
					var pswRepeat = $('#password_repeat').val();

					$.post(erp.baseUrl + 'register',{
						userName:userName,
						phoneNumber:phoneNumber,
						password:password
					},function(response){
						// var response = eval('('+ response +')');
						$.alert(response.status)
						if(response.login){
							setTimeout(function () {
                                window.location.href = "Login.html";
                            },2000)
						}
					})
				}else{
					$.alert('请按提示正确填写注册信息')
				}
			})
		})
	})
})