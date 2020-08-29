const test = require("ava")
const { call } = require("cofx")
const { createParseXmlGenerator } = require("./parseXml")
const { parseStringPromise } = require("xml2js")

test("parseXml()", (t) => {
  const xml = `
  <note>
  <to>Tove</to>
  </note>
  `
  const gen = createParseXmlGenerator(xml)()

  t.deepEqual(
    gen.next().value,
    call(parseStringPromise, xml),
    "should parsed xml"
  )

  const respValue = { note: { to: ["Tove"] } }
  const last = gen.next(respValue)
  t.true(last.done, "generator should finish")
  t.deepEqual(last.value, respValue, "should result parsed xml")
})
