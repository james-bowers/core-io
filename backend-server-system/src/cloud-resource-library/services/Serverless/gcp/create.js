const Promise = require('bluebird'), helper = require('./../../../helper')

module.exports = (gcp, configuration, resource, gcpRegion, tagName) => {

    if (gcpRegion !== 'us-central1'){
        throw new Error('GCP cloud functions only supports Iowa region')
    }

    let { authClient, cloudFunctions } = gcp('CloudFunctions')

    let location = `projects/deployments-project/locations/${gcpRegion}`

    console.log('helper.genId()', helper.genId())
    console.log('helper.genId()', helper.genId())
    console.log('helper.genId()', helper.genId())

    return Promise.fromCallback(function (callback) {

        let params = {
            auth: authClient,
            location,
            resource: {
                name: `${location}/functions/helloWorld`, // change name of function from helloWorld
                sourceArchiveUrl: `gs://serverless-core-io-us-central1/function.js.zip`, // ${gcpRegion}
                httpsTrigger: {},
                availableMemoryMb: 128
            }
        }

        console.log('params', JSON.stringify(params, null, 2))

        return cloudFunctions.projects.locations.functions.create(params, callback)

    })
    .then(result => {
        // console.log('result', result)
        return result
    })

}