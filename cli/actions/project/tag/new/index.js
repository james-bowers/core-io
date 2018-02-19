const utils = require('./../../../../Utils')

module.exports = (host, params) => {
    
    return utils.fetch(host + '/create-project-tag', {
        method: 'POST',
        body: {
            tagName: params.name,
            project: params.config.projectConfig.project,
            config: params.config.projectConfig
        },
        json: true
    }, params.certificate)
        .then(responseBody => {
            utils.prettyPrintJson(responseBody.body, 'blue')
        })
}