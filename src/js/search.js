 $(function(){
 	$('#searchKey').on('click',function(e){
 		e.preventDefault();

 		var data = $('#keyword').val();

 		location.href = 'html/Group-list.html?data='+data
			// '"'+ data + '"';

 	});
 });
 
