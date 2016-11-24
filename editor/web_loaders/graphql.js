/**
 * Transform GQL query files into callable functions
 */
var loaderUtils = require('loader-utils');
module.exports = function (source) {
    this.cacheable && this.cacheable();
    var qry = loaderUtils.parseQuery(this.query);
    var options = Object.assign({
        url: "/graphql",
        headers:{}
    },qry.options);
    var runPath = require.resolve( qry.runtime || "./graphql-runtime");
    this.addDependency(runPath)
    var req = loaderUtils.stringifyRequest(this, "!" + runPath);
    var src = `(function(){
        var runtime = require(${req});
        return runtime(\`${source}\`,${JSON.stringify(options)})
    })()`;
    this.value = src;
    return `module.exports = ${src}`;
};