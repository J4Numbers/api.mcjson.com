var loaderUtils = require('loader-utils');
module.exports = function (source) {
    this.cacheable && this.cacheable();
    var options = Object.assign({
        url: "/graphql",
        headers:{}
    },loaderUtils.parseQuery(this.query));

    var s = `(variables) => fetch("${options.url}", {
        method: "POST",
        headers: ${JSON.stringify(Object.assign({},options.headers,{'Content-Type': 'application/json'}))},
        body: JSON.stringify({
            query: \`${source}\`,
            variables: variables
        })
    }).then(res => res.json())
    .then( body =>{
        if (body.errors && body.errors.length) {
          throw new Error(body.errors.map(function (e) { return e.message }).join('\\n'));
        }
        else{
            return body.data;
        }
    });
  `;
    this.value = s;
    //console.log("---\n",s, "\n---\n");
    return `module.exports = ${s}`;
};