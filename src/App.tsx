import React, { useEffect, useState, useReducer } from "react";

// import { timerPluginRef } from "./timer/consts";
// import addTimerPlugin from "./timer";
import storageManager from "./timer/storate";
import GrapesJS from "grapesjs";
import "./index.css";
import gjsBasicBlocks from "grapesjs-blocks-basic";
import axios from "axios";
import HorizontalLabelPositionBelowStepper from "./stepper";

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

  useEffect(() => {
    if (!pluginLoaded) {
      //   addTimerPlugin(setHtmlString, setCssString);
      setPluginLoaded(true);
      // localStorage.clear()
    } else if (!editor) {
      const e = GrapesJS.init({
        container: `#example-editor`,
        fromElement: true,
        plugins: [gjsBasicBlocks],
        storageManager,
      });
    }
  });

  return (
    <>
      <div id="example-editor" />
      <HorizontalLabelPositionBelowStepper />
    </>
  );
};

export default App;
