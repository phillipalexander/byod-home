var crypto = require('crypto')
var querystring = require('querystring')


exports.getUrl = function (email, opts) {
  var query = querystring.stringify(opts)
  return 'https://gravatar.com/avatar/' + md5(email) + (query ? '?'+query : '')
}

function md5 (input) {
  var hash = crypto.createHash('md5')

  var inputEncoding = typeof input === 'string' ? 'utf8' : undefined
  hash.update(input, inputEncoding)

  return hash.digest('hex')
}