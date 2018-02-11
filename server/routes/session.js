var API = require('../lib/api-helpers')
var passport = require('passport')
var gravatar = require('../lib/gravatar')


var router = module.exports = require('express').Router()

router.get('/sign-in', API.ensureSignedOut(), function(req, res) {
  res.render('sign-in')
})

router.get('/me', API.auth, function (req, res) {
  var payload = Object.assign({}, req.user, {
    avatar_url: gravatar.getUrl(req.user.email)
  })
  res.send(payload)
})

router.post('/',
  passport.authenticate('local', { failWithError: true }),
  function (req, res) {
    var returnTo = req.session.returnTo || '/admin'
    delete req.session.returnTo
    res.send({ next: returnTo })
  },
  function(err, req, res, next) {
    // Handle error
    if ( err.name === 'AuthenticationError' || err.message === 'user_not_found' ) {
      return res.status(401).send({ reason: 'invalid_creds' })
    }
    else {
      console.log("Unexpected Error:", err)
      return res.status(500).send({ reason: 'unknown' })
    }
  }
)
