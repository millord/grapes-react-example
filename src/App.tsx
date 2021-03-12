import React, { useEffect, useState, useReducer } from "react";
import GrapesJS from "grapesjs";
import grapesjsTabs from "grapesjs-tabs"
import "./index.css";
import gjsBasicBlocks from "grapesjs-blocks-basic";
import HorizontalLabelPositionBelowStepper from "./stepper";
import  RenderHtml from "./timer/components/RenderHtml";
import { renderToStaticMarkup } from 'react-dom/server'
import axios from "axios"

 



const App: React.FC = () => {
  const [pluginLoaded, setPluginLoaded] = useState(false);
  const [editor, setEditor] = useState(null);
  const [boilerPlate, setBoilerPlate] = useState(true)
  const [htmlString, setHtmlString] = useState('')
  console.log(boilerPlate)
  console.log("data from back", htmlString)
 
  

  // var mockData = {
  //   "html": htmlString,
  //   "css": "* {box-sizing: border-box;} body {margin: 0;}body{background-color:#00ffbf;}*{box-sizing:border-box;}body{margin-top:0px;margin-right:0px;margin-bottom:0px;margin-left:0px;font-family:Lato, sans-serif;}.mySlides{display:none;} #navDemo{margin-top:46px;}#icb6y{max-width:2000px;margin-top:46px;}#i5fof{width:100%;}#ie50u{width:100%;}#igbdv{width:100%;}#band{ max-width:800px;}#irrw5{ width:60%;}#i73nh{width:60%;}#ip3y9{ width:60%;}#i0ta4{max-width:800px;}#ibasws{margin:0 -16px;}#irifok{width:100%;}#ihgjdj{width:100%;}#ilp3jg{width:100%;}#contact{max-width:800px;}#iqfa6u{width:30px;}#iwkvvi{width:30px;}#ii8qfq{width:30px;}#i7oe7g{margin:0 -16px 8px -16px;}.w3-black{ background-color:#189a64;}.w3-justify{font-family:Helvetica, sans-serif;}#iak5oi{height:350px;}.tab{padding-top:7px;padding-right:14px;padding-bottom:7px;padding-left:14px;display:inline-block;border-top-left-radius:3px;border-top-right-radius:3px;border-bottom-right-radius:3px;border-bottom-left-radius:3px;margin-right:10px;}.tab:focus{outline-color:initial;outline-style:none;outline-width:initial;}.tab.tab-active{background-color:rgb(13, 148, 230);color:white;}.tab-container{display:inline-block;}.tab-content{animation-duration:1s;animation-timing-function:ease;animation-delay:0s;animation-iteration-count:1;animation-direction:normal;animation-fill-mode:none;animation-play-state:running;animation-name:fadeEffect;}.tab-contents{min-height:100px;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;}#irbo6v{border:solid #000000;}@keyframes fadeEffect{ 0%{opacity:0;}100%{opacity:1;}} "
  // }
  

  // function styleTemplate() {  
    
  //   localStorage.clear()
  //   console.log("DATA", mockData.html)
  //   localStorage.setItem('gjs-html', mockData.html)
  //   localStorage.setItem('gjs-css', mockData.css)
  // }
  
 
  useEffect(() => {
    if (!pluginLoaded) {
      setPluginLoaded(true);
    } else if (!editor) {
      const e = GrapesJS.init({
        container: `#example-editor`,
        fromElement: true,
        plugins: [ gjsBasicBlocks],
        
      }); 
      
      //  axios.get('http://localhost:8000/htmldata').then(res => {

      //  console.log(res)
      //   // const result = res.data.template.htmlString
      //   // console.log( res.data.template.htmlString)
      //   //  setHtmlString(result)
      //   //  styleTemplate()  

      //  })
      
    }
   
  });
  

  return (
    <>
      {boilerPlate ? <RenderHtml setBoilerPlate={setBoilerPlate}/> :  (<><div id="example-editor" /><HorizontalLabelPositionBelowStepper/></>)
      
      }
    </>
  );
};

export default App;
