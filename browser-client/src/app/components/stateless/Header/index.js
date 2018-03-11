import {h} from 'preact'
import { Link } from 'preact-router'

export default () => {
    return (
        <Link href='/' class='no_style'>
            <header >
                <h4 id="example">core-io</h4>
                <span>Intercloud deployment platform</span>
            </header>
        </Link>
    )
}