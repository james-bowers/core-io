const fs = require('fs')
const utils = require('./../../Utils')
const forge = require('node-forge')
const request = require('request')
module.exports = (host, params) => {


    let readStream = request(host + `/sign-up`, {
        method: 'POST',
        body: {
            email: params.email,
            password: params.password
        },
        json:true,
        agentOptions: {
            rejectUnauthorized: false
        }
    })

    let certFilename = 'core-io.p12'

    let writeStream = fs.createWriteStream(certFilename, { encoding: 'binary' })
    readStream.on('data', (chunk) => {
        writeStream.write(chunk)
    })

    let fullPathToCert = utils.fullPath(certFilename)
    utils.print('green', `Your certificate has been saved to ${fullPathToCert}`)

}