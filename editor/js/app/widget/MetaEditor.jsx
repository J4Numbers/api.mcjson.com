"use strict";
import update from 'react-addons-update'; 
import React from 'react';
import {BaseEditor} from './BaseEditor.jsx';
export default class MetaEditor extends React.Component {
    constructor()
    {
        super();
    }
    render(){
        return <div>
            <BaseEditor data={this.props.data} onUpdate={this.props.onUpdate}/>
            <div className="meta-group">
            {this.props.data.meta ? this.props.data.meta.map((meta)=>{
                return <div className="panel panel-default" key={meta.key}>
                        <div className="panel-heading">
                            <h3 className="panel-title">{meta.key}</h3>
                        </div>
                        <div className="panel-body">
                        <table className="table table-striped">
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>value</th>
                            <th>Remove</th>
                            </tr>
                            </thead>
                            <tbody>
                                {meta.values.map((kv)=>{
                            return <tr key={kv.value}>
                            <td>{kv.value}</td>
                            <td>{kv.mask}</td>
                            <td><button className="btn btn-danger">Delete</button></td>
                            </tr>
                        })}
                        </tbody>
                        </table>
                            <pre>{JSON.stringify(meta,null,2)}</pre>
                        </div>
                        </div>

            }): []}
            </div>
        </div> 
    }
        
}