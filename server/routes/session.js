var API = require('../lib/api-helpers')


var router = module.exports = require('express').Router()

router.get('/sign-in', API.ensureSignedOut(), function(req, res) {
  res.render('sign-in')
})
