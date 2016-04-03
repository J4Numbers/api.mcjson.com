import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory, hashHistory } from 'react-router'

import TableList from './page/TableList.jsx';
import VersionEditor from './page/editors/VersionEditor.jsx';
import EnchantmentEditor from './page/editors/EnchantmentEditor.jsx';
import BlockEditor from './page/editors/BlockEditor.jsx';
import {loadVersionData} from './widget/Version.jsx';

import App from './app.jsx';

console.log("Preloading data");

loadVersionData().then(() => {
    console.log("App started.");
    ReactDOM.render(<Router history={hashHistory}>
        <Route path="/" component={App} >
            <Route path="/versions/:version" component={VersionEditor} />
            <Route path="/enchantments/:mod/:id" component={EnchantmentEditor} />
            <Route path="/blocks/:mod/:id" component={BlockEditor} />
            <Route path="/items/:mod/:id" component={BlockEditor} />
            <Route path="/about" component={null} />
            <Route path="/:tableName" component={TableList} />
        </Route>
        
    </Router>, document.getElementById("app")
    );
});
