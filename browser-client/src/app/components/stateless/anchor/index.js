import { h } from 'preact'
import { Link } from 'preact-router/match';

let normalLink = (e) => {
    // force the load from the server,
    // to get the data needed for the page
    e.stopPropagation()
}

export default (props) => {
    if (props.onClick === undefined) props.onClick = normalLink
    return (
        <Link {...props} />
    )
}
