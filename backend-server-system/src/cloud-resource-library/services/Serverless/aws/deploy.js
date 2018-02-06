const helper = require('./../../../helper')

module.exports = (aws, configuration, resource, awsRegion, tagName, options) => {
    
    let lambda = aws('lambda')(awsRegion)

    let readableRegion = helper.getReadableRegion(resource, awsRegion)
    let functionId = resource.cloudVendorInformation[readableRegion].functionId

    var params = {
        FunctionName: functionId,
        Publish: true,
        ZipFile: options.uploads.serverless_zip.data
    };

    return lambda.updateFunctionCode(params).promise()
}