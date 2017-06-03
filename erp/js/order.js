$(function(){

   // 输入id查询
  $('.search_btn').click(function(){
     seeOrderID();
  }); 

  // ID查询商品显示
  function seeOrderID(){
    $.post(erp.baseUrl +  'getorder', {
     'orderID':String($('.see_id').val())
      }, function(response){
      	console.log(response)
      if(response.status){
        var html = '';
        $('tbody').html();
        setOrderTbody(response)
        $('.search_err').text(response.message);
        } else {
          $('.search_err').text(response.message);
        }
    })
  }

	 // 自添加所有订单
  $.post(erp.baseUrl +  'orderall', {
   'getorder':'allorder'
  }, function(response){console.log(response);
    if(response.status){

      setOrderTbody(response);  
      } else {
        // console.log(response.message);
      }
   });

  // 订单写入tbody
  function setOrderTbody(response){
    var html = '';
    html = response.data.map(function(item){
      var orState = '';
      var goodsNameStr = '';
      var orderGoodsNum = 0;
      if (item.paid=='y') {
        orState = '已付款';
      }else if (item.shipped=='y') {
        orState = '已发货';
      }else if (item.completed=='y') {
        orState = '已完成';
      }
      goodsNameStr += item.goods.map(function(arritem){
        orderGoodsNum +=Number(arritem.num) ;
        return arritem.goodsname;
      }).join(',');
      return `<tr><td>${item.orderID}</td>
              <td>${item.username}</td>
              <td>${goodsNameStr}</td>
              <td>${item.addr[0].address}</td>
              <td>${item.orderTime}</td>
              <td>${item.less}</td>
              <td>${orderGoodsNum}</td>
              <td>￥${item.totalprice}</td>
              <td>${orState }</td>
              <td><a href="javascript:;" class="seeOrder">查看详细信息</a></td></tr>`;
      }).join('');
      $('.order_outbox tbody').html(html);
  }


	// 修改商品
  $('tbody').on('click',function(e){
    var target = e.target;
    $('.seeorder').html();
    if ($(target).attr('class')==="seeOrder") {

      var orderID = $(target.parentNode.parentNode.firstChild).text();

      $.post(erp.baseUrl +  'getorder', {
       'orderID':String(orderID)
        }, function(response){
        	console.log(response)
        if(response.status){
			var res = response.data[0];

			$('.orderID').text(res.orderID);
			$('.username').text(res.username);

			var html = '' , num = 0;
			res.goods.map(function(item){
				num += Number(item.num);
				html +=`${item.goodsname} , 规格 : ${item.size} , 数量 : ${item.num}<br>`;
			});

			$('.name').html(html);
			$('.address').text(res.addr[0].address);
			$('.orderTime').text(res.orderTime);
			$('.less').text(res.less);
			$('.num').text(num);
			$('.totalprice').text('￥'+res.totalprice);
			$('.deliveryDate').text(res.deliveryDate);
			$('.deliveryTime').text(res.deliveryTime);
			$('.orderPhone').text(res.orderPhone);

			$('.finalprice').text('￥'+res.finalprice);
			$('.chocolateBrand').text(res.chocolateBrand);
			$('.greetingCard').text(res.greetingCard);
			if (res.paid=='y') {
			    var orState = '已付款';
			}else if (res.shipped=='y') {
				orState = '已发货';
			}else if (res.completed=='y') {
				orState = '已完成';
			}
			$('.paid_tip').text(orState);
			$('.paidTime').text(res.paidTime);
			$('.shippedTime').text(res.shippedTime);
			$('.completedTime').text(res.completedTime);
			$('.shippedman').text(res.shippedman);
			$('.shippedman').text(res.shippedman);

           $('.close_add').click(function(){
              $('.seeorder').hide();           
           })
          } 
      });

      $('.seeorder').show();
    }
  });
})