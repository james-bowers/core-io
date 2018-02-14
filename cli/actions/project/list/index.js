// account
const utils = require('./../../../Utils')

module.exports = (host, params) => {
    return utils.fetch(host + '/get-projects', {}, params.certificate)
        .then(response => JSON.parse(response.body))
        .then(responseBody => {
            utils.prettyPrintJson(responseBody, 'blue')
        })
}