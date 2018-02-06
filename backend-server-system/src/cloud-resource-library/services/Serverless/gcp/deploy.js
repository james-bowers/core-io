const Promise = require('bluebird'),
    helper = require('./../../../helper'),
    uploadCloudFunc = require('./uploadCloudFunc').usingBuffer

module.exports = (gcp, configuration, resource, gcpRegion, tagName, options) => {

    let { authClient, cloudFunctions } = gcp('CloudFunctions')

    let readableRegion = helper.getReadableRegion(resource, gcpRegion)
    let functionId = resource.cloudVendorInformation[readableRegion].functionId

    let location = `projects/deployments-project/locations/${gcpRegion}`

    return uploadCloudFunc(gcp, options.zipBuffer, functionId, gcpRegion)
        .then(pathToZip => {

            return Promise.fromCallback(function (callback) {
                let params = {
                    auth: authClient,
                    name: `${location}/functions/${functionId}`,
                    resource: {
                        name: `${location}/functions/${functionId}`,
                        entryPoint: 'main',
                        sourceArchiveUrl: `gs://${pathToZip}`,
                        httpsTrigger: {},
                        availableMemoryMb: 128
                    }
                }

                return cloudFunctions.projects.locations.functions.update(params, callback)
            })

        }).then(result => {
            return { functionId }
        })

}