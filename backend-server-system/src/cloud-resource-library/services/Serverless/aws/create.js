const helper = require('./../../../helper')

let getTemplateBody = (bucketName, environmentVariables, runTime) => {    
    let template = require('./serverless-cloudformation-template')(bucketName, environmentVariables, runTime)
    return JSON.stringify(template, null, 2)
}

let getRuntime = (language) => {
    return {
        'nodejs': 'nodejs6.10'
    }[language]
}

module.exports = (aws, configuration, resource, awsRegion, tagName) => {

    let projectId = configuration.project

    let cloudformation = aws('cf')(awsRegion)

    // generic serverless function code
    let codeBucketName = 'serverless-core-io'

    let stackName = 'stack-' + helper.genId()
    let changeSetName = 'change-' + helper.genId()
    let createChangeSetParams = {
        StackName: changeSetName,
        ChangeSetName: changeSetName,
        ChangeSetType: "CREATE",
        Tags: [
            {
                Key: 'core-io',
                Value: tagName 
            }
        ],
        TemplateBody: getTemplateBody(
            codeBucketName,
            configuration.environmentVariables || {}, 
            getRuntime(resource.properties.language)
        ),
        Capabilities: ["CAPABILITY_IAM"]
    }

    return cloudformation.createChangeSet(createChangeSetParams).promise()
        .then(data => {

            var executeStackChangeParams = {
                ChangeSetName: changeSetName,
                StackName: data.StackId
            };

            // wait for the change set to be created
            return cloudformation.waitFor('changeSetCreateComplete', executeStackChangeParams).promise()

        }).then(changeSetCompleteData => {

            if (changeSetCompleteData.Status !== "CREATE_COMPLETE"){
                throw new Error('Lambda creation failure' + changeSetCompleteData.Status)
            }

            // execute then wait for completion 
            return cloudformation.executeChangeSet({ 
                StackName: changeSetCompleteData.StackId, 
                ChangeSetName: changeSetCompleteData.ChangeSetName 
            }).promise().then(() => {

                // data to be stored with resource
                return {
                    stackName: stackName,
                    stackId: changeSetCompleteData.StackId,
                    changeSetName: changeSetCompleteData.ChangeSetName 
                }
            })

        })

}