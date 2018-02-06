import { h } from 'preact'

import { Section, Button } from './../'
import resources from './resources'

let deployResource = (resource) => () => {
    console.log('deploy resource', resource)
}

export default ({ tag, matches }) => {
    
    let config = tag.configuration

    if (!config.resources) return ''

    let renderedResources = []

    config.resources.forEach(resource => {
        resource.regions.forEach(region => {

            let ResourceComponent = resources[resource.provider.toLowerCase()][resource.service.toLowerCase()]
            
            renderedResources.push(
                <ResourceComponent matches={matches} resource={resource} region={region} />
            )
        })
    })

    return (
        <div>
            <h3>Resources</h3>
            {renderedResources}
        </div>
    )
}