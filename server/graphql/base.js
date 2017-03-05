const BASE_OBJ = {
    //mod: (_){ _.mod} //TODO: MOD TYPE
    id: (_, { prefixMod }) => (prefixMod ? _.mod + ":" : "") + _.id,
    //version: (_) => _.version //TODO: VERSION TYPE
}
module.exports = (o) => Object.assign({},BASE_OBJ, o);