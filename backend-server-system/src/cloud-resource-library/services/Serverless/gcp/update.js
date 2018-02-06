const Promise = require('bluebird'),
    helper = require('./../../../helper'),
    uploadCloudFunc = require('./uploadCloudFunc').usingFileName

module.exports = (gcp, configuration, resource, gcpRegion, tagName, options) => {

    let { authClient, cloudFunctions } = gcp('CloudFunctions')


    let readableRegion = helper.getReadableRegion(resource, gcpRegion)
    let functionId = resource.cloudVendorInformation[readableRegion].functionId
    console.log('updating functionId', functionId)

    let location = `projects/deployments-project/locations/${gcpRegion}`

    let pathToZip = `${__dirname}/function.js.zip`


        return uploadCloudFunc(gcp, pathToZip, functionId, gcpRegion)
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

                console.log('params', JSON.stringify(params, null, 2))

                return cloudFunctions.projects.locations.functions.update(params, callback)
            })

        }).then(result => {
            return { functionId }
        })


}