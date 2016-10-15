"use strict";
import update from 'react-addons-update'; 
import React from 'react';
import {BaseEditor} from './BaseEditor.jsx';
export default class MetaEditor extends React.Component {
    
    addMetaKey(gId){
        return ()=>{ 
            this.props.onChange(
                update(this.props.data,{
                    meta: { [gId] : {values: { $push: [{value:"",mask:0}] } } }
                })
            );
        }
    }
    updateMetaKey(gId, vId, key){
        return (ev)=>{ 
            var newValue = ev.target.value;
            console.log(gId, vId, key, newValue);
            this.props.onChange(
                update(this.props.data,{
                    meta: { [gId] : {values: { [vId]: { [key] : {$set: newValue} } } } }
                })
            );
        }
    }
    deleteMetaKey(gId, vId){
        return (ev)=>{ 
            var newValue = ev.target.value;
            this.props.onChange(
                update(this.props.data,{
                    meta: { [gId] : {values: { $splice:[[vId, 1]] } } }
                })
            );
        }
    }
    
    toggleTechnicalBlock(){
        this.props.onChange(
                update(this.props.data,{
                    technical: {$set: !this.props.data.technical}
                })
            );
    }
    
    setMetaName(gId){
         return (ev)=>{ 
            var newValue = ev.target.value;
            this.props.onChange(
                update(this.props.data,{
                    meta: { [gId] : {key: {$set:newValue} } }
                })
            );
        }
    }
    
    setMetaTechnical(gId){
        return (ev)=>{ 
            var newValue = ev.target.checked;
            this.props.onChange(
                update(this.props.data,{
                    meta: { [gId] : {technical: { $set: newValue } } }
                })
            );
        }
    }
    
    addNewMetaCategory(){
        this.props.onChange(
            update(this.props.data,{
                meta: { [Array.isArray(this.props.data.meta) ? "$push" : "$set"]  : [{key:"",values:[]}] } 
            })
        );
    }
    
    deleteMetaCategory(gId){
        return ()=>{
            this.props.onChange(
            update(this.props.data,{
                meta: { $splice : [[gId,1]] } 
            })
        );
        }
    }
    
    render(){
       
        
        return <div>
            <BaseEditor data={this.props.data} onChange={this.props.onChange}/>
            <div className="checkbox">
                <label>
                <input type="checkbox" checked={this.props.data.technical} onChange={this.toggleTechnicalBlock.bind(this)} /> Technical item/block
                </label>
            </div>
            <div className="meta-group">
            <h3>Metadata</h3>
            {this.props.data.meta ? this.props.data.meta.map((meta, gId)=>{
                return <div className="panel panel-default" key={gId}>
                        <div className="panel-heading">
                            <input value={meta.key} onChange={this.setMetaName(gId)}/>
                            <button className="btn btn-danger pull-right" onClick={this.deleteMetaCategory(gId)}>Remove</button>
                        </div>
                        <div className="panel-body">
                        <div className="checkbox">
                            <label>
                            <input type="checkbox" checked={meta.technical} onChange={this.setMetaTechnical(gId)} /> Technical meta (orientation etc)
                            </label>
                        </div>
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
                        <button className="btn btn-primary" onClick={this.addMetaKey(gId)}>Add new key</button>
                        </div>
                        </div>

            }): []}
            <button className="btn btn-primary" onClick={this.addNewMetaCategory.bind(this)}>Add meta</button>
            </div>
        </div> 
    }
        
}