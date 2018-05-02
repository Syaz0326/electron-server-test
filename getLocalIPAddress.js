const os = require("os")
let ifaces = os.networkInterfaces()

let ipv4 = ifaces.en0.filter(iface => iface.family === 'IPv4')[0].address
let ipv6 = ifaces.en0.filter(iface => iface.family === 'IPv6')[0].address

console.log('ipv4: ' + ipv4)
console.log('ipv6: ' + ipv6)
