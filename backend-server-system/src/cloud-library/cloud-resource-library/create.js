let aws = require('./aws')
let gcp = require('./gcp')

module.exports = (configuration) => (tagName) => {

    const createResourceInRegion = (region, resource) => {

        let createAwsResource = aws(configuration).create
        let createGcpResource = gcp(configuration).create

        return {
            "AWS": createAwsResource,
            "GCP": createGcpResource
        }[resource.provider](tagName, region, resource)
    }

    const create = (resource) => {
        resource.regions.forEach(region => createResourceInRegion(region, resource))
    }

    // TODO: get user's credentials
    configuration.projectConfiguration.resources.forEach(resource => create(resource))
}