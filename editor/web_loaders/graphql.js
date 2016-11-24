var loaderUtils = require('loader-utils');
module.exports = function (source) {
    this.cacheable && this.cacheable();
    var options = Object.assign({
        url: "/graphql",
        headers:{}
    },loaderUtils.parseQuery(this.query));

    var req = loaderUtils.stringifyRequest(this, "!" + require.resolve("./graphql-runtime"));
    var src = `(function(){
        var runtime = require(${req});
        return runtime(\`${source}\`,${JSON.stringify(options)})
    })()`;
    this.value = src;
    return `module.exports = ${src}`;
};