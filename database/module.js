// require
const sql = require("sql.js")
const fs = require("fs")

const dbpath = 'database/data/db.sqlite'

let DBMethod = function() {
  this.db
  this.filebuffer
}

// sqliteファイルの作成
DBMethod.init = function() {
  this.db = new sql.Database()
  this.db.run('CREATE TABLE greet (id int, country char, greet char);')
  let buffer = new Buffer(this.db.export())
  fs.writeFileSync(dbpath, buffer)
  this.filebuffer = fs.readFileSync(dbpath)
}

// sqliteファイルの読み込み
DBMethod.import = function() {
  this.filebuffer = fs.readFileSync(dbpath)
  this.db = new sql.Database(filebuffer)
}

// データベースの削除
DBMethod.deleteDB = function() {
  this.db = null
  this.filebuffer = null
  fs.unlinkSync(dbpath)
}

// クエリの実行
DBMethod.execQuery = function(query) {
  let res = this.db.exec(query)
  return res
}


// テーブルリストの作成
DBMethod.getTables = function() {
  let res = this.db.exec("select name from sqlite_master where type='table';")
  return res[0]
}

module.exports = DBMethod
