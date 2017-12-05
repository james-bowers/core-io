import { h, Component } from 'preact';
import { Form, ProjectForm } from './../../stateless'

import {api} from './../../../Utils'

export default class _ProjectInformation extends Component {
    constructor(){
        super()
        this.state = { project: undefined }

        this.readAbleProjectConfiguration = this.readAbleProjectConfiguration.bind(this)
    }

    componentWillMount(){
        api('GET', `/get-project/${this.props.project}`, {})
        .then(response => response.json())
        .then(response => {
            this.setState({ project: response.project })
        })
    }

    readAbleProjectConfiguration(){
        return JSON.stringify(this.state.project.project)
    }

    renderFull(){
        return (
            <div>
                <h1>Project {this.state.project.title}</h1>
            </div>
        )
    }

    render(){
        return this.state.project === undefined ? (<span></span>) : this.renderFull()
    }
}