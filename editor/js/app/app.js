import PageRouter from 'mvc/PageRouter';

import TablePage from './page/TablePage';
import EntryPage from './page/EntryPage';

import ItemEditor from './page/editors/ItemEditor';
import BlockEditor from './page/editors/BlockEditor';
import VersionEditor from './page/editors/VersionEditor';

import Item from './model/Item';
import Block from './model/Block';
import Version from './model/Version';

	var router = new PageRouter({region:'#main'});

	router.add('/items/:mod/:id', new EntryPage( new Item(), ItemEditor ));
	router.add('/blocks/:mod/:id', new EntryPage( new Block(), BlockEditor ));
	router.add('/versions/:mod/:id', new EntryPage( new Version(), VersionEditor ));

	
	router.add('/:table', new TablePage());
	
	router.on('route',function(route,params){
	    [].slice.call(document.querySelectorAll(".navbar-nav>li")).forEach((e)=>e.classList.remove("active"));
	    var selected = document.querySelector("ul.navbar-nav>li>a[href='" + location.hash + "']");
	    selected && selected.parentNode.classList.add("active");
	});
	router.start(true);
	console.log("App started.");
