import React, {useEffect, useState} from 'react';
import { Style } from "react-style-tag";
import JsxParser from "react-jsx-parser";
import Timer from "react-compound-timer";
import styled from 'styled-components';
import { Console } from 'console';

const Prompt = styled.div`
    font-size: 1.5em
`;
const LiveTemplate = styled.div`
    margin: 20px;
    padding: 20px;
    border: ${props => !props.jsxString ? 'dashed black' : 'none'};
    };
`;

/**
 * Display a react com
 * @param jsxString
 * @param cssString
 * @constructor
 */


const sanityClient = require("@sanity/client")
const client = sanityClient({
    projectId: "q7chfx37",
    dataset: "production",
    token:
      "sk33g0tUW1jEV9CJ5jAnFdoCyH88J2HNbVTMxwsttHIj4tpM6PM8yfCqNgy2bhVLUkgX24fGnsf5NcOsN", // or leave blank to be anonymous user
    useCdn: true,
  })


const TemplateDisplay = ({jsxString, cssString}) => {
    let result = {
        _type: "templateData",
        styles:  cssString,
        content: jsxString,
        
    }

    // console.log("This is the result",result)
     // CREATE IN SANITY
        // client.create(result).then(res => {
        //   console.log(`document was created, document ID is ${res._id}`)
        // })


    if (!jsxString) {
        return (
            <LiveTemplate jsxString={jsxString}>
                <Prompt>Press the <span className='fa fa-bell'></span> bell icon in the editor's toolbar to copy the template HTML/JSX here to have a live version of it!</Prompt>
            </LiveTemplate>
        );
    }
    return (
        <LiveTemplate jsxString={jsxString}>
            <Style>{cssString}</Style>
            <JsxParser components={{Timer}} jsx={jsxString} bindings={
                {
                    // This is called from the formatValue attribute of the Timer coming in htmlString
                    formatValue: (value) => `${(value < 10 ? `0${value}` : value)}`
                }
            }/>
        </LiveTemplate>
    );
}

export default TemplateDisplay;