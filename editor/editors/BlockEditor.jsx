import React from 'react';
import MetaEditor from './common/MetaEditor.jsx';
import { BlockFlagEditor } from './common/FlagEditor.jsx';

import getBlock from '../gql/block/get.gql';
import setBlock from '../gql/block/set.gql';
import addBlock from '../gql/block/add.gql';

export default function BlockEditor(props) {
    return <div>
        <MetaEditor 
            data={props.data} 
            onChange={props.onChange} />
        <BlockFlagEditor 
            data={props.data.flags || {}} 
            onChange={(newFlags) => props.onChange(Object.assign({}, props.data, { flags: newFlags })) } />
        <pre>{JSON.stringify(props.data, null, 2)}</pre>
    </div>
}