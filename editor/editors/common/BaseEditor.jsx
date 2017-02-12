import React from 'react';
import { CommonData } from './CommonData.jsx';
import { VersionData } from './VersionData.jsx';
import update from 'immutability-helper';
export function BaseEditor(props) {
    return <div className="base-edit">
        <CommonData data={props.data} onChange={props.onChange} />
        <div className="form-group">
            <label>Name</label>
            <input className="form-control" value={props.data.name || ""} onChange={(e) => {
                props.onChange(
                    update(props.data, {
                        name: { $set: e.target.value }
                    })
                )
            }} />
        </div>
        <VersionData data={props.data} onChange={props.onChange} />
    </div>
}