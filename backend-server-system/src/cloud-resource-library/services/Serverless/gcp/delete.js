const Promise = require('bluebird')

module.exports = (gcp, gcpRegion, functionId ) => {

    let { authClient, cloudFunctions } = gcp('CloudFunctions')

    return Promise.fromCallback(function (callback) {

        let location = `projects/deployments-project/locations/${gcpRegion}`

        let params = {
            auth: authClient,
            name: `${location}/functions/${functionId}`,
        }

        return cloudFunctions.projects.locations.functions.delete(params, callback)
    })

}