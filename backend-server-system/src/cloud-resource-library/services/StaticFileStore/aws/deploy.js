let helper = require('./../../../helper')
const awsAccessControllValue = require('./accessControl')

module.exports = (aws, configuration, resource, awsRegion, tagName, options) => {

    let readableRegion = helper.getReadableRegion(resource, awsRegion)
    let bucket = resource.cloudVendorInformation[readableRegion].bucket

    let s3 = aws('s3')

    let name = options.uploads.static_file.name
    let folderPath = options.folderPath
    let splitter = folderPath ? '/' : ''

    var params = { 
        Bucket: bucket,
        Key: [folderPath, name].join(splitter), 
        Body: options.uploads.static_file.data,
        ACL: awsAccessControllValue(resource.properties.accessibility)
    };

    return s3.upload(params).promise()
}