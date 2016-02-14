import React from 'react';
import ReactDOM from 'react-dom';

import Router from 'mvc/Router';

import TableList from './page/TableList.jsx';
import VersionEditor from './page/editors/VersionEditor.jsx';

	var router = new Router();

	// router.add('/items/:mod/:id', new EntryPage( new Item(), ItemEditor ));
	// router.add('/blocks/:mod/:id', new EntryPage( new Block(), BlockEditor ));
	// router.add('/versions/:mod/:id', new EntryPage( new Version(), VersionEditor ));

    router.add('/versions/:version', function(ctx, next){
        return fetch('/v1/versions/minecraft/' + ctx.params.version)
        .then((resp) => resp.json())
        .then((data) => {
            ReactDOM.render(<VersionEditor data={data}  onUpdate={(e)=>console.log(e)} />, document.querySelector("#main"))
        });
    });
	
	router.add('/:table', function(ctx, next){
        return fetch('/v1/' + ctx.params.table)
        .then((resp) => resp.json())
        .then((data) => {
            ReactDOM.render(<TableList entries={data} tableName={ctx.params.table}/>, document.querySelector("#main"))
        });
    });
    

	
	router.on('route',function(route,params){
	    [].slice.call(document.querySelectorAll(".navbar-nav>li")).forEach((e)=>e.classList.remove("active"));
	    var selected = document.querySelector("ul.navbar-nav>li>a[href='" + location.hash + "']");
	    selected && selected.parentNode.classList.add("active");
	});
	router.start(true);
	console.log("App started.");
