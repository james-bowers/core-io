import { h, Component } from 'preact'

import { api, download } from './../../Utils'
import { Form } from './../../components/statefull'
import { Input, Button, TagForm } from './../../components/stateless'

export default class _CreateTag extends Component {

    constructor() {
        super()
        this.state = {
            project: undefined
        }

        this.onSubmit = this.onSubmit.bind(this)
        this.componentDidMount = this.componentDidMount.bind(this)
        this.buildBaseConfig = this.buildBaseConfig.bind(this)
    }

    onSubmit(values) {
        values.project = this.props.matches.project
        values.config = JSON.parse(values.config)

        return api('POST', '/create-project-tag', values)
            .then(response => response.json())
            .then(response => response.createStatus)
    }

    componentDidMount(){
        api('GET', `/get-project/${this.props.matches.project}`)
            .then(response => response.json())
            .then(project => {
                this.setState({ project })
            })
    }

    buildBaseConfig(){
        
        if (!this.state.project) return 

        let project = this.state.project.project

        let projectId = this.props.matches.project

        return JSON.stringify({
            "title": project.title,
            "project": projectId,
            "environmentVariables": {},
            "resources": [
                "Your list of resources in here"
            ]
        }, null, 2)

    }

    render() {
        
        let config = this.buildBaseConfig()

        if (!config) return <p>Loading</p>

        return (
            <TagForm 
                action="create-project-tag" 
                submitTxt="Create tag" 
                onSubmit={this.onSubmit} 
                tagName="" 
                config={config} />
        )
    }
}