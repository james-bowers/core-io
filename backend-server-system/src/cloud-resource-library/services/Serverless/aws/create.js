const helper = require('./../../../helper')

let getTemplateBody = (bucketName, environmentVariables, runTime) => {    
    let template = require('./serverless-cloudformation-template')(bucketName, environmentVariables, runTime)
    return JSON.stringify(template, null, 2)
}

module.exports = (aws, configuration, resource, awsRegion, tagName) => {

    let projectId = configuration.project

    let cloudformation = aws('cf')(awsRegion)

    // generic serverless function code
    let codeBucketName = 'serverless-core-io'

    let stackName = helper.genId() // `stack-${resourceName}`
    let changeSetName = helper.genId() // `change-${resourceName}`
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
            resource.properties.language
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

        }).then(changeSetData => {
            return cloudformation.executeChangeSet({ StackName: changeSetData.StackId, ChangeSetName: changeSetData.ChangeSetName }).promise()
        }).then(changeSetResult => {

            console.log('changeSetResult', changeSetResult)

            return {
                changeSetName,
                stackName
            }
        })

}