import styles from './App.css'
import React, { useState, useEffect } from 'react'
import TextInput from './FastTextInput.js'
import FileSelector from './FileSelector.js'

import styled, { createGlobalStyle } from 'styled-components'



const GlobalStyle = createGlobalStyle`
  :root {
    --mainColor1: #2F4858; //temno modra
    --mainColor2: #336699; //svetlej modra
    --textColor: #119977;  //zelena
    --background: white;
  }
  #root {
    height: 100%
  }
  body {
    height: 100%;
    width: 100%;
    margin: auto;
    position: relative;
    overflow: scroll;
    font-size: 1.5em;
    background: var(--background);

    //ozadje
    background-color: var(--mainColor1);
  }
  html {
    height: 100%;
    width: 100%;
    margin: 0;
  }
`
export default function App (props) {
  const [inputIter, setInputIter] = useState(0)
  const [inputPath, setInputPath] = useState('')
  const [output1Path, setOutput1Path] = useState('')
  const [output2Path, setOutput2Path] = useState('')

  const onInput = () => {
    setInputIter(inputIter + 1)
    console.log(inputIter)
  }

  useEffect(() => {
    fetch('http://localhost:4545/paths', {
      method: 'POST',
      body: JSON.stringify({
        input: inputPath,
        output1: output1Path,
        output2: output2Path
      }),
      headers: {'Content-Type': 'application/json'},
    })
  }, [inputPath, output1Path, output2Path])

  return (
    <div>
      <p>file watcher</p>
      <p>INPUT FILE</p>
      <FileSelector id={'input'} onInput={onInput} setPath={setInputPath} path={inputPath}/>
      <p>OUTPUT FILE CLOCK</p>
      <FileSelector id={'output1'} onInput={onInput} setPath={setOutput1Path} path={output1Path}/>
      <p>OUTPUT FILE ATTACK</p>
      <FileSelector id={'output2'} onInput={onInput} setPath={setOutput2Path} path={output2Path}/>
    </div>
  )
}
