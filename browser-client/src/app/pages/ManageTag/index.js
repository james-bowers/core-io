import { h, Component } from 'preact'
import { api, getKeyInformation } from './../../Utils'
import { TagForm } from '../../components/stateless/index';
// import { Empty, Button, Anchor, Section } from './../../components/stateless'

export default class _ManageTag extends Component {

    constructor() {
        super()
        this.state = {
            loaded: false
        }    

        this.renderFull = this.renderFull.bind(this)
        this.getConfiguration = this.getConfiguration.bind(this)
        this.onUpdateTag = this.onUpdateTag.bind(this)
    }

    componentDidMount(props) {
        let { matches } = this.props
        Promise.all([
            api('GET', `/get-tag/project/${matches.project}/tag/${matches.tagId}`, {}).then(response => response.json()),
            api('GET', `/get-project/${matches.project}`, {}).then(response => response.json())
        ]).then(response => {
            return {
                tag: response[0].tag,
                project: response[1].project
            }
        }).then(result => {
            this.setState({
                tag: result.tag,
                project: result.project,
                loaded: true
            })
        })
    }

    getConfiguration(){
        return JSON.stringify(this.state.tag.configuration, null, 2)
    }

    onUpdateTag(values){
        let { matches } = this.props

        values.project = this.props.matches.project
        values.config = JSON.parse(values.config)

        return api('POST', `/update-tag/project/${matches.project}/tag/${matches.tagId}`, values)
            .then(response => response.json())
    
    }

    renderFull(){
        return (
            <TagForm action="update-project-tag" submitTxt="Update tag" onSubmit={this.onUpdateTag} tagName={this.state.tag.title} config={this.getConfiguration()} />
        )
    }

    render(props) {
        console.log('this.state', this.state)
        return this.state.loaded ? this.renderFull() : <p>loading</p>
    }
}