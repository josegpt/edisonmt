const R = require("rambda")
const { asyncPipe, taskPipe } = require("../helpers/fp")
const { createFetchGenerator } = require("../helpers/fetch")
const { createParseXmlGenerator } = require("../helpers/parseXml")

const streamsPath = "rtmp.server.0.application.0.live.0.stream"

const hasStreams = R.hasPath(streamsPath)
const pickUpStreams = R.compose(
  R.map((stream) => R.path("name.0", stream)),
  R.path(streamsPath)
)

const fetchStreams = asyncPipe(
  taskPipe(createFetchGenerator, createParseXmlGenerator),
  R.ifElse(hasStreams, pickUpStreams, () => [])
)

module.exports = Object.assign({}, { fetchStreams })
