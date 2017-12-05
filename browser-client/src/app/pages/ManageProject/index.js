import { h, Component } from 'preact'
import { api,getKeyInformation } from './../../Utils'
import { ProjectInformation } from './../../components/statefull'
import { Empty, Button, Anchor, Section } from './../../components/stateless'

export default class _ManageProject extends Component {

    constructor(){
        super()
        this.state = {
            loaded: false,
            tags: []
        }
        this.createTagButton = this.createTagButton.bind(this)
    }

    createTagButton(){
        return <Button className='centered' text="Create tag" href={`/create-tag/${this.props.matches.project}`} />
    }

    componentDidMount(props){
        let { matches } = this.props
        api('GET', `/get-tags-for-project/${matches.project}`, {})
            .then(response => response.json())
            .then(response => {
                this.setState({
                    tags: response.tags,
                    loaded: true
                })
            })
    }

    renderEmpty(){
        return (
            <Empty title="No tags" subject="This project has no tags">
                {this.createTagButton()}
            </Empty>
        )
    }

    renderTags() {
        let tagsList = [...this.state.tags].map(tag => {
            let tagKeyInformation = getKeyInformation(tag._key)
            return (
                <Anchor href={`/project/${tagKeyInformation.project}/tag/${tagKeyInformation.tagId}`}>
                    <Section>
                        <h5>{tag.title}</h5>
                    </Section>
                </Anchor>
            )
        })

        return (
            <div>
                <ProjectInformation project={this.props.matches.project} />
                <h3>Tags</h3>
                {this.createTagButton()}
                {tagsList}
            </div>
        )
    }

    renderDecision(){
        return this.state.tags.length === 0 ? this.renderEmpty() : this.renderTags()
    }


    render(props) {
        console.log('this.state', this.state)
        return this.state.loaded ? this.renderDecision() : <p>Loading...</p>
    }
}