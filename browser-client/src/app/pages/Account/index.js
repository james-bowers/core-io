import { h, Component } from 'preact'
import {api} from './../../Utils'

export default class _Account extends Component {

    constructor(){
        super()
        this.state = { userInformation: undefined }
    }

    componentDidMount(){
        api('GET', '/account', {})
        .then(response => response.json())
        .then(response => {
            this.setState({ userInformation: response})
        })
    }

    renderFull(){
        console.log(this.state.userInformation)
        return (
            <div>
                <h1>Account</h1>
                <h3>Email</h3>
                <p>{this.state.userInformation.cert.emailAddress}</p>
                <h3>Certificate</h3>
                <p>The certificate currently in use expires on the {this.state.userInformation.cert.valid_to}</p>
            </div>
        )
    }

    renderLoading(){
        return (
            <p>Loading...</p>
        )
    }

    render() {
        return this.state.userInformation ? this.renderFull() : this.renderLoading()
    }
}