const helper = require('./../../../helper')

module.exports = (gcp, configuration, resource, gcpRegion, tagName) => {

    console.log('b4 get storage')
    let storage = gcp('Storage')
    console.log('after get storage')

    let projectId = configuration.project

    let bucketName = helper.genId()

    let bucket = storage.bucket(bucketName);

    let createBucketOptions = {
        multiRegional: false,
        location: gcpRegion,
    }

    return bucket.create(createBucketOptions).then(bucketResult => {
        
        if (resource.properties.accessibility === 'public') {
            return bucket.makePublic()
        }
        
    }).then(() => {
        return {
            bucket: bucketName
        }
    })

}