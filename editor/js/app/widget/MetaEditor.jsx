"use strict";
import update from 'react-addons-update'; 
import React from 'react';
import {BaseEditor} from './BaseEditor.jsx';
export default class MetaEditor extends React.Component {
    
    updateMetaKey(gId, vId, key){
        return (ev)=>{ 
            var newValue = ev.target.value;
            console.log(gId, vId, key, newValue);
            this.props.onUpdate(
                update(this.props.data,{
                    meta: { [gId] : {values: { [vId]: { [key] : {$set: newValue} } } } }
                })
            );
        }
    }
    deleteMetaKey(gId, vId){
        return (ev)=>{ 
            var newValue = ev.target.value;
            this.props.onUpdate(
                update(this.props.data,{
                    meta: { [gId] : {values: { $splice:[[vId, 1]] } } }
                })
            );
        }
    }
    
    render(){
        return <div>
            <BaseEditor data={this.props.data} onUpdate={this.props.onUpdate}/>
            <div className="meta-group">
            {this.props.data.meta ? this.props.data.meta.map((meta, gId)=>{
                return <div className="panel panel-default" key={gId}>
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
                                {meta.values.map((kv, vId)=>{
                            return <tr key={`${gId}-${vId}`}>
                            <td><input type="text" value={kv.value} onChange={this.updateMetaKey(gId,vId, 'value')} /></td>
                            <td><input type="text" value={kv.mask} onChange={this.updateMetaKey(gId,vId, 'mask')} /></td>
                            <td><button className="btn btn-danger" onClick={this.deleteMetaKey(gId,vId)}>Delete</button></td>
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