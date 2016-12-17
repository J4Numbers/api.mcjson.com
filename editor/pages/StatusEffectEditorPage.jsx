import React from 'react';

import ObjectEditor from './ObjectEditor.jsx';
import StatusEffectEditor from '../editors/StatusEffectEditor.jsx';

import statusEffectCreate from '../gql/effect/add.gql';
import statusEffectUpdate from '../gql/effect/set.gql';
import statusEffectFetch from '../gql/effect/get.gql';

export default class StatusEffectEditorPage extends React.Component{
    render(){
        return <ObjectEditor target={this.props.params} createFn={statusEffectCreate} updateFn={statusEffectUpdate} fetchFn={statusEffectFetch} editor={StatusEffectEditor}/>
    }
}
