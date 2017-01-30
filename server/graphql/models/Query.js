var filters = require("../../filters.js");
function filterBy(values){
    return (entry) => Object.keys(values).map( e=> [e,values[e]]).filter( e=> e[1]!=undefined).map( e=> entry[e[0]] == e[1] ).reduce( (a,b)=> a&&b , true);
}


module.exports = {
    items({itemDB},{mod,id,introduced_at}) {
        return itemDB.data().filter(filterBy({mod, id})).filter(
                filters.key(
                    "introduced_at",
                    filters.orNull(introduced_at,filters.semver)
                )
            )
    },
    entities({entityDB},{mod,id}) {
        return entityDB.data().filter(filterBy({mod, id}));
    },
    enchantments({enchantmentDB},{mod,id}) {
        return enchantmentDB.data().filter(filterBy({mod, id}));
    },
    versions({versionDB},{id, type}) {
        return versionDB.data().filter(filterBy({type, id}));
    },
    effects({effectDB},{mod,id}) {
        return effectDB.data().filter(filterBy({mod, id}));
    },
    
}