let databases = require("../server/databases.js");
var fs = require("fs");

setTimeout( ()=>{
    databases.itemDB.data().forEach( d => {
        fs.stat(`./data/images/${d.flags && d.flags.isBlock ? "blocks" : "items"}/minecraft/${d.id}/0.png`, (err,foo) =>{
            if(err){
                console.log(d.flags && d.flags.isBlock ? "BLOCKS" : "ITEMS", d.id);
            }
        })
    })
},2000);
