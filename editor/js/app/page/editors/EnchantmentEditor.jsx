"use strict";
import update from 'react-addons-update'; 
import React from 'react';
import {BaseEditor} from '../../widget/BaseEditor.jsx';
export default class EnchantmentEditor extends React.Component {
    constructor()
    {
        super();
        this._refs = {};
        this.state = {
            isDirty: false,
            data: {}
        }
    }
    componentWillMount(){
        this.setState(
            update(this.state, {
                data: {$set: this.props.data}
            })
        )
    }
    render(){
        console.log("RNDR", this.state.data);
        return <div>
        <a href="#/enchantments/">Back to enchantments</a>
        <BaseEditor data={this.state.data} onUpdate={this.onUpdate.bind(this)}/>
        <div className="form-group">
            <label>Level</label>
            <select className="form-control col-sm-2" ref={(c)=>this._refs.mod = c} selected={this.state.data.level} onChange={(ev)=>{
                this.setState(
                    update(this.state,{
                        isDirty: {$set: true},
                        data: { level: {$set: ev.target.value} }
                    })
                )
            }} >
              {["I","II","III","IV","V"].map((e,i)=>{
                  return <option value={i+1}>{e}</option>
              })}
            </select>
        </div>
        <button disabled={!this.state.isDirty} className="btn btn-primary" onClick={this.save.bind(this)}>Save</button>
        </div> 
    }
    
    onUpdate(data){
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
            console.log(e);
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