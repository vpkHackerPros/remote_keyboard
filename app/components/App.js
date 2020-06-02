import styles from './App.css'
import React, { useState, useEffect } from 'react'
import TextInput from './FastTextInput.js'
import Panel from './PanelThreeDays.js'
import OneDayPanel from './PanelOneDay.js'
import PanelButtons from './PanelArsoData.js'
import {SocketProvider} from '../hooks/useSocket.js'

import styled, { createGlobalStyle } from 'styled-components'
var fromXML = require("from-xml").fromXML;


/*const url = "https://meteo.arso.gov.si/uploads/probase/www/fproduct/text/sl/forecast_SI_OSREDNJESLOVENSKA_latest.xml"
fetch(url)
    .then(function(response){
      return response.text();
    })
    .then(function(data) {
      //console.log(data);
      //let parser = new DOMParser();
      //xmlDoc = praser.parseFromString(data, 'text/xml');
      //console.log(xmlDoc);
      const xml  = fromXML(data);
      console.log(xml);
      console.log(xml.data.metData[0].txsyn);
    });
*/
const GlobalStyle = createGlobalStyle`
  :root {
    --mainColor1: #020024;
    --mainColor2: #30c4ae;
    --textColor: #757575;
  }
  #root {
    height: 100%
  }
  body {
    font-family: sans-serif;
    height: 100%;
    width: 100%;
    margin: 0;
    position: relative;
    overflow: scroll;
    font-size: 1.5em;
    background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(48,196,174,1) 100%);
  }
  html {
    height: 100%;
    width: 100%;
    margin: 0;
  }
`
const AppContainer = styled.div`
  color: var(--mainColor1);
  height: 100%;
  background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(48,196,174,1) 100%);
`


export default function App (props) {
  return (
    <SocketProvider connection={{ip:'localhost', port:6100}}>
      <GlobalStyle/>
      <PanelButtons/>
      <OneDayPanel/>
      <Panel/>
    </SocketProvider>
  );
}
