$(function(){

  // 获取登录用户信息   
    $.get(erp.baseUrl + 'getsession', function(response){
      if(!response.status){
        window.location.href = 'login.html';
      } else {
        $('.admin_icon').text(response.data);
      }
    });


    // 用户退出
    $('.quit_icon').click(function(){
      $.get(erp.baseUrl + 'removesession', function(response){
        if(!response.status){
          console.log(response)
          window.location.href = 'login.html';
        } 
      });
    });

   // 修改商品
  $('tbody').on('click',function(e){
    var target = e.target;
    $('.modify_link_tip').html();
    if ($(target).attr('class')==="modify") {

      var getID = $(target.parentNode.parentNode.firstChild).text();

      $.post(erp.baseUrl +  'getProdut', {
       'id':String(getID)
        }, function(response){
        if(response.status){
          var res = response.data[0];

          $('.modifyCheckbox input[type=checkbox]').prop('checked',false);
          var che = $('.modifyCheckbox input[type=checkbox]');
          // 遍历写入类别 勾选
          for(var i=0;i<res.type.length;i++){
            che.each(function(idx,ele){
              if ($(ele).val()===res.type[i]) {
                $(ele).prop('checked',true);
              }
            })
          }

           $('.modify_produt_id').val(res.id);
           $('.modify_produt_name').val(res.name);
           $('.modify_produt_brand').val(res.brand);
           $('.modify_explain').val(res.explain);
           $('.modify_texture').val(res.texture);
           $('.modify_alcohol').val(res.alcohol);
           $('.modify_scene').val(res.scene);
           $('.modify_sweetness').val(res.sweetness);
           $('.modify_suitable').val(res.suitable);
           $('.modify_fresh').val(res.fresh);
           $('.modify_material').val(res.material);

           $('.modify_norms1').val(res.norms[0]);
           $('.modify_norms2').val(res.norms[1]);
           $('.modify_norms3').val(res.norms[2]);
           $('.modify_norms4').val(res.norms[3]);

           $('.modify_link_btn').click(function(){
              console.log(res._id);
              var modifyche = $('.modifyCheckbox input[type=checkbox]');
              var typearr = [];
              modifyche.each(function(idx , ele){
                if ($(ele).prop("checked")) {
                  typearr.push($(ele).val());
                }                
              });

              var _typearr = JSON.stringify(typearr);
              var _norms = JSON.stringify([$('.modify_norms1').val(),$('.modify_norms2').val(),$('.modify_norms3').val(),$('.modify_norms4').val()]);
              var operator_name = $('.admin_icon').text();
              // var dbid = JSON.stringify('ObjectId("'+res._id+'")');
              var str={
                    // '_id':dbid,
                    'id':String($('.modify_produt_id').val()),
                    'name':$('.modify_produt_name').val(),
                    'type':_typearr,
                    'brand':$('.modify_produt_brand').val(),
                    'price':$('.modify_price').val(),
                    'explain':$('.modify_explain').val(),
                    'texture':$('.modify_texture').val(),
                    'alcohol':String($('.modify_alcohol').val()),
                    'scene':$('.modify_scene').val(),
                    'sweetness':String($('.modify_sweetness').val()),
                    'suitable':$('.modify_suitable').val(),
                    'fresh':$('.modify_fresh').val(),
                    'material':$('.modify_material').val(),
                    "norms":_norms,
                    "operator":operator_name
                  };     
              $.post(erp.baseUrl + 'modifyProdut', str, function(response){
                if(response.status){
                  console.log(response);
                    $('.modify_link_tip').html(response.message);
                  } else {
                    $('.modify_link_tip').html(response.message);
                  }
              })
           })
          } 
      });

      $('.modifyprodut').show();
    }
  });

   // 关闭修改商品弹窗
 $('.close_modify').click(function(){
    $('.modifyprodut').hide();
    $('.modify_link_tip').html('');
  });

  type();

  $('.typelist li').click(function(e){
    $('.typelist li').removeClass('active').eq($(this).index()).addClass('active');
    type();
  })
  // post 获取类别商品
  function type(){
    $.post(erp.baseUrl +  'type', {
     'type':$('.active button').text()
    }, function(response){
      if(response.status){
        // console.log(response);
        setTbody(response);  
        } else {
          console.log(response.message);
        }
     });
  }

      // 商品写入tbody
  function setTbody(response){
    var html = '';
    html = response.data.map(function(item){
      return `<tr><td>${item.id}</td>
              <td><img src="../../src/img/${item.images[0]}"></td>
              <td>${item.name}</td><td>￥${item.price}</td>
              <td><a href="#">在售</a><br><a href="#">暂停销售</a></td>
              <td><a href="#" class="modify">修改</a><td></tr>`;
      }).join('');
      $('.box tbody').html(html);
  }

})


