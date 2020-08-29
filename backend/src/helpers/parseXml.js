const { call } = require("cofx")
const { parseStringPromise } = require("xml2js")

function createParseXmlGenerator(xml) {
  return function* () {
    const result = yield call(parseStringPromise, xml)
    return result
  }
}

module.exports = Object.assign({}, { createParseXmlGenerator })
