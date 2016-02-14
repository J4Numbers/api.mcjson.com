"use strict";

import React from 'react';

export default class TableList extends React.Component {
    constructor()
    {
        super();
        this.state = {filter:null};
    }
    render(){
        return <div>
        <input type="text" id="filter" onKeyUp={(ev)=>{
            console.log(ev.target.value);
        this.setState({
            filter: ev.target.value
        });
        }}/>
    <table className="table">
    <thead>
    <tr>
    <th>Mod</th>
    <th>Id</th>
    <th>Released</th>
    <th>Updated</th>
    <th>Edit</th>
    </tr>
    </thead>
    <tbody id="entries">
    {this.props.entries.filter((e)=>( !this.state.filter || e.mod.indexOf(this.state.filter) !== -1 || e.id.indexOf(this.state.filter) !== -1)).map((e)=><tr key={`${this.props.tableName}-${e.mod}-${e.id}`}>
      <td>{e.mod}</td>
      <td>{e.id}</td>
      <td>{e.introduced_at}</td>
      <td>{e.changed_at}</td>
      <td><a href={"#/" + this.props.tableName + "/" + e.mod + "/" + e.id} className="btn btn-primary edit">Edit</a></td>
    </tr>)}
    </tbody>
    </table>
        </div> 
    }
    
    onFilter(ev){
        
    }
        
}