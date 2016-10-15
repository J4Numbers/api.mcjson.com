import React from 'react';
/**
Common mod/id form
mod is locked for now
*/

export default function BlockFlagEditor(props) {
    return <div className="block-flag">
        <div className="checkbox">
            <label>
                <input
                    type="checkbox"
                    checked={props.data && props.data.physics}
                    onChange={() => {
                        props.onUpdate(
                            Object.assign({}, props.data, { physics: !props.data.physics })
                        )
                    } } /> Physics
                </label>
        </div>
        <div className="form-group">

            <label>Inventory slots: </label>
            <input
                type="number"
                min="0"
                value={props.data ? props.data.inventory_slots : 0}
                onChange={(ev) => {
                    props.onUpdate(
                        Object.assign({}, props.data,
                             { inventory_slots: ev.target.value })
                    )
                } } />
        </div>
    </div>
}