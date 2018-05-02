const os = require("os")
let ifaces = os.networkInterfaces()

module.exports = () => {
  let ip = {}
  ip.v4 = ifaces.en0.filter(iface => iface.family === 'IPv4')[0].address
  ip.v6 = ifaces.en0.filter(iface => iface.family === 'IPv6')[0].address

  return ip
}
