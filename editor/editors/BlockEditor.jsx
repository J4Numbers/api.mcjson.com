import React from 'react';
import update from 'react-addons-update';
import MetaEditor from '../widget/MetaEditor.jsx';

import getBlock from '../gql/editors/getBlock.gql';
import setBlock from '../gql/editors/setBlock.gql';

export default class BlockEditor extends React.Component {

    constructor(props) {
        super(props);
        console.log("BLOCK EDITOR CREATED");
        this.state = {
            data: {},
            isDirty: false
        }
        getBlock({ mod: props.params.mod, id: props.params.id }).then((data) => {
            this.setState({ data: data.blocks[0] });
        })
    }
    componentWillReceiveProps(newProps) {
        getBlock({ mod: newProps.params.mod, id: newProps.params.id }).then((data) => {
            this.setState({ data: data.blocks[0] });
        });
    }
    onSave() {
        setBlock({oldId:{mod: this.props.params.mod, id: this.props.params.id}, newData: this.state.data}).then(()=>this.setState({isDirty:false}));
    }
    render() {
        return <div>
            <MetaEditor data={this.state.data} onUpdate={(data) => this.setState({ data: data, isDirty: true })} />
            <div className="checkbox">
                <label>
                    <input
                        type="checkbox"
                        checked={this.state.data.flags && this.state.data.flags.physics}
                        onChange={() => {
                            this.setState({
                                data: update(
                                    this.state.data,
                                    { flags: { physics: { $set: !this.state.data.flags.physics } } }
                                ),
                                isDirty: true
                            })
                        } } /> Physics
                </label>
            </div>
            <button className="btn btn-primary" disabled={!this.state.isDirty} onClick={this.onSave.bind(this)} >Save</button>
        </div>
    }
}