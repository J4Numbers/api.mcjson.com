require([
	'PageRouter',
	'jquery',
	'page/TablePage',
	'page/EntryPage',
	'page/editors/ItemEditor'
	],
function(PageRouter, $, TablePage, EntryPage, ItemEditor){

	var router = new PageRouter({region:'#main'});

	router.add('/items/:mod/:id', new EntryPage( new ItemEditor() ));
	router.add('/blocks/:mod/:id', new EntryPage( new ItemEditor() ));

	
	router.add('/:table', new TablePage());
	
	

	router.add
	router.on('route',function(route,params){
	    $(".navbar-nav>li").removeClass("active");
	    $("ul.navbar-nav>li>a[href='" + location.hash + "']").closest("li").addClass("active");
	});
	router.start(true);
	console.log("App started.");

})