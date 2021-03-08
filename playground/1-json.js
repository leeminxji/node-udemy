const fs = require('fs')

// const bookJSON = JSON.stringify(book)
// fs.writeFileSync('1-json.json', bookJSON)

const dataBuffer = fs.readFileSync('1-json.json')
const dataJSON = dataBuffer.toString()
const user = JSON.parse(dataJSON)

user.name = 'leeminxji'
user.age = 25

const userJSON = JSON.stringify(user)
fs.writeFileSync('1-json.json', userJSON)