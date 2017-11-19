import { h, Component } from 'preact'

import { Form } from './../../components/statefull'
import { Input } from './../../components/stateless'
import {api, download} from './../../Utils'


export default class _SignUp extends Component {

    onSubmit(values) {
        return api('POST', '/sign-up', values)
            .then(response => response.blob())
            .then(blob => {
                download(blob, 'core-io-certificate.p12')
                window.location.href = "/projects"
                return {error: false}
            })
            .catch(e => {
                return { error: true}
            })
    }

    render() {
        return (
            <Form action="sign-up" submitTxt="Sign Up" onSubmit={this.onSubmit}>
                <Input label='Certificate password' id='password' placeholder='Password to open certificate once downloaded' />
                <Input label='Email' id='email' placeholder='Your Email' />
            </Form>
        )
    }
}