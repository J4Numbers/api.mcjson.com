import BaseModel from './BaseModel';

export class MetaCategory {
    constructor(label, data){
        this.label = label;
        this.entries = [];
        if(data){
            for(var k in data){
                this.entries.push(new MetaEntry(k,data[k]));
            }
        }
    }

    toJSON(){
        var _m = {};
        this.entries.forEach((e)=>{
            _m[e.label] = e.value;
        });
        return _m;
    }
}

export class MetaEntry {
    constructor(label, value){
        this.label = label;
        this.value = value;
    }
}

export default class BaseMetaModel extends BaseModel {

    parse(attr){
        // Convert attr.meta to objects
        var _m = [];
        for(var k in attr.meta){
            _m.push(new MetaCategory(k, attr.meta[k]));
        }
        attr.meta = _m;
        return attr;
    }

    toJSON(){
        var res = super.toJSON();
        var _m = {};
        res.meta.forEach((metaCat)=>{
            _m[metaCat.label] = metaCat.toJSON();
        });
        res.meta = _m;
        return res;
    }
}