var co = require('co');
var assert = require('assert');
var colors = require('colors')

var request = require('../index');

co(function* () {
  var r = yield request('http://wynfrith.me');
  assert(r.statusCode == 200);

  console.log('body: '.green, r.body);
  console.log('cookies: '.green, r.cookies);
  console.log('headers: '.green, r.headers);

}).then(() => { console.log('finished');},
(err) => { throw err });