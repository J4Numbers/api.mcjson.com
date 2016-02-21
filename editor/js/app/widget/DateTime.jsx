import React from 'react';

/**
 map ISO date to fields
*/
export class DateTime extends React.Component {
    constructor()
    {
        super();
        this._refs = {};
    }
    render(){
        return <div className="datetime">
        <input type='date' defaultValue={this.props.value.substring(0,10)} ref={(c)=>this._refs.date = c} onChange={this.onUpdate.bind(this)}/>
        <input type='time' defaultValue={this.props.value.substring(11,16)} ref={(c)=>this._refs.time = c} onChange={this.onUpdate.bind(this)}/>
        </div>
    }
    
    onUpdate(){
        this.props.onUpdate(
            new Date(this._refs.date.value + " " + this._refs.time.value)
        );
        
    }
        
}