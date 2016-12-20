var path = require('path');
var fs = require('fs');
var readdir = require("readdir-plus");
var mkdirp = require("mkdirp");

class FileEntry {
    constructor(file, content) {
        this.file = file;
        this.content = content;
    }

    data() {
        return this.content;
    }
    save() {
        mkdirp.sync(path.dirname(this.file));
        fs.writeFile(this.file, JSON.stringify(this.content, null, 2));
    }
    rename(newName){
        mkdirp.sync(path.dirname(newName));
        fs.renameSync(this.file, newName);
        return newName;
    }
    delete() {
        fs.unlink(this.file);
    }
}

class Database {
    constructor(dbPath, fn) {
        this.fn = fn;
        this.dbPath = dbPath;
        this.entries = new Promise((resolve, reject) => {
            readdir(dbPath, { content: true }, function (err, files) {
                if (err) {
                    reject(err);
                } else {
                    resolve(
                        files
                            .filter((e) => e.type == "file")
                            .map((e) => {
                                return new FileEntry(e.path,JSON.parse(e.content));
                            })
                    );
                }
            });
        })
    }

    add(newData){
        console.log("DATA",newData);
        var file = path.resolve(this.dbPath, this.fn(newData));
        return this.entries.then( entries =>{
            if(entries.find(e=> (e.file == file) ) != null){
                throw new Error("Object already exists in database!");
            }else{
                var f = new FileEntry(file)
                f.content = newData;
                f.save();
                entries.push(f);
                return newData;
            }
        })
    }

    update(oldId, newData){
        var file = path.resolve(this.dbPath, this.fn(oldId));
        var newFile = path.resolve(this.dbPath, this.fn(newData));
        return this.entries.then( entries =>{
            var f = entries.find(e=> (e.file == file) ) || new FileEntry(file, {});
            f.content = newData;
            f.save();
            if(file != newFile){
                f.rename(newFile);
            }
            return newData;
        })
    }

    delete(oldId){
        var file = path.join(this.dbPath, this.fn(oldId));
        return this.entries.then( entries =>{
            var f = entries.find(e=> (e.file == file))
            if(f){
                f.delete();
                entries.splice(entries.indexOf(f),1);
                return f.content;
            }
            else{
                throw new Error("Cannot find entry with file path of " + file);
            }
        })
    }
}

Database.FileEntry = FileEntry;

module.exports = Database;