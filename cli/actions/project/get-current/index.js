// account
const utils = require('./../../../Utils')

module.exports = (host, params) => {    
    return utils.fetch(host + `/get-project/${params.config.projectConfig.project}`, {
        json: true
    }, params.certificate)
    .then(response => {
        utils.prettyPrintJson(response.body, 'blue')
    })
}