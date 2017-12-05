const   awsSdk = require('./../cloud-resource-library/services/awsSDK'), 
        gcpSDK = require('./../cloud-resource-library/services/gcpSDK')

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

let getCloudVendorSDK = (configuration, resource) => {
    return {
        "AWS": awsSdk(configuration),
        "GCP": undefined
    }[resource.provider]

}

let getVendorFormattedRegion = (resource, region) => {
    return {
        "AWS": {
            "England": "eu-west-2"
        },
        "GCP": {
            "England": "europe-west2"
        }
    }[resource.provider][region]
}

module.exports = (callback, configuration) => (action) => (tagName) => {
    forEachResource(configuration, (resource) => {
        forEachRegionInResource(resource, region => {
            let cloudVendorSDK = getCloudVendorSDK(configuration, resource)
            let vendorFormattedRegion = getVendorFormattedRegion(resource, region)

            console.log('running action ', action)
            runAction(action, resource)(callback)(cloudVendorSDK)(configuration, resource, vendorFormattedRegion, tagName)
        })
    })
}