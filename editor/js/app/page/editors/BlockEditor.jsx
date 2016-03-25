import React from 'react';
import MetaEditor from '../../widget/MetaEditor.jsx';
export default class BlockEditor extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            isDirty: false,
            data: {}
        };
        this.fetch(props.params.mod,props.params.id);
    }
    fetch(mod, id){
        fetch(`/v1/blocks/${mod}/${id}`)
        .then((resp)=>{
            if(resp.status !== 200){
                throw new Error("Invalid file");
            }
            return resp.json();
        })
        .then((data)=>{
            this.setState({ data });
        })
    }
    componentWillReceiveProps(newProps){
        this.fetch(newProps.params.mod,newProps.params.id);
    }
    render(){
        return <div>
            <MetaEditor data={this.state.data} onUpdate={(n)=>{this.setState({isDirty:true, data:n})}}/>
            <button className="btn btn-primary" disabled={!this.state.isDirty} >Save</button>
        </div>
    }
}