import React from 'react';
import {CommonData} from './CommonData.jsx';
import {VersionData} from './VersionData.jsx';
export class BaseEditor extends React.Component {
    constructor()
    {
        super();
        this._refs = {};
    }
    render(){
        return <div className="base-edit">
        <CommonData data={this.props.data} onUpdate={this.props.onUpdate}/>
        <div className="form-group">
        <label>Name</label>
        <input className="form-control" defaultValue={this.props.data.name}/>
        </div>
        <VersionData data={this.props.data} onUpdate={this.props.onUpdate}/>
        </div>
    }
}