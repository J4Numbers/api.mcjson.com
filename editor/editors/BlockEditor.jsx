import React from 'react';
import update from 'react-addons-update';
import MetaEditor from '../widget/MetaEditor.jsx';

import getBlock from '../gql/editors/getBlock.gql';
import setBlock from '../gql/editors/setBlock.gql';
import addBlock from '../gql/editors/addBlock.gql';

export default class BlockEditor extends React.Component {

    constructor(props) {
        super(props);
        console.log("BLOCK EDITOR CREATED", props.route.isNew);
        this.state = {
            data: {},
            isDirty: false,
            isNew: props.route.isNew
        }
        if(!this.state.isNew){
            getBlock({ mod: props.params.mod, id: props.params.id }).then((data) => {
                this.setState({ data: data.blocks[0] });
            })
        }
    }
    componentWillReceiveProps(newProps) {
        getBlock({ mod: newProps.params.mod, id: newProps.params.id }).then((data) => {
            this.setState({ data: data.blocks[0] });
        });
    }
    onSave() {
        (this.state.isNew ? addBlock({newData: this.state.data}) : setBlock({oldId:{mod: this.props.params.mod, id: this.props.params.id}, newData: this.state.data})).then((data)=>{
            this.setState({isDirty:false,isNew:false});
            if(location.hash!= `/blocks/${data.block.mod}/${data.block.id}`){ 
                location.hash = `/blocks/${data.block.mod}/${data.block.id}`;
            }

        });
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