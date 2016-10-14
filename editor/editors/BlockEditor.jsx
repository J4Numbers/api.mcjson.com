import React from 'react';
import update from 'react-addons-update';
import MetaEditor from '../widget/MetaEditor.jsx';

export default class BlockEditor extends React.Component {
    
    constructor(props){
        super(props);
        console.log("BLOCK EDITOR CREATED");
        this.state = {
            data: {}
        }
        //TODO: GQL to fetch block
    }
    componentWillReceiveProps(newProps){
        blockStore.dispatch(loadData(`/v1/blocks/${newProps.params.mod}/${newProps.params.id}`))
        //TODO: GQL to fetch block
    }
    onSave(){
        //TODO: GQL to save block
    }
    render(){
        return <div>
            <MetaEditor data={this.state.data} onUpdate={(data)=> {/* TODO UPDATE STATE */} }/>
            <div className="checkbox">
                <label>
                <input 
                    type="checkbox" 
                    checked={this.state.data.flags && this.state.data.flags.physics} 
                    onChange={ ()=>{ 
                        /* TODO UPDATE STATE */
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