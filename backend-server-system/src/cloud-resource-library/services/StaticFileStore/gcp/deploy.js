const helper = require('./../../../helper')

module.exports = (gcp, configuration, resource, gcpRegion, tagName, options) => {

    let readableRegion = helper.getReadableRegion(resource, gcpRegion)
    let bucketName = resource.cloudVendorInformation[readableRegion].bucket

    let storage = gcp('Storage')
    let bucket = storage.bucket(bucketName)

    let fileKey = helper.buildKeyPath(options.folderPath, options.uploads.static_file.name)
    
    let file = bucket.file(fileKey)
    let staticFileBuffer = options.uploads.static_file.data

    return file.save(staticFileBuffer)
}