const fs = require('fs')
const utils = require('./../../Utils')

module.exports = (host, params) => {

    return utils.fetch(host + `/sign-up`, {
        method: 'POST',
        body: {
            email: params.email,
            password: params.password
        },
        json: true
    }, undefined, false)
        .then(response => {

            // save the .p12 certificate
            let timestamp = new Date().getTime()
            let fileName = `${timestamp}.core-io.cert.p12`
            fs.writeFileSync(fileName, response.body)

            utils.print('green', `Your certificate has been saved to ${fileName}`)
        })
}