$(function(){

    $.post(erp.baseUrl +'order',function(response){
        console.log(response);
        //默认显示全部
        $('.orMsgList').html(response.map(function(item){
            var totalPrice = item.qty *item.price;
            return `
                    <li>
					<p>订单号：<span class="orNum">${item.orderNum}</span><span class="orStatus">${item.status}</span></p>
					<div class="or_msg">
						<div class="or_up clearfix">
							<div class="or_up_left">
								<img src="../../img/b_01.jpg">
							</div>
							<div class="or_up_right">
								<p class="goodsname">${item.name}</p>
								<p class="goodsnorms">默认规格</p>
								<span class="goodsprice">￥${item.price}</span>
								<span class="goodsqty">&times;${item.qty}</span>
							</div>
						</div>
						<div class="or_down">
							<p>合计:<span>￥${totalPrice}</span></p>
							<div class="btn">
								<input type="button" id="delOr" value="取消订单">
								<input type="button" id="pay" value="立即支付">
								<input type="button" id="ordetails" value="订单详情">
							</div>
						</div>
					</div>
				</li>
                `
        }).join(''));

        $('.orlist').on('click','li',function(){
            // console.log($(this).text());
            $('.orMsgList').html(response.map(function(item){

                var totalPrice = item.qty *item.price;
                return `
                    <li>
					<p>订单号：<span class="orNum">${item.orderNum}</span><span class="orStatus">${item.status}</span></p>
					<div class="or_msg">
						<div class="or_up clearfix">
							<div class="or_up_left">
								<img src="../../img/b_01.jpg">
							</div>
							<div class="or_up_right">
								<p class="goodsname">${item.name}</p>
								<p class="goodsnorms">默认规格</p>
								<span class="goodsprice">￥${item.price}</span>
								<span class="goodsqty">&times;${item.qty}</span>
							</div>
						</div>
						<div class="or_down">
							<p>合计:<span>￥${totalPrice}</span></p>
							<div class="btn">
								<input type="button" id="delOr" value="取消订单">
								<input type="button" id="pay" value="立即支付">
								<input type="button" id="ordetails" value="订单详情">
							</div>
						</div>
					</div>
				</li>
                `
            }).join(''));
        })
    })
})