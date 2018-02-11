var isProd = process.env.NODE_ENV === 'production'
var Path = require('path')
var express = require('express')
var passport = require('passport')
var session = require('express-session')


var app = express()

app.set('view engine', 'ejs')
app.set('views', Path.join(__dirname, '../client/pages'))

if ( isProd ) {
  app.set('trust proxy', 1) // trust first proxy
}


app.use(session({ // TODO: https://github.com/rawberg/connect-sqlite3
  name: 'byod.sid',
  secret: 'dev',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: isProd }
}))

app.use( require('body-parser').json() )

app.use(passport.initialize())
app.use(passport.session())

require('./lib/configure-passport')

app.use('/oauth', require('./routes/oauth'))
app.use('/admin', require('./routes/admin'))
app.use('/session', require('./routes/session'))

app.get('/', function (req, res) {
  // TODO: Consider a landing page
  res.redirect('/admin')
})

//
// Static js & css
//
app.use(
  '/static',
  function (req, res, next) {
    if (
      ! req.path.match(/bundle\.js(\.map)?$/) &&
      ! req.path.match(/\.css$/) &&
      ! req.path.match(/^\/img\//)
    ) {
      return res.sendStatus(404)
    }
    next()
  },
  express.static( Path.join(__dirname, '../client') )
)


var port = process.env.PORT || 8484
app.listen(port)
console.log("Listening on port", port)
