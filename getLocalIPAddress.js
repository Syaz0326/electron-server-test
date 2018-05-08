const os = require("os")
const IP = require('ip');
let ifaces = os.networkInterfaces()

module.exports = () => {
  // let ip = {}
  // ip.v4 = ifaces['イーサネット'].filter(iface => iface.family === 'IPv4')[0].address
  // ip.v6 = ifaces['イーサネット '].filter(iface => iface.family === 'IPv6')[0].address
  // console.log(ifaces)

  // console.log(ip)
  let ip = {}
  ip.v4 = IP.address()
  console.log(ip);
  return ip
}

// let ip = {}
// ip.v4 = ifaces['イーサネット'].filter(iface => iface.family === 'IPv4')[0].address
// ip.v6 = ifaces['イーサネット'].filter(iface => iface.family === 'IPv6')[0].address
// console.log(ifaces)
//
// console.log(ip)
