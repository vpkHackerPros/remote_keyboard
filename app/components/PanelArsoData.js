import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Button from './Button.js'
var fromXML = require("from-xml").fromXML;

const Container = styled.div `
  box-sizing: border-box;
  height: 150px;
  display: flex;
  flex-direction: row;
  background-color: white;
  padding: 10px;
  margin: 5px;
  border-radius: 5px;
`

function PanelButtons(props) {
  const [morningTemp, setMorningTemp] = useState("")
  const [morningIcon, setMorningIcon] = useState("")
  const [afternoonTemp, setAfternoonTemp] = useState("")
  const [afternoonIcon, setAfternoonIcon] = useState("")

  const [maxTemp1, setMaxTemp1] = useState("")
  const [maxTemp2, setMaxTemp2] = useState("")
  const [maxTemp3, setMaxTemp3] = useState("")
  const [minTemp1, setMinTemp1] = useState("")
  const [minTemp2, setMinTemp2] = useState("")
  const [minTemp3, setMinTemp3] = useState("")

  const [icon1, setIcon1] = useState("")
  const [icon2, setIcon2] = useState("")
  const [icon3, setIcon3] = useState("")

  var fromXML = require("from-xml").fromXML;
  const [xml, setXML] = useState("")

  useEffect(() => {
    const url = "https://meteo.arso.gov.si/uploads/probase/www/fproduct/text/sl/forecast_SI_OSREDNJESLOVENSKA_latest.xml"
    fetch(url)
        .then(function(response){
          return response.text();
        })
        .then(function(data) {
          setXML(fromXML(data));
        });
    }, [])


    console.log(xml);

    const handleTake = (i) => {

      console.log(`TAKE: ${i}`)
      setMorningTemp(xml.data.metData[i].tnsyn);
      setAfternoonTemp(xml.data.metData[i].txsyn);

      setMaxTemp1(xml.data.metData[i+1].txsyn);
      setMaxTemp2(xml.data.metData[i+2].txsyn);
      setMaxTemp3(xml.data.metData[i+3].txsyn);

      setMinTemp1(xml.data.metData[i+1].tnsyn);
      setMinTemp2(xml.data.metData[i+2].tnsyn);
      setMinTemp3(xml.data.metData[i+3].tnsyn);

      console.log(`0: ${morningTemp} , ${afternoonTemp}`);
      console.log(`1: ${minTemp1} , ${maxTemp1}`);
      console.log(`2: ${minTemp2} , ${maxTemp2}`);
      console.log(`3: ${minTemp3} , ${maxTemp3}`);
    }

    return(
      <Container>
        <Button onClick = {() => handleTake(0)}>TAKE 1</Button>
        <Button onClick = {() => handleTake(1)}>TAKE 2</Button>
        <Button onClick = {() => handleTake(2)}>TAKE 3</Button>
      </Container>
    )
}

export default PanelButtons
