import React from 'react';
import update from "immutability-helper";

/**
 * Finds the matching value in variantValue bitmask
*/
function uncombineVariantValue(values, variantValue) {
    let mask = values.reduce((a, b) => (a | b), 0);
    return values.find(v => (v & mask) == variantValue);
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
                    {props.data.meta.map(metaType => (<th key={metaType.key}>
                        {metaType.key}
                        &nbsp;<a
                            href="#"
                            onClick={(ev) => {
                                ev.preventDefault();
                                upd({
                                    $push: metaType.values.map(e => ({ label: `${e.value} ${props.data.name}`, value: e.mask }))
                                });

                            }}
                        >Generate</a>
                    </th>))}

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
                                <select
                                    className="form-control"
                                    value={uncombineVariantValue(metaType.values.map(mv => mv.mask), v.value)}
                                    onChange={
                                        ev => {
                                            let oldValue = uncombineVariantValue(metaType.values.map(mv => mv.mask), v.value);
                                            upd({
                                                [idx]: {
                                                    value: { $set: (v.value - oldValue) + parseInt(ev.target.value) }
                                                }
                                            })
                                        }
                                    }>
                                    {metaType.values.map(e => (<option key={e.mask} value={e.mask} >{e.value}</option>))}
                                </select>
                            </td>
                        ))}
                        <td><button 
                        type="button" 
                        className="btn btn-danger"
                        onClick={()=>{
                            upd({
                                $splice: [[idx, 1]]
                            })
                        }}
                        >&times;</button></td>
                    </tr>
                ))}
            </tbody>
        </table>
        <button className="btn btn-primary" onClick={() => upd({ $push: [{ label: "", value: 0 }] })}>Add</button>
        <pre>{JSON.stringify(props.data.variants, null, 2)}</pre>
    </div>
}