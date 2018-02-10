var API = require('../lib/api-helpers')


var router = module.exports = require('express').Router()

router.get('/sign-in', API.ensureSignedOut(), function(req, res) {
  res.render('sign-in')
})

router.get('/me', API.auth, function (req, res) {
  res.send(req.user)
})
