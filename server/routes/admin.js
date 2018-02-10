var API = require('../lib/api-helpers')


var router = module.exports = require('express').Router()

router.get('/', API.ensureSignedIn(), function(req, res) {
  res.render('admin')
})
