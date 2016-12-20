module.exports = {
    id(_,{prefixMod}){
        return (prefixMod ? _.mod + ":":"") + _.id;
    }
}