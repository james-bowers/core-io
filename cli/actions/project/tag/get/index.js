const utils = require('./../../../../Utils')

module.exports = (host, params) => {

    return utils.fetch(host + `/get-tag/project/${params.config.projectConfig.project}/tag/${params.tagId}`, {
        method: 'GET',
        json: true
    }, params.certificate)
        .then(responseBody => {
            utils.prettyPrintJson(responseBody.body, 'green')
        })
}