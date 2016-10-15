import React from 'react';

import {Version} from '../widget/Version.jsx';
/**
Add generic time fields for most records
*/
export class VersionData extends React.Component {
    constructor()
    {
        super();
        this._refs = {};
    }
    render(){
        return <div className="datetime">
        <div className="form-group">
        <label>Introduced at</label>
        <Version value={this.props.data.introduced_at} onChange={this.onUpdate('introduced_at')}/>
        </div>
        <div className="form-group">
        <label>Changed at</label>
        <Version value={this.props.data.changed_at}  onChange={this.onUpdate('changed_at')}/>
        </div>
        </div>
    }
    
    onUpdate(key){
        return (ev)=>{
            console.log(ev)
            this.props.onUpdate(
                Object.assign(
                    {},
                    this.props.data,
                    {
                        [key]: ev.target.value
                    }
                )
            );
        }
    } 
        
}