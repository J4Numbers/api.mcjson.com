"use strict";
import update from 'immutability-helper'; 
import React from 'react';
import {BaseEditor} from './common/BaseEditor.jsx';
export default function EnchantmentEditor(props){
        return <div>
        <BaseEditor value={props.value} onChange={props.onChange}/>
        <div className="form-group">
            <label>numeric id</label>
            <input className="form-control col-sm-2" type="number" min="0" step="1" value={ props.value.num_id } onChange={(ev)=>props.onChange(Object.assign({},props.value, { num_id: parseInt(ev.target.value) })) } />
        </div>
        <div className="form-group">
            <label>Level</label>
            <select className="form-control col-sm-2" value={props.value.level} onChange={(ev)=>props.onChange(Object.assign({},props.value, { level: parseInt(ev.target.value) })) } >
              {["I","II","III","IV","V"].map((e,i)=>{
                  return <option key={i} value={i+1}>{e}</option>
              })}
            </select>
        </div>
        </div> 
    } 