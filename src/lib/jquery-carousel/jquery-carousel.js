/*
	编写jquery插件就是给jquery的原型对象添加方法
	jquery.lxcarousel.js
 */
;(function($){

	// $.prototype.lxcarousel = function(options){
	$.fn.carousel = function(options){
		// 这里的this为jquery对象（实例）

		//默认属性
		var defaults = {
			width:375,
			height:375,

			// 滚动间隔时间
			// duration:3000,
			// 当前索引值（默认0）
			index:0,
		}

		// 使用this.each()迭代元素,为了实现多个调用
		this.each(function(){
			// jquery扩展对象$.extend()
			// var opt = Object.assign({},defaults,options);
			var opt = $.extend({},defaults,options);
			var $self = $(this);
			var $ul


			init();
			var innerW;
			// 
			function init(){

				$self.addClass('carousel');

				$ul = $('<ul/>');
				// $ul.addClass('slide-items');
				//创建li的html结构，返回值:Stringhtml([val|fn])，val用于设定HTML内容的值
				var imgLi = opt.imgs.map(function(item){
					return `<li><img src="../img/${item}"></li>`
				});
				imgLi.push(imgLi[0]);
				imgLi = imgLi.join('');
				$ul.html(imgLi);
				//轮播导航
				var imgSpan = opt.imgs.map(function(item){
					return `<span class="touchslider-nav-item"></span>`
				}).join('')
				$('.touchslider-nav').html(imgSpan);


				//获取当前浏览器窗口大小
				innerW = $('#touchslider').width();
				//设置样式
				$('window').css({'max-width':innerW,'min-width':innerW})
				$ul.children().css({width:innerW,height:opt.height})
				$ul.css({width:(opt.imgs.length+1)*innerW});
				$('.touchslider-nav-item').eq(0).addClass('touchslider-nav-item-current');


				// $ul.appendTo($self)
				$self.append($ul);


				// 轮播
				setInterval(function(){

					opt.index++;

					showPic();

				},opt.duration)
			}


			function showPic(){
				
				if(opt.index > opt.imgs.length){

					opt.index = 1;
					$ul.css({left:0});

				}else if(opt.index < 0){

					opt.index = opt.imgs.length;
				}


				//moveType参数设置对应效果
				switch(opt.moveType){

					case 'vertial':
						$ul.animate({top:-opt.index*opt.height});	
						break;

					case  'horizontal':
						// $ul.children().css({float:'left'});
						$ul.animate({left:-opt.index*innerW});
						
						if(opt.index===opt.imgs.length){
							$('.touchslider-nav-item').removeClass('touchslider-nav-item-current');
							$('.touchslider-nav-item').eq(0).addClass('touchslider-nav-item-current');
						}else{
							$('.touchslider-nav-item').removeClass('touchslider-nav-item-current');
							$('.touchslider-nav-item').eq(opt.index).addClass('touchslider-nav-item-current');
						}
						
						break;
				}
				
			}
		});

		return this;
	}

})(jQuery);
