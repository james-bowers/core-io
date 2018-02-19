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


    let writeStream = fs.createWriteStream('core-io.p12', { encoding: 'binary' })
    readStream.on('data', (chunk) => {
        writeStream.write(chunk)
    })

    let fullPathToCert = utils.fullPath('core-io.p12')

    utils.print('green', `Your certificate has been saved to ${fullPathToCert}`)

}