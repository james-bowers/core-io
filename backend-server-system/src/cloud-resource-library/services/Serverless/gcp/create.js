const Promise = require('bluebird'), 
      helper = require('./../../../helper'),
      getSignedUploadUrl = require('./getSignedUploadUrl'),
      upload = require('./upload'),
      fs = require('fs')

module.exports = (gcp, configuration, resource, gcpRegion, tagName) => {

    if (gcpRegion !== 'us-central1'){
        throw new Error('GCP cloud functions only supports the Iowa region')
    }

    let { authClient, cloudFunctions } = gcp('CloudFunctions')

    let location = `projects/deployments-project/locations/${gcpRegion}`
    
    let functionId = helper.genId()

    return getSignedUploadUrl(gcp, configuration, resource, gcpRegion, tagName)
            .then(uploadUrl => {
                
                let sourceCode = fs.readFileSync(`${__dirname}/function.js.zip`)

                return upload(authClient, uploadUrl, sourceCode)
                            .then( () => uploadUrl)

            })
            .then(uploadUrl => {

                return Promise.fromCallback(function (callback) {
                    let params = {
                        auth: authClient,
                        location,
                        resource: {
                            name: `${location}/functions/${functionId}`,
                            entryPoint: 'main',
                            sourceUploadUrl: uploadUrl,
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