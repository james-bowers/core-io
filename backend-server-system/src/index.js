let cloudLibrary = require('./cloud-resource-library')
let database = require('./database')
let actions = require('./actions')
let { createCertificate } = require('./auth')
var bodyParser = require('body-parser')
let pem = require('pem')
const express = require('express')
const fileUpload = require('express-fileupload');

const app = express()

const getFingerPrintFromCert = (req) => {
    var cert = req.connection.getPeerCertificate();
    return cert.fingerprint
}
app.use(fileUpload())
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
    let fingerprint = getFingerPrintFromCert(req)
    actions.getMe({ fingerprint }, cloudLibrary, database)
        .then(dbResult => {

            let cert = req.connection.getPeerCertificate();
            let user = dbResult[0][0] // get the first result object
            res.send({
                cert: { valid_from: cert.valid_from, valid_to: cert.valid_to, emailAddress: cert.subject.emailAddress},
                user: user
            })
        })
})

app.get('/get-projects', (req, res) => {
    let fingerprint = getFingerPrintFromCert(req)
    actions.getProjects({ fingerprint }, cloudLibrary, database)
        .then(dbResult => {
            res.send({
                projects: dbResult[0]
            })
        })
})

app.post('/create-project', (req, res) => {
    let fingerprint = getFingerPrintFromCert(req)
    console.log('fingerprint', fingerprint)
    actions.createProject({req, fingerprint}, cloudLibrary, database)
        .then(projectConfig => {
            res.send({ projectConfig })
        })
})

app.post('/create-project-tag', (req, res) => {
    let fingerprint = getFingerPrintFromCert(req)
    actions.createProjectTag({ req, fingerprint }, cloudLibrary, database)
        .then(createStatus => {
            res.send({ createStatus })
        })
})

app.post('/project/:project/tag/:tagId/deploy', (req, res) => {
    let fingerprint = getFingerPrintFromCert(req)
    actions.deploy({ req, fingerprint }, cloudLibrary, database)
        .then(createStatus => {
            res.send({ createStatus })
        })
})

app.get('/get-project/:project', (req, res) => {
    let fingerprint = getFingerPrintFromCert(req)
    actions.getProject({ req, fingerprint }, cloudLibrary, database)
        .then(dbResult => {
            res.send({ project: dbResult[0][0] })
        })
})

app.get('/get-tag/project/:project/tag/:tagId', (req, res) => {
    let fingerprint = getFingerPrintFromCert(req)
    actions.getTag({ req, fingerprint }, cloudLibrary, database)
        .then(dbResult => {
            res.send({ tag: dbResult })
        })
})

app.get('/get-tags-for-project/:project', (req, res) => {
    let fingerprint = getFingerPrintFromCert(req)
    actions.getTagsForProject({ req, fingerprint }, cloudLibrary, database)
        .then(dbResult => {
            res.send({ tags: dbResult[0] })
        })
})

app.post('/sign-up', (req, res) => {

    let emailAddress = req.body.email;
    let password = req.body.password;

    createCertificate(emailAddress, password, fingerprint => (err, pkcs12StringBuffer) => {

        actions.signUp({ fingerprint, req, res }, cloudLibrary, database)
            .then(dbResult => {

                res.writeHead(200, {
                    'Content-disposition': `attachment;filename=${emailAddress}-core-io.p12`,
                });

                res.end(pkcs12StringBuffer.pkcs12);                

            }).catch(error => {

                res.send('Failed to create your account.')
            })
    })
})

module.exports = app