import {h} from 'preact'

export default ({children, className}) => {
    return (
        <section class={className || ''}>
            {children}
        </section>
    )
}