import React from 'react';
import {BaseEditor} from './common/BaseEditor.jsx';

export default function EntityEditor(props) {
    return <div>
            <BaseEditor data={props.data} onChange={props.onChange}/>
            <pre>{JSON.stringify(props.data, null,2)}</pre>
        </div>
}