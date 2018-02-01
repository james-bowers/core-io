const   awsSdk = require('./../cloud-resource-library/services/awsSDK'),
        gcpSDK = require('./../cloud-resource-library/services/gcpSDK')

module.exports = (resource) => {
    return {
        "AWS": awsSdk,
        "GCP": gcpSDK
    }[resource.provider]
}