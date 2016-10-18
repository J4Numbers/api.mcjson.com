import React from 'react';
import MetaEditor from './subeditor/MetaEditor.jsx';
import {ItemFlagEditor} from './subeditor/FlagEditor.jsx';
import get from 'gql/item/get.gql';

import getItem from '../gql/item/get.gql';
import setItem from '../gql/item/set.gql';
import addItem from '../gql/item/add.gql';

export default function ItemEditor(props) {
    return <div>
            <MetaEditor data={props.data} onChange={props.onChange} />
            <ItemFlagEditor data={props.data.flags} onChange={(data) => props.onChange(Object.assign({}, props.data, {flags: data}))} />
            <pre>{JSON.stringify(props.data, null,2)}</pre>
        </div>
}

