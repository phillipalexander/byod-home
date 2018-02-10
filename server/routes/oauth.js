var API = require('../lib/api-helpers')
var oauth = require('oauth2orize')
var passport = require('passport')

var Client = require('../models/client')
var AuthorizationCode = require('../models/authorization-code')
var AccessToken = require('../models/access-token')

var oauthServer = oauth.createServer()

var router = module.exports = require('express').Router()


router.post('/token',
  passport.authenticate(['basic', 'oauth2-client-password'], { session: false }),
  oauthServer.token(),
  oauthServer.errorHandler())

//
// User-facing
//
router.get('/dialog/authorize',
  API.ensureSignedIn({ redirectTo: '/session/sign-in?oauth=1' }),
  oauthServer.authorize(function(clientID, redirectURI, done) {
    Client.find(clientID)
      .then(
        function (client) {
          if (client.redirect_url != redirectURI) { return done(null, false) }
          return done(null, client, client.redirect_url)
        },
        function (err) {
          done(null, err)
        }
      )
  }),
  function(req, res) {
    res.render('sign-in', {
      transactionID: req.oauth2.transactionID,
      user: req.user,
      client: req.oauth2.client
    })
  })

router.post('/dialog/authorize/decision',
   API.ensureSignedIn({ redirectTo: '/session/sign-in?oauth=1' }),
   oauthServer.decision())

//
// Configure oauth2orize
//
oauthServer.grant(oauth.grant.code(function(client, redirectURI, user, ares, done) {
  var code = utils.uid(16)

  AuthorizationCode.create({
    scope: ares.scope,
    user_id: user.id,
    client_id: client.id,
    redirect_uri: redirectURI,
  })
    .then(
      function(code){ done(null, code) },
      function(err){ done(err) }
    )
}))


oauthServer.exchange(oauth.exchange.code(function(client, code, redirectURI, done) {
  AuthorizationCode.find(code)
    .then(function (codeRecord) {
      if (client.id !== code.client_id) { return done(null, false) }
      if (redirectURI !== code.redirect_uri) { return done(null, false) }

      return AccessToken.create({
        user_id: code.user_id,
        client_id: code.client_id,
        scope: code.scope
      })
    })
    .then(function (token) {
      done(null, token)
    })
    .catch(function (err) {
      done(err)
    })
}))

oauthServer.serializeClient(function(client, done) {
  return done(null, client.id)
})

oauthServer.deserializeClient(function(id, done) {
  Client.find(id)
    .then(
      function(user){ done(null, user) },
      function(err){ done(err) }
    )
})
