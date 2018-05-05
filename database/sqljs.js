// sql.js
const sql = require("sql.js")
const db = new sql.Database()

// fs
const fs = require("fs")

// create table
let sqlstr = `CREATE TABLE greet (id int, greet char);`

// insert data
sqlstr += "INSERT INTO greet VALUES (0, 'hello');"
sqlstr += "INSERT INTO greet VALUES (1, 'こんにちは');"
db.run(sqlstr)

// select data
let res = db.exec('SELECT * FROM greet')

console.log(res)
console.log('------------')
console.log(res[0])

res = db.exec('SELECT * FROM greet WHERE id=1')

console.log('------------')
console.log('------------')
console.log(res)
console.log('------------')
console.log(res[0])

// export
let data = db.export()
let buffer = new Buffer(data)
fs.writeFileSync('database/data/test.sqlite', buffer)
