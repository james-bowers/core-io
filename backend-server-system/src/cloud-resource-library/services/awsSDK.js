let AWS = require('aws-sdk')

let cloudAccessCredentials = require('./cloud-credentials.json')

const getAwsConfig = () => {

    let accessKeyId = cloudAccessCredentials.accessKeyId
    let secretAccessKey = cloudAccessCredentials.secretAccessKey

    let awsConfig = new AWS.Config({
        accessKeyId, secretAccessKey
    });

    awsConfig.setPromisesDependency(require('bluebird'))

    return awsConfig
}

module.exports = (service) => {
    let awsConfig = getAwsConfig()
    return {
        s3: new AWS.S3(awsConfig),
        cf: (region) => {
            awsConfig.update({ region })
            return new AWS.CloudFormation(awsConfig)
        }
    }[service]
}