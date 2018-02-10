var utils = require('oauth2orize/lib/utils')


var store = {}

exports.create = function (attrs) {
  var code = utils.uid(16)
  store[code] = {
    code: code,
    scope: attrs.scope,
    user_id: attrs.user_id,
    client_id: attrs.client_id,
    redirect_url: attrs.redirect_url,
  }
  return Promise.resolve(code)
}

exports.find = function (code) {
  return Promise.resolve(store[code])
}
