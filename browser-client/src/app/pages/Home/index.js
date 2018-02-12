import { h, Component} from 'preact'
import {Link} from 'preact-router'
import ProjectList from './../../components/statefull/ProjectList'

export default class _Home extends Component {

    render(){
        return (
            <div>
                <Link href="/sign-up">sign up</Link>
                <br />
                <Link href="/account">account</Link>
                <ProjectList />                
            </div>
        )
    }
}