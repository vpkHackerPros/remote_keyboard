const express = require('express')
const bodyParser = require('body-parser')
const net = require('net')
const app = express()
const port = 4545

let data = {}
let data_3 = []

const client = new net.Socket();

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.get('/', (req, res) => res.send('Hello World!'))
app.get('/1', (req, res) => {
  res.sendStatus(200);
  client.connect(6100, 'nvg1', () => {
    client.write(`0 RENDERER SET_OBJECT SCENE*TV3_VREME/PLAYOUT/DANES_JUTRI \0`);
    client.write(`0 RENDERER*STAGE*DIRECTOR*$DANES_JUTRI_IN START \0`);
    client.write(`0 RENDERER*TREE*$TEMP_1*GEOM*TEXT SET ${data.morningTemp}°C \0`);
    client.write(`0 RENDERER*TREE*$ICON_1*FUNCTION*SoftClip*clipFile SET "C:\\ProgramData\\vizrt\\viz3\\clip\\TV3_VREME\\ICONS\\"${data.morningIcon}.avi \0`);
    client.write(`0 RENDERER*TREE*$TEMP_2*GEOM*TEXT SET ${data.afternoonTemp}°C \0`);
    client.write(`0 RENDERER*TREE*$ICON_2*FUNCTION*SoftClip*clipFile SET "C:\\ProgramData\\vizrt\\viz3\\clip\\TV3_VREME\\ICONS\\"${data.afternoonIcon}.avi \0`);
    client.destroy();
  })
})

app.get('/2', (req, res) => {
  res.sendStatus(200);
  client.connect(6100, 'nvg1', () => {
    client.write(`0 RENDERER*STAGE*DIRECTOR*$DANES_JUTRI_OUT START \0`);
    client.destroy();
  })
})

app.get('/3', (req, res) => {
  res.sendStatus(200);
  client.connect(6100, 'nvg1', () => {
    client.write(`0 RENDERER SET_OBJECT SCENE*TV3_VREME/PLAYOUT/TRI_DNI \0`);
    client.write(`0 RENDERER*STAGE*DIRECTOR*$TRI_DNI_IN START \0`);

    data_3.dataArray.map((item, i) => {
      client.write(`0 RENDERER*TREE*$DAN_${i+1}*GEOM*TEXT SET ${item.day} \0`);
      client.write(`0 RENDERER*TREE*$TEMP_${i+1}_1*GEOM*TEXT SET ${item.morningTemp}°C \0`);
      client.write(`0 RENDERER*TREE*$ICON_${i+1}*FUNCTION*SoftClip*clipFile SET "C:\\ProgramData\\vizrt\\viz3\\clip\\TV3_VREME\\ICONS\\"${item.morningIcon}.avi \0`);
      client.write(`0 RENDERER*TREE*$TEMP_${i+1}_2*GEOM*TEXT SET ${item.afternoonTemp}°C \0`);
    })
    client.destroy();
  })
})

app.get('/4', (req, res) => {
  res.sendStatus(200);
  client.connect(6100, 'nvg1', () => {
    client.write(`0 RENDERER*STAGE*DIRECTOR*$TRI_DNI_OUT START \0`);
    client.destroy();
  })
})

app.post('/data', (req, res) => {
  console.log('Got body:', req.body)
  data = req.body
  res.sendStatus(200)
})

app.post('/data_3', (req, res) => {
  console.log('Got body:', req.body)
  data_3 = req.body
  res.sendStatus(200)
})

app.listen(port, () => console.log(`Listening on at http://localhost:${port}`))
