var utils = require('oauth2orize/lib/utils')


var store = {}

exports.find = function (id) {
  return Promise.resolve(store[id])
}


//
// Install Client
//
// Clients are installed upon user request.
// They are OAuth2 clients, but also specify which data
// files they have access to.
// A client does not necessarily have write access.
//
exports.install = function (attrs) {
  var id = utils.uid(16)
  var payload = {
    id: id,
    name: attrs.name,
    domain: attrs.domain,
    redirect_uri: attrs.redirect_uri,
  }

  if ( attrs.secret ) {
    payload.secret = attrs.secret
  }

  store[id] = payload
  return Promise.resolve(store[id])
}
