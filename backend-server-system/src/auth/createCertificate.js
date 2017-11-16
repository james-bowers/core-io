const Promise = require('bluebird');
const p = require('pem');

const pem = {
    // createPrivateKey: Promise.promisify(p.createPrivateKey),
    // checkCertificate: Promise.promisify(p.checkCertificate),
    createCSR: Promise.promisify(p.createCSR),
    createCertificate: Promise.promisify(p.createCertificate)
}

const privateRsaKey = require('./settings').privateRsaKey

module.exports = (emailAddress, callback) => {
    pem.createCSR({ emailAddress })
        .then(csr => pem.createCertificate({ days: 100, csr: csr.csr, serviceKey: privateRsaKey, selfSigned: true }))
        .then(pem => {
            p.createPkcs12(pem.serviceKey, pem.certificate, 'chicken', {/* options */ }, callback)
        })

}