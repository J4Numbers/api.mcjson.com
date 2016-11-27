import React from 'react';

import ObjectEditor from './ObjectEditor.jsx';
import EntityEditor from '../editors/EntityEditor.jsx';

import entityCreate from '../gql/entity/add.gql';
import entityUpdate from '../gql/entity/set.gql';
import entityFetch from '../gql/entity/get.gql';

export default class EntityEditorPage extends React.Component{
    render(){
        console.log("P",this.props.params);
        return <ObjectEditor target={this.props.params} createFn={entityCreate} updateFn={entityUpdate} fetchFn={entityFetch} editor={EntityEditor}/>
    }
}
