import { h, Component } from 'preact'

import { api, download } from './../../Utils'
import {Form} from './../../components/statefull'
import { Input, Button } from './../../components/stateless'

export default class _CreateProject extends Component {

    constructor(){
        super()
        this.state = {
            projectConfig: undefined,
            created: false
        }

        this.onSubmit = this.onSubmit.bind(this)
        this.readableConfig = this.readableConfig.bind(this)
        this.downloadConfig = this.downloadConfig.bind(this)
    }

    onSubmit(values){
        return api('POST', '/create-project', values)
        .then(response => response.json())
        .then(response => {
            this.setState({
                projectConfig: response.projectConfig,
                created: true
            })
            return {error: false}
        })
    }

    renderCreateForm(){
        return (
            <Form action="create-project" submitTxt="Create" onSubmit={this.onSubmit}>
                <Input label='Project name' id='title' placeholder='Name of the new project' />
            </Form>
        )
    }

    downloadConfig(){
        let configAsBlob = new Blob([this.readableConfig()], { type: "application/json" });
        download(configAsBlob, 'config.core-io.json')
    }

    readableConfig(){
        return JSON.stringify(this.state.projectConfig, null, 2)
    }

    renderProjectConfigFile(){
        return (
            <div>
                <h3>Your project configuration file</h3>
                <p>Save the following JSON in your config.core-io.json file, in the root of your project directory.</p>
                <Button text="Download your config file" className="centered" onClick={this.downloadConfig} />
                <pre class="code" data-lang="JSON">
                    {this.readableConfig()}
                </pre>
            </div>
        )
    }

    render() {
        return this.state.created ? this.renderProjectConfigFile() : this.renderCreateForm()
    }
}