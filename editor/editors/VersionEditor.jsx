"use strict";

import React from 'react';

export default class VersionEditor extends React.Component {
    constructor()
    {
        super();
        this._refs = {};
    }
    render(){
        return <div>
        <label htmlFor='type'>Type:</label>
        <select id='type' ref={(c)=>this._refs.type = c} defaultValue={this.props.data.type} onChange={this.onUpdate.bind(this)}>
        <option value="snapshot">Snapshot</option>
        <option value="release">Release</option>
        </select>
        <label>release:</label>
        <div className="datetime">
        <input type='date' defaultValue={this.props.data.released.substring(0,10)} ref={(c)=>this._refs.date = c} onChange={this.onUpdate.bind(this)}/>
        <input type='time' defaultValue={this.props.data.released.substring(11,16)} ref={(c)=>this._refs.time = c} onChange={this.onUpdate.bind(this)}/>
        </div>
        <pre>{JSON.stringify(this.props.data,null,2)}</pre>
        </div> 
    }
    
    onUpdate(){
        this.props.onUpdate(
            Object.assign(
                {},
                this.props.data,
                {
                    type: this._refs.type.options[this._refs.type.selectedIndex].value,
                    released: new Date(this._refs.date.value + " " + this._refs.time.value)
                }
            )
        );
        return true;
    }
        
}