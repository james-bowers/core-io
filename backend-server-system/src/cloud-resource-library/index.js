const   awsSdk = require('./../cloud-resource-library/services/awsSDK'), 
        gcpSDK = require('./../cloud-resource-library/services/gcpSDK'),
        helper = require('./helper')

let getAction = (action, resource) => {

    let provider = resource.provider.toLowerCase();
    
    return require(`./services/${resource.service}/${provider}/${action}`)
}

let forEachResource = (projectConfig, funcToRun) => {
    projectConfig.resources.forEach(resource => {
        funcToRun(resource)
    })
}

let forEachRegionInResource = (resource, funcToRun) => {
    resource.regions.forEach(region => {
        funcToRun(region)
    })
}

let getCloudVendorSDK = (resource) => {
    return {
        "AWS": awsSdk,
        "GCP": gcpSDK
    }[resource.provider]
}

let formatResults = (results) => {
    let formattedResults = {}

    results.forEach(result => {
        formattedResults[result.resourceId] = result.cloudVendorInformation
    })

    return formattedResults
}

// action could be: [create, deploy]
module.exports = (projectConfig) => (action, tagName, options = {}) => {

    let promisedActions = []

    forEachResource(projectConfig, (resource) => {
        forEachRegionInResource(resource, region => {
            let cloudVendorSDK = getCloudVendorSDK(resource)
            let vendorFormattedRegion = helper.getVendorFormattedRegion(resource, region)

            let cloudAction = getAction(action, resource)
            promisedActions.push(
                cloudAction(cloudVendorSDK, projectConfig, resource, vendorFormattedRegion, tagName, options)
                    .then(result => {
                        return {
                            resourceId: resource.id,
                            cloudVendorInformation: result
                        }
                    })
            )
        })
    })

    return Promise.all(promisedActions).then(results => formatResults(results))
}