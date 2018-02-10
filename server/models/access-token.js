var utils = require('oauth2orize/lib/utils')


var store = {}

exports.create = function (attrs) {
  var token = utils.uid(256)
  store[code] = {
    token: token,
    scope: attrs.scope,
    user_id: attrs.user_id,
    client_id: attrs.client_id,
  }
  return Promise.resolve(code)
}

exports.find = function (code) {
  return Promise.resolve(store[code])
}
