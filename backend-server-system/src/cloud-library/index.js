const cloudResource = require('./cloud-resource-library')

const resource = (callback, configuration) => {
    return cloudResource(callback, configuration)
}

const tag = (callback, configuration) => (tagName) => {
    return {
        lock, // true/false, is this tag locked
        sessionVariables // update the session variables for this tag
    }
}

const projectOperations = (callback, configuration) => (operation) => {
    console.log('projectOperations', operation)
    return {
        resource, // creates a new tag using the `config.core-io.json` file
        tag // gets reference to a particular tag version of the project
    }[operation](callback, configuration)
}

module.exports = (projectConfiguration) => (operation) => {

    // authenticate the user using configuration.project
    let isAuthenticated = true;

    let cloudAccessCredentials = require('./../test-credentials.json') // {aws:{}, gcp:{}}


    if (isAuthenticated){
        return getResultAsync({ projectConfiguration, cloudAccessCredentials }, operation)
    } else {
        return Error('Not authenticated to access this project')
    }

    // return isAuthenticated ? projectOperations(resultAction, {projectConfiguration, cloudAccessCredentials}) : Error('Not authenticated to access this project')
}

function getResultAsync(projectConfiguration, operation) {
    return new Promise((resolve, reject) => {
        projectOperations((err, result) => {
            console.log('callback called!')
            if (err !== null) return reject(err);
            resolve(result);
        }, projectConfiguration)(operation)
    });
}