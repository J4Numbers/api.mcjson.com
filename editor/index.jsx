import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory, hashHistory } from 'react-router'

import TableList from './views/TableList.jsx';
import VersionEditor from './views/VersionEditor.jsx';
import EnchantmentEditor from './views/EnchantmentEditor.jsx';
import BlockEditor from './views/BlockEditor.jsx';
import ItemEditor from './views/ItemEditor.jsx'
import {loadVersionData} from './views/widget/Version.jsx';

import App from './app.jsx';

loadVersionData().then(() => {
    ReactDOM.render(<Router history={hashHistory}>
        <Route path="/" component={App} >
            <Route path="/versions/:version" component={VersionEditor} />
            <Route path="/enchantments/:mod/:id" component={EnchantmentEditor} />
            <Route path="/blocks/:mod/:id" component={BlockEditor} />
            <Route path="/blocks/_new" isNew={true} component={BlockEditor} />
            <Route path="/items/:mod/:id" component={ItemEditor} />
            <Route path="/items/_new" isNew={true} component={ItemEditor} />
            <Route path="/:tableName" component={TableList} />
        </Route>
        
    </Router>, document.getElementById("app")
    );
});

