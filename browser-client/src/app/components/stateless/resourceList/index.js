import { h } from 'preact'

import { Section, Button } from './../'

let deployResource = (resource) => () => {
    console.log('deploy resource', resource)
}

export default ({ config }) => {
    return (
        <div>
            {config.resources.map(resource => {
                return (
                    <Section>
                        <p>Resource type {resource.service} on the {resource.provider} platform, in region(s) {resource.regions.toString()} </p>
                        <Button text="Deploy" onClick={deployResource(resource)} />
                    </Section>
                )
            })}
        </div>
    )
}