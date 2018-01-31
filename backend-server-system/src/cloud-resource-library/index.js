const   awsSdk = require('./../cloud-resource-library/services/awsSDK'), 
        gcpSDK = require('./../cloud-resource-library/services/gcpSDK'),
        helper = require('./helper')

let runAction = (action, resource) => {

    let provider = resource.provider.toLowerCase();
    
    return require(`./services/${resource.service}/${provider}/${action}`)
}

let forEachResource = (configuration, funcToRun) => {
    configuration.projectConfiguration.resources.forEach(resource => {
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
        "GCP": undefined
    }[resource.provider]
}

// action could be: [create, deploy]
module.exports = (projectConfig) => (action, tagName, options = {}) => {
    
    let configuration = { projectConfig, credentials }
    
    let promisedActions = []

    forEachResource(configuration, (resource) => {
        forEachRegionInResource(resource, region => {
            let cloudVendorSDK = getCloudVendorSDK(resource)
            let vendorFormattedRegion = helper.getVendorFormattedRegion(resource, region)

            let action = runAction(action, resource)
            promisedActions.push(
                action(cloudVendorSDK, configuration, resource, vendorFormattedRegion, tagName, options)
            )
        })
    })

    return Promise.all(promisedActions)
}