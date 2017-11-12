const cloudResource = require('./cloud-resource-library')

const create = (configuration) => (tagName) => {
    // take the config.core-io.json, and create the resources with the tagName
    // resource created, with just example content uploaded (e.g hello world app)
    return cloudResource(configuration)('create')(tagName);
}

const tag = (configuration) => (tagName) => {
    return {
        lock, // true/false, is this tag locked
        sessionVariables, // update the session variables for this tag
        tearDown, // remove all the resources for this tag from each cloud provider
        deploy: cloudResource(configuration)('deploy')
    }
}

const projectOperations = (configuration) => (operation) => {
    return {
        create, // creates a new tag using the `config.core-io.json` file
        tag // gets reference to a particular tag version of the project
    }[operation](configuration)
}

module.exports = (projectConfiguration) => {

    // authenticate the user using configuration.project
    let isAuthenticated = true;

    let cloudAccessCredentials = require('./../test-credentials.json') // {aws:{}, gcp:{}}

    return isAuthenticated ? projectOperations({projectConfiguration, cloudAccessCredentials}) : Error('Not authenticated to access this project')
}