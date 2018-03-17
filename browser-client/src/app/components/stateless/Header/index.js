import {h} from 'preact'
import { Link } from 'preact-router'

export default () => {
    return (
        <div >
            <Link href='/' class='no_style'>
                <header >
                    <h4 id="example">core-io</h4>
                    <span>Intercloud deployment platform</span>
                </header>
            </Link>
            <nav style='width:200px;'>
                <ul class="menu">
                    <li class="menu-item active">
                        <a href="/sign-up">Sign up</a>
                        <a href="/account">Account</a>
                    </li>
                </ul>
            </nav>
        </div>
    )
}