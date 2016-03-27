var path = require('path');
var fs = require('fs');
var dataDir = path.normalize(process.cwd() + '/data/');
var fetch = require("fetch").fetchUrl;
console.log("Importing data from http://minecraft-ids.grahamedgecombe.com/");

fetch("http://minecraft-ids.grahamedgecombe.com/items.json", function(error, meta, body){
	var blockItemData = JSON.parse(body);
});