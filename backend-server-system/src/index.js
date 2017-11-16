let cloudLibrary = require('./cloud-library')
let database = require('./database')
let actions = require('./actions')
let { createCertificate } = require('./auth')
const express = require('express')
const app = express()

app.get('/', (req, res) => {
    // actions.testDatastore({ req, res }, cloudLibrary, database)
    res.send('hi')
})

app.get('/account', (req, res, next) => {
    var cert = req.connection.getPeerCertificate();
    res.send('Cert details are:' + JSON.stringify(cert, null, 2))
})

app.post('/sign-up', (req, res) => {
    let emailAddress = req.params.emailAddress;

    actions.testDatastore({ req, res }, cloudLibrary, database)
    .then(dbResult => {

        // no db error, so create the user's certificate and force download it for the user
        createCertificate(emailAddress,  (err, pkcs12StringBuffer) => {
            res.writeHead(200, {
                'Content-disposition': `attachment;filename=${emailAddress}-core-io.p12`,
            });
            res.end(pkcs12StringBuffer.pkcs12);
        })

    }).catch(error => {
        res.send('Failed to create your account.')
    })


})


module.exports = app