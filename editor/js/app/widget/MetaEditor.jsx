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
            {this.props.data.meta ? Object.keys(this.props.data.meta).map((key)=>{
                var metadata = this.props.data.meta[key];
                return <div className="panel panel-default" key={key}>
                        <div className="panel-heading">
                            <h3 className="panel-title">{key}</h3>
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
                        {Object.keys(metadata).map((name)=>{
                            return <tr key={name}>
                            <td>{name}</td>
                            <td>{metadata[name]}</td>
                            <td><button className="btn btn-danger">Delete</button></td>
                            </tr>
                        })}
                        </tbody>
                        </table>
                            <pre>{JSON.stringify(metadata,null,2)}</pre>
                        </div>
                        </div>

            }): []}
            </div>
        </div> 
    }
        
}