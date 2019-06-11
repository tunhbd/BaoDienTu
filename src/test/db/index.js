const fs = require('fs')
const express = require('express')
const mysql = require('mysql')
const db = require('../../app/db')

const testDb = express()

let cnn = new db.DBConnection()
cnn.loadRequest(`UPDATE tags SET tag_name='tag 02' WHERE tag_id='TAG01'`).then(posts => console.log(posts)).catch(err => console.log(err))

testDb.listen(3001, () => {
    console.log('running ...')
})