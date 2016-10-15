import React from 'react';
import getVersions from 'gql/version/all.gql';
/**
*/

let versionData = [];

export function loadVersionData(){
    return getVersions().then(({versions})=>{versionData = versions.map((v)=>v.id)});
}

export class Version extends React.Component {
    constructor()
    {
        super();
        this._refs = {};
    }
    render(){
        return <select value={this.props.value} className="form-control" onChange={this.props.onChange}>
        <option key="N/A" value={null}></option>
          {versionData.map((v)=><option key={v} value={v}>{v}</option>)}
        </select>
    }
        
}