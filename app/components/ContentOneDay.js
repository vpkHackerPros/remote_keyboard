import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import FastTextInput from './FastTextInput.js'
import Button from './Button.js'
import Label from './Label.js'

const Container = styled.div `
  margin-right: 10px;
  background: white;
  display: grid;
  grid-template-columns: 150px 100px 80px;
  grid-template-rows: 30px 30px;
  column-gap: 5px;
  row-gap: 5px;
  justify-items: start;
  align-items: start;
`
const LabelMorningTemp = styled.div `
  grid-row: 1 / 2;
  grid-column: 1 / 2;
`
const InputMTemp = styled.div `
  grid-row: 1 / 2;
  grid-column: 2 / 3;
`
const InputMIcon = styled.div `
  grid-row: 1 / 2;
  grid-column: 3 / 4;
`
const LabelNoonTemp = styled.div `
  grid-row: 2 / 3;
  grid-column: 1 / 2;
`
const InputATemp = styled.div `
  grid-row: 2 / 3;
  grid-column: 2 / 3;
`
const InputAIcon = styled.div `
  grid-row: 2 / 3;
  grid-column: 3 / 4;
`

export default function DayPanel(props) {
  return(
    <Container>
      <LabelMorningTemp><Label>Morning Temp:</Label></LabelMorningTemp>
      <InputMTemp><FastTextInput text = {props.morningTemp} setText = {props.setMorningTemp}/></InputMTemp>
      <InputMIcon><FastTextInput text = {props.morningIcon} setText = {props.setMorningIcon}/></InputMIcon>
      <LabelNoonTemp><Label>Afternoon Temp:</Label></LabelNoonTemp>
      <InputATemp><FastTextInput text = {props.afternoonTemp} setText = {props.setAfternoonTemp}/></InputATemp>
      <InputAIcon><FastTextInput text = {props.afternoonIcon} setText = {props.setAfternoonIcon}/></InputAIcon>
    </Container>)
}
