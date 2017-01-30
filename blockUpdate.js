let databases = require("./server/databases.js");

setTimeout( ()=>{
    databases.itemDB.data().forEach( d => {
        let newData = Object.assign({}, d, {flags: Object.assign({}, d.flags)})
        databases.itemDB.save(newData);
    })
},2000);