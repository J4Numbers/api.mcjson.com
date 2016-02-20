"use strict";
import update from 'react-addons-update';
import React from 'react';
import {compare} from 'semver'; 

export default class TableList extends React.Component {
    constructor()
    {
        super();
        this.state = {
            filter: new RegExp(""),
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
    }
    render(){
        return <div>
        <input type="text" id="filter" onKeyUp={(ev)=>{
            console.log(ev.target.value);
        this.setState(
            update(
                this.state,
                {filter: {$set: new RegExp(ev.target.value)} }
            )
        );
        }}/>
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
    {this.props.entries
        .filter((e)=>this.state.filter.test(e.id))
        .concat()
        .sort(this.state.sortFn)
        .map((e)=>
            <tr key={`${this.props.tableName}-${e.mod}-${e.id}`}>
                <td>{e.mod}</td>
                <td>{e.id}</td>
                <td>{e.introduced_at}</td>
                <td>{e.changed_at}</td>
                <td><a href={"#/" + this.props.tableName + "/" + e.mod + "/" + e.id} className="btn btn-primary edit">Edit</a></td>
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