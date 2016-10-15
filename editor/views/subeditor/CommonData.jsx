import React from 'react';
/**
Common mod/id form
mod is locked for now
*/

export class CommonData extends React.Component {
    constructor()
    {
        super();
        this._refs = {};
    }
    render(){
        return <div className="common-data">
        <div className="form-group">
            <label htmlFor="common-mod">mod</label>
            <input type="text" className="form-control" id="common-mod" ref={(c)=>this._refs.mod = c} value={this.props.data.mod} onChange={this.onUpdate.bind(this)} />
        </div>
        <div className="form-group">
            <label htmlFor="common-id">id</label>
            <input type="text" className="form-control" id="common-id" ref={(c)=>this._refs.id = c} value={this.props.data.id} onChange={this.onUpdate.bind(this)} />
        </div>
        </div> 
    }
    
    onUpdate(){
        this.props.onUpdate(
            Object.assign({},
            this.props.data,
            {
                id: this._refs.id.value,
                mod: this._refs.mod.value
            })
        )
    }    
}