import { h, Component} from 'preact'
import {Link} from 'preact-router'

export default class _Home extends Component {

    render(){
        return (
            <div>
                <Link href="/account">account</Link>
                <br />
                <Link href="/projects">projects</Link>
                <br />
                <Link href="/create-project">create project</Link>
                <br />
                <Link href="/sign-up">sign up</Link>
            </div>
        )
    }
}