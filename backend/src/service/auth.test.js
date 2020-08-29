const test = require("ava")
const { authStream, notAuthenticated } = require("./auth")

test("authController with good key", (t) => {
  const res = {
    sendStatus: (status) => {
      t.is(status, 201, "should return create 201")
    },
  }
  const req = {
    body: {
      streamKey: "dev",
    },
  }

  authStream(req, res)
})

test("authController with bad key", (t) => {
  const res = {
    sendStatus: (status) => {
      t.is(status, 404, "should return not found 404")
    },
  }
  const req = {
    body: {
      streamKey: "test",
    },
  }

  authStream(req, res)
})

test("authController other routes", (t) => {
  const res = {
    sendStatus: (status) => {
      t.is(status, 401, "should return not authenticated 401")
    },
  }

  notAuthenticated({}, res)
})
