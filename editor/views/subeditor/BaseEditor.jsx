import React from 'react';
import {CommonData} from './CommonData.jsx';
import {VersionData} from './VersionData.jsx';
import update from 'react-addons-update';
export class BaseEditor extends React.Component {
    constructor()
    {
        super();
        this._refs = {};
    }
    render(){
        return <div className="base-edit">
        <CommonData data={this.props.data} onChange={this.props.onChange}/>
        <div className="form-group">
        <label>Name</label>
        <input className="form-control" value={this.props.data.name} onChange={(e)=>{
            this.props.onChange(
                update(this.props.data,{
                    name: {$set: e.target.value}
                })
            )
        }}/>
        </div>
        <VersionData data={this.props.data} onChange={this.props.onChange}/>
        </div>
    }
}