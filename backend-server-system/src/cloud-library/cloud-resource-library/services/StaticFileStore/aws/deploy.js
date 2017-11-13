let { getProjectId, buildResourceName } = require('./../../../helper')

module.exports = (aws) => (configuration, resource, awsRegion, tagName) => {

    let s3 = aws('s3')

    let projectId = getProjectId(configuration)

    let bucketName = buildResourceName(projectId, tagName, awsRegion, resource.id)

    var params = {
        Bucket: bucketName,
        Fields: {
            key: '/'
        }
    };
    
    s3.createPresignedPost(params, (err, data) => {
        if (err) {
            console.error('Presigning post data encountered an error', err);
        } else {
            console.log('The post data is', data);
        }
    });

}