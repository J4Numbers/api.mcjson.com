import React from "react";
import update from "immutability-helper";

export default function MetaEntry(props) {
    return <tr>
        <td style={{ width: "50%" }}>
            <input type="text" className="form-control" value={props.value.value} onChange={ ev => props.onChange(update(props.value,{ value: { $set: ev.target.value } })) } />
        </td>
        <td style={{ width: "25%" }}>
            <div className="input-group">
                <input className="form-control" type="text" value={props.value.mask} onChange={ ev => props.onChange(update(props.value,{ mask: { $set: parseInt(ev.target.value) } })) }/>
                <span className="input-group-addon">
                    <input type="checkbox" checked={props.value.technical} onChange={ ev=> props.onChange(update(props.value,{ technical: { $set: ev.target.checked } })) } />
                </span>
            </div>
        </td>
        <td style={{ width: "25%" }}
        ><button className="btn btn-danger" onClick={ () => props.onChange(null) }>Delete</button>
        </td>
    </tr>
}