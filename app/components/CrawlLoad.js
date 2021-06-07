import React, {useState, useEffect, useCallback} from 'react'
import styled  from 'styled-components'
import FileSelector from './FileSelector'
import useInterval from '../hooks/useInterval'
import Panel from './Panel.js'
import InputTitle from './InputTitle.js'
import fs from 'fs'
import Button from './Button.js'

export default function CrawlLoad(props){
  const [crawlPath, setCrawlPath] = useState('SELECT CRAWL FILE')
  const [text, setText] = useState('izberi crawl text')
  const [inputIter, setInputIter] = useState(0)
  const [buttonIsDisabled, setButtonIsdisabled] = useState(false)

  const sendCrawl = () => {
    console.log(crawlPath)
    console.log('refreshing crawl')
    fetch('http://localhost:4545/crawlText', {
      method: 'POST',
      body: JSON.stringify({
        path: crawlPath
      }),
      headers: {'Content-Type': 'application/json'},
    })

  }

  const onInput = () => {
    setInputIter(inputIter + 1)
    console.log(inputIter)
  }

  useEffect(() => {
    sendCrawl()
  }, [inputIter])

  return(
    <Panel>
      <InputTitle text={'CRAWL'} />
      <Button onClick={() => {
        sendCrawl()
        setButtonIsdisabled(true)
        setTimeout(() => setButtonIsdisabled(false), 5000)
      }}>REFRESH CRAWL</Button>
      <div style={{height: '30px'}}></div>
      <FileSelector id={'njok'} onInput={onInput} setPath={setCrawlPath} path={crawlPath}/>
    </Panel>
  )
}
