const {app, BrowserWindow, ipcMain} = require('electron')
const path = require("path")
const url = require("url")

let server = require("./server.js")

let win = null

let createWindow = () => {
  win = new BrowserWindow({
    width: 800,
    height: 600
  })

  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file',
    slashes: true
  }))

  win.on('closed', () => {
    win = null
  })
}

app.on('ready', createWindow)

app.on('windows-all-closed', () => {
  if(process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if(win === null) {
    createWindow()
  }
})

ipcMain.on('init', (event) => {
  event.returnValue = server.HOST
})
