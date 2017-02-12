import React from 'react';

import ObjectEditor from './ObjectEditor.jsx';
import ItemEditor from '../editors/ItemEditor.jsx';

import itemCreate from '../gql/item/add.gql';
import itemUpdate from '../gql/item/set.gql';
import itemFetch from '../gql/item/get.gql';

export default class ItemEditorPage extends React.Component {
    render() {
        return <ObjectEditor
            newModel={{
                mod:"minecraft",
                id: "",
                name:"",
                introduced_at:"",//TODO: pull latest version number
                changed_at:"",//TODO: pull latest version number
                meta:[],
                flags:{
                    isBlock: false
                },
                technical: false
            }}
            target={this.props.params}
            createFn={itemCreate}
            updateFn={itemUpdate}
            fetchFn={itemFetch}
            editor={ItemEditor}
        />
    }
}
