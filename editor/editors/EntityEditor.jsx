import React from 'react';
import {BaseEditor} from './common/BaseEditor.jsx';

export default function EntityEditor(props) {
    return <div>
            <BaseEditor value={props.value} onChange={props.onChange}/>
            <pre>{JSON.stringify(props.value, null,2)}</pre>
        </div>
}