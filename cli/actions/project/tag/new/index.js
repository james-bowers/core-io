// account
const utils = require('./../../../../Utils')

module.exports = (host, params) => {
    console.log('params', params)
    // return utils.fetch(host + '/create-project-tag', {
    //     method: 'POST',
    //     body: JSON.stringify({
    //         tagName: params.name,
    //         project: params.config.project,
    //         config: params.config
    //     })
    // }, params.certificate)
    //     .then(response => JSON.parse(response.body))
    //     .then(responseBody => {
    //         utils.prettyPrintJson(responseBody, 'blue')
    //     })
}