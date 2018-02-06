// https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Lambda.html#updateFunctionCode-property
const helper = require('./../../../helper')

module.exports = (aws, configuration, resource, awsRegion, tagName, options) => {
    
    console.log('deploy aws serverless')

    let lambda = aws('lambda')(awsRegion)

    let readableRegion = helper.getReadableRegion(resource, awsRegion)
    let functionId = resource.cloudVendorInformation[readableRegion].functionId

    var params = {
        FunctionName: functionId,
        Publish: true,
        ZipFile: options.zipBuffer
    };

    return lambda.updateFunctionCode(params).promise()
}