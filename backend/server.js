const Koa = require("koa")
const Router = require("@koa/router")
const websockify = require("koa-websocket")

const app = websockify(new Koa())
const http = new Router()
const ws = new Router()

http
  .post("/auth", async (ctx) => {
    ctx.status = 201
    ctx.state.viewersCount = 0
  })
  .get("(.*)", (ctx) => {
    ctx.status = 401
    ctx.body = "Unauthorized"
  })

ws.get("/socket", async (ctx) => {
  ctx.websocket.send("Hello Socket")
  ctx.websocket.on("message", (message) => console.log(message))
})

app.use(http.routes()).use(http.allowedMethods())
app.ws.use(ws.routes()).use(ws.allowedMethods())

app.on("error", (err) => {
  log.error("server error", err)
})

app.listen(5000)
