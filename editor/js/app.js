require([
	'router',
	'backbone',
	'jquery',
	'page/index/index',
	'page/blocks/index',
	'page/items/index',
	'page/entities/index',
	'page/new/index',
	'widget/EntryEditor',
	'model/Item',
	'model/Block',
	'model/Entity'
	],
function(Router,Backbone, $, PageIndex, PageBlock, PageItem,PageEntity,PageNewEntry,EntryEditor, Item,Block, Entity){

router = new Router({
	region: $("#main"),
	routes: {
		"":Router.loadPage(PageIndex, "index"),
		"blocks":Router.loadPage(PageBlock, "blocks"),
		"items":Router.loadPage(PageItem, "items"),
		"entities":Router.loadPage(PageEntity, "entities"),
		"items/_new": Router.loadPage(PageNewEntry, "newitem",[{txt:"Item",m:Item}]),
		"items/:mod/:id":function(mod, id){
			m = new Item({mod:mod,id:id});
			m.fetch().then(function(){
				$("#main").html(new EntryEditor({model:m}).render().$el);
			}).fail(function(){
				$("#main").html("Failed to load model");
			})
		},
		"blocks/_new": Router.loadPage(PageNewEntry, "newitem",[{txt:"Block",m:Block}]),
		"blocks/:mod/:id":function(mod, id){
			m = new Block({mod:mod,id:id});
			m.fetch().then(function(){
				$("#main").html(new EntryEditor({model:m}).render().$el);
			}).fail(function(){
				$("#main").html("Failed to load model");
			})
		},
		"entities/_new": Router.loadPage(PageNewEntry, "newentity",[{txt:"Entity",m:Entity}]),
		"entities/:mod/:id":function(mod, id){
			m = new Entity({mod:mod,id:id});
			m.fetch().then(function(){
				$("#main").html(new EntryEditor({model:m}).render().$el);
			}).fail(function(){
				$("#main").html("Failed to load model");
			})
		}
	}
});
router.on('route',function(route,params){
    $(".navbar-nav>li").removeClass("active");
    $("ul.navbar-nav>li>a[href='" + location.hash + "']").closest("li").addClass("active");
})
Backbone.history.start();

})