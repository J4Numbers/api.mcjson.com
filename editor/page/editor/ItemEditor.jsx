import React from 'react';
import MetaEditor from '../../widget/MetaEditor.jsx';
import {loadData, saveData, setData, store } from './store.js';

let itemStore = store();

export default class ItemEditor extends React.Component {
    
    constructor(props){
        super(props);
        this.state = itemStore.getState();itemStore.subscribe(()=>{
            this.setState(itemStore.getState());
        })
        itemStore.dispatch(loadData(`/v1/items/${props.params.mod}/${props.params.id}`))
    }
    componentWillReceiveProps(newProps){
        itemStore.dispatch(loadData(`/v1/items/${props.params.mod}/${props.params.id}`))
    }
    onSave(){
        itemStore.dispatch(saveData());
    }
    render(){
        return <div>
            <MetaEditor data={this.state.data} onUpdate={(data)=>{ itemStore.dispatch(setData(data))}}/>
            <button className="btn btn-primary" disabled={!this.state.isDirty} onClick={this.onSave.bind(this)} >Save</button>
        </div>
    }
}