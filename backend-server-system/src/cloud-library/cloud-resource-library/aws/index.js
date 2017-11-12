let awsSDK = require('./awsSDK')

const getAwsRegion = (coreIoRegion) => {
    return {
        "England": "eu-west-2"
    }[coreIoRegion]
}

let createResources = {
    "StaticFileStore": require('./services/StaticFileStore')
}

// let deployResources = {
//     "StaticFileStore"
// }

module.exports =  (configuration) => {
    cloudAccessCredentials = configuration.cloudAccessCredentials.aws

    return {
        create: (tagName, region, resource) => {
            let awsRegion = getAwsRegion(region)
            return createResources[resource.service](awsSDK(cloudAccessCredentials))(configuration, tagName, awsRegion, resource)
        },
        // for static files use createPresignedPost
        deploy: (tagName, region, resource) => {

        } 
    }
}