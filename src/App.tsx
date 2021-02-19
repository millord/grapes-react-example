import React, {useEffect, useState} from 'react';
import 'grapesjs/dist/css/grapes.min.css';
import {timerPluginRef} from "./timer/consts";
import addTimerPlugin from './timer';
import TemplateDisplay from "./templateDisplay";
import GrapesJS from 'grapesjs';
// import gjsPresetWebpage from 'grapesjs-preset-webpage';
import gjsBasicBlocks from 'grapesjs-blocks-basic';
import sanityClient from "./client"



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
              
                storageManager: {
                    // type: 'remote',
                    // stepsBeforeSave: 3,
                    // urlStore: 'http://127.0.0.1:5500',
                    // urlLoad: 'http://127.0.0.1:5500/index.html',
                    // For custom parameters/headers on requests
                    autoload: false,
                  
                  }
            });
            setEditor(e);
            e.load(res => console.log(res,'Load callback'));
            
        }
    });

    return (
        <>
            <div id="example-editor"/>
            <TemplateDisplay jsxString={htmlString} cssString={cssString} />
        </>
    );
}

export default App;
