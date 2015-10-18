import PageRouter from 'mvc/PageRouter';
import TablePage from 'page/TablePage';
import EntryPage from 'page/EntryPage';
import ItemEditor from 'page/editors/ItemEditor';

	var router = new PageRouter({region:'#main'});

	router.add('/items/:mod/:id', new EntryPage( new ItemEditor() ));
	router.add('/blocks/:mod/:id', new EntryPage( new ItemEditor() ));

	
	router.add('/:table', new TablePage());
	
	router.on('route',function(route,params){
	    [].slice.call(document.querySelectorAll(".navbar-nav>li")).forEach((e)=>e.classList.remove("active"));
	    var selected = document.querySelector("ul.navbar-nav>li>a[href='" + location.hash + "']");
	    selected && selected.parentNode.classList.add("active");
	});
	router.start(true);
	console.log("App started.");
