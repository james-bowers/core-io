import { h } from 'preact'
import {Form} from './../../statefull'
import { Input, Button } from './../'

export default (props) => {
    let { onSubmit, value} = props
    return (
        <Form action="create-project" submitTxt="Create" onSubmit={onSubmit}>
            <Input label='Project name' id='title' placeholder='Name of the new project' value={value} />
        </Form>
    )
}