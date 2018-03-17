const utils = require('./../../../../Utils')

module.exports = (host, config, params, formData) => {
    return utils.fetch(host + `/project/${config.project}/tag/${params.tagId}/deploy`, {
        formData,
        method: 'POST',
    }, params.certificate)
        .then(responseBody => {
            utils.prettyPrintJson(responseBody.body, 'green')
        })
}