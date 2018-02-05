const Promise = require('bluebird')

module.exports = (gcp, configuration, resource, gcpRegion, tagName) => {
    console.log('create gcp called')

    // configuration.project

    let { authClient, cloudFunctions } = gcp('CloudFunctions')

    let location = `projects/deployments-project/locations/${gcpRegion}`


    return Promise.fromCallback(function (callback) {

        let params = {
            auth: authClient,
            location,
            resource: {
                name: `${location}/functions/helloWorld`, // change name of function from helloWorld
                sourceArchiveUrl: `gs://serverless-core-io-${gcpRegion}/gcp-default-serverless-function.js.zip`,
                httpsTrigger: {},
                availableMemoryMb: 128,
                entryPoint: 'gcp-default-serverless-function.js'
            }
        }

        // console.log('options', JSON.stringify(params, null, 2))

        return cloudFunctions.projects.locations.functions.create(params, callback)

    })
    .then(result => {
        console.log('result', result)
        return result
    })

}