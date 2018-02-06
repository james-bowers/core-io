const Promise = require('bluebird'),
    helper = require('./../../../helper')
    // uploadCloudFunc = require('./uploadCloudFunc').usingBuffer,
    // deleteFunction = require('./delete'),
    // createFunction = require('./create')

module.exports = (gcp, configuration, resource, gcpRegion, tagName, options) => {

    return require('./update')(gcp, configuration, resource, gcpRegion, tagName, options)

    // let { authClient, cloudFunctions } = gcp('CloudFunctions')

    // let readableRegion = helper.getReadableRegion(resource, gcpRegion)
    // let functionId = resource.cloudVendorInformation[readableRegion].functionId


    // // upload new func
    // return uploadCloudFunc(gcp, options.zipBuffer, functionId, gcpRegion).then((pathToZip) => {
    
    //     // delete the old
    //     return Promise.delay(5000)
    //     .then(() => deleteFunction(gcp, gcpRegion, functionId))
    //     .then(() => {
    //         // create the new
    //         return createFunction(gcp, configuration, resource, gcpRegion, tagName, { functionId })
    //     })

    // }).then(result => {
    //     return { functionId }
    // })

}






