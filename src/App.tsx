import React, {useEffect, useState, useReducer} from 'react';
import 'grapesjs/dist/css/grapes.min.css';
import {timerPluginRef} from "./timer/consts";
import addTimerPlugin from './timer';
import TemplateDisplay from "./templateDisplay";
import GrapesJS from 'grapesjs';
// import gjsPresetWebpage from 'grapesjs-preset-webpage';
import gjsBasicBlocks from 'grapesjs-blocks-basic';
import { RSA_NO_PADDING } from 'constants';
// import sanityClient  from "./client"


const sanityClient = require("@sanity/client")
const client = sanityClient({
    projectId: "q7chfx37",
    dataset: "production",
    token:
      "sk33g0tUW1jEV9CJ5jAnFdoCyH88J2HNbVTMxwsttHIj4tpM6PM8yfCqNgy2bhVLUkgX24fGnsf5NcOsN", // or leave blank to be anonymous user
    useCdn: true,
  })




const App: React.FC = () => {
    
  

    const [htmlString, setHtmlString] = useState(null);
    const [cssString, setCssString] = useState("");
    const [pluginLoaded, setPluginLoaded] = useState(false);
    const [editor, setEditor] = useState(null);

    useEffect(() => {
        if (!pluginLoaded) {
            // Pass the state setters to the timer plugin, so that each time the bell is pressed these gets called
            // and the TemplateDisplay gets updated withthe new values
            addTimerPlugin(setHtmlString, setCssString);
            setPluginLoaded(true);


          
        }
        else if (!editor) {
            const e = GrapesJS.init({
                container: `#example-editor`,
                fromElement: true,
                plugins: [gjsBasicBlocks, timerPluginRef],
              
                // storageManager: {
                //     type: 'remote',
                //     stepsBeforeSave: 3,
                //     urlStore: `http://localhost:3001/templatedata/store/${1}`,
                //     urlLoad: `http://localhost:3001/templatedata/load/${1}`,
                //     // For custom parameters/headers on requests
                //     params: { _some_token: '....' },
                //     // headers: { Authorization: 'Basic ...' },
                //     headers: { 'Access-Control-Allow-Origin': true,
                //     contentType: "application/json"
                // },
                //   }

                  
            });
            
        //     e.load(res => (
        //         res._type ="templateData",
        //         client.create(res).then(res => {
        //   console.log(`document was created, document ID is ${res._id}`)
        // })
        //     ))
        
            
        }
    });

    return (
        <>
            <div id="example-editor"/>
            <TemplateDisplay jsxString={htmlString} cssString={cssString} />
            {/* <button  onClick={handleClick}>Send Data</button> */}
        </>
    );
}

export default App;
