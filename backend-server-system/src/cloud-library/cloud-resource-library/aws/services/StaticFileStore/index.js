const {buildBucketName} = require('./../../../helper')

const awsAccessControllValue = (coreIoAccessibilitySetting) => {
    return {
        "public": "public-read",
        "private": "private"
    }[coreIoAccessibilitySetting]
}

module.exports = (aws) => (configuration, tagName, awsRegion, resource) => {

    let s3 = aws('s3')
    console.log('configuration', configuration)
    let projectId = configuration.projectConfiguration.project

    let bucketName = buildBucketName(projectId, tagName, awsRegion, resource.id)

    var params = {
        Bucket: bucketName,
        ACL: awsAccessControllValue(resource.properties.accessibility),
        CreateBucketConfiguration: {
            LocationConstraint: awsRegion
        }
    };

    let createBucketPromise = s3.createBucket(params).promise()
    createBucketPromise.then(data => {
        console.log(data)
        // TODO - store this resource created in the db (to use for proxy service/customer reference) || data = {Location: xxx}
    }).catch(e => {
        console.log(err, err.stack);
    })
}