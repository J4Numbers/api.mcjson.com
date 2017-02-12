import React from 'react';
import update from "immutability-helper";
/**
Common mod/id form
mod is locked for now
*/

export function CommonData(props){
    let bind = key => ({ value: props.data[key], onChange: ev => props.onChange(update(props.data, { [key]: {$set: ev.target.value} })) });
        return <div className="common-data">
        <div className="form-group">
            <label htmlFor="common-mod">mod</label>
            <input type="text" className="form-control" id="common-mod" {...bind("mod")} />
        </div>
        <div className="form-group">
            <label htmlFor="common-id">id</label>
            <input type="text" className="form-control" id="common-id" {...bind("id")} />
        </div>
        </div> 
    }
