import React, {useState, useEffect} from 'react'
import styled  from 'styled-components'
import ContentThreeDays from './ContentThreeDays.js'
import TextInput from './FastTextInput.js'
import StyledPanel from './StyledPanel.js'
import Button from './Button.js'
import {SocketProvider, useSocket} from '../hooks/useSocket.js'

const Container = styled.div `
  box-sizing: border-box;
  display: grid;
  height: 300px;
  grid-template-rows: 70% 30%;
  grid-template-columns: 50% 50%;
  background-color: white;
  column-gap: 5px;
  padding: 10px;
  margin: 5px;
  border-radius: 5px;
  background-color: white;
`
const Top = styled.div `
  grid-column: 1 / 3;
  grid-row: 1 / 2;
`
const Bottom = styled.div `
  grid-column: 2 / 3;
  grid-row: 2 / 3;
`

function Panel(props){
  const CONTENT_BOX_COUNT = 3

  const [iteration, setIteration] = useState(0)
  const [day, setDay] = useState("")
  const [morningTemp, setMorningTemp] = useState("")
  const [afternoonTemp, setAfternoonTemp] = useState("")
  const [morningIcon, setMorningIcon] = useState("")
  const {send} = useSocket()

  const data = {day: 'Pon.', morningTemp: '', afternoonTemp: '', morningIcon: ''}
  const [dataArray, setDataArray] = useState(Array(CONTENT_BOX_COUNT).fill(data))

  const setData = (iter, element, value) => {
    setDataArray(dataArray.map((values, i) => {
      if (i == iter) {
        return { ... values, [element]: value}
      } else {
        return values
      }
    }))
  }

  const handleIN = () => {

    send(`0 RENDERER SET_OBJECT SCENE*TV3_VREME/PLAYOUT/TRI_DNI \0`);
    send(`0 RENDERER*STAGE*DIRECTOR*$TRI_DNI_IN START \0`);

    dataArray.map((item, i) => {
      send(`0 RENDERER*TREE*$DAN_${i+1}*GEOM*TEXT SET ${item.day} \0`);
      send(`0 RENDERER*TREE*$TEMP_${i+1}_1*GEOM*TEXT SET ${item.morningTemp}°C \0`);
      send(`0 RENDERER*TREE*$ICON_${i+1}*FUNCTION*SoftClip*clipFile SET "C:\\ProgramData\\vizrt\\viz3\\clip\\TV3_VREME\\ICONS\\"${item.morningIcon}.avi \0`);
      send(`0 RENDERER*TREE*$TEMP_${i+1}_2*GEOM*TEXT SET ${item.afternoonTemp}°C \0`);
      console.log(item.day + " " + item.morningTemp + "°C, " + item.afternoonTemp + "°C, " + item.morningIcon);
    })
  }

  const handleOUT = () => {
    send(`0 RENDERER*STAGE*DIRECTOR*$TRI_DNI_OUT START \0`);
  }

  useEffect( () => {
    fetch('http://localhost:4545/data_3', {
      method: 'POST',
      body: JSON.stringify({dataArray}),
      headers: {'Content-Type': 'application/json'},
    })
  }, [dataArray])

  return(
    <Container>
      <Top>
        <StyledPanel>
          {dataArray.map ((data, i) => {
            return <ContentThreeDays
              day = {data.day}
              setDay = {(value) => {setData(i, 'day', value)}}
              morningTemp = {data.morningTemp}
              setMorningTemp = {(value) => {setData(i, 'morningTemp', value)}}
              morningIcon = {data.morningIcon}
              setMorningIcon = {(value) => {setData(i, 'morningIcon', value)}}
              afternoonTemp = {data.afternoonTemp}
              setAfternoonTemp = {(value) => {setData(i, 'afternoonTemp', value)}}
            />
          })}
        </StyledPanel>
      </Top>
      <Bottom>
          <Button onClick = { handleIN }>IN</Button>
          <Button onClick = { handleOUT }>OUT</Button>
      </Bottom>
    </Container>
  )
}

export default Panel
