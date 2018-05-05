// sql.js
const sql = require("sql.js")
const fs = require("fs")
let db

let filebuffer

// sqliteファイルの作成
let dbInit = () => {
  console.log('init')
  db = new sql.Database()
  db.run('CREATE TABLE greet (id int, greet char);')
  let buffer = new Buffer(db.export())
  fs.writeFileSync('database/data/test.sqlite', buffer)
}

// sqliteファイルの読み込み
let importDB = () => {
  console.log('import')
  filebuffer = fs.readFileSync('database/data/test.sqlite')
  db = new sql.Database(filebuffer)
}

// sqliteファイルの存在チェック
try {
  fs.statSync('database/data/test.sqlite')
  importDB()
} catch (err) {
  dbInit()
}

// select
let res = db.exec('SELECT * FROM greet')

console.log(res)
console.log('------------')
console.log(res[0])
