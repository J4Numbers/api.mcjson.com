import React from 'react';
import MetaEditor from './subeditor/MetaEditor.jsx';
import {ItemFlagEditor} from './subeditor/FlagEditor.jsx';
import get from 'gql/item/get.gql';

import getItem from '../gql/item/get.gql';
import setItem from '../gql/item/set.gql';
import addItem from '../gql/item/add.gql';

export default class ItemEditor extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: {},
            isDirty: false,
            isNew: props.route.isNew
        }
        if(!this.state.isNew){
            getItem({ mod: props.params.mod, id: props.params.id }).then((data) => {
                this.setState({ data: data.items[0] });
            })
        }
    }
    componentWillReceiveProps(newProps) {
        if(!props.route.isNew){
        getItem({ mod: newProps.params.mod, id: newProps.params.id }).then((data) => {
            this.setState({ data: data.items[0] });
        });
        }else{
            this.setState({ data: {} });
        }
    }
    onSave() {
        (this.state.isNew ? addItem({newData: this.state.data}) : setItem({oldId:{mod: this.props.params.mod, id: this.props.params.id}, newData: this.state.data})).then((data)=>{
            this.setState({isDirty:false,isNew:false});
            if(location.hash!= `/items/${data.item.mod}/${data.item.id}`){ 
                location.hash = `/items/${data.item.mod}/${data.item.id}`;
            }

        });
    }
    render() {
        return <div>
            <MetaEditor data={this.state.data} onChange={(data) => this.setState({ data: data, isDirty: true })} />
            <ItemFlagEditor data={this.state.data.flags} onChange={(data) => this.setState({ data: Object.assign({}, this.state.data, {flags: data}), isDirty: true })} />
            <button className="btn btn-primary" disabled={!this.state.isDirty} onClick={this.onSave.bind(this)} >Save</button>
            <pre>{JSON.stringify(this.state.data, null,2)}</pre>
        </div>
    }
}

