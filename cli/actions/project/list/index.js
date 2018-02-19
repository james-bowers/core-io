// account
const utils = require('./../../../Utils')

module.exports = (host, params) => {
    return utils.fetch(host + '/get-projects', {
        json:true
    }, params.certificate)
        .then(response => {
            utils.prettyPrintJson(response.body, 'blue')
        })
}