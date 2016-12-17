import React from 'react';
import MetaEditor from './common/MetaEditor.jsx';
import {ItemFlagEditor} from './common/FlagEditor.jsx';

export default function ItemEditor(props) {
    return <div>
            <MetaEditor data={props.data} onChange={props.onChange} />
            <ItemFlagEditor data={props.data.flags} onChange={(data) => props.onChange(Object.assign({}, props.data, {flags: data}))} />
            <pre>{JSON.stringify(props.data, null,2)}</pre>
        </div>
}

