const {ipcRenderer} = require("electron")
const $ = require("jquery")

let HOST
let PORT = 10080

;(function() {
  res = ipcRenderer.sendSync('init')
  HOST = res

  $.post(`http://${HOST}:${PORT}/api/db_init`)
  .done(() => {
    console.log('done')
  })
})()

$(function() {
  $('button#get-tables').click(() => {
    $('div#tables').html('')
    $.post(`http://${HOST}:${PORT}/api/get_tables`)
    .done((data) => {
      for (let table of data.values[0]) {
        let preText = $('div#tables').html()
        preText === '' ? $('div#tables').html(table) : $('div#tables').html(preText + '<br>' + table)
      }
    }).fail((data) => {
      console.log(data)
    }).always(() => {
    })
  })

  $('button#submit-query').click(() => {
    let query = $('input#db-query')[0].value
    $('#db-response').empty()
    console.log(`${query}`)
    $.post(`http://${HOST}:${PORT}/api/query`, {query: query})
    .done((data) => {
      for (let column of data[0].columns) {
        $('#db-response').append(`<span class="db-response">${column}</span>`)
      }
      $('#db-response').append(`<br>`)
      for (let values of data[0].values) {
        for (let value of values) {
          $('#db-response').append(`<span class="db-response">${value}</span>`)
        }
        $('#db-response').append(`<br>`)
      }
    }).fail((data) => {
      console.log(data)
    })
  })
})
