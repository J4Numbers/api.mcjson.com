import React from 'react';
import update from 'immutability-helper';
/**
# Is this item a block
  isBlock: Boolean!

  # Does this block obey physics (sand/gravel/anvil)
  physics: Boolean

  # Resistance to explosions
  hardness: Int

  # Does this block prevent piston movement
  unpushable: Boolean

  # Is this block transparent (no suffocate damage)
  transparent: Boolean
  # Light data
  light: BlockFlagsLight

  #Number of slots
  inventory_slots: Int
  
  # Amount of damage
  durability: Int

  # Item can be coloured
  dyeable: Boolean

  # Can be smashed in an anvil to fix it.
  repairable: Boolean

  # valid enchantments for this item
  enchantments: [Enchantment!]

  # Editors to use for this objects NBT data.
  editors: [NBTEditors!]
}

type BlockFlagsLight {
  # Amount of light emitted by block
  emit: Int

  # Amount of light that is dropped as it passes through this block
  decay: Int
}
*/

export function FlagCheckbox(props) {
    return <div className="form-group"><div className="checkbox">
        <label><input type="checkbox" checked={props.value || false} onChange={(ev) => { props.onChange(ev.target.checked ? true : undefined) }} /> {props.label}</label>
    </div></div>
}

export function FlagInt(props) {
    return <div className="form-group">
        <label>{props.label}: </label>
        <div className="input-group">
            <span className="input-group-addon">
                <input type="checkbox" onChange={(ev) => {
                    props.onChange(ev.target.checked ? 0 : undefined);
                }} checked={!(props.value == undefined)} />
            </span>
            <input className="form-control" readOnly={(props.value == undefined)} type="number" min="0" step="1" value={props.value || 0} onChange={(ev) => props.onChange(parseInt(ev.target.value))}
            />
        </div>
    </div>
}

function toggleArray(arr, val) {
    if (arr.indexOf(val) !== -1) {
        let a = arr.slice();
        a.splice(arr.indexOf(val), 1);
        return a;
    } else {
        return arr.concat([val]);
    }
}

export function BlockFlagEditor(props) {
    const upd = (data) => {
        props.onChange(update(props.data, data));
    }
    return <div className="block-flag">
        <FlagCheckbox label="Physics" value={props.data ? props.data.physics : false} onChange={c => upd({ physics: {$set: c } })} />
        <fieldset>
            <legend>
                <input
                    type="checkbox"
                    checked={props.data.inventory != undefined}
                    onChange={(ev) => {
                        upd({ inventory: {$set: ev.target.checked ? { slots: 0, type: "CHEST" } : undefined } })
                    }}
                />
                inventory
            </legend>
            <div className="form-group">
                <label>Slots: </label>
                <input
                className="form-control"
                readOnly={(props.data.inventory == undefined)}
                type="number"
                min="0"
                step="1"
                value={props.data.inventory ? props.data.inventory.slots : 0}
                onChange={(ev) => upd({inventory: {slots: {$set: parseInt(ev.target.value) } } })}
                    />
            </div>
            <div className="form-group">
                <label>Type: </label>
                <select
                className="form-control"
                readOnly={(props.data.inventory == undefined)}
                value={props.data.inventory ? props.data.inventory.type : ""}
                onChange={(ev) => upd({inventory: {type: {$set: ev.target.value } } })}
                >
                <option value="CHEST">Chest</option>
                <option value="DISPENSER">Dispenser</option>
                </select>
            </div>


        </fieldset>

    </div>
}

export function ItemFlagEditor(props) {
    const upd = (data) => props.onChange(Object.assign({}, props.data, data));
    return <div className="block-flag">
        <FlagInt label="Durability" value={props.data ? props.data.durability : 0} onChange={slots => upd({ durability: {$set: slots} })} />
        <ItemNBT value={(props.data && props.data.editors !== undefined ? props.data.editors : [])} onChange={editors => upd({ editors: {$set: editors } })} />
    </div>
}

function ItemNBT(props) {
    let bind = entry => ({ value: (props.value || []).indexOf(entry) !== -1, onChange: (v) => props.onChange(toggleArray(props.value || [], entry)) })
    return <fieldset>
        <legend>NBT data editors</legend>
        <FlagCheckbox label="Potion Effects" {...bind("POTION") } />
        <FlagCheckbox label="Book Contents" {...bind("BOOK") } />
        <FlagCheckbox label="Book Author" {...bind("AUTHOR") } />
        <FlagCheckbox label="Banner" {...bind("BANNER") } />
        <FlagCheckbox label="Firework" {...bind("FIREWORK") } />
    </fieldset>
}