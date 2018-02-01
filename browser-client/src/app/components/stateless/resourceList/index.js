import { h } from 'preact'

import { Section, Button } from './../'

let deployResource = (resource) => () => {
    console.log('deploy resource', resource)
}

export default ({ config, matches }) => {

    console.log('config', config)

    if (!config.resources) return ''


    let renderedResources = []

    config.resources.forEach(resource => {
        resource.regions.forEach(region => {

            // assumes AWS and serverless... needs refining per vendor/service
            let awsRegion = resource.cloudVendorInformation[region].vendorRegion
            let serverlessId = resource.cloudVendorInformation[region].restApiId
            let serverlessEndpoint = `https://${serverlessId}.execute-api.${awsRegion}.amazonaws.com/Prod/`

            renderedResources.push(
                <Section>
                    <p>Resource type {resource.service} on the {resource.provider} platform, in {region} </p>
                    <a target="_blank" href={serverlessEndpoint}>Visit endpoint</a>
                </Section>
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