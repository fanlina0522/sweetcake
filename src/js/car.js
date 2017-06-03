// 购物车
// requirejs(['config'],function(){
// 	requirejs(['jquery'],function($){
// 		$(function(){
			
// 		});
// 	});
// });
$(function(){


    // 获取登录信息
    var userName = sessionStorage.getItem('name');
    // var _userName = JSON.parse(userName);
    console.log(userName);
    if(userName === null){
        $.alert('您好，请先登录！');
        window.location.href="Login.html"
    }

	// 获取地址信息
	var getAdd = window.localStorage.getItem('address');
	
	var _getAdd = JSON.parse(getAdd);
	if(getAdd != null){
		$('.chooseAdd').hide();
		$('<p/>').addClass('font14').appendTo($('.add_addres'));
		var _name = $('<span/>').addClass('express-name').appendTo($('.font14'));
		var _phone = $('<span/>').addClass('express-phone').appendTo($('.font14'));
		_name.html(_getAdd[0].name);
		_phone.html(_getAdd[0].phone);
		$('<p/>').addClass('chadd').appendTo($('.add_addres'));
		$('.chadd').html(_getAdd[0].city + ' ' +_getAdd[0].addr);
	}else{
		$('.chooseAdd').show();
	}

	// 当购物车列表为空时
	 emptyCar();
	var $_goods;
	function emptyCar(){
		if($('.goodslist').children().length<1){
			$_goods = $('<div/>').addClass('goodss')
			.css({'line-height':'55px','text-align':'center'}).appendTo('.goodslist');
			$('<a/>',{href:'../index.html'}).css('color','#f00')
			.html('购物车空了，点此返回购买~').appendTo($_goods);
		} else{
			$('.goodss').remove();
		}
	}
	

	var partsArr = [];

	// 购物车列表操作

	$('.goodslist').on('click',function(e){

		var $goods_box = $(e.target).parent().parent().parent().parent()
		var goodsId = $goods_box.data('id');
		// 减
		if($(e.target).hasClass('reduceBtn')){
			var _num = parseInt($(e.target).next().children()[0].value);
			if(_num<=1){
				var _bleen = confirm('是否从购物车删除这件商品');
				if(_bleen){
					// 删除本地存储中对应的信息
					
					for(var i=0;i<goodSS.length;i++){
						if(goodSS[i].id === goodsId){
							goodSS.splice(i,1);
						}
					}
					// 重置本地存储
					localStorage.setItem('order',JSON.stringify(goodSS));
					$goods_box.remove();
				}else{
					return false
				}
			}else{
				_num --;
			}
			$(e.target).next().children()[0].value = _num;;
			setTotal();

			// 更新本地存储中商品数量

			for(var i=0;i<goodSS.length;i++){
				if(goodSS[i].id === goodsId){
					goodSS[i].acount--;	
				}
			}
			localStorage.setItem('order',JSON.stringify(goodSS));
		}

		// 加
		if($(e.target).hasClass('addBtn')){
			var _num = parseInt($(e.target).prev().children()[0].value);
			_num ++;
			var res = _num;
			$(e.target).prev().children()[0].value = res;
			setTotal();

			// 更新本地存储中商品数量
			for(var i=0;i<goodSS.length;i++){
				if(goodSS[i].id === goodsId){
					goodSS[i].acount++;	
				}
			}
			localStorage.setItem('order',JSON.stringify(goodSS));
		}

		// 删除商品
		if($(e.target).hasClass('delete')){
			var _bleen = confirm('是否从购物车删除这件商品');
			if(_bleen){

				// 删除数组中对应的data-id！
				var arrKey = $goods_box.data('id');
				partsArr.forEach(function(key, index) {
					key === arrKey ? delete partsArr[index] : '';
				})
				
				// 删除本地存储中对应的信息
				for(var i=0;i<goodSS.length;i++){
					if(goodSS[i].id === goodsId){
						goodSS.splice(i,1);
					}
				}
				localStorage.setItem('order',JSON.stringify(goodSS));

				$goods_box.remove();
				// 删除商品
				setTotal();
			}else{
				return false;
			}
		}

		// 购物车空时
		emptyCar();

	})
	
	// 获取本地存储
	var goodsArr = window.localStorage.getItem('order');
	var goodSS = JSON.parse(goodsArr);
	// 遍历存储信息，写入购物车
	$.each(goodSS,function(index,obj){
		
		add_goods(obj.id,obj.name,obj.size,obj.price,obj.acount,obj.img);
		emptyCar();
	})
	
	// 购物车添加商品函数
	function add_goods(id,name,size,price,acount,imgSrc){
		var $new_Good = $('<div/>').addClass('good').data('id',id).appendTo('.goodslist');
		var $l_img = $('<div/>',{class:'l_img'}).appendTo($new_Good);
		var msgbox = $(this).parent().parent().parent();
		$('<img/>',{src:'../img/'+imgSrc}).appendTo($l_img);
		var r_content = $('<div/>',{class:'r_content'}).appendTo($new_Good); 
		var $figcaption = $('<figcaption/>').appendTo(r_content);
		var $goods_name = $('<p/>').addClass('nametitle').appendTo($figcaption);
 		$goods_name.html(name);
 		var $goods_pirce = $('<p/>').addClass('price').appendTo(r_content);
 		$goods_pirce.html('￥'+ price);
 		var $goods_pirce = $('<p/>').addClass('size').appendTo(r_content);
 		 $goods_pirce.html('['+size+']');
 		 var $definition = $('<div/>',{class:'definition'}).appendTo(r_content);
 		 var $goods_inde = $('<div/>',{class:'goods_inde'}).appendTo($definition);
 		 $('<span/>').addClass('reduceBtn').html('-').appendTo($goods_inde);
 		 var $in_num = $('<div/>').addClass('in_num').appendTo($goods_inde);
 		 var $goods_num = $('<input/>',{type:'tel',class:'goods_num',value:1,readonly:'readonly'})
 		 .appendTo($in_num);
 		 $goods_num[0].value = acount;
 		 $('<span/>').addClass('addBtn').html('+').appendTo($goods_inde);
 		 var $_close = $('<div/>').addClass('close').appendTo($definition);
 		 $('<img/>',{src:'../img/delect.png'}).addClass('delete').appendTo($_close);

	}


	// 配件选购 tab切换
	var $_scroll = $('.choose_scroll').find('ul');
	var $_list = $('.choose_list').find('ul');
	$_scroll.on('click','>li',function(){
		var idx = $(this).index();
		$(this).addClass('active').siblings().removeClass('active');
		$_list.children().hide().eq(idx).show();
	})

	//点击事件，配件加入购物车列表
	
	$('.choose_list').on('click','span',function(){

		if(!$('.goodslist').children().length<1){
				$('.goodss').remove();
			}
		
		var currentLi = $(this).parent().parent().parent().parent();
		var goods_id =currentLi.index(); 

		
		var $new_good = $('<div/>').addClass('good').data('id',goods_id).appendTo('.goodslist');

		// 如果配件存在购物车中，阻止继续添加
		$('.goodslist').children().each(function(){
			// console.log($(this).data('id'))
			// console.log(partsArr.indexOf(goods_id))
			if(partsArr.indexOf(goods_id)!=-1){
				
				alert('已经添加');
				goodSS.pop();
				localStorage.setItem('order',JSON.stringify(goodSS));
				$new_good.remove();
				return false;
			}
		})
		
		partsArr = partsArr.concat(goods_id);
		// console.log(partsArr);
		var $l_img = $('<div/>',{class:'l_img'}).appendTo($new_good);
		var msgbox = $(this).parent().parent().parent();
		var _src = msgbox.find('img').attr('src').replace('../img','')
		$('<img/>',{src:'../img' + _src}).appendTo($l_img);

		var r_content = $('<div/>',{class:'r_content'}).appendTo($new_good);               
		var $figcaption = $('<figcaption/>').appendTo(r_content);
		var $goods_name = $('<p/>').addClass('nametitle').appendTo($figcaption);
		$goods_name.html(msgbox[0].title);

		var $goods_pirce = $('<p/>').addClass('price').appendTo(r_content);
		$goods_pirce.html(msgbox.attr('data-price'));
		var $goods_pirce = $('<p/>').addClass('size').appendTo(r_content);
 		 $goods_pirce.html('[normal]');
		var $definition = $('<div/>',{class:'definition'}).appendTo(r_content);
		var $goods_inde = $('<div/>',{class:'goods_inde'}).appendTo($definition);

		$('<span/>').addClass('reduceBtn').html('-').appendTo($goods_inde);
		var $in_num = $('<div/>').addClass('in_num').appendTo($goods_inde);
		$('<input/>',{type:'tel',class:'goods_num',value:1,readonly:'readonly'})
		.appendTo($in_num);
		$('<span/>').addClass('addBtn').html('+').appendTo($goods_inde);
		
		var $_close = $('<div/>').addClass('close').appendTo($definition);
		$('<img/>',{src:'../img/delect.png'}).addClass('delete').appendTo($_close);

		setTotal();
		var _goods = {
			acount:1,
			id:goods_id,
			img:_src,
			name:msgbox[0].title,
			price:msgbox.attr('data-price').replace('¥',''),
			size:'normal'
		}
		goodSS.push(_goods);
		localStorage.setItem('order',JSON.stringify(goodSS));
	})
	var chocolateBrand = '不需要';
	// 表单选中事件
	$('#chocolateCard1').click(function(){
		$('.chocolate').show();
		
	});

	$('#chocolateCard2').click(function(){		
		$('.chocolate').hide();
		chocolateBrand = '不需要';
	});

	$('#chocolateCardType0').click(function(){		
		$('.other').hide();
		chocolateBrand = '生日快乐';
		
	});
	$('#chocolateCardType1').click(function(){		
		$('.other').hide();
		chocolateBrand = 'Happy Birthday';
	});

	$('#chocolateCardType2').click(function(){		
		$('.other').show(function(){
			chocolateBrand = $('#chocolateCardTxt')[0].value;
		});
		
	});
	$('#chocolateCardTxt').on('change',function(){
		chocolateBrand = $('#chocolateCardTxt')[0].value;
	})

	var greetingCard = '不需要';
	$('#greetingCard1').click(function(){
		$('.greetingMessage').show(function(){
			greetingCard = $('#greetingMessageText').val();
		});
	});

	$('#greetingMessageText').on('change',function(){
		greetingCard = $('#greetingMessageText').val();
	})

	$('#greetingCard2').click(function(){		
		$('.greetingMessage').hide(function(){});
		greetingCard = '不需要';
	});
	
	// 配送日期=>显示今天的日期
	var now = new Date();
	var year = now.getFullYear();
	var month = now.getMonth()+1;//0-11
	var date = now.getDate();
	var hour = now.getHours();
	var min = now.getMinutes();
	var sec = now.getSeconds();
	month = month<10 ? '0'+month : month;
	date = date<10 ? '0'+date : date;
	hour = hour<10 ? '0'+hour : hour;
	min = min<10 ? '0'+min : min;
	sec = sec<10 ? '0'+sec : sec;
	var today = year + '-' + month + '-' + date;
	
	$('#now_day').attr('value',today);

	var orderId = year + month + date + hour + min + sec;
	var orderTime = year + '-' + month + '-' + date + ' ' + hour +':'+ min +':'+sec;
	
	// 计算总价
	
	function setTotal(){ 
    	var sum=0; 
   		 $('.good').each(function(){ 
    		// 数量goodsNum
    		var $goodsNum = parseInt($(this).find($('.goods_num')).val());
    		// 单价$unit-price
    		var $unitPrice = parseFloat($(this).find($('.price')).html().slice(1));
   		 	sum += $goodsNum*$unitPrice; 
   		 }); 

    	$('.totalPrice').html('总价：￥'+sum.toFixed(2)); 
    	$('.totalPrice').css('color','#f00');
    }
	setTotal();

	var _goodSS = JSON.stringify(goodSS);
	var _getAdds = JSON.stringify(_getAdd);

	// 点击支付
	$('.payBtn').click(function(){
		// 验证手机
		if($('#dis_phone').val()==''){
			$.alert('请输手机号码')
			return false;
		}else{
			if(!/^1[34578]\d{9}$/.test($('#dis_phone').val())){
				$.alert('手机号不合法');
				return false;
			}
		}
		var orderMsg = {
			genreType : 'order',
			username : userName,
			orderID : orderId,
			orderTime : orderTime,
			goods : _goodSS,
			totalprice: $('.totalPrice').text(),
			coupon_use:'0.00',
			finalprice: $('.totalPrice').text(),
			addr: _getAdds,
			deliveryDate: $('#now_day').val(),
			chocolateBrand: chocolateBrand,
			greetingCard: greetingCard,
			deliveryTime: $('#selectTtime').val(),
			orderPhone: $('#dis_phone').val(),
			orderTime: orderTime,
			paid: '待付款',
			paidTime: '',
			less: $('#input-remark').val(),
			shipped: 'n',
			shippedTime: '',
			completed: 'n',
			completedTime: ''
		}

		$.post(erp.baseUrl +'car', orderMsg , function(response){

		})
        window.location.href="vip/myorders.html"
	})

})