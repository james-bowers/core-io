const Storage = require('@google-cloud/storage'),
    { auth } = require('google-auth-library'),
    { cloudfunctions } = require('googleapis');

let cloudAccessCredentials = require('./cloud-credentials.json')

const getCloudFunctions = () => {

    let cf = cloudfunctions('v1beta2')

    let authClient = auth.fromJSON(cloudAccessCredentials.gcp)

    authClient = authClient.createScoped([
        'https://www.googleapis.com/auth/cloud-platform'
    ]);

    return {
        cloudFunctions: cf,
        authClient
    }
    
    // return authClient.authorize().then(data => {
        // return {
        //     cloudFunctions,
        //     authClient
        // }
    // }) 
}

module.exports = (service) => {
    return {
        Storage: Storage({credentials: cloudAccessCredentials.gcp}),
        CloudFunctions: getCloudFunctions()
    }[service]
}