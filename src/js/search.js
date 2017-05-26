 $(function(){
 	$('#searchKey').on('click',function(){
 		// console.log(111);
 		var data = $('#keyword').val();
 		if(!data){
 			return false;
		}
 		location.href = 'html/Group-list.html?searchkey="'+data + '"';
 	});
 });
 
