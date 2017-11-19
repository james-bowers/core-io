import { h, Component } from 'preact'

import { Form } from './../../components/statefull'
import { Input } from './../../components/stateless'
import {api} from './../../Utils'

function download (blob, fileName) {
    let url = window.URL.createObjectURL(blob);
    let a = document.createElement('a')
    a.href = url;
    a.download = fileName;
    a.click();
    window.URL.revokeObjectURL(url);
}

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
            <Form action="something" submitTxt="Sign Up" onSubmit={this.onSubmit}>
                <Input label='Certificate password' id='password' placeholder='Password to open certificate once downloaded' />
                <Input label='Email' id='email' placeholder='Your Email' />
            </Form>
        )
    }
}