const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs')

const app = express()
const port = 4545
let watcher = null

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

let fileToWatch = 'C:/Users/kllam/Desktop/testWatch.txt'
let fileToWrite1 = 'C:/Users/kllam/Desktop/testWrite.txt'
let fileToWrite2 = 'C:/Users/kllam/Desktop/testWrite.txt'

const formatText = (rawText) => {
  let outputText1 = rawText.split(/\r?\n/)[0].split(' ')[2]
  let outputText2 = rawText.split(/\r?\n/)[1].split(' ')[2]
  return [outputText1, outputText2]
}

const watchFile = () => {
  watcher ? watcher.close() : console.log('nothing to close')
  watcher = fs.watch(fileToWatch, (event, filename) => {
    if (filename) {
      console.log(`${filename} file Changed`)
    }
    fs.readFile(fileToWatch, 'utf8', (err,data)  => {
      if (err) {
        return console.log(err)
      }
      console.log('file contents')
      console.log(data)

      fs.writeFile(fileToWrite1, formatText(data)[0], (err) => {
        if (err) return console.log(err);
        console.log(`${fileToWrite1} updated`);
      })
      fs.writeFile(fileToWrite2, formatText(data)[1], (err) => {
        if (err) return console.log(err);
        console.log(`${fileToWrite2} updated`);
      })
    })
  })
}

app.post('/paths', (req, res) => {
  console.log('Got input path:', req.body)
  fileToWatch = req.body.input
  fileToWrite1 = req.body.output1
  fileToWrite2 = req.body.output2
  res.send('got paths')
  watchFile()
})

app.listen(port, () => console.log(`Listening on at http://localhost:${port}`))