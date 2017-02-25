import React from 'react';
import { CommonData } from './CommonData.jsx';
import { VersionData } from './VersionData.jsx';
import update from 'immutability-helper';
export default function BaseEditor(props) {
    return <div className="base-edit">
        <CommonData value={props.value} onChange={props.onChange} />
        <div className="form-group">
            <label>Name</label>
            <input className="form-control" value={props.value.name || ""} onChange={(e) => {
                props.onChange(
                    update(props.value, {
                        name: { $set: e.target.value }
                    })
                )
            }} />
        </div>
        <VersionData value={props.value} onChange={props.onChange} />
    </div>
}