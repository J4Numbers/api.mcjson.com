import React from 'react';
/**
 * @description Wraps the fetch/save logic of GQL calls
 * Props:
 * fetchFn - GQL function to fetch record
 * createFn - GQL function to create record 
 * updateFn - GQL function to update record
 * isNew - boolean to denote wether to call fetch on load
 * target - target parameters to pass to GQL fetch/update ({mod,id}). Leave empty to call update 
 * 
 * onCreate - Callback when createFn called
 * onUpdate - Callback when updateFn called
 */
export default class ObjectEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: props.newModel || {},
            isDirty: false,
            isNew: Object.keys(this.props.target).length == 0
        }
        if (!this.state.isNew) {
            this.props.fetchFn(this.props.target).then(d => {
                console.log("loaded",  d.data[0]);
                this.setState({ data: d.data[0] });
            });
        }
    }
    onSave() {
        if (this.state.isNew) {
            this.props.createFn(
                { data: this.state.data }
            ).then(d => {
                this.setState({ isDirty: false })
                return d.data;
            }).then(this.props.onCreate)
        }else {
            this.props.updateFn(
                { target: this.props.target, data: this.state.data }
            ).then(d => {
                this.setState({ isDirty: false })
                return d.data;
            }).then(this.props.onUpdate)
        }

    }
    render() {
        return <div>
            { React.createElement(this.props.editor, { data: this.state.data, onChange:(data) => { this.setState({ data: data, isDirty: true }) } }) }
            <button className="btn btn-primary" disabled={!this.state.isDirty} onClick={() => this.onSave()}>Save</button>
        </div>
    }
}