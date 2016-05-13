"use strict";
import update from 'react-addons-update';
import React from 'react';
import {compare} from 'semver'; 

export default class TableList extends React.Component {
    constructor(props)
    {
        super(props);
        console.log("TBLPROPS", props);
        this.state = {
            entries: [],
            tableName: props.tableName,
            filter: new RegExp("","i"),
            sortFn: ()=>0
        };
        this.fltrRel = (a,b)=>compare(b.introduced_at,a.introduced_at);
        this.fltrChanged = (a,b)=>compare(b.changed_at,a.changed_at);
        this.fltrId = (a,b)=>{
            if(a.id > b.id){
                return 1
            }else if(a.id < b.id){
                return -1;
            }
            return 0;
        }
        this.fetchList(props.params.tableName);
    }
    fetchList(tableName){
        fetch(`/v1/${tableName}`)
        .then((resp)=>resp.json())
        .then((data)=>{
            this.setState({entries: data, tableName: tableName});
        });
    }
    componentWillReceiveProps(newProps){
        this.fetchList(newProps.params.tableName);
    }
    render(){
        return <div>
        <h3>{this.state.tableName}</h3>
        <input type="text" id="filter" placeholder="Filter data..." onKeyUp={(ev)=>{
        this.setState(
            update(
                this.state,
                {filter: {$set: new RegExp(ev.target.value,"i")} }
            )
        );
        }}/>
        {this.state.tableName ?
        (
            <a href={`#/${this.state.tableName}/_new`} className="btn btn-info">New {this.state.tableName.substr(0,this.state.tableName.length - 1)}</a>
        )    
            :
            null 
        }
         
    <table className="table">
    <thead>
    <tr>
    <th>Mod</th>
    <th onClick={this.filterHandler(this.fltrId)}>Id</th>
    <th onClick={this.filterHandler(this.fltrRel)}>Released</th>
    <th onClick={this.filterHandler(this.fltrChanged)}>Updated</th>
    <th>Edit</th>
    </tr>
    </thead>
    <tbody id="entries">
    {this.state.entries
        .filter((e)=>this.state.filter.test(e.id))
        .concat()
        .sort(this.state.sortFn)
        .map((e)=>
            <tr key={`${this.state.tableName}-${e.mod}-${e.id}`}>
                <td>{e.mod}</td>
                <td>{e.id}</td>
                <td>{e.introduced_at}</td>
                <td>{e.changed_at}</td>
                <td><a href={"#/" + this.state.tableName + "/" + e.mod + "/" + e.id} className="btn btn-primary edit">Edit</a></td>
            </tr>)
    }
    </tbody>
    </table>
        </div> 
    }
    
    filterHandler(hnd){
        return ()=>{
            let  flip = this.state.sortFn === hnd;
            console.log("CLUNK", flip ? "NORMAL" : "INVERT")
            console.log("CURRENT", this.state.sortFn);
            console.log("replacement",hnd);
            this.setState(
                update(this.state,
                { sortFn: {$set: ( flip ? function(a,b){return 0-hnd(a,b);} : hnd ) } }
                )
            )
        }
    }
        
}