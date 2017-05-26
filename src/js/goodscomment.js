require(['config'],function(){

	require(['jquery','baseUrl'],function(){
		//初始请求页数currentpage
		var currentPage = 0;
		//每页内容数量 10条
		var pageAmount = 10;

		$('#moreEv').on('click',function(){

			$.get(erp.baseUrl + 'moreCom',{
				type:'hot',
				currentPage:currentPage,
				pageAmount:pageAmount
			},function(response){
				console.log(response)

				//回调后改变当前页
				currentPage++;
			})
		})
	})
})