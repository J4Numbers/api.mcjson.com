import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory, hashHistory } from 'react-router'

import TableList from './editors/TableList.jsx';
// import VersionEditor from './views/VersionEditor.jsx';
 import EnchantmentEditorPage from './pages/EnchantmentEditorPage.jsx';
import BlockEditorPage from './pages/BlockEditorPage.jsx';
import ItemEditorPage from './pages/ItemEditorPage.jsx';
import EntityEditorPage from './pages/EntityEditorPage.jsx';
import {loadVersionData} from './editors/widget/Version.jsx';

import App from './app.jsx';

loadVersionData().then(() => {
    ReactDOM.render(<Router history={hashHistory}>
        <Route path="/" component={App} >
            {/*<Route path="/versions/:version" component={VersionEditor} />*/}
            <Route path="/enchantments/:mod/:id" component={EnchantmentEditorPage} />
            <Route path="/blocks/:mod/:id" component={BlockEditorPage} />
            <Route path="/blocks/_new" component={BlockEditorPage} />
            <Route path="/items/:mod/:id" component={ItemEditorPage} />
            <Route path="/items/_new" isNew={true} component={ItemEditorPage} />
            <Route path="/entities/:mod/:id" component={EntityEditorPage} />
            <Route path="/entities/_new" isNew={true} component={EntityEditorPage} />
            <Route path="/:tableName" component={TableList} />
        </Route>
        
    </Router>, document.getElementById("app")
    );
});

