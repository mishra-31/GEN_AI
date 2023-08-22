//import React from 'react';
process.env.OPENAI_API_TYPE = "azure"
process.env.OPENAI_API_BASE = "https://financial-poc-capegmini.openai.azure.com/"
process.env.OPENAI_API_VERSION = "2023-03-15-preview"
process.env.OPENAI_API_KEY = "147fa51fedb346babf30e8e91b0ad8e5"
process.env.ORG_ID = "YOUR_ORG_ID"
//https://platform.openai.com/docs/libraries/node-js-library
const { Configuration, OpenAIApi } = require("openai");
const fetch = require("fetch-node").default
const configuration = new Configuration({
    organization: process.env.ORG_ID,
    apiKey: "147fa51fedb346babf30e8e91b0ad8e5",
    apiType: process.env.OPENAI_API_TYPE,
    apiVersion: process.env.OPENAI_API_VERSION,
    apiBase: process.env.OPENAI_API_BASE,
});
const openai = new OpenAIApi(configuration);

async function submitPrompt(){
try{
    //const response = await openai.listEngines();
    const chat_completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: "Hello world" }],
    });
    console.log(chat_completion)
}catch(error){
    console.log(error)
}
    //this.setState({textBoxA: chat_completion})
}
//submitPrompt();


const starchat_fetch =  () => {
    const prompt_body = JSON.stringify({
        "prompt": 'Generate test text'
    });
    fetch("https://w58yxognl8.execute-api.us-east-1.amazonaws.com/V2/starchat-beta", {
        method: 'POST',
        headers: {
            "Content-type": "application/json; charset=UTF-8"
            },
        body: prompt_body
    }).then((response) => {
        console.log("Response test string")
        //console.log(response);
        response.json();
    }).then((data) => {
        console.log(JSON.parse(data));
        console.log("Data test string")
        //this.setState({textBoxB: JSON.parse(data)});
    });
}
starchat_fetch();
/*
const Test1 = () => {
    style = {
        column:[
            {
                id:1,
                title: 'Entry'
            },
            {
                id:2,
                title: 'Grad'
            }
        ]
    }
    return (
        <div id="Test1Class">
            Test
        </div>

    )
}

export default Test1;*/