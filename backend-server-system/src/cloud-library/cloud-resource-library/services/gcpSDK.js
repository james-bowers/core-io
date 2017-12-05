const Storage = require('@google-cloud/storage');

module.exports = (configuration) => (service) => {
    let awsConfig = getAwsConfig(configuration.cloudAccessCredentials)

    // to specify for different account access: https://github.com/GoogleCloudPlatform/nodejs-docs-samples/blob/master/auth/auth.js#L59
    // otherwise uses the same account as core-io is in
    return {
        Storage: Storage()
    }[service]
}