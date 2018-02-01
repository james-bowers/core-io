module.exports = (bucketName, environmentVariables, runTime) => {
    return {
        "AWSTemplateFormatVersion": "2010-09-09",
        "Transform": "AWS::Serverless-2016-10-31",
        "Description": "An AWS Lambda function deployed using core-io.",
        "Resources": {
            "CoreIoServerless": {
                "Type": "AWS::Serverless::Function",
                "Properties": {
                    "Handler": "index.handler",
                    "Runtime": runTime || "nodejs6.10",
                    "CodeUri": `s3://${bucketName}/index.js.zip`,
                    "Description": "An AWS Lambda function deployed using core-io.",
                    "MemorySize": 128,
                    "Timeout": 3,
                    "Events": {
                        "ApiGatewayRoutes": {
                            "Type": "Api",
                            "Properties": {
                                "Path": "/",
                                "Method": "ANY"
                            }
                        }
                    },
                    "Environment": {
                        "Variables": environmentVariables
                    }
                }
            }
        },
        "Outputs": {
            "RootUrl": {
                "Description": "Root URL of the API gateway",
                "Value": { "Fn::Join": ["", ["https://", { "Ref": "CoreIoServerless" }, ".execute-api.", { "Ref": "AWS::Region" }, ".amazonaws.com"]] }
            }
        }
    }
}
