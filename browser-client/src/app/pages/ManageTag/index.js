import { h, Component } from 'preact'
import { api, getKeyInformation } from './../../Utils'
import { TagForm, ResourceList } from '../../components/stateless';
import { Section } from './../../components/stateless'

export default class _ManageTag extends Component {

    constructor() {
        super()
        this.state = {
            loaded: false
        }    

        this.renderFull = this.renderFull.bind(this)
        this.getConfiguration = this.getConfiguration.bind(this)
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

    renderFull(){
        return (
            <div>
                <h3>Configuration</h3>
                <Section>
                    <pre class="code" data-lang="JSON">
                        {this.getConfiguration()}
                    </pre>
                </Section>
                <ResourceList config={this.state.tag.configuration} />
            </div>
        )
    }

    render(props) {
        return this.state.loaded ? this.renderFull() : <p>loading</p>
    }
}