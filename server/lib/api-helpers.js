
exports.auth = function (req, res, next) {
  if ( ! req.user ) {
    res.sendStatus(401)
  }
  else {
    next()
  }
}

exports.ensureSignedIn = function (options) {
  options = options || {}

  var url = options.redirectTo || '/session/sign-in'

  return function(req, res, next) {
    if (!req.isAuthenticated || !req.isAuthenticated()) {
      if (req.session) {
        req.session.returnTo = req.originalUrl || req.url
      }
      return res.redirect(url)
    }
    next()
  }
}

exports.ensureSignedOut = function (options) {
  options = options || {}

  var url = options.redirectTo || '/'

  return function(req, res, next) {
    if (req.isAuthenticated && req.isAuthenticated()) {
      return res.redirect( req.session.returnTo || url )
    }
    next()
  }
}
