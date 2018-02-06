// https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Lambda.html#updateFunctionCode-property

module.exports = (aws, configuration, resource, awsRegion, tagName) => {

    let lambda = aws('lambda')

    let readableRegion = helper.getReadableRegion(resource, awsRegion)
    let functionId = resource.cloudVendorInformation[readableRegion].functionId

    let codeBucketName = `serverless-core-io-${awsRegion}`

    var params = {
        FunctionName: functionId,
        Publish: true,
        S3Bucket: codeBucketName,
        S3Key: functionId,
        ZipFile: options.zipBuffer
    };

 return lambda.updateFunctionCode(params)
}