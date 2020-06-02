import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

const Input = styled.input`
  box-sizing: border-box;
  padding: 3px;
  background-color: white;
  border: 1px solid lightgrey;
  border-radius: 4px;
  height: 80%;
  width: 100%;
  color: black;
  outline: none;
  font-size: 0.5em;
  flex: 1;
  &:focus {
    background-color: lightgrey;
  }
`

function FastTextInput (props) {
  const handleChange = (event) => props.setText(event.target.value)
  return (
    <Input type="text" value={props.text} onChange={handleChange} maxLength={`${props.maxLength || 1000}`}/>
  )
}

export default FastTextInput
