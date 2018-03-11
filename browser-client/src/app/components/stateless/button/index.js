import { h } from 'preact';
import Anchor from './../anchor'
export default (props) => {
    let { text, className, onClick, href } = props;

    className = className || ''
    props['data-test-id'] = props['data-test-id'] || ''

    if (href) {
        return (
            <Anchor data-test-id={`link_${props['data-test-id']}`} href={href}>
                <button className={`btn ${className}`}>{text}</button>
            </Anchor>
        )
    } else {
        return (
            <button data-test-id={`button_${props['data-test-id']}`} onClick={onClick} className={`btn ${className}`}>{text}</button>
        )
    }
}
