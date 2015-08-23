var fs = require('fs');
var argv = require('yargs')
.boolean('u')
.usage('Usage: $0 -d dataFolder [options]')
.option('d', {
        alias: 'data-folder',
        demand: true,
        describe: 'data folder to use',
        type: 'string'
    })
.option('f', {
        alias: 'filter',
        demand: false,
        describe: 'filter javascript (e.g. "entry.id==\'foo\'")',
        type: 'string'
    })
.option('t', {
        alias: 'transform',
        demand: false,
        describe: 'transform function (e.g. "entry.n = \'new\';return entry")',
        type: 'string'
    })
.option('u', {
        alias: 'update',
        demand: false,
        describe: 'write back changes to files',
        type: 'boolean'
    })
.option('e', {
        alias: 'each',
        demand: false,
        describe: 'Iterate over each file',
        type: 'string'
    })
.argv;
var walk = require('./dir-walk');

walk('./data/' + argv.d, function(err, files){
    var pipe = files.map(function(file){
        try{
            o = JSON.parse(fs.readFileSync(file))
            o.__path = file;
            return o;
        }catch(e){
            console.log("Failed to parse",file);
            process.exit(1);
        }
    });
    if(argv.f){
        pipe = pipe.filter(new Function("entry","return " + argv.f))
    }
    if(argv.t){
        pipe = pipe.map(new Function("entry",argv.t))
    }
    if(argv.e){
        pipe.forEach(new Function("entry",argv.e))
    }
    if(argv.u){
        pipe.forEach(function(f){
            path = f.__path;
            delete f.__path
            fs.writeFileSync(path, JSON.stringify(f,null,2));
        })
    }
})