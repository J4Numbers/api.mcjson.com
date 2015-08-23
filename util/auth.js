var basicAuth = require('basic-auth');

module.exports = function(realm, authChk){
  if(typeof realm == 'function'){
    authChk = realm;
    realm = 'Authorization Required';
  }
  return function (req, res, next) {
    function unauthorized(res) {
      res.set('WWW-Authenticate', 'Basic realm=' + realm);
      return res.send(401);
    };

    var user = basicAuth(req);

    if (!user || !user.name || !user.pass) {
      return unauthorized(res);
    };

    if (authChk(user.name, user.pass)) {
      return next();
    } else {
      return unauthorized(res);
    };
  };
}