import React from 'react';
import update from "immutability-helper";
import BaseEditor from './common/BaseEditor.jsx';
import MetaEditor from './common/meta/index.jsx';
import { ItemFlagEditor, FlagCheckbox } from './common/FlagEditor.jsx';
import { Tabs, Tab } from "react-bootstrap";
export default function ItemEditor(props) {
    return <Tabs id="tabs" defaultActiveKey={1} >
        <Tab eventKey={1} title="General">
            <h3>General</h3>
            <BaseEditor data={props.data} onChange={props.onChange} />
            <div className="form-group">
                <div className="checkbox">
                    <label>
                        <input
                            type="checkbox"
                            checked={props.data.technical}
                            onChange={ev => props.onChange(update(props.data, { technical: { $set: ev.target.checked } }))}
                        /> Technical item/block
            </label>
                </div>
            </div>
        </Tab>
        <Tab eventKey={2} title="Metadata">
            <h3>Metadata</h3>
            <MetaEditor data={props.data} onChange={props.onChange} />
            
        </Tab>
        <Tab eventKey={3} title="Details">
            <h3>Flags</h3>
            <ItemFlagEditor data={props.data.flags} onChange={(data) => props.onChange(Object.assign({}, props.data, { flags: data }))} />
        </Tab>
        <pre>{JSON.stringify(props.data, null, 2)}</pre>
    </Tabs>
}

