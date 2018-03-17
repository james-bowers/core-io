// 
const utils = require('./../../../../Utils')

module.exports = (host, params) => {

    return utils.fetch(host + `/get-tags-for-project/${params.config.projectConfig.project}`, {
        method: 'GET',
        json: true
    }, params.certificate)
    .then(responseBody => {
        utils.prettyPrintJson(responseBody.body, 'green')
    })
}