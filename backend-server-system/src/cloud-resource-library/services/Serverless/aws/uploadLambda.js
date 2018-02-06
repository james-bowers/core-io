module.exports = (aws, functionId, codeBucket, uploadBody) => {
    
    let s3 = aws('s3')

    var params = { 
        Bucket: codeBucket, 
        Key: `${functionId}.zip`, 
        Body: uploadBody,
        ContentType: 'application/zip',
        ContentEncoding: 'zip'
    };

    return s3.upload(params).promise()
}

