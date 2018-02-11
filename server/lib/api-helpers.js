
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

exports.prep = function (statusCode, response) {
  return function (input) {
    response.status( statusCode )

    if ( input instanceof Error ) {
      // Custom errors should implement .toResponseBody()
      response.send( input.toResponseBody ? input.toResponseBody() : { message: input.message } )
    }
    else {
      response.send( input )
    }
  }
}

exports.catchUnexpectedErrors = function (res) {
  return function (err) {
    var resBody = { type: 'unexpected_error', message: err.message }

    if ( process.env.NODE_ENV !== 'production' ) {
      resBody.stack = err.stack
    }
    res.status(500).send( resBody )
  }
}
