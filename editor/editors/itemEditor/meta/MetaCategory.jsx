import React from "react";
import update from "immutability-helper";
import MetaEntry from "./MetaEntry.jsx";

export default function MetaCategory(props) {
    let {key, technical, values} = props.value;
    return <div className="panel panel-default">
        <div className="panel-heading">
            <input value={key} onChange={ev => props.onChange(update(props.value, { key: { $set: ev.target.value } }))} />
            <button className="btn btn-danger pull-right" onClick={() => props.onChange(null)}>Remove</button>
        </div>
        <div className="panel-body">
            <div className="checkbox">
                <label>
                    <input type="checkbox" checked={technical} onChange={ev => props.onChange(update(props.value, { technical: { $set: ev.target.checked } }))} /> Technical meta (orientation etc)
                            </label>
            </div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>value</th>
                        <th>Remove</th>
                    </tr>
                </thead>
                <tbody>
                    {values.map((kv, idx) => <MetaEntry key={idx} value={kv} onChange={
                        newEntry => {
                            if (newEntry == null) {
                                props.onChange(update(props.value, { values: { $slice: [[idx, 1]] } }))
                            } else {
                                props.onChange(update(props.value, { values: { [idx]: { $set: newEntry } } }))
                            }
                        }
                    } />)}
                </tbody>
            </table>
            <button className="btn btn-primary" onClick={ev => props.onChange(update(props.value, { values: { $push: { value: "", technical: false, mask: 0 } } }))}>Add new key</button>
        </div>
    </div>
}