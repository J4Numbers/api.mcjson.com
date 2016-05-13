var express = require('express');
var semver = require('semver');
var bodyParser = require('body-parser');
var path = require('path');
var fs = require('fs');
var readdir = require("readdir-plus");
var mkdirp = require("mkdirp");

module.exports = function (opts) {
	var baseDir = opts.dir; //Directory to search in
	var delDir = opts.delDir; //Directory to move files to when deleted.
	var enabledModId = opts.enabledModId; //Enable /mod and /mod/id routes
	var enableSave = opts.enableSave; //Enable saving files
	var fileNameGen = opts.fileNameGen || ((d) => `${d.mod}/${d.id}.json`); //File name generator to use
	var struct = opts.struct; //Structure to use when filtering
	var entries = [];

	//Read the database
	readdir(baseDir, { content: true }, function (err, files) {
		entries = files
			.filter((e) => e.type == "file")
			.map((e) => {
				console.log("loading", e.path);
				return JSON.parse(e.content);
			});
    });

	//Filter this array using {}query
	function queryFilter(filtered, query) {
		var keys = Object.keys(struct);
		keys.forEach(function (key) {
            if (!query[key]) { return; } //Skip if not specified.
            filtered = struct[key](filtered, key, query[key]);
        });
		return filtered;
	}

	var router = express.Router();
	/**
	 * Route to return all entries
	 */
	router.get('/', function (req, res) {
		//Allow querying for items
		res.setHeader('Cache-Control', 'public, max-age=3600');
		res.json(queryFilter(entries, req.query));
	});

	if (enabledModId) {
		/**
		 * Return all entries matching a mod
		 */
		router.get('/:mod', function (req, res) {
			//List all items under a mod with querying
			res.setHeader('Cache-Control', 'public, max-age=3600');
			res.json(queryFilter(entries.filter((f) => f.mod == req.params.mod), req.query));
		});
		/**
		 * Return the entry with the matching the mod and id
		 */
		router.get('/:mod/:id', function (req, res) {
			//List a single item
			var fltrd = entries.filter((f) => f.mod == req.params.mod && f.id == req.params.id);
			if (fltrd.length) {
				res.setHeader('Cache-Control', 'public, max-age=3600');
				res.json(fltrd[0]);
			} else {
				res.send(404);
			}
		});
	}


	if (enableSave) {
		router.put('/:mod/:id', [bodyParser.json()], function (req, res) {
			var newData = req.body;
			var newFilename = fileNameGen(newData);

			//Check if old file exists
			var findByModId = (f) => f.mod == req.params.mod && f.id == req.params.id;
			var oldData = entries.find(findByModId);

			if (oldData) {
				var oldFilename = fileNameGen(oldData);
				//If the old filename is different, delete it.
				if (oldFilename != newFilename) {
					fs.unlink(path.resolve(baseDir, oldFilename));
				}
			}
			mkdirp.sync(path.dirname(path.resolve(baseDir, newFilename)));
			fs.writeFileSync(path.resolve(baseDir, newFilename), JSON.stringify(newData, null, 2));
			entries.splice(entries.findIndex(findByModId), 1);
			entries.push(newData);
			res.sendStatus(200);

		});
	}
	return router;
};