require([
	'PageRouter',
	'jquery',
	'page/TablePage'
	],
function(PageRouter, $, TablePage){

	var router = new PageRouter({region:'#main'});

	router.add('/:table', new TablePage());
	router.on('route',function(route,params){
	    $(".navbar-nav>li").removeClass("active");
	    $("ul.navbar-nav>li>a[href='" + location.hash + "']").closest("li").addClass("active");
	});
	router.start(true);
	console.log("App started.");

})