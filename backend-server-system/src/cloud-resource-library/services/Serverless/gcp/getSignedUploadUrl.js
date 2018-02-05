// https://github.com/google/google-api-nodejs-client/blob/6a9b578140f5c3e4ee2caed22fcb89e291affbd5/src/apis/cloudfunctions/v1beta2.ts#L336

const Promise = require('bluebird'), helper = require('./../../../helper')

module.exports = (gcp, configuration, resource, gcpRegion, tagName) => {

    if (gcpRegion !== 'us-central1') {
        throw new Error('GCP cloud functions only supports the Iowa region')
    }

    let { authClient, cloudFunctions } = gcp('CloudFunctions')

    let location = `projects/deployments-project/locations/${gcpRegion}`

    return Promise.fromCallback(function (callback) {

        let params = {
            auth: authClient,
            parent: location            
        }
// 546382492504@cloudservices.gserviceaccount.com
        return cloudFunctions.projects.locations.functions.generateUploadUrl(params, callback)

    }).then(result => {
        // console.log(result)
        // console.log('6235493298', JSON.stringify(result, null, 2))
        return result.data.uploadUrl
    })

}