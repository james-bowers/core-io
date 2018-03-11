import { h, Component } from 'preact';
import Form from './../../stateless/form'

export default class _Form extends Component {

    constructor(props) {
        super(props)
        this.state = {
            submitBtnState: false,
            action: props.action
        }

        this.filterToInputs(props.children).forEach(child => {
            this.state[`__f__${child.attributes.id}`] = child.attributes.value
        })

        this.onInput = this.onInput.bind(this)
        this.updateValue = this.updateValue.bind(this)
        this.onCheckBoxChange = this.onCheckBoxChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.getValues = this.getValues.bind(this)
        this.prepare = this.prepare.bind(this)
        this.addInputListener = this.addInputListener.bind(this)
    }

    isInput(element) {
        return element.attributes !== undefined &&
            element.attributes.id !== undefined
    }

    filterToInputs(children) {
        return children.filter(child => this.isInput(child))
    }

    onCheckBoxChange(id, e) {
        let key = `__f__${id}`

        let currentValue = this.state[key]
        let newValue = !currentValue

        this.updateValue(key, newValue)
    }

    onInput(e) {
        let element = e.target
        let key = `__f__${element.id}`
        let value = element.value

        this.updateValue(key, value)
    }

    updateValue(key, value) {
        this.setState({
            [key]: value
        })
    }

    onSubmit(e) {
        e.preventDefault()
        this.setState({ submitBtnState: 'loading' })
        this.props.onSubmit(this.getValues())
            .then(response => {

                let btnErrType = response.error ? 'btn-error' : 'btn-success'

                setTimeout(() => {
                    this.setState({ submitBtnState: btnErrType })
                }, 1000)
            })
    }

    isFormKey(key) {
        return key.substr(0, 5) === '__f__'
    }

    getValues() {
        let res = {}
        Object.keys({ ...this.state })
            .filter(key => this.isFormKey(key))
            .forEach(key => {
                res[key.substr(5)] = this.state[key]
            })
        return res
    }

    addInputListener(child) {
        switch (child.attributes.type) {
            case 'switch':
                child.attributes.onClick = this.onCheckBoxChange.bind(null, child.attributes.id)
                break;
            case 'select':
                child.attributes.onChange = this.onInput
                break;
            default:
                child.attributes.onInput = this.onInput
        }
    }

    prepare(children) {

        return children.map(child => {

            if (this.isInput(child)) {
                this.addInputListener(child)
                child.attributes.value = this.state[`__f__${child.attributes.id}`]
            }
            return child
        })
    }

    render({ submitTxt, children }) {
        return (
            <Form 
                action={this.props.action} 
                submitBtnState={this.state.submitBtnState} 
                submitTxt={submitTxt} 
                onSubmit={this.onSubmit}>
                {this.prepare(children)}
            </Form>
        )
    }
}
