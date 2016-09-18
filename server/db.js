var path = require('path');
var fs = require('fs');
var readdir = require("readdir-plus");

class FileEntry {
    constructor(file, content) {
        this.file = file;
        this.content = content;
    }

    data() {
        return this.content;
    }
    save() {
        fs.writeFile(this.file, JSON.stringify(this.content, null, 2));
    }
    delete() {
        fs.unlink(this.file);
    }
}

class Database {
    constructor(dbPath) {
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
}

module.exports = Database;