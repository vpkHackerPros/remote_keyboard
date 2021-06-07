import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

const Input = styled.textarea`
  box-sizing: border-box;
  resize: none;
  padding: 20px;
  background-color: white;
  border-radius: 4px;
  height: 60px;
  margin:5px;
  width: 90%;
  color: var(--textColor);
  outline: none;
  font-size: 0.6em;
  &:focus {
    border: 13px solid var(--textColor);
    padding:7px;
  }
`
function FastTextInput (props) {
  const handleChange = (event) => props.setText(event.target.value)
  return (
    <Input type="text" value={props.text} onChange={handleChange} maxLength={`${props.maxLength || 1000}`}/>
  )
}

export default FastTextInput
