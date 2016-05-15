import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory, hashHistory } from 'react-router'

import TableList from './page/TableList.jsx';
import VersionEditor from './page/editor/VersionEditor.jsx';
import EnchantmentEditor from './page/editor/EnchantmentEditor.jsx';
import BlockEditor from './page/editor/BlockEditor.jsx';
import ItemEditor from './page/editor/ItemEditor.jsx'
import {loadVersionData} from './widget/Version.jsx';

import App from './app.jsx';

console.log("Preloading data");
function ReactDebug(props){
    return <pre>{JSON.stringify(props,null,2)}</pre>
}
loadVersionData().then(() => {
    console.log("App started.");
    ReactDOM.render(<Router history={hashHistory}>
        <Route path="/" component={App} >
            <Route path="/versions/:version" component={VersionEditor} />
            <Route path="/enchantments/:mod/:id" component={EnchantmentEditor} />
            <Route path="/blocks/:mod/:id" component={BlockEditor} />
            <Route path="/items/:mod/:id" component={ItemEditor} />
            <Route path="/:tableName" component={TableList} />
        </Route>
        
    </Router>, document.getElementById("app")
    );
});

