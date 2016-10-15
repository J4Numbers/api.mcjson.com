import React from 'react';
import MetaEditor from './subeditor/MetaEditor.jsx';
import {BlockFlagEditor} from './subeditor/FlagEditor.jsx';

import getBlock from '../gql/block/get.gql';
import setBlock from '../gql/block/set.gql';
import addBlock from '../gql/block/add.gql';

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
            <MetaEditor data={this.state.data} onChange={(data) => this.setState({ data: data, isDirty: true })} />
            <BlockFlagEditor data={ this.state.data.flags || {} } onChange={ (newFlags)=>{ this.setState({isDirty: true, data: Object.assign({},this.state.data, {flags:newFlags } ) }) }  }/>
            <button className="btn btn-primary" disabled={!this.state.isDirty} onClick={this.onSave.bind(this)} >Save</button>
            <pre>{JSON.stringify(this.state.data, null,2)}</pre>
        </div>
    }
}