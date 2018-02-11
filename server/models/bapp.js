var Bluebird = require('bluebird')
//
// Bapp = BYOD App
//
var store = [
  { id: 'todoapp.byod.cool', name: 'BYOD Todo Example App', icon: 'clipboard' }
]

exports.find = function (id) {
  return Bluebird.resolve(store[id])
}

exports.all = function () {
  return Bluebird.resolve(store)
}

exports.getDatabaseStats = function (bapp_id) {
  return Bluebird.resolve({
    bapp_id: bapp_id,
    row_count: 232,
    size: '200kb',
  })
}
