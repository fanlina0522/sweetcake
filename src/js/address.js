$(function(){
        //发送请求，显示所有保存在数据库中的地址
        $.post(erp.baseUrl + 'address',function(response){
            console.log(response);
            $('.myAddress').html(response.map(function(item){
                return `<li data-id=${item.id}>
						<p class="selfMsg"><span class="name">${item.username}</span>
							<span class="phone">${item.phone}</span>
						</p>
						<p><span class="city">${item.address.replace(/,/g ,'')}</span>
						<span class="xxadd">${item.addrs}</span></p>
						<p><span class="mr">设为默认</span><span class="reset">编辑</span></p>
					</li>`;
            }).join(''));

            //点击获取地址,事件委托,将地址本地存贮
            $('.myAddress').on('click','li',function(){

                //设置默认
                var p = $('.mr').parents('ul').find('.selfMsg');
                var p1 = $(this).find('.selfMsg');
                var sp =  $('<span/>').addClass('mr_btn').text('默认');
                p.children('.mr_btn').remove();
                p1.append(sp);

                //1.每次要清除之前写入的地址，始终保持一条地址信息
                window.localStorage.removeItem('address');
                //2.设置一个空数组，用来存储地址信息
                var address = [];

                //3.创建一个对象，用来存贮地址信息
                var addObj = {
                    id : $(this).attr('data-id'),
                    name:$(this).find('.name').text(),
                    phone:$(this).find('.phone').text(),
                    city:$(this).find('.city').text(),
                    addr:$(this).find('.xxadd').text()
                }

                address.push(addObj);
                // 写入本地存储
                localStorage.setItem('address',JSON.stringify(address));
                console.log(localStorage.getItem('address'));

                //跳转到购物车页面,延迟跳转
                setTimeout(function(){
                    window.location.href = erp.baseUrl + 'src/html/car.html';
                },50)
            })
        })
    })
