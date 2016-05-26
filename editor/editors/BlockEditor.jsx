import React from 'react';
import update from 'react-addons-update';
import MetaEditor from '../widget/MetaEditor.jsx';

import {loadData, saveData, setData, store } from './store.js';

let blockStore = store();


export default class BlockEditor extends React.Component {
    
    constructor(props){
        super(props);
        console.log("BLOCK EDITOR CREATED");
        this.state = blockStore.getState();
        blockStore.subscribe(()=>{
            this.setState(blockStore.getState());
        })
        blockStore.dispatch(loadData(`/v1/blocks/${props.params.mod}/${props.params.id}`))
    }
    componentWillReceiveProps(newProps){
        blockStore.dispatch(loadData(`/v1/blocks/${newProps.params.mod}/${newProps.params.id}`))
    }
    onSave(){
        blockStore.dispatch(saveData());
    }
    render(){
        return <div>
            <MetaEditor data={this.state.data} onUpdate={(data)=>{ blockStore.dispatch(setData(data))}}/>
            <div className="checkbox">
                <label>
                <input 
                    type="checkbox" 
                    checked={this.state.data.flags.physics} 
                    onChange={ ()=>{ 
                        blockStore.dispatch(setData(update(
                            this.state.data,
                            { flags: {physics: {$set: !this.state.data.flags.physics }} }
                        )))
                    } } /> Physics
                </label>
            </div>
            <button className="btn btn-primary" disabled={!this.state.isDirty} onClick={this.onSave.bind(this)} >Save</button>
        </div>
    }
}