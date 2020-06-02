import React, { useState, useEffect } from 'react'
import {useSocket} from '../hooks/useSocket.js'
import styled from 'styled-components'
import FastTextInput from './FastTextInput.js'
import Button from './Button.js'
import Label from './Label.js'

const Container = styled.div `
  margin-right: 10px;
  background: white;
  display: grid;
  grid-template-columns: 150px 100px 80px;
  grid-template-rows: 30px 30px 30px;
  column-gap: 5px;
  row-gap: 5px;
  justify-items: start;
  align-items: start;
`
const StrechedTop = styled.div `
  display: flex;
  flex-direction:row;
  grid-column: 2 / 4;
  grid-row: 2 / 3;
  align-content: stretch;
  width: 100%;
`
const StrechedBottom = styled.div `
  display: flex;
  flex-direction:row;
  grid-column: 2 / 4;
  grid-row: 3 / 4;
  align-content: stretch;
  width: 100%;
`

const InputDay = styled.div `
  grid-column: 2 / 3;
  grid-rowt: 1 / 2;
`

const InputMTemp = styled.div `
  flex: 2;
`
const InputMIcon = styled.div `
  flex: 1;
  margin-left: 5px;
`

const InputATemp = styled.div `
  flex: 2;
`

const LabelDay = styled.div `
  grid-column: 1 / 2;
  grid-row: 1 / 2;
`

const LabelMorningTemp = styled.div `
  grid-column: 1 / 2;
  grid-row: 2 / 3;
`

const LabelNoonTemp = styled.div `
  grid-column: 1 / 2;
  grid-row: 3 / 4;
`

const InButton = styled.div `
  grid-column: 2 / 3;
  grid-row: 4 / 5;
  align-self: stretch;
  justify-self: stretch;
`
const OutButton = styled.div `
  grid-column: 3 / 4;
  grid-row: 4 / 5;
  align-self: stretch;
  justify-self: stretch;
`

export default function DayPanel(props) {
  return(
    <Container>
      <LabelDay><Label>Day:</Label></LabelDay>
      <LabelMorningTemp><Label>Morning Temp:</Label></LabelMorningTemp>
      <LabelNoonTemp><Label>Afternoon Temp:</Label></LabelNoonTemp>
      <InputDay><FastTextInput text = {props.day} setText = {props.setDay}/></InputDay>
      <StrechedTop>
        <InputMTemp><FastTextInput text = {props.morningTemp} setText = {props.setMorningTemp}/></InputMTemp>
        <InputMIcon><FastTextInput text = {props.morningIcon} setText = {props.setMorningIcon}/></InputMIcon>
      </StrechedTop>
      <StrechedBottom>
        <InputATemp><FastTextInput text = {props.afternoonTemp} setText = {props.setAfternoonTemp}/></InputATemp>
        {props.children}
      </StrechedBottom>
    </Container>)
}
