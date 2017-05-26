$(function() {


    //搜索
    var jt_data = location.search.substring(1);

    var jt_arr = jt_data.split('=');
    console.log(jt_arr)
    //获取到搜索的关键字
    var keyword = jt_arr[1];
    var keyword_name = jt_arr[0];



    if (keyword_name == 'name') {

        goodsajax(keyword, 'null')


    } else if (keyword_name = "data") {

        $('.title').html(keyword);
        goodsajax('null', keyword)
    }

    // 获取点击的内容

    var moreArrow = $('.moreArrow')
    $.each(moreArrow, function() {

        $(this).click(function(event) {

            var goodshtml2 = $(this).html()
            //生成到头部
            $('.title').html(goodshtml2);
            // 获取点击title内容
            var goodshtml = $(this).attr('title')
            //发送请求
            goodsajax(goodshtml, 'null')
        })

    });
    //发送内容
    function goodsajax(name, keyword) {
        $.ajax({
            url: erp.baseUrl + "html/Group-list",
            data: { _name: name, _keyword: keyword },
            success: function(data) {
                console.log(data)
                update(data)
            }
        });
    }

    function update(data) {
        //清空ul里面的元素
        $('.product').empty()
        //结果集循环
        for (var i = 0; i < data.length; i++) {
            //id
            var id = data[i].id;
            //价格
            var price = data[i].price;
            //详情
            var brand = data[i].brand;
            //名字
            var name = data[i].name;
            //图片
            var images = data[i].images[0]
            //console.log(id,price,brand,images,dddname)

            // 设置头部
            //生成li标签
            var li = $('<li/>');
            //生成内容
            li.html(` 
                <a href="Group-list.htm?id=${id}" class="product_a">
                    <p><img data-original="../img/${images}" alt="" src="../img/${images}"></p>
                    <div class="conWarp">
                    <h4>${name} ${brand}</h4>
                    <h5>￥${price}</h5></div>
                </a>
            `);
            //插入ul
            $('.product').append(li);
        }
    }
    //懒加载
    $(".product img").lazyload({
        effect: "fadeIn" //淡入淡出
    });
    //点击放回
    $('.iconWarp-left').on('click', function() {
        history.back();
    });
    //侧边栏和遮罩层的显示
    $('.footshow').click(function() {
        $('.category').animate({ left: 0 }, function() {
            $('.show').css({ display: 'block' })
        }).css({ display: 'block' }, 3000);
    })
    //侧边栏和遮罩层的隐藏
    $('.show').click(function() {
        $('.category').animate({ left: -888 }).css({ display: 'none' }, 1000);
        $('.show').css({ display: 'none' })
    })
    //侧边栏和遮罩层的隐藏
    $('.webkit-scroll a').click(function(event) {
        $('.category').animate({ left: -888 }).css({ display: 'none' }, 1000);
        $('.show').css({ display: 'none' })
    });



})
