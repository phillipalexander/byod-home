var Bluebird = require('bluebird')
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy
var BasicStrategy = require('passport-http').BasicStrategy
var ClientPasswordStrategy = require('passport-oauth2-client-password').Strategy
var BearerStrategy = require('passport-http-bearer').Strategy

var User = require('../models/user')
var Client = require('../models/client')
var AccessToken = require('../models/access-token')

/**
 * LocalStrategy
 *
 * This strategy is used to authenticate users based on a email and password.
 * Anytime a request is made to authorize an application, we must ensure that
 * a user is logged in before asking them to approve the request.
 */
passport.use(new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
  },
  function (email, password, done) {
    console.log(new Date(), "Signing in", email, password)
    User.findByEmail(email).then(
      function (user) {
        if (user.password !== password) return done(null, false)
        done(null, user)
      },
      function (err) {
        done(err)
      }
    )
  }
))

passport.serializeUser(function (user, done) {
  done(null, user.id)
})

passport.deserializeUser(function (id, done) {
  User.find(id).then(
    function (user) {
      done(null, user)
    },
    function (err) {
      done(err)
    }
  )
})

/**
 * BasicStrategy & ClientPasswordStrategy
 *
 * These strategies are used to authenticate registered OAuth clients. They are
 * employed to protect the `token` endpoint, which consumers use to obtain
 * access tokens. The OAuth 2.0 specification suggests that clients use the
 * HTTP Basic scheme to authenticate. Use of the client password strategy
 * allows clients to send the same credentials in the request body (as opposed
 * to the `Authorization` header). While this approach is not recommended by
 * the specification, in practice it is quite common.
 */
function verifyClient(clientId, secret, done) {
  Client.find(clientId).then(
    function (client) {
      if ('secret' in client && client.secret !== secret) {
        return done(null, false)
      }
      done(null, client)
    },
    function (err) {
      done(err)
    }
  )
}

passport.use(new BasicStrategy(verifyClient))

passport.use(new ClientPasswordStrategy(verifyClient))

/**
 * BearerStrategy
 *
 * This strategy is used to authenticate either users or clients based on an access token
 * (aka a bearer token). If a user, they must have previously authorized a client
 * application, which is issued an access token to make requests on behalf of
 * the authorizing user.
 */
passport.use(new BearerStrategy( function (token, done) {

  Bluebird.coroutine(function * () {
    var accessToken = yield AccessToken.find(token)
    var client = yield Client.find(accessToken.client_id)
    var user = yield User.find(accessToken.user_id)

    return { user: user, client: client, scope: accessToken.scope }
  })
    .then(
      function (result) { done(null, result.user, result.scope) },
      function (err) { done(err) }
    )
}))
