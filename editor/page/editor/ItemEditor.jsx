import React from 'react';
import MetaEditor from '../../widget/MetaEditor.jsx';
export default class ItemEditor extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            isDirty: false,
            data: {}
        };
        this.fetch(props.params.mod,props.params.id);
    }
    fetch(mod, id){
        fetch(`/v1/items/${mod}/${id}`)
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
    onSave(){
        console.log(this.state.data);
        fetch('/v1/items/',{
            method:'PUT',
            headers:{
                "content-type":"application/json"
            },
            body: JSON.stringify(this.state.data)
        }).then(()=>{
            this.setState({isDirty: false});
        })
       
    }
    render(){
        return <div>
            <MetaEditor data={this.state.data} onUpdate={(n)=>{this.setState({isDirty:true, data:n})}}/>
            <button className="btn btn-primary" disabled={!this.state.isDirty} onClick={this.onSave.bind(this)} >Save</button>
        </div>
    }
}