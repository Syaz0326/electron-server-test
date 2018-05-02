// server require
const express = require("express")
const app = express()
const http = require("http").Server(app)

const getIP = require("./getLocalIPAddress.js")
const IP = getIP()

const HOST = IP.v4
// const HOST = 'localhost'
const PORT = 10080

// server起動
http.listen(PORT, HOST, () => {
  console.log(`server is listenning to ${HOST}:${PORT}`)
})

app.use(express.static(__dirname))
