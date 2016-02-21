import React from 'react';
/**
*/

let versionData = [];

export function loadVersionData(){
    return fetch("/v1/versions").then((resp)=>resp.json()).then((d)=>{versionData = d.map((v)=>v.id)});
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