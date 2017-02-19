import React from 'react';
import update from "immutability-helper";
import BaseEditor from './common/BaseEditor.jsx';
import VariantEditor from './common/VariantEditor.jsx';
import MetaEditor from './common/meta/index.jsx';
import { BlockFlagEditor, ItemFlagEditor, FlagCheckbox } from './common/FlagEditor.jsx';
import { Tabs, Tab } from "react-bootstrap";
export default function ItemEditor(props) {
    return <Tabs id="tabs" defaultActiveKey={1} >
        <Tab eventKey={1} title="General">
            <h3>General</h3>
            <BaseEditor data={props.data} onChange={props.onChange} />
            <FlagCheckbox label="Technical item/block" value={props.data.technical || false} onChange={(v) => props.onChange(update(props.data, { technical: { $set: !props.data.technical } }))} />
            <FlagCheckbox label="Is Block" value={props.data.flags.isBlock || false} onChange={(v) => props.onChange(update(props.data, { flags: { isBlock: { $set: !props.data.flags.isBlock } } }))} />
        </Tab>
        <Tab eventKey={2} title="Metadata">
            <h3>Metadata</h3>
            <MetaEditor data={props.data} onChange={props.onChange} />
        </Tab>
        <Tab eventKey={3} title="Variants">
            <h3>Variants</h3>
            <VariantEditor data={Object.assign({ variants: [] }, props.data)} onChange={props.onChange} />
        </Tab>
        <Tab eventKey={4} title="Details">
            <h3>Flags</h3>
            {
                props.data.flags.isBlock ?
                    <BlockFlagEditor data={props.data.flags} onChange={(data) => props.onChange(Object.assign({}, props.data, { flags: data }))} />
                    :
                    <ItemFlagEditor data={props.data.flags} onChange={(data) => props.onChange(Object.assign({}, props.data, { flags: data }))} />
            }
        </Tab>
        <Tab eventKey={5} title="Raw data">
            <h3>Raw JSON</h3>
            <pre>{JSON.stringify(props.data, null, 2)}</pre>
        </Tab>

    </Tabs>
}

