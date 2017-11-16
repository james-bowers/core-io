const { buildResourceName, getProjectId} = require('./../../../helper')

const awsAccessControllValue = (coreIoAccessibilitySetting) => {
    return {
        "public": "public-read",
        "private": "private"
    }[coreIoAccessibilitySetting]
}

module.exports = (callback) => (aws) => (configuration, resource, awsRegion, tagName) => {

    let s3 = aws('s3')

    let projectId = getProjectId(configuration)

    let bucketName = buildResourceName(projectId, tagName, awsRegion, resource.id)

    var params = {
        Bucket: bucketName,
        ACL: awsAccessControllValue(resource.properties.accessibility),
        CreateBucketConfiguration: {
            LocationConstraint: awsRegion
        }
    }

    let createBucketPromise = s3.createBucket(params).promise()
    createBucketPromise.then(data => {
        callback(null, data)
    }).catch(e => {
        callback(e, null)
    })
}