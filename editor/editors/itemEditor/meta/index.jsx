"use strict";
import update from 'immutability-helper';
import React from 'react';
import MetaCategory from "./MetaCategory.jsx";

export default function MetaEditor(props) {
    return <div className="meta-group">
        {props.value.meta ? props.value.meta.map((meta, idx) => <MetaCategory key={idx} value={meta} onChange={
            newMeta => {
                if (newMeta == null) {
                    props.onChange(update(props.value, { meta: { $slice: [[idx, 1]] } }))
                } else {
                    props.onChange(update(props.value, { meta: { [idx]: { $set: newMeta } } }))
                }
            }
        } />) : []}
        <button className="btn btn-primary" onClick={() => {
            props.onChange(update(props.value, {
                meta: {
                    $push: {
                        key: "",
                        technical: false,
                        values: []
                    }
                }
            }))
        }}>Add meta</button>
    </div>

}

