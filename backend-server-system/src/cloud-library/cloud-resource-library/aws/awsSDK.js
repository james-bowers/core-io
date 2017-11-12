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

module.exports = (cloudAccessCredentials) => (service) => {
    // return aws SDK after applying credentials to it

    // let awsCredentials = new aws.Credentials(accessKeyId, secretAccessKey);
    // aws.Credentials = awsCredentials
    // return aws;

    return {
        s3: new AWS.S3(getAwsConfig(cloudAccessCredentials))
    }[service]
}