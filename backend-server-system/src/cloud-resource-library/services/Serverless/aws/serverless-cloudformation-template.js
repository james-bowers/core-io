module.exports = (functionPath, environmentVariables, runTime, functionId) => {
    return {
        "AWSTemplateFormatVersion": "2010-09-09",
        "Transform": "AWS::Serverless-2016-10-31",
        "Description": "An AWS Lambda function deployed using core-io.",
        "Resources": {
            "CoreIoServerless": {
                "Type": "AWS::Serverless::Function",
                "Properties": {
                    "FunctionName": functionId,
                    "Handler": "index.handler",
                    "Runtime": runTime,
                    "CodeUri": `s3://${functionPath}.zip`,
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
        }
    }
}
