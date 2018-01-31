const helper = require('./../../../helper')

const awsAccessControllValue = (coreIoAccessibilitySetting) => {
    return {
        "public": "public-read",
        "private": "private"
    }[coreIoAccessibilitySetting]
}

module.exports = (aws, configuration, resource, awsRegion, tagName) => {

    let s3 = aws('s3')

    let projectId = helper.getProjectId(configuration)

    let bucketName = helper.buildResourceName(projectId, tagName, awsRegion, resource.id)

    var params = {
        Bucket: bucketName,
        ACL: awsAccessControllValue(resource.properties.accessibility),
        CreateBucketConfiguration: {
            LocationConstraint: awsRegion
        }
    }

    return s3.createBucket(params).promise()
}