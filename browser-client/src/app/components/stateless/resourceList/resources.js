import { h } from 'preact'
import { Section, Button } from './../'

let gcp = {
    serverless: ({ resource, region, matches }) => {
        return (
            <Section>
                <p>Resource type {resource.service} on the {resource.provider} platform, in {region}</p>
                <form 
                    encType="multipart/form-data"
                    method='POST' 
                    action={`https://localhost:5000/project/${matches.project}/tag/${matches.tagId}/deploy`}>
                    <input type='file' name='serverless_zip' />
                    <input type='submit' value='Deploy' />
                </form>
            </Section>
        )
    },
    staticfilestore: ({ resource, region, matches }) => {
        return (
            <Section>
                <p>Resource type {resource.service} on the {resource.provider} platform, in {region}</p>
                <form
                    encType="multipart/form-data"
                    method='POST'
                    action={`https://localhost:5000/project/${matches.project}/tag/${matches.tagId}/deploy`}>
                    <input type='text' name='folderPath' />
                    <input type='file' name='static_file' />
                    <input type='submit' value='Deploy' />
                </form>
            </Section>
        )
    }
}

let aws = {
    serverless: ({ resource, region, matches }) => {
        // assumes AWS and serverless... needs refining per vendor/service
        let awsRegion = resource.cloudVendorInformation[region].vendorRegion
        let serverlessId = resource.cloudVendorInformation[region].restApiId
        let serverlessEndpoint = `https://${serverlessId}.execute-api.${awsRegion}.amazonaws.com/Prod/`

        return (
            <Section>
                <p>Resource type {resource.service} on the {resource.provider} platform, in {region}</p>
                <a target="_blank" href={serverlessEndpoint}>Visit endpoint</a>
                <form
                    encType="multipart/form-data"
                    method='POST'
                    action={`https://localhost:5000/project/${matches.project}/tag/${matches.tagId}/deploy`}>
                    <input type='file' name='serverless_zip' />
                    <input type='submit' value='Deploy' />
                </form>
            </Section>
        )
    },
    staticfilestore: ({ resource, region, matches }) => {
        return (
            <Section>
                <p>Resource type {resource.service} on the {resource.provider} platform, in {region}</p>
                <form
                    encType="multipart/form-data"
                    method='POST'
                    action={`https://localhost:5000/project/${matches.project}/tag/${matches.tagId}/deploy`}>
                    <input type='text' name='folderPath' />
                    <input type='file' name='static_file' />
                    <input type='submit' value='Deploy' />
                </form>
            </Section>
        )
    }
}


module.exports = {
    gcp,
    aws
}