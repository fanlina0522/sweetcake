
$(function(){

  var imgarr = ['hot11.jpg'];//添加商品 图片路径接收变量

  // 上传图片
  $('.submit_img').click(function(){
    imgarr =null;
    $('form').ajaxSubmit({
      type: 'post',
      url: erp.baseUrl + 'upload',
      success:function(data){
        imgarr=data.data;
        $('.link_tip').html(data.message);
      },
      error:function(XmlHttpRequest,textStatus,errorThrown){
          console.log(XmlHttpRequest);
          console.log(textStatus);
          console.log(errorThrown);
      }
    })    
  })

  // 添加商品
  $('.link_btns').click(function(){
    var produtche = $('.checkbox input[type=checkbox]');
    var typearr = [];
    produtche.each(function(idx , ele){
      if ($(ele).prop("checked")) {
        typearr.push($(ele).val());
      }                
    });
   console.log(typearr)
    var _typearr = JSON.stringify(typearr);
    var _imgarr = JSON.stringify(imgarr);
    var _norms = JSON.stringify([$('.norms1').val(),$('.norms2').val(),$('.norms3').val(),$('.norms4').val()]);
    var operator_name = $('.admin_icon').text();
    var str={
         'id':String($('.produt_id').val()),
         'name':$('.produt_name').val(),
         'type':_typearr,
         'brand':$('.produt_brand').val(),
         'price':$('.price').val(),
         "images":_imgarr,
         'explain':$('.explain').val(),
         'texture':$('.texture').val(),
         'alcohol':String($('.alcohol').val()),
         'scene':$('.scene').val(),
         'sweetness':String($('.sweetness').val()),
         'suitable':$('.suitable').val(),
         'fresh':$('.fresh').val(),
         'material':$('.material').val(),
         "norms":_norms,
         'hot':0,
         'rehot':0,
         "operator":operator_name
      };     
    $.post(erp.baseUrl +  'saveProdut', str, function(response){
      if(response.status){
        console.log(response);
          $('.link_tip').html(response.message);
        } else {
          $('.link_tip').html(response.message);
        }
    })
  });

  // 输入id查询是否存在
  $('.produt_id').blur(function(){
     $.post(erp.baseUrl +  'getProdut_id', {
     'id':String($('.produt_id').val())
      }, function(response){
        if(response.status){
          console.log(response);
            $('.id_title').text(response.message);
          } else {
            $('.id_title').text(response.message);
          }
      })
  });

  // 添加商品弹窗
  $('.close_add').click(function(){
    $('.addprodut').hide();
  });

  // 关闭添加商品弹窗
  $('.add_btn').click(function(){
    $('.addprodut').show();
  });

  // 关闭修改商品弹窗
 $('.close_modify').click(function(){
    $('.modifyprodut').hide();
    $('.modify_link_tip').html('');
  });

   // 自添加所有商品
  $.post(erp.baseUrl +  'Produt', {
   'getprodut':'allprodut'
  }, function(response){
    if(response.status){
      setTbody(response);  
      } else {
        alert(response.message);
      }
  });

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

  
   // 输入id查询
  $('.search_btn').click(function(){
     seeID();
  }); 

  // ID查询商品显示
  function seeID(){
    $.post(erp.baseUrl +  'getProdut', {
     'id':String($('.see_id').val())
      }, function(response){
      if(response.status){
        var html = '';
        $('tbody').html();
        setTbody(response);
        $('.search_err').text(response.message);
        } else {
          $('.search_err').text(response.message);
        }
    })
  }

  // 回车id查询
  $('.see_id').keyup(function(e){
    console.log(e.keyCode)
    if (e.keyCode==13) {
    seeID();
    } 
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
})