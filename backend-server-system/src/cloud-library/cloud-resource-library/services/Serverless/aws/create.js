const { getProjectId, buildResourceName } = require('./../../../helper')

let getTemplateBody = (bucketName, resourceName, environmentVariables, runTime) => {    
    let template = require('./serverless-cloudformation-template')(bucketName, environmentVariables, runTime)
    return JSON.stringify(template, null, 2)
}

module.exports = (aws) => (configuration, resource, awsRegion, tagName) => {

    let projectId = getProjectId(configuration)
    let resourceName = buildResourceName(projectId, tagName, awsRegion, resource.id)

    let bucketWithSourceCode = resourceName;

    let cloudformation = aws('cf')(awsRegion)

    let codeBucketName = 'serverless-core-io' // TODO: update this with the bucket name that the user's .zip code was uploaded to

    let stackName = `stack-${resourceName}`
    let changeSetName = `change-${resourceName}`
    let params = {
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

    cloudformation.createChangeSet(params, (err, data) => {
        if (err) console.log(err, err.stack); // an error occurred
        else console.log(data);           // successful response

        if(!err){

            var params = {
                ChangeSetName: changeSetName,
                StackName: data.StackId
            };
            
            // wait for the change set to be created
            cloudformation.waitFor('changeSetCreateComplete', params, function (err, data) {
                if (err) console.log(err, err.stack); 
                else console.log(data);           

                if(!err){
                    console.log('executing change set')
                    // execute the change set if no error encountered
                    
                    cloudformation.executeChangeSet({ StackName: data.StackId, ChangeSetName: data.ChangeSetName }, (err, data) => {
                        if (err) console.log(err, err.stack); 
                        else console.log(data);           
                    });
                }
            });
        }
    });

}