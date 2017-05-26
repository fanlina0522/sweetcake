$(function(){
    goodsajax('hot','null')

    function goodsajax(name,keyword) {
        $.ajax({
            url: erp.baseUrl +"html/Group-list",
            data: { _name: name,_keyword:keyword},
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
            //详情
            var brand = data[i].brand;
            //名字
            var name = data[i].name;
            //图片
            var images = data[i].images[0]
            //console.log(id,price,brand,images,dddname)
            //生成li标签
            var li = $('<li/>');
            //生成内容
            li.html(`
                <a href="html/goodsdetail.html?id=${id}">
                        <h4>${name}</h4>
                        <h4>${brand}</h4>
                        <img src="img/${images}" data-original="img/${images}">
                </a>
            `);
            //插入ul
            $('.hotCake').append(li);
        }
    }

    $(".hotCake img").lazyload({
        effect: "fadeIn" //淡入淡出
    });

    //侧边栏和遮罩层的显示
    $('.footshow').click(function() {
        $('.category').animate({ left: 0 }, function() {
            $('.show').css({ display: 'block' })
        }).css({ display: 'block' }, 3000);
    })

    $('.left').click(function() {
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

    var moreArrow = $('.moreArrow')

    $.each(moreArrow, function() {


        $(this).click(function(event) {
            console.log(123)
            window.location.href = '../html/Group-list.html';

        },function(){
            console.log($(this))
            var goodshtml2 = $(this).html()
            //生成到头部
            $('.title').html(goodshtml2);
            // 获取点击title内容
            var goodshtml = $(this).attr('title')
            //发送请求
            goodsajax(goodshtml, 'null')


        });
    });



})