$(function(){

    $.post(erp.baseUrl +'order',function(response){

        //默认显示全部
        $('.orlist').children().eq(0).addClass('active');
        $('main').children().eq(0).show();
        //处理数据
        for(var i = 0; i < response.length; i++){
            var $li = $('<li/>');
            var res = '';
            res += `<p>订单号：<span class="orNum">${response[i].orderID}</span><span class="orStatus">${response[i].paid}</span></p>`;

            var total = 0;
            res += response[i].goods.map(function (item) {
                total += Number(item.price);
                return `<div class="or_up clearfix">
							<div class="or_up_left">
								<img src="../../img/${item.img}">
							</div>
							<div class="or_up_right">
								<p class="goodsname">${item.name}</p>
								<p class="qty_price">
                                    <span class="goodsprice">￥${item.price}</span>
                                    <span class="goodsqty">&times;${item.acount}</span>
                                </p>
								<p class="goodsnorms">${item.size}</p>
							</div>
						</div>`;
            }).join('');

            res += `<div class="or_down">
							<p><span>￥${total}</span></p>
							<div class="btn">
								<input type="button" id="delOr" value="取消订单">
								<input type="button" id="pay" value="立即支付">
								<a href="../vip/orderdetails.html?id=${response[i].orderID}"><input type="button" id="ordetails" value="订单详情" ></a>
							</div>
						</div>`;

            $li.html(res);
            $li.appendTo('.orMsgList');
        }
        //显示当前状态,事件委托
         $('.orlist').on('click','li',function(){
            var index = $(this).index();
            $(this).addClass('active').siblings().removeClass('active');
            $('main').children().hide().eq(index).show();
         })


        //删除订单，事件委托
        $('.orMsgList').on('click','#delOr',function(){
            //删除静态页面的li节点
            var orderid = $(this).parents('li').find('.orNum').text();
            var tixing = confirm('您确定要删除该订单？');
            if(tixing){
                //如果确定删除
                $(this).parents('li').remove();
                //发送请求去数据库删除订单
                $.post(erp.baseUrl +'orderdel',{orderid:orderid},function(respone){
                    alert('已成功删除该订单');
                })
            }else{
                return false;
            }
        })
    })
})