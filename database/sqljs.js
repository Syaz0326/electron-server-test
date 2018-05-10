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
sqlstr += "INSERT INTO greet VALUES (2, '你好');"
db.run(sqlstr)

// select data
let res = db.exec('SELECT * FROM greet')

console.log(res)
console.log('------------')
console.log(res[0])

// let injection = "' OR 'A' = 'A'"
let injection = "'; SELECT * FROM greet;--"
// let injection = "こんにちは"
// res = db.exec(`SELECT * FROM greet WHERE greet='${injection}'`)
res = []
db.each('SELECT * FROM greet WHERE greet=:greet', {':greet': injection}, (row) => {
  res.push(row)
})

console.log('------------')
console.log('injection test (char)')
console.log('------------')
console.log(res)
console.log('------------')
console.log(res[0])

// injection = "0;SELECT * FROM greet"
injection = "0;DELETE FROM greet"
// injection = 0
// res = db.exec(`SELECT * FROM greet WHERE id=${injection}`)
res = []
db.each(`SELECT * FROM greet WHERE id=:id`, {':id': injection}, (row) => {
  res.push(row)
})

console.log('------------')
console.log('injection test (num)')
console.log('------------')
console.log(res)
console.log('------------')
console.log(res[0])

// export
let data = db.export()
let buffer = new Buffer(data)
fs.writeFileSync('database/data/test.sqlite', buffer)
