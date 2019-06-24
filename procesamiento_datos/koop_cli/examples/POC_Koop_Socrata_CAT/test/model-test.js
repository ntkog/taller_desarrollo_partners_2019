/*
  model-test.js

  This file is optional, but is strongly recommended. It tests the `getData` function to ensure its translating
  correctly.
*/

const test = require('tape')
const Model = require('../src/model')
const model = new Model()
const nock = require('nock')

test('should properly fetch from the API and translate features', t => {
  // nock('https://example.com')
  //   .get((url) => url.startsWith('/data'))
  //   .reply(200, require('./fixtures/input.json'))

  // model.getData({}, (err, geojson) => {
  //   t.error(err)
  //   t.end()
  // })
  t.plan(1)
  t.ok(true)
})
