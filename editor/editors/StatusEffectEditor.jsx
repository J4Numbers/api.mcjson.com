import React from 'react';
import {BaseEditor} from './common/BaseEditor.jsx';

export default function StatusEffectEditor(props) {
    return <div>
        <BaseEditor 
            value={props.value} 
            onChange={props.onChange} />
        <div className="form-group">
            <label>numeric id</label>
            <input className="form-control col-sm-2" type="number" min="0" step="1" value={ props.value.num_id } onChange={(ev)=>props.onChange(Object.assign({},props.value, { num_id: parseInt(ev.target.value) })) } />
        </div>
        <pre>{JSON.stringify(props.value, null, 2)}</pre>
    </div>
}