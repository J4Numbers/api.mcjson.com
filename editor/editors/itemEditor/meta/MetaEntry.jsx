import React from "react";
import update from "immutability-helper";

export default function MetaEntry(props) {
    let metaValue = props.value;
    return <tr>
        <td style={{ width: "50%" }}>
            <input type="text" className="form-control" value={metaValue.value} onChange={ ev => props.onChange(update(metaValue,{ value: { $set: ev.target.value } })) } />
        </td>
        <td style={{ width: "25%" }}>
            <div className="input-group">
                <input className="form-control" type="text" value={metaValue.mask} onChange={ ev => props.onChange(update(metaValue,{ mask: { $set: parseInt(ev.target.value) } })) }/>
                <span className="input-group-addon">
                    <input type="checkbox" checked={metaValue.technical} onChange={ ev=> props.onChange(update(metaValue,{ technical: { $set: ev.target.checked } })) } />
                </span>
            </div>
        </td>
        <td style={{ width: "25%" }}
        ><button className="btn btn-danger" onClick={ () => props.onChange(null) }>Delete</button>
        </td>
    </tr>
}