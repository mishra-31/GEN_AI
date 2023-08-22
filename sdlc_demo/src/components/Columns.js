import React, {Component} from "react";
import { Input } from 'semantic-ui-react';

//https://platform.openai.com/docs/libraries/node-js-library
import{ Configuration, OpenAIApi } from "azure-openai";

process.env.OPENAI_API_TYPE = "azure"
process.env.OPENAI_API_BASE = "https://financial-poc-capegmini.openai.azure.com/"
process.env.OPENAI_API_VERSION = "2023-03-15-preview"
process.env.OPENAI_API_KEY = "147fa51fedb346babf30e8e91b0ad8e5"

class Columns extends Component{
    constructor(props){
        super(props)
        this.state = {
            promptText: 'generate python code to merge two dataframes',
            textBoxA: '',
            textBoxB: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.openAiApi = new OpenAIApi(
            new Configuration({
               apiKey: "147fa51fedb346babf30e8e91b0ad8e5",
               // add azure info into configuration
               azure: {
                  apiKey: "147fa51fedb346babf30e8e91b0ad8e5",                  
                  endpoint: "https://financial-poc-capegmini.openai.azure.com/",
                  // deploymentName is optional, if you donot set it, you need to set it in the request parameter
                  //deploymentName: "gpt-3.5-turbo",
               }
            }),
         );
    };    

    handleChange(event) {
        this.setState({promptText: event.target.promptText});
    }
    
    handleClick(event) {
    this.setState({textBoxA: "Waiting on response",
                   textBoxB: "Waiting on response"});
    event.preventDefault();
    this.submitPrompt_starchat(event);
    this.submitPrompt_openai();
    }

    handleSubmit(event){       
        
    }


    async submitPrompt_openai(){
        
        try{
            const prompt = this.state.promptText + " ";
            const response = await this.openAiApi.createCompletion({
                model: "text-davinci-003",
                prompt: prompt,
                max_tokens: 200,
                top_p: 1,
                frequency_penalty: 0,
                presence_penalty: 0,
                stop: ["{}"]
            });
            try{
                this.setState({textBoxA: response.data.choices[0].text});
            }catch(error){
                const err_msg = "Response error:\n" + error
                this.setState({textBoxA: err_msg});
            }
        }catch(error){
            const err_msg = "Request error:\n" + error
            this.setState({textBoxA: err_msg});
        }
    }

    submitPrompt_starchat = (event) => {
        console.log("Request Start)")
        const prompt = this.state.promptText + " ";
        const prompt_body = JSON.stringify({
            "prompt": prompt
        });
        console.log(prompt_body)
        //fetch("https://w58yxognl8.execute-api.us-east-1.amazonaws.com/V2/starchat-beta", {
        fetch("https://k4eo8qhpd8.execute-api.us-east-1.amazonaws.com/beta/starchat-test", {
                method: 'POST',
                headers: {
                    Accept: 'application.json',
                    "Content-type": "application/json; charset=UTF-8"
                    },
                body: prompt_body
            }).then((response) => {
                console.log("Response test string")
                console.log(response);
                return response.json();
            }).then((data) => {
                console.log("Data test string")
                console.log(data);
                this.setState({textBoxB: data.body});
                return data.body
            }).catch((error) => {
                const err_msg = "Other error:\n" + error
                this.setState({textBoxB: err_msg});
            });
        
    }

    render () {
        return(
            <div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gridGap: 20 }}>
                <div className="Column1">
                    <div>
                        Prompt the models
                    </div>
                    <div>
                        Write a prompt in the prompt box below to generate output from both of the Models A and B.
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gridGap: 20 }}>
                        <div className="ColumnA">
                            <div>Model A</div>
                            <div><textarea rows={10} cols={40} wrap="soft" value={this.state.textBoxA}/></div>
                            <button>Write A</button>
                        </div>
                        <div className="ColumnB">
                            <div>Model B</div>
                            <div><textarea rows={10} cols={40} wrap="hard" value={this.state.textBoxB}/></div>
                            <button>Write B</button>
                        </div>
                    </div>
                    <textarea rows={3} cols={80} wrap="hard"  value={this.state.promptText} onChange={this.handleChange}/>
                    <button onClick={this.handleClick}>Submit</button>
                </div>
                <div className="Column2">
                    <form>
                    <div>Answer the following questions</div>
                    <div>Which models' output qualitty is better?*</div>
                    <div>
                        <input type="radio" value={1} name="quality"/>Model A is better
                        <input type="radio" value={2} name="quality"/>Model B is better
                        <input type="radio" value={3} name="quality"/>It is a tie
                        <input type="radio" value={4} name="quality"/>Both are bad
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gridGap: 12 }}>
                        <div className="ColumnInput1">
                            <div>.</div>
                            <div>
                            <div>
                                <div>% Close to the expected output</div>
                                <div>Both models have generated outputs based on your prompts. How close are the outputs to the expected output? Enter in %.</div>
                            </div>
                            <div>
                                <div>Time needed to be spent on improving the generated output</div>
                                <div>How much time would you have to spend to modify the model generated outputs to match your expected output?</div>
                            </div>
                            </div>
                        </div>
                        <div className="ColumnInput2">
                            <div>Model A</div>
                            <div>
                                <div>Percentage*</div>
                                <div><input className="e-input" type="text"/></div>
                            </div>
                            <div>
                                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gridGap: 3 }}>
                                    <div className="manDays">
                                        <div>Man Days</div>
                                        <div><Input type="text" style={{ width:"50px" }}/></div>
                                    </div>
                                    <div className="spacer">
                                        <div>.</div>
                                        <div>OR</div>
                                    </div>
                                    <div className="hours">
                                        <div>Hours</div>
                                        <div><input type="text"/></div>
                                    </div>
                                    <div className="minutes">
                                        <div>Minutes</div>
                                        <div><input type="text"/></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="ColumnInput3">
                            <div>Model B</div>
                            <div>
                                <div>Percentage*</div>
                                <div><input type="text"/></div>
                            </div>
                            <div><div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gridGap: 3 }}>
                                    <div className="manDays">
                                        <div>Man Days</div>
                                        <div><input type="text"/></div>
                                    </div>
                                    <div className="spacer">
                                        <div>.</div>
                                        <div>OR</div>
                                    </div>
                                    <div className="hours">
                                        <div>Hours</div>
                                        <div><input type="text"/></div>
                                    </div>
                                    <div className="minutes">
                                        <div>Minutes</div>
                                        <div><input type="text"/></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button onClick={this.handleSubmit}> Save Response</button>
                    </form>
                </div>
            </div>
            </div>
        )
    }
}

export default Columns;