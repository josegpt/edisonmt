const test = require("ava")
const fetch = require("node-fetch")
const { call } = require("cofx")
const { createFetchGenerator } = require("./fetch")

test("fetch()", (t) => {
  const url = "http://test.com"
  const gen = createFetchGenerator(url)()

  t.deepEqual(gen.next().value, call(fetch, url), "should make http request")

  const respValue = "<root></root>"
  t.deepEqual(
    gen.next(respValue).value,
    call([respValue, "text"]),
    "should get data from response"
  )

  const last = gen.next(respValue)
  t.true(last.done, "generator should finish")
  t.deepEqual(last.value, respValue, "should return data")
})
