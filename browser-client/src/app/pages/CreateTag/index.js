import { h, Component } from 'preact'

import { api, download } from './../../Utils'
import { Form } from './../../components/statefull'
import { Input, Button, TagForm } from './../../components/stateless'

export default class _CreateTag extends Component {

    constructor() {
        super()
        this.onSubmit = this.onSubmit.bind(this)
    }

    onSubmit(values) {
        values.project = this.props.matches.project
        values.config = JSON.parse(values.config)

        return api('POST', '/create-project-tag', values)
            .then(response => response.json())
            .then(response => response.createStatus)
    }

    render() {
        return (
            <TagForm action="create-project-tag" submitTxt="Create tag" onSubmit={this.onSubmit} tagName="" config="" />
        )
    }
}