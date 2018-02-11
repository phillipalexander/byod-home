var utils = require('oauth2orize/lib/utils')


var store = [
  { id: utils.uid(16), name: 'Alice', email: 'a@b.com', password: '123' }
]

exports.find = function (id) {
  var user = store.find(u => u.id === id)
  return user
    ? Promise.resolve(user)
    : Promise.reject(new Error('user_not_found'))
}

exports.findByEmail = function (email) {
  var user = store.find(u => u.email === email)
  return user
    ? Promise.resolve(user)
    : Promise.reject(new Error('user_not_found'))
}
