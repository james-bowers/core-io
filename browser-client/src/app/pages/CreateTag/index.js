import { h, Component } from 'preact'

import { api, download } from './../../Utils'
import { Form } from './../../components/statefull'
import { Input, Button } from './../../components/stateless'

export default class _CreateTag extends Component {

    constructor() {
        super()
        this.onSubmit = this.onSubmit.bind(this)
    }

    onSubmit(values) {
        values.project = this.props.matches.project
        values.config = JSON.parse(values.config)
        console.log('values', values)
        return api('POST', '/create-project-tag', values)
            .then(response => response.json())
            .then(response => response.createStatus)
    }

    render() {
        return (
            <Form action="create-project-tag" submitTxt="Create tag" onSubmit={this.onSubmit}>
                <Input label='Tag name' id='tagName' placeholder='Name of the tag' />
                <Input type="textarea" label='core-io config' id='config' placeholder='paste your core-io config' />
            </Form>
        )
    }
}