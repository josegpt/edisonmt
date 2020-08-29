const R = require("rambda")
const { task } = require("cofx")

const taskPipe = (...fns) => (x) =>
  R.reduce(async (y, f) => task(f(await y)), x, fns)

const asyncPipe = (...fns) => (x) =>
  R.reduce(async (y, f) => f(await y), x, fns)

module.exports = Object.assign({}, { taskPipe, asyncPipe })
