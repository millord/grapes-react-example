import React, { useEffect, useState, useReducer } from "react";


// import { timerPluginRef } from "./timer/consts";
// import addTimerPlugin from "./timer";
import storageManager from "./timer/storate";
import GrapesJS from "grapesjs";
import grapesjsTabs from "grapesjs-tabs"
import "./index.css";
import gjsBasicBlocks from "grapesjs-blocks-basic";
import axios from "axios";
import HorizontalLabelPositionBelowStepper from "./stepper";

var mockData = {
  "html": "<div class=\"gjs-row\"><div class=\"gjs-cell\"></div></div><div id=\"impu\">THIS IS A TEMPLATE NEW NEW NEWW</div><div class=\"gjs-row\"><div class=\"gjs-cell\" id=\"ik3s\"></div></div>",
  "css": "* { box-sizing: border-box; } body {margin: 0;}.gjs-row{display:table;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;width:100%;}.gjs-cell{width:8%;display:table-cell;height:75px;}#impu{padding:10px;}#ik3s{background-color:#cb3636;}@keyframes fadeEffect{0%{opacity:0;}100%{opacity:1;}}@media (max-width: 768px){.gjs-cell{width:100%;display:block;}}"
}



const App: React.FC = () => {
  const [htmlString, setHtmlString] = useState(null);
  const [cssString, setCssString] = useState("");
  const [pluginLoaded, setPluginLoaded] = useState(false);
  const [editor, setEditor] = useState(null);
  

  const [templateData, setTemplateData] = useState({
    html: "",
    css: "",
  });
  const [done, setDone] = useState(false);
  const [create, setCreate] = useState(false);

  const handleDone = () => {
    setTemplateData({
      html: localStorage.getItem("gjs-html"),
      css: localStorage.getItem("gjs-css"),
    });
    setDone(true);
  };
  const handleClick = async () => {
    console.log("data sent");
    setCreate(true);

    await axios.post(`http://localhost:8000/create/`, { templateData });
    
  };

  console.log("This is the templateData", templateData);

 // call to api using axios
  function styleTemplate() {
    console.log("this is mock data", mockData)
    localStorage.setItem('gjs-html', mockData.html)
    localStorage.setItem('gjs-css', mockData.css)
  }
  
 

  useEffect(() => {
    if (!pluginLoaded) {
    
      setPluginLoaded(true);
      // localStorage.clear()
    } else if (!editor) {
      const e = GrapesJS.init({
        container: `#example-editor`,
        fromElement: true,
        plugins: [ grapesjsTabs,gjsBasicBlocks],
        pluginsOpts: {
          'grapesjs-tabs': {
            
          }
        }
              // storageManager,
      });
      
    }
    
  });

  
 

  return (
    <>
      <button onClick={styleTemplate}>STYLE TEMPLATE</button>
      <div id="example-editor" />
      <HorizontalLabelPositionBelowStepper />
    </>
  );
};

export default App;
