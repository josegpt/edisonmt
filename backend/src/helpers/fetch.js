const fetch = require("node-fetch")
const { call } = require("cofx")

function createFetchGenerator(url) {
  return function* () {
    const response = yield call(fetch, url)
    const data = yield call([response, "text"])
    return data
  }
}

module.exports = Object.assign({}, { createFetchGenerator })
