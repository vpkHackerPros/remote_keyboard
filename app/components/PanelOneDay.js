import React, {useState, useEffect} from 'react'
import styled  from 'styled-components'
import ContentOneDay from './ContentOneDay.js'
import TextInput from './FastTextInput.js'
import StyledPanel from './StyledPanel.js'
import Button from './Button.js'
import FastTextInput from './FastTextInput.js'
import ContentList from './ContentIcons.js'
import {SocketProvider, useSocket} from '../hooks/useSocket.js'

const Container = styled.div `
  box-sizing: border-box;
  display: grid;
  height: 300px;
  grid-template-columns: 30% 30% 30%;
  background-color: white;
  column-gap: 5px;
  padding: 10px;
  margin: 5px;
  border-radius: 5px;
`
const Left = styled.div `
  grid-column: 1 / 2;
`
const Middle = styled.div `
  grid-column: 2 / 3;
  justify-self:stretch;
  width: 250px;
  margin: 18px;
`
const Right = styled.div `
  grid-column: 3 / 4;
`
const InputAIcon = styled.div `
  flex: 1;
  margin-left: 5px;
`

function OneDayPanel(props){
  const [morningTemp, setMorningTemp] = useState("")
  const [morningIcon, setMorningIcon] = useState("")
  const [afternoonTemp, setAfternoonTemp] = useState("")
  const [afternoonIcon, setAfternoonIcon] = useState("")
  const {send} = useSocket()

  const handleIN = () => {
    send(`0 RENDERER SET_OBJECT SCENE*TV3_VREME/PLAYOUT/DANES_JUTRI \0`);
    send(`0 RENDERER*STAGE*DIRECTOR*$DANES_JUTRI_IN START \0`);
    send(`0 RENDERER*TREE*$TEMP_1*GEOM*TEXT SET ${morningTemp} °C \0`);
    send(`0 RENDERER*TREE*$ICON_1*FUNCTION*SoftClip*clipFile SET "C:\\ProgramData\\vizrt\\viz3\\clip\\TV3_VREME\\ICONS\\"${morningIcon}.avi \0`);
    send(`0 RENDERER*TREE*$TEMP_2*GEOM*TEXT SET ${afternoonTemp} °C \0`);
    send(`0 RENDERER*TREE*$ICON_2*FUNCTION*SoftClip*clipFile SET "C:\\ProgramData\\vizrt\\viz3\\clip\\TV3_VREME\\ICONS\\"${afternoonIcon}.avi \0`);
    //console.log(morningTemp + "°C, " + morningIcon + ", " + afternoonTemp + "°C, " + afternoonIcon);
  }

  const handleOUT = () => {
    send(`0 RENDERER*STAGE*DIRECTOR*$DANES_JUTRI_OUT START \0`);
  }

  useEffect( () => {
    fetch('http://localhost:4545/data', {
      method: 'POST',
      body: JSON.stringify({morningTemp, morningIcon, afternoonTemp, afternoonIcon}),
      headers: {'Content-Type': 'application/json'},
    })
  }, [morningTemp, morningIcon, afternoonTemp, afternoonIcon])

  return(
    <Container>
      <Left>
        <StyledPanel>
          <ContentOneDay
            morningTemp = {morningTemp}
            setMorningTemp = {setMorningTemp}
            morningIcon = {morningIcon}
            setMorningIcon = {setMorningIcon}
            afternoonTemp = {afternoonTemp}
            setAfternoonTemp = {setAfternoonTemp}
            afternoonIcon = {afternoonIcon}
            setAfternoonIcon = {setAfternoonIcon}
            />
        </StyledPanel>
      </Left>
      <Middle>
        <Button onClick = { handleIN }>IN</Button>
        <Button onClick = { handleOUT }>OUT</Button>
      </Middle>
      <Right>
        <ContentList/>
      </Right>
    </Container>
  )
}

export default OneDayPanel
