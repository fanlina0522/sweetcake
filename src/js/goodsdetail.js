require(['config'],function(){
	require(['jquery','carousel'],function(){
		$(function(){

            var goodsid;
            var imgUrl;
            var size;

            //页面传递参数接收
            var goodsId = window.location.search;
            goodsId = goodsId.split('=')[1];
            console.log(goodsId)

            //post请求
            $.get( erp.baseUrl + 'getDetail',{
                id:goodsId
            },function(response){

                //处理返回数据
                goodsid = response.id;
                imgUrl = response.images;   

                $('.name>h1').text(response.name);
                $('.name>h2').text(response.brand);
                $('.dec').text(response.explain);
                $('.typeList001').after('口味：' + response.texture);
                //alcohol
                if(response.alcohol===0){
                    $('.typeList002').after('是否含酒精：否');
                }else{
                    $('.typeList002').after('是否含酒精：是');
                }
                $('.typeList003').after('适用节日：' + response.scene);
                //sweetness
                var level = $('.starRating').children();
                for(var i=0;i<response.sweetness;i++){
                    $(level[i]).addClass('active');
                }
                $('.typeList005').after('适合人群：' + response.suitable);
                $('.typeList006').after('保鲜条件：' + response.fresh);
                $('.typeList007').after('原材料：' + response.material);
                //规格

                var goodsSize = response.norms.map(function(item){
                    
                    var price = item.slice(-6);
                    size = item.slice(0,-7);
                    var cakeId = Number(price);

                    return `<label for="proType${cakeId}">
                                <div class='item pd-spec-sx enable' data-id=${goodsid+cakeId} for="proType${cakeId}" data-price="${price}">
                                    <p class="checkedWarp">
                                        <input type="radio" id="proType${cakeId}" name="proType" >
                                    ${size}
                                        <strong>&yen;${price}</strong>
                                    </p>
                                </div>
                            </label>`
                }).join('');
                
                $('.selectTypeList').html(goodsSize);



                //轮播图
                $('.touchslider-item').carousel({ 
                    imgs:imgUrl,
                    // 设置轮播间隔时间
                    duration:3000,
                    // 设置轮播方式
                    moveType:'horizontal'
                }).show();


                //评论数据请求
                //初始请求页数currentpage
                /*var currentPage = 0;
                //每页内容数量 10条
                var pageAmount = 5;
                $.get( adress.baseUrl + 'getDetail',{
                    id:'hot14'
                },function(response){

                })*/

            })


            //tap切换
            $('.matchingMenu').on('click','.f1',function(){

                // 获取索引值 title数组的元素索引
                var $idx = $(this).index();
     
                //当前添加高亮，移除兄弟元素tab高亮 
                $(this).addClass('active').siblings().removeClass('active');

                //div、tap切换
                $('.shade').animate({left:($idx)*$(this).width()},100);
                $('.tabCon').hide();
                $('.tabCon').eq($idx).show();

            })

            //勾选规格
            var showPrice;
            $('.selectTypeList').on('click',function(e){
                showPrice = $(e.target).parents('.item').attr('data-price');
                $('#pd-sale-price').html('￥'+showPrice*$('#num').val());
            })

            //cake_size_acounts 增减数量
            $('.del').on('click',function(){
                $acounts = $('#num').val() - 1;
                if($acounts<1){
                    $acounts=1;
                }
                $('#num').attr({'value':$acounts});
                $('#pd-sale-price').html('￥'+showPrice*$('#num').val());
            })

            $('.add').on('click',function(){
                $acounts = Number($('#num').val())+ 1;
                $('#num').attr({'value':$acounts});
                $('#pd-sale-price').html('￥'+showPrice*$('#num').val());

            })


            //底部购物车导航
            //计算总数量

            $('#addcart-button').on('click',function(){

                //获取总数量
                $acounts = $('#num').attr('value');

                //获取商品规格
                var $current = $('input:checked').parents('.item');
                var currentId = $current.attr('data-id');
                var currentPrice = $current.attr('data-price');

                //写入价格、数量
                var carPrice = $acounts*currentPrice;
                $('#pd-sale-price').text('￥'+ carPrice);

                //本地存储
                var cartList = localStorage.getItem('order');
                cartList = cartList ? JSON.parse(cartList) : [];

                //判断商品是否存在
                var hasGoods = false ;
                
                for(var i=0;i<cartList.length;i++){

                    if(cartList[i].id===currentId){
                        hasGoods = true;

                        cartList[i].acount = $acounts;

                        // 写入本地存储
                        localStorage.setItem('order',JSON.stringify(cartList)); 
                                           
                        break;
                    }
                }

                //如果不存在
                var data ;
                if(!hasGoods){
                    
                    data = {
                        id : $current.attr('data-id'),
                        name : $('.name>h1').text(),
                        size : size,
                        price : currentPrice,
                        acount : $acounts,
                        img : imgUrl[0]
                    }

                    cartList.push(data);

                    localStorage.setItem('order',JSON.stringify(cartList));
                }

                //矫正数量
                var total = 0;
                cartList.map(function(item){
                    total += Number(item.acount);
                })
                 $('#toCart>i').text(total);
                
            })


            // 跳转购物车页面
            $('#toCart').on('click',function(){
                window.location.href = erp.baseUrl + 'src/html/car.html'
            })


            //返回按钮
            $('.backRound').on('click',function(){
                window.location.href = 'window.history.go(-1)';
            })

            //返回主页
            $('.home').on('click',function(){
                window.location.href = '../index.html'
            })


            //moreCom 查看评论
            $('.moreBtn').on('click',function(){
                window.location.href = '../html/goodscomment.html?id='+goodsid;
            })

		})
	})
})