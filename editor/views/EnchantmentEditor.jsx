"use strict";
import update from 'react-addons-update'; 
import React from 'react';
import {BaseEditor} from './subeditor/BaseEditor.jsx';
export default class EnchantmentEditor extends React.Component {
    constructor(props)
    {
        super(props);
        alert("TODO: BORKED.");
        this.state = {
            isDirty: false,
            data: {}
        }
        this.fetch(props.params.mod, props.params.id);
        
    }
    fetch(mod,id){
        fetch(`/v1/enchantments/${mod}/${id}`)
        .then((resp)=>{
            if(resp.status !== 200){
                throw new Error("Invalid file");
            }
            return resp.json();
        })
        .then((data)=>{
            this.setState({ data });
        })
    }
    componentWillReceiveProps(newProps){
        this.fetch(newProps.params.mod,newProps.params.id);
    }
    render(){
        return <div>
        <a href="#/enchantments/">Back to enchantments</a>
        <BaseEditor data={this.state.data} onChange={this.onChange.bind(this)}/>
        <div className="form-group">
            <label>numeric id</label>
            <input className="form-control col-sm-2" type="number" min="0" step="1" value={ this.state.data.num_id || 0 } onChange={(ev)=>{
                this.setState(
                    update(this.state,{
                        isDirty: {$set: true},
                        data: { num_id: {$set: parseInt(ev.target.value) } }
                    })
                )
            }} />
        </div>
        <div className="form-group">
            <label>Level</label>
            <select className="form-control col-sm-2" selected={this.state.data.level} onChange={(ev)=>{
                this.setState(
                    update(this.state,{
                        isDirty: {$set: true},
                        data: { level: {$set: parseInt(ev.target.value) } }
                    })
                )
            }} >
              {["I","II","III","IV","V"].map((e,i)=>{
                  return <option key={i} value={i+1}>{e}</option>
              })}
            </select>
        </div>
        <button disabled={!this.state.isDirty} className="btn btn-primary" onClick={this.save.bind(this)}>Save</button>
        </div> 
    }
    
    onChange(data){
        this.setState(
            update(this.state,{
                isDirty: {$set: true},
                data: {$set: data}
            })
        )
    }
    save(){
        fetch("/v1/enchantments",{
            credentials:'include',
            method:"PUT",
            headers:{"content-type":"application/json"},
            body: JSON.stringify(Object.assign({introduced_at:"1.0.0",changed_at:"1.0.0"},this.state.data))
        }).then((e)=>{
            this.setState(
            update(this.state,{
                isDirty: {$set: false}
            })
        )
        },function(err){
            alert(err);
        })
    }
        
}