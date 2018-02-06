const   helper = require('./../../../helper'),
        Promise = require('bluebird'),
        promisePoller = require('promise-poller').default,
        uploadLambda = require('./uploadLambda'),
        fs = require('fs')

let getTemplateBody = (functionPath, environmentVariables, runTime, functionId) => {    
    let template = require('./serverless-cloudformation-template')(functionPath, environmentVariables, runTime, functionId)
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

    let functionId = helper.genId()

    let projectId = configuration.project

    let cloudformation = aws('cf')(awsRegion)
    
    let codeBucket = `serverless-core-io-${awsRegion}`
        
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
            `${codeBucket}/${functionId}`,
            configuration.environmentVariables || {}, 
            getRuntime(resource.properties.language),
            functionId
        ),
        Capabilities: ["CAPABILITY_IAM"]
    }

    let defaultLambdaFunctionPath = `${__dirname}/default-function.js.zip`
    let lambaBuffer = fs.readFileSync(defaultLambdaFunctionPath);

    return uploadLambda(aws, functionId, codeBucket, lambaBuffer)
        .then(() => cloudformation.createChangeSet(createChangeSetParams).promise())
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
            return {
                functionId,
                vendorRegion: awsRegion,
                restApiId: result.PhysicalResourceId,
                stackId: result.StackId,
                stackName: result.StackName
            }
        })
        .catch(e => {
            console.log('creation error', e)
        })

} 