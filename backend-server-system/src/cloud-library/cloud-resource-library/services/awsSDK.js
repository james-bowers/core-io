// return a configured AWS sdk
let AWS = require('aws-sdk')

const getAwsConfig = (cloudAccessCredentials) => {

    let accessKeyId = cloudAccessCredentials.accessKeyId
    let secretAccessKey = cloudAccessCredentials.secretAccessKey

    let awsConfig = new AWS.Config({
        accessKeyId, secretAccessKey
    });

    awsConfig.setPromisesDependency(require('bluebird'))

    return awsConfig
}



module.exports = (configuration) => (service) => {    
    let awsConfig = getAwsConfig(configuration.cloudAccessCredentials)
    return {
        s3: new AWS.S3(awsConfig),
        cf: (region) => {
            awsConfig.update({ region })
            return new AWS.CloudFormation(awsConfig)
        }
    }[service]
}