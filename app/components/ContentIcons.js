import React, {useState, useEffect} from 'react'
import styled  from 'styled-components'
import Label from './Label.js'

const Container = styled.div `
  display:grid;
  width: 450px;
  grid-template-columns: 60% 40%;
  background-color: rgba(2,0,36,1);
  padding: 5px;
  margin: 5px;
  border-radius: 3px;
  justify-items: stretch;
  align-items: stretch;
  color: white;
`
const Left = styled.div `
  grid-column: 1 / 2;
`
const Right = styled.div `
  grid-column: 2 / 3;
`

export default function ContentList(){
  return <Container>
    <Left>
      <ol>
        <li>1 - sunny</li>
        <li>2 - rain with sun</li>
        <li>3 - shower rain</li>
        <li>4 - cloudy with sun</li>
        <li>5 - rain</li>
      </ol>
    </Left>
    <Right>
      <ol>
        <li>8   - cloudy</li>
        <li>10 - snow</li>
        <li>11 - thunder</li>
        <li>12 - fog</li>
      </ol>
    </Right>
  </Container>
}
