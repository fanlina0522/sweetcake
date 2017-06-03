$(function(){
    var orderId = window.location.search;
    orderId = orderId.split('=')[1];
    // console.log(orderId);
    //发送请求
    $.post(erp.baseUrl +'orderdetails',{id:orderId},function(response){
        console.log(response);
        console.log(123,response[0].goods);
        //处理数据
        var res = '';
        $div = $('<div/>').addClass('ordes');
        res += `<p class="ornum">订单号：<span class="orNum">${response[0].orderID}</span>
                <span class="orStatus">${response[0].paid}</span></p><div class="or_msg">`;

        var num = 0;
        var total = 0;
        res += response[0].goods.map(function(item){
            num += parseInt(item.acount);
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
							</div>
						</div>`;
        }).join('');

        res += `<div class="or_down">
                      <span>${num}</span>件商品
                      <p><span>合计：￥${total}</span></p>
                 </div></div>
                    <div class="zengpin">
                        <p>赠品信息</p>
                        <p>巧克力品牌<span>${response[0].chocolateBrand}</span></p>
                        <p>祝福语<span>${response[0].greetingCard}</span></p>
                    </div>
                    <div class="peisongxinxi">
                        <p>配送信息</p>
                        <p>收件人 <span>${response[0].addr[0].name}${response[0].orderPhone}</span></p>
                        <P>配送地址 <span>${response[0].addr[0].city}${response[0].addr[0].addr}</span></P>
                        <p>配送时间 <span>${response[0].deliveryDate}  ${response[0].deliveryTime}</span></p>
                        <p>订单总额 <span>￥${total}</span></p>
                        <p>运费 <span>￥${response[0].coupon_use}</span></p>
                        <p>备注 <span>${response[0].less}</span></p>
                    </div>`;
        $div.html(res);
        $div.appendTo('.orderdetailsList');
    })
})