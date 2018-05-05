// server require
const express = require("express")
const app = express()
const http = require("http").Server(app)
const bodyParser = require("body-parser")

const db = require("./database/module.js")

const getIP = require("./getLocalIPAddress.js")
const IP = getIP()

const HOST = IP.v4
// const HOST = 'localhost'
const PORT = 10080

app.use(express.static(__dirname))
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())

app.post('/api/dbinit', (req, res) => {
  db.init()

  res.sendStatus(200).end()
})

app.post('/api/query', (req, res) => {
  let dbRes = db.execQuery(req.body.query)

  res.send(dbRes)
})

app.post('/api/getTables', (req, res) => {
  let dbRes = db.getTables()

  res.send(dbRes)
})

// server起動
http.listen(PORT, HOST, () => {
  console.log(`server is listenning to ${HOST}:${PORT}`)
})
