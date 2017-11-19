let cloudLibrary = require('./cloud-library')
let database = require('./database')
let actions = require('./actions')
let { createCertificate } = require('./auth')
var bodyParser = require('body-parser')

const express = require('express')

const app = express()


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use((req, res, next) => {
    res.setHeader('Content-Type', 'application/json')
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080')
    res.setHeader('Access-Control-Allow-Credentials', 'true')

    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT')
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, authorization')
    next()
})

app.get('/', (req, res) => {
    res.send('core-io.com')
})

app.get('/account', (req, res, next) => {
    var cert = req.connection.getPeerCertificate();
    res.send(cert)
})

app.post('/sign-up', (req, res) => {

    let emailAddress = req.body.email;
    let password = req.body.password;

    actions.signUp({ req, res }, cloudLibrary, database)
    .then(dbResult => {

        // no db error, so create the user's certificate and force download it for the user
        createCertificate(emailAddress, password,  (err, pkcs12StringBuffer) => {
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