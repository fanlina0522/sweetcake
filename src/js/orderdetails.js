$(function(){
    var orderId = window.location.search;
    orderId = orderId.split('=')[1];
    // console.log(orderId);

    //发送请求
    $.post(erp.baseUrl +'orderdetails',{id:orderId},function(response){
        console.log(response);
        $('.orderdetailsList').html(response.map(function(item){
            var price = item.goods.goodsprice.slice(1);
            var totalPrice = price*item.goods.num;
            return  `
                  <li>
                    <p class="ornum">订单号：<span class="orNum">${item.orderID}</span><span class="orStatus">${item.paid}</span></p>
                    <div class="or_msg">
                        <div class="or_up clearfix">
                            <div class="or_up_left">
                                <img src="../../img/a_01.jpg">
                            </div>
                            <div class="or_up_right">
                                 <p class="goodsname">${item.goods.goodsname}</p>
                                 <p class="qty_price">
                                    <span class="goodsprice">${item.goods.goodsprice}</span>
                                    <span class="goodsqty">&times;${item.goods.num}</span>
                                 </p>
                            </div>
                        </div>
                        <div class="or_down">
                            <span>${item.goods.num}</span>件商品
                             <p>合计:<span>￥${totalPrice}</span></p>
                        </div>
                    </div>
                    <div class="zengpin">
                        <p>赠品信息</p>
                        <p>巧克力品牌</p>
                        <p>祝福语</p>
                    </div>
                    <div class="peisongxinxi">
                        <p>配送信息</p>
                        <p>收件人 <span>${item.addr[0].name}${item.orderPhone}</span></p>
                        <P>配送地址 <span>${item.addr[0].address}</span></P>
                        <p>配送时间 <span></span></p>
                        <p>订单总额 <span></span></p>
                        <p>运费 <span></span></p>
                        <p>备注 <span></span></p>
                    </div>
                </li> 
            `

        }).join(''));
    })
})