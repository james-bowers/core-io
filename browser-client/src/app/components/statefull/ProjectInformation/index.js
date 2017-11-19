import { h, Component } from 'preact';
import { Form } from './../../stateless'

import {api} from './../../../Utils'

export default class _ProjectInformation extends Component {
    constructor(){
        super()
        this.state = { project: undefined }
    }

    componentWillMount(){
        api('GET', `/get-project/${this.props.project}`, {})
        .then(response => response.json())
        .then(response => {
            this.setState({ project: response.project })
        })
    }

    renderFull(){
        return <h1>Project {this.state.project.title}</h1>
    }

    render(){
        return this.state.project === undefined ? (<span></span>) : this.renderFull()
    }
}