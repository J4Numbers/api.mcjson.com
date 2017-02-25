import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, hashHistory } from 'react-router'

import TableList from './editors/TableList.jsx';
 import EnchantmentEditorPage from './pages/EnchantmentEditorPage.jsx';
import {ItemCreatePage, ItemEditPage} from './editors/itemEditor';
import EntityEditorPage from './pages/EntityEditorPage.jsx';
import StatusEffectEditorPage from './pages/StatusEffectEditorPage.jsx';
import {loadVersionData} from './editors/common/Version.jsx';

import App from './app.jsx';

loadVersionData().then(() => {
    ReactDOM.render(<Router history={hashHistory}>
        <Route path="/" component={App} >
            <Route path="/enchantments/:mod/:id" component={EnchantmentEditorPage} />
            <Route path="/items/:mod/:id" component={ItemEditPage} />
            <Route path="/items/_new" component={ItemCreatePage} />
            <Route path="/entities/:mod/:id" component={EntityEditorPage} />
            <Route path="/entities/_new" component={EntityEditorPage} />

            <Route path="/effects/:mod/:id" component={StatusEffectEditorPage} />
            <Route path="/effects/_new" component={StatusEffectEditorPage} />

            <Route path="/:tableName" component={TableList} />
        </Route>
        
    </Router>, document.getElementById("app")
    );
});

