$(function(){
    $.post(erp.baseUrl +'order',function(response){
        console.log(response);
        //默认显示全部
        $('.orlist').children().eq(0).addClass('active');
        $('main').children().eq(0).show();
        $('.orMsgList').html(response.map(function(item){
            var price = item.goods.goodsprice.slice(1);
            var totalPrice = price*item.goods.num;

            return `
                    <li>
					<p>订单号：<span class="orNum">${item.orderID}</span><span class="orStatus">${item.paid}</span></p>
					<div class="or_msg">
						<div class="or_up clearfix">
							<div class="or_up_left">
								<img src="../../img/b_01.jpg">
							</div>
							<div class="or_up_right">
								<p class="goodsname">${item.goods.goodsname}</p>
								<p class="goodsnorms">${item.goods.size}</p>
								<span class="goodsprice">${item.goods.goodsprice}</span>
								<span class="goodsqty">&times;${item.goods.num}</span>
							</div>
						</div>
						<div class="or_down">
							<p>合计:<span>￥${totalPrice}</span></p>
							<div class="btn">
								<input type="button" id="delOr" value="取消订单">
								<input type="button" id="pay" value="立即支付">
								<a href="../vip/orderdetails.html?id=${item.orderID}"><input type="button" id="ordetails" value="订单详情" ></a>
							</div>
						</div>
					</div>
				</li>
                `
        }).join(''));
        //显示当前状态,事件委托
        $('.orlist').on('click','li',function(){
            var index = $(this).index();
            $(this).addClass('active').siblings().removeClass('active');
            $('main').children().hide().eq(index).show();
            var status = $(this).text();
            console.log(status);
            $('.orthers').html(response.map(function(item){
                var price = item.goods.goodsprice.slice(1);
                var totalPrice = price*item.goods.num;
                if(status === item.paid){
                    return `
                    <li>
					<p>订单号：<span class="orNum">${item.orderID}</span><span class="orStatus">${item.paid}</span></p>
					<div class="or_msg">
						<div class="or_up clearfix">
							<div class="or_up_left">
								<img src="../../img/b_01.jpg">
							</div>
							<div class="or_up_right">
								<p class="goodsname">${item.goods.goodsname}</p>
								<p class="goodsnorms">${item.goods.size}</p>
								<span class="goodsprice">${item.goods.goodsprice}</span>
								<span class="goodsqty">&times;${item.goods.num}</span>
							</div>
						</div>
						<div class="or_down">
							<p>合计:<span>￥${totalPrice}</span></p>
							<div class="btn">
								<input type="button" id="delOr" value="取消订单">
								<input type="button" id="pay" value="立即支付">
								<a href="../vip/orderdetails.html?id=${item.oderID}"><input type="button" id="ordetails" value="订单详情" ></a>
							</div>
						</div>
					</div>
				</li>
                `
                }
            }).join(''));
        })
    })
})