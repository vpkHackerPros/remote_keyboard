import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';


const Input = styled.input`
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
`
const Label = styled.label`
  flex: 1; 
  min-width: 200px;
  border: 3px solid var(--background);
  border-radius: 5vh;
  padding: 15px;
  background-color: none;
  font-size: 30px; 
  margin-top: 30px;
  color: white;
  cursor: pointer;
  outline: white;
`
const FileDisplay = styled.div`

`


function FileSelector (props) {
  return (
    <div>
      <Input 
        type={'file'}
        id={props.id}
        onChange={(event) => {
          console.log(event.target.files[0].path)
          props.setPath(event.target.files[0].path)
        }}
        onInput={() => props.onInput()}
        
      />
      <Label 
        htmlFor={props.id}
      >{'file: ' + props.path}</Label>
    </div>
  )
}



export default FileSelector
