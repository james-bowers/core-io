import { h, Component } from 'preact';
import { api, getKeyInformation } from './../../../Utils'
import { Empty, Button, Section, Anchor} from './../../stateless'
export default class _ProjectList extends Component {
    
    constructor(){
        super()
        this.state = {
            projects: [],
            loading: true
        }
        this.renderProjectDecision = this.renderProjectDecision.bind(this)
    }

    componentWillMount(){
        api('GET', '/get-projects', {})
        .then(response => response.json())
        .then(response => {
            this.setState({ projects: response.projects, loading: false})
        })
    }

    renderEmpty(){
        return (
            <Empty title="No projects" subject="You have not yet created any projects">
                <Button text="Create project" href="/create-project" />
            </Empty>
        )
    }

    renderProjects(){
        let projectsList = [...this.state.projects].map(project => {
            let projectKeyInformation = getKeyInformation(project._key)
            return (
                <Anchor href={`/project/${projectKeyInformation.project}`}>
                    <Section>
                        <h5>{project.title}</h5>
                    </Section>
                </Anchor>
            )
        })

        return (
            <div>
                <h3>Projects</h3>
                {projectsList}
            </div>
        )
    }

    renderProjectDecision(){
        let projects = this.state.projects
        return projects.length === 0 ? this.renderEmpty() : this.renderProjects()
    }

    render(){
        return this.state.loading ? <p>Loading</p> : this.renderProjectDecision()
    }
}