// 购物车
// requirejs(['config'],function(){
// 	requirejs(['jquery'],function($){
// 		$(function(){
			
// 		});
// 	});
// });
$(function(){


	// 当购物车列表为空时
	var $_goods;
	function emptyCar(){
		if($('.goodslist').children().length<1){
			$_goods = $('<div/>').addClass('goodss')
			.css({'line-height':'55px','text-align':'center'}).appendTo('.goodslist');
			$('<a/>',{href:'../index.html'}).html('购物车空了，点此返回购买~').appendTo($_goods);
		} else{
			$('.goodss').remove();
		}
	}
	

	var partsArr = [];

	// 购物车列表操作

	$('.goodslist').on('click',function(e){
		
		// 减
		if($(e.target).hasClass('reduceBtn')){
			var _num = parseInt($(e.target).next().children()[0].value);
			if(_num<=1){
				var _bleen = confirm('是否从购物车删除这件商品');
				if(_bleen){
					$(e.target).parent().parent().parent().parent().remove();
				}else{
					return false
				}
			}else{
				_num --;
			}
			$(e.target).next().children()[0].value = _num;;
			setTotal();
		}

		// 加
		if($(e.target).hasClass('addBtn')){
			var _num = parseInt($(e.target).prev().children()[0].value);
			_num ++;
			var res = _num;
			$(e.target).prev().children()[0].value = res;
			setTotal();
		}

		// 删除商品
		if($(e.target).hasClass('delete')){
			var _bleen = confirm('是否从购物车删除这件商品');
			if(_bleen){
				var $goods_box = $(e.target).parent().parent().parent().parent();

				// 删除数组中对应的data-id！
				var arrKey = $goods_box.data('id');
				partsArr.forEach(function(key, index) {
					key === arrKey ? delete partsArr[index] : '';
				})
				// 删除商品
				var goodsId = $goods_box.data('id');

				for(var i=0;i<goodSS.length;i++){
					if(goodSS[i].id === goodsId){
						goodSS = goodSS.splice(i,1);

					}

				}

				localStorage.setItem('order',JSON.stringify(goodSS));
				$goods_box.remove();

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
				
				$new_good.remove();
				alert('已经添加');
				return false;
			}
		})
		
		partsArr = partsArr.concat(goods_id);
		// console.log(partsArr);
		var $l_img = $('<div/>',{class:'l_img'}).appendTo($new_good);
		var msgbox = $(this).parent().parent().parent();
		$('<img/>',{src:msgbox.find('img')[0].src}).appendTo($l_img);

		var r_content = $('<div/>',{class:'r_content'}).appendTo($new_good);               
		var $figcaption = $('<figcaption/>').appendTo(r_content);
		var $goods_name = $('<p/>').addClass('nametitle').appendTo($figcaption);
		$goods_name.html(msgbox[0].title);

		var $goods_pirce = $('<p/>').addClass('price').appendTo(r_content);
		$goods_pirce.html(msgbox.attr('data-price'));

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
	})

	// 表单选中事件
	$('#chocolateCard1').click(function(){
		if($('#chocolateCard1').is(':checked')){
			$('.chocolate').show();
		}
	});

	$('#chocolateCard2').click(function(){
		if($('#chocolateCard2').is(':checked')){
			$('.chocolate').hide();
		}
	});

	$('#chocolateCardType2').click(function(){
		if($('#chocolateCardType2').is(':checked')){
			$('.other').show();
		}
	});

	$('#chocolateCardType0').click(function(){
		if($('#chocolateCardType0').is(':checked')){
			$('.other').hide();
		}
	});
	$('#chocolateCardType1').click(function(){
		if($('#chocolateCardType1').is(':checked')){
			$('.other').hide();
		}
	});

	$('#greetingCard1').click(function(){
		if($('#greetingCard1').is(':checked')){
			$('.greetingMessage').show();
		}
	});

	$('#greetingCard2').click(function(){
		if($('#greetingCard2').is(':checked')){
			$('.greetingMessage').hide();
		}
	});
	
	// 配送日期=>显示今天的日期
	var now = new Date();
	var year = now.getFullYear();
	var month = now.getMonth()+1;//0-11
	var date = now.getDate();
	month = month<10 ? '0'+month : month;
	date = date<10 ? '0'+date : date;
	var today = year + '-' + month + '-' + date;
	
	$('#now_day').attr('value',today);
	
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


	// 点击支付
	$('#payment-btn').click(function(){
		if($('#dis_phone').val()==''){
			alert('请输手机号码')
		}
	})

})