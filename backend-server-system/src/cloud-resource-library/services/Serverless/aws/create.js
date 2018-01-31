const { getProjectId, buildResourceName } = require('./../../../helper')

let getTemplateBody = (bucketName, resourceName, environmentVariables, runTime) => {    
    let template = require('./serverless-cloudformation-template')(bucketName, environmentVariables, runTime)
    return JSON.stringify(template, null, 2)
}

module.exports = (aws, configuration, resource, awsRegion, tagName) => {

    let projectId = getProjectId(configuration)
    let resourceName = buildResourceName(projectId, tagName, awsRegion, resource.id)

    let cloudformation = aws('cf')(awsRegion)

    let codeBucketName = 'serverless-core-io' // TODO: update this with the bucket name that the user's .zip code was uploaded to

    let stackName = `stack-${resourceName}`
    let changeSetName = `change-${resourceName}`
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
            resourceName, 
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
        })

}