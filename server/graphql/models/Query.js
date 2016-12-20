var filters = require("../../filters.js");
function filterBy(values){
    return (entry) => Object.keys(values).map( e=> [e,values[e]]).filter( e=> e[1]!=undefined).map( e=> entry[e[0]] == e[1] ).reduce( (a,b)=> a&&b , true);
}


module.exports = {
    items({itemDB},{mod,id,introduced_at}) {
        return itemDB.entries.then(
            items => items.map(e => e.data()).filter(filterBy({mod, id})).filter(
                filters.key(
                    "introduced_at",
                    filters.orNull(introduced_at,filters.semver)
                )
            )
        );
    },
    blocks({blockDB},{mod,id}) {
        return blockDB.entries.then(items => items.map(e => e.data()).filter(filterBy({mod, id})));
    },
    entities({entityDB},{mod,id}) {
        return entityDB.entries.then(items => items.map(e => e.data()).filter(filterBy({mod, id})));
    },
    enchantments({enchantmentDB},{mod,id}) {
        return enchantmentDB.entries.then(items => items.map(e => e.data()).filter(filterBy({mod, id})));
    },
    versions({versionDB},{id, type}) {
        return versionDB.entries.then(items => items.map(e => e.data()).filter(filterBy({type, id})));
    },
    effects({effectDB},{mod,id}) {
        return effectsDB.entries.then(items => items.map(e => e.data()).filter(filterBy({mod, id})));
    },
    
}