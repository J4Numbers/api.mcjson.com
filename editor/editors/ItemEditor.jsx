import React from 'react';
import MetaEditor from '../widget/MetaEditor.jsx';
import {loadData, saveData, setData, store } from './store.js';

let itemStore = store();

export default class ItemEditor extends React.Component {

    constructor(props) {
        super(props);
        this.state = itemStore.getState(); itemStore.subscribe(() => {
            this.setState(itemStore.getState());
        })
        itemStore.dispatch(loadData(`/v1/items/${props.params.mod}/${props.params.id}`))
    }
    componentWillReceiveProps(newProps) {
        itemStore.dispatch(loadData(`/v1/items/${props.params.mod}/${props.params.id}`))
    }
    onSave() {
        itemStore.dispatch(saveData());
    }
    render() {
        return <div>
            <MetaEditor data={this.state.data} onUpdate={(data) => { itemStore.dispatch(setData(data)) } }/>
            <FlagEditor data={this.state.data.flags} onChange={ data => itemStore.dispatch(setData(Object.assign({}, this.state.data, { flags: data }))) }/>
            <button className="btn btn-primary" disabled={!this.state.isDirty} onClick={this.onSave.bind(this) } >Save</button>
            <pre>
                {JSON.stringify(this.state.data, null, 2) }
            </pre>
        </div>
    }
}

function flagEntry(props) {

}
class FlagEditor extends React.Component {
    getFlags() {
        return this.props.data || {};
    }
    render() {
        return <div className="flags">
            <h3>Flags</h3>
            <label>Has durability</label>
            <div className="input-group">
                <span className="input-group-addon">
                    <input type="checkbox" onChange={(ev) => {
                        this.props.onChange(Object.assign({}, this.getFlags(), { durability: ev.target.checked ? 0 : undefined }));
                    } } value={ !(this.getFlags().durability == undefined) }/>
                </span>
                <input className="form-control" readOnly={ (this.getFlags().durability == undefined) } type="number" min="0" step="1" value={this.getFlags().durability} onChange={(ev) => {
                    this.props.onChange(
                        Object.assign(
                            {},
                            this.getFlags(),
                            {
                                durability: parseInt(ev.target.value)
                            }
                        )
                    )
                } }
                    />
            </div>
            <label>Has container</label>
            <div className="input-group">
                
                <span className="input-group-addon">
                    <input type="checkbox" onChange={(ev) => {
                            this.props.onChange(Object.assign({}, this.getFlags(), { container: ev.target.checked ? 0 : undefined }));
                    } } value={ !(this.getFlags().container == undefined) }/>
                </span>
                <input className="form-control" readOnly={ (this.getFlags().container == undefined) } type="number" min="0" step="1" value={this.getFlags().container} onChange={(ev) => {
                    this.props.onChange(
                        Object.assign(
                            {},
                            this.getFlags(),
                            {
                                container: parseInt(ev.target.value)
                            }
                        )
                    )
                } }
                    />
            </div>

            <label>Potion Effects</label>
            <div className="input-group">
                    <input type="checkbox" onChange={(ev) => {
                            this.props.onChange(Object.assign({}, this.getFlags(), { potion: ev.target.checked ? true : undefined }));
                    } } value={"potion" in this.getFlags() }/>
            </div>

            <label>Book contents</label>
            <div className="input-group">
                    <input type="checkbox" onChange={(ev) => {
                            this.props.onChange(Object.assign({}, this.getFlags(), { book_contents: ev.target.checked ? true : undefined }));
                    } } value={"book_contents" in this.getFlags() }/>
            </div>

            <label>Book Author</label>
            <div className="input-group">
                    <input type="checkbox" onChange={(ev) => {
                            this.props.onChange(Object.assign({}, this.getFlags(), { book_author: ev.target.checked ? true : undefined }));
                    } } value={"book_author" in this.getFlags() }/>
            </div>

            <label>Banner</label>
            <div className="input-group">
                    <input type="checkbox" onChange={(ev) => {
                            this.props.onChange(Object.assign({}, this.getFlags(), { banner: ev.target.checked ? true : undefined }));
                    } } value={"banner" in this.getFlags() }/>
            </div>

            <label>Firework</label>
            <div className="input-group">
                    <input type="checkbox" onChange={(ev) => {
                            this.props.onChange(Object.assign({}, this.getFlags(), { firework: ev.target.checked ? true : undefined }));
                    } } value={"firework" in this.getFlags() }/>
            </div>

        </div>
    }
}