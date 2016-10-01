import React from 'react';
import {GQL} from '../gql.js';
/**
*/

let versionData = [];

export function loadVersionData(){
    return GQL(`query{ versions{id} }`)().then((d)=>{versionData = d.data.versions.map((v)=>v.id)});
}

export class Version extends React.Component {
    constructor()
    {
        super();
        this._refs = {};
    }
    render(){
        return <select value={this.props.value} className="form-control" onChange={this.props.onChange}>
          {versionData.map((v)=><option key={v} value={v}>{v}</option>)}
        </select>
    }
        
}