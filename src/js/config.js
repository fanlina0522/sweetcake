// config.js
requirejs.config({
	// baseUrl : 'js',//建议不用写  基础路径为js文件夹
	paths : {
		 "jquery": "../lib/jquery/jquery-3.1.1",
                "carousel":"../lib/jquery-carousel/jquery-carousel",
                "baseUrl":"../lib/common/global",
                "common" : "common"
	},
	shim: {
        "carousel":["jquery"],
         "common": {
             deps: ["jquery"] //确保jquery已加载 
             // ,
             // exports: "jQuery.fn.scroll"
         }
    }
})