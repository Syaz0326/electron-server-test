// sql.js
const sql = require("sql.js")
const fs = require("fs")

let filebuffer = fs.readFileSync('database/data/test.sqlite')

const db = new sql.Database(filebuffer)

let res = db.exec('SELECT * FROM greet')

console.log(res)
console.log('------------')
console.log(res[0])
