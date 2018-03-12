const Promise = require('bluebird'), 
      helper = require('./../../../helper'),
      uploadCloudFunc = require('./uploadCloudFunc').usingFileName

module.exports = (gcp, configuration, resource, gcpRegion, tagName, options) => {

    let { authClient, cloudFunctions } = gcp('CloudFunctions')
    
    let location = `projects/deployments-project/locations/${gcpRegion}`
    
    let functionId = options.functionId || helper.genId()
    
    let pathToZip = `${__dirname}/function.js.zip`

    return uploadCloudFunc(gcp, pathToZip, functionId, gcpRegion).then((pathToZip) => {
        
        return Promise.fromCallback(function (callback) {
            let params = {
                auth: authClient,
                location,
                resource: {
                    name: `${location}/functions/${functionId}`,
                    entryPoint: 'main',
                    sourceArchiveUrl: `gs://${pathToZip}`,
                    httpsTrigger: {},
                    availableMemoryMb: 128
                }
            }

            return cloudFunctions.projects.locations.functions.create(params, callback)
        })

    }).then(result => {
        return { functionId }
    })

}