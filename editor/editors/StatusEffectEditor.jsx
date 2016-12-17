import React from 'react';
import {BaseEditor} from './common/BaseEditor.jsx';

export default function StatusEffectEditor(props) {
    return <div>
        <BaseEditor 
            data={props.data} 
            onChange={props.onChange} />
        <div className="form-group">
            <label>numeric id</label>
            <input className="form-control col-sm-2" type="number" min="0" step="1" value={ props.data.num_id } onChange={(ev)=>props.onChange(Object.assign({},props.data, { num_id: parseInt(ev.target.value) })) } />
        </div>
        <pre>{JSON.stringify(props.data, null, 2)}</pre>
    </div>
}