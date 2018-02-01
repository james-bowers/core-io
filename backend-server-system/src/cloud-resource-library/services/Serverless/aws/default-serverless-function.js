var AWS = require('aws-sdk');

exports.handler = function (event, context, callback) {
    callback(null, { "isBase64Encoded": false, "statusCode": 200, "headers": {}, "body": "Serverless function awaiting your code." });
}