const   helper = require('./../../../helper'),
        Promise = require('bluebird'),
        promisePoller = require('promise-poller').default;

let getTemplateBody = (bucketName, environmentVariables, runTime) => {    
    let template = require('./serverless-cloudformation-template')(bucketName, environmentVariables, runTime)
    return JSON.stringify(template, null, 2)
}

let getRuntime = (language) => {
    return {
        'nodejs': 'nodejs6.10'
    }[language]
}

let pollUntilResult = (cloudformation, stackName) => {
    let pollStackStatus = () => cloudformation.describeStackResources({ 
        StackName: stackName,
        LogicalResourceId: 'ServerlessRestApi'
    }).promise().then(result => {
        return result.StackResources[0]
    })

    return promisePoller({
        taskFn: pollStackStatus,
        interval: 20000,
        retries: 20,
        shouldContinue: (err, result) => {
            
            if(err) return true
            
            if (result && result.ResourceStatus === 'CREATE_COMPLETE') return false

            return true
        }
    })
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
            }).promise()
                .then(() => pollUntilResult(cloudformation, changeSetCompleteData.StackId))

        }).then(result => {
            // awsRegion
            return {
                vendorRegion: awsRegion,
                restApiId: result.PhysicalResourceId,
                stackId: result.StackId,
                stackName: result.StackName
            }
        })

}

// 