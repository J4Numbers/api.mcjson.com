import React from 'react';

import ObjectEditor from './ObjectEditor.jsx';
import EnchantmentEditor from '../editors/EnchantmentEditor.jsx';

import enchantmentCreate from '../gql/enchantment/add.gql';
import enchantmentUpdate from '../gql/enchantment/set.gql';
import enchantmentFetch from '../gql/enchantment/get.gql';

export default class EnchantmentEditorPage extends React.Component{
    render(){
        return <ObjectEditor target={this.props.params} createFn={enchantmentCreate} updateFn={enchantmentUpdate} fetchFn={enchantmentFetch} editor={EnchantmentEditor}/>
    }
}
