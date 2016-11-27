var fs = require("fs");

fs.readdir("./data/blocks/minecraft", function(err, results){
    results.forEach( result => {
        let name = result.split(".")[0];
        fs.stat(`./data/images/blocks/minecraft/${name}/0.png`, (err,foo) =>{
            if(err){
                console.log("BLOCK", name);
            }
        })
    });
});

fs.readdir("./data/items/minecraft", function(err, results){
    results.forEach( result => {
        let name = result.split(".")[0];
        fs.stat(`./data/images/items/minecraft/${name}/0.png`, (err,foo) =>{
            if(err){
                console.log("ITEM", name);
            }
        })
    });
});