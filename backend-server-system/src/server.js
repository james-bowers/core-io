const Promise = require('bluebird');
var proxy = require('http-proxy-middleware');
const p = require('pem');

const express = require('express')
const app = require('./index.js')

// create https server
const https = require('https');

const privateRsaKey = require('./auth/settings').privateRsaKey

p.createCertificate({ days: 100, selfSigned: true, serviceKey: privateRsaKey }, (err, keys) => {
    if (err) throw err

    https.createServer({
        key: keys.serviceKey,
        cert: keys.certificate,
        requestCert: true,
        rejectUnauthorized: false
    }, app).listen(5000)
})
