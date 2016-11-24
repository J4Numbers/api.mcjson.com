module.exports = function (source, baseOptions) {
    return function (variables, options) {
        var opts = Object.assign({}, baseOptions||{}, options||{});
        return fetch(opts.url, {
            method: "POST",
            headers: Object.assign({}, opts.headers, { 'Content-Type': 'application/json' }),
            body: JSON.stringify({
                query: source,
                variables: variables
            })
        }).then(res => res.json())
            .then(body => {
                if (body.errors && body.errors.length) {
                    throw new Error(body.errors.map(function (e) { return e.message }).join('\\n'));
                }
                else {
                    return body.data;
                }
            });
    }
}