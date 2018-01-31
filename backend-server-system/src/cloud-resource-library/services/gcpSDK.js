// const Storage = require('@google-cloud/storage');
let cloudAccessCredentials = require('./cloud-credentials.json')

module.exports = (service) => {
    
    return {
        Storage: Storage(cloudAccessCredentials.gcp)
    }[service]
}