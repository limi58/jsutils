const utils = require('./index')
const assert = require('assert')

assert(utils.setQuery('http://localhost:8080/', {}) === 'http://localhost:8080/')
assert(utils.setQuery('http://localhost:8080/', {a:1}) === 'http://localhost:8080/?a=1')
assert(utils.setQuery('http://localhost:8080/', {a:1,b:2}) === 'http://localhost:8080/?a=1&b=2')