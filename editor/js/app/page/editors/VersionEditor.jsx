"use strict";

import React from 'react';

export default class VersionEditor extends React.Component {
    constructor()
    {
        super();
        _refs = {};
    }
    render(){
        return <div>
        <label for='type'>Type:</label>
        <select id='type' ref={(c)=>this._refs.type = c} onChange={this.onUpdate.bind(this)}>
        <option value="snapshot">Snapshot</option>
        <option value="release">Release</option>
        </select>
        <label>release:</label>
        <div className="datetime">
        <input type='date' ref={(c)=>this._refs.date = c} onChange={this.onUpdate.bind(this)}/>
        <input type='time' ref={(c)=>this._refs.time = c} onChange={this.onUpdate.bind(this)}/>
        </div>
        </div> 
    }
    
    onUpdate(){
        this.props.onUpdate({
           type: this._refs.type.options[this._refs.type.selectedIndex].value,
           released: new Date(this._refs.date.value + " " + this._refs.time.value)
        });
    }
        
}