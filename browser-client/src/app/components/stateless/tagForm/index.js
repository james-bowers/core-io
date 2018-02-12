

import { h } from 'preact'
import { Form } from './../../statefull'
import { Input, Button } from './../'

export default (props) => {
    let { action, submitTxt, onSubmit, config, tagName } = props
    return (
        <Form action={action} submitTxt={submitTxt} onSubmit={onSubmit}>
            <Input label='Tag name' id='tagName' placeholder='Name of the tag' value={tagName} />
            <Input type="textarea" label='Project config' id='config' placeholder={config} />
        </Form>
    )
}