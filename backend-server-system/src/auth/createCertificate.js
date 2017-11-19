const Promise = require('bluebird');
const p = require('pem');

const pem = {
    // createPrivateKey: Promise.promisify(p.createPrivateKey),
    // checkCertificate: Promise.promisify(p.checkCertificate),
    createCSR: Promise.promisify(p.createCSR),
    createCertificate: Promise.promisify(p.createCertificate)
}

const privateRsaKey = require('./settings').privateRsaKey

module.exports = (emailAddress, password, callback) => {
    pem.createCSR({ emailAddress })
        .then(csr => pem.createCertificate({ days: 100, csr: csr.csr, serviceKey: privateRsaKey, selfSigned: true }))
        .then(pem => {
            
            p.getFingerprint(pem.certificate, (err, fingerprint) => {
                
                // create p12
                p.createPkcs12(pem.serviceKey, pem.certificate, password, {/* options */ }, callback(fingerprint.fingerprint))
            })
        })

}