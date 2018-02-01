const   getCloudVendorSDK = require('./getCloudVendorSDK'),
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


let formatResults = (results) => {
    let formattedResults = {}

    results.forEach(result => {

        if (!formattedResults[result.resourceId]){
            formattedResults[result.resourceId] = {}
        }

        formattedResults[result.resourceId][result.region] = result.cloudVendorInformation
    })

    return formattedResults
}

// action could be: [create, deploy]
// valid AWS regions: England, Ireland, California
// valid GCP regions: England, Belgium
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
                            region,
                            resourceId: resource.id,
                            cloudVendorInformation: result
                        }
                    })
            )
        })
    })

    return Promise.all(promisedActions).then(results => formatResults(results))
}