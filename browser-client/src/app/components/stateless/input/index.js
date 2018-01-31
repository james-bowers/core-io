import { h } from 'preact'

let basic = (props) => (
    <Wrap {...props}>
        <input {...props} class="form-input" />
    </Wrap>
)

let AddOn = (props) => (
    <Wrap {...props}>
        <div class="input-group">
            <span class="input-group-addon">{props.prefix}</span>
            <input {...props} class="form-input" data-type='input' />
        </div>
    </Wrap>
)

let Wrap = (props) => {
    let label = (props.label && props.type !== 'switch') ? (<label class="form-label" for={props.id}>{props.label}</label>) : <span></span>
    return (
        <div class="form-group">
            {label}
            {props.children}
        </div>
    )
}

let Switch = (props) => {
    return (
        <label class="form-switch">
            {props.label}
            <input type="checkbox" onClick={props.onClick} checked={props.value} />
            <i class="form-icon"></i>
        </label>
    )
}

let Select = (props) => {

    if (!props.value) props.value = props.children[0].attributes.value

    return (
        <select {...props} class="form-select">
            {props.children}
        </select>
    )
}

let Textarea = (props) => (<textarea rows="15" class="form-input" {...props}>{props.value}</textarea>)

export default (props) => {
    switch (props.type) {
        case 'select':
            return (
                <Wrap {...props} class="form-group">
                    <Select {...props} />
                </Wrap>
            )
        case 'switch':
            return (
                <Wrap {...props}>
                    <Switch {...props} />
                </Wrap>
            )
        case 'textarea':
            return (
                <Wrap {...props}>
                    <Textarea {...props} />
                </Wrap>
            )
            break;
        case 'AddOnTxt':
            return <AddOn {...props} />
            break;
        default:
            return basic(props)
    }
}
