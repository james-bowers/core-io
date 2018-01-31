// const Storage = require('@google-cloud/storage');
let cloudAccessCredentials = require('./cloud-credentials.json')

module.exports = (service) => {
    
    // to specify for different account access: https://github.com/GoogleCloudPlatform/nodejs-docs-samples/blob/master/auth/auth.js#L59
    // otherwise use the same account as core-io is in

    return {
        // Storage: Storage()
    }[service]
}