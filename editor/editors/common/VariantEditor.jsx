import React from 'react';
import update from "immutability-helper";

function uncombineVariantValue(values, variantValue) {
    return values.find(v => (v & variantValue) == variantValue) || 0;
}

export default function VariantEditor(props) {
    let upd = (spec) => {
        props.onChange(
            update(
                props.data,
                { variants: spec }
            )
        );
    }
    return <div>
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Label</th>
                    {props.data.meta.map(metaType => (<th key={metaType.key}>{metaType.key}</th>))}
                    <th>Remove</th>
                </tr>
            </thead>
            <tbody>
                {props.data.variants.map((v, idx) => (
                    <tr key={idx}>
                        <td>
                            <input className="form-control" type="text" value={v.label} onChange={ev => {
                                upd({ [idx]: { label: { $set: ev.target.value } } })
                            }} />
                        </td>
                        {props.data.meta.map(metaType => (
                            <td key={metaType.key}>
                                {JSON.stringify({
                                    values: metaType.values.map(mv => mv.mask),
                                    value: v.value,
                                    res: uncombineVariantValue(metaType.values.map(mv => mv.mask), v.value)
                                })}
                                <select
                                    className="form-control"
                                    onChange={
                                        ev => {
                                            upd({
                                                [idx]: {
                                                    value: { $set: 0 /* COMPUTE REMOVAL OF OLD VALUE, AND ADD NEW VALUE HERE */ }
                                                }
                                            })
                                        }
                                    }>
                                    {metaType.values.map(e => (<option key={e.mask} value={e.mask} >{e.value} - {v.value & e.mask == e.mask ? "YES":"NO"}</option>))}
                                </select>
                            </td>
                        ))}
                        <td><button type="button" className="btn btn-danger">&times;</button></td>
                    </tr>
                ))}
            </tbody>
        </table>
        <button className="btn btn-primary" onClick={() => upd({ $push: [{ label: "", value: 0 }] })}>Add</button>
        <pre>{JSON.stringify(props.data.variants, null, 2)}</pre>
    </div>
}