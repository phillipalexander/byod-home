var Bluebird = require('bluebird')
var API = require('../lib/api-helpers')

var Bapp = require('../models/bapp')


var router = module.exports = require('express').Router()

router.get('/', API.ensureSignedIn(), function(req, res) {
  res.render('admin')
})

router.get('/_api/bapp-stats', API.auth, function (req, res) {
  Bluebird.coroutine(function * () {
    var bapps = yield Bapp.all()
    var stats = yield Promise.all( bapps.map(Bapp.getDatabaseStats) )

    return bapps.map(function (bapp, i) {
      return Object.assign({}, bapp, { stats: stats[i] })
    })
  })()
    .then()
    .then( API.prep(200, res) )
    .catch( API.catchUnexpectedErrors(res) )
})



//
// Catch-all route for browser requests
//
router.get('*',
  function (req, res, next) {
    if ( req.headers.accept.indexOf('json') ) {
      // This is not a browser request; just return 404
      res.sendStatus(404)
    }
    else {
      next()
    }
  },
  API.ensureSignedIn(),
  function (req, res) {
    // Client will handle missing pages / redirects
    res.render('admin')
  }
)
