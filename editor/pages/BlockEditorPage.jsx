import React from 'react';

import ObjectEditor from './ObjectEditor.jsx';
import BlockEditor from '../editors/BlockEditor.jsx';

import blockCreate from '../gql/block/add.gql';
import blockUpdate from '../gql/block/set.gql';
import blockFetch from '../gql/block/get.gql';

export default class BlockEditorPage extends React.Component{
    render(){
        return <ObjectEditor target={this.props.params} createFn={blockCreate} updateFn={blockUpdate} fetchFn={blockFetch} editor={BlockEditor}/>
    }
}
