const open = (string, obj) => console.log('\n\n', string, JSON.stringify(obj,null,2))
const Promise = require('bluebird');
var proxy = require('http-proxy-middleware');


const p = require('pem');
const pem = {
  createPrivateKey: Promise.promisify(p.createPrivateKey),
  checkCertificate: Promise.promisify(p.checkCertificate),
  createCSR: Promise.promisify(p.createCSR),
  createCertificate: Promise.promisify(p.createCertificate),
}

const privateRsaKey = require('./settings').privateRsaKey

const express = require('express')
const app = express()

app.get('/cert-info', (req, res) => {
  var cert = req.connection.getPeerCertificate();
  res.send('Welcome\n Cert details are:' + JSON.stringify(cert,null,2))
})

app.get('/getP12', (req, res) => {
  let emailAddress = req.query.emailAddress || 'james@ticketbuddy.co.uk';
  pem.createCSR({emailAddress})
  .then(csr => pem.createCertificate({days: 100, csr: csr.csr, serviceKey: privateRsaKey, selfSigned:true}))
  .then(pem => {
    p.createPkcs12(pem.serviceKey, pem.certificate, 'chicken', {/* options */}, (err, pkcs12StringBuffer) => {
      res.writeHead(200, {
          'Content-disposition': 'attachment;filename=core-io.p12',
      });
      res.end(pkcs12StringBuffer.pkcs12);
    })
  })
})

// this proxies the request to a lambda function
app.use('/', proxy({ prependPath:true, target: 'https://ifuoastcl2.execute-api.eu-west-2.amazonaws.com/Prod', changeOrigin: true }));

// create https server
const https = require('https');

p.createCertificate({ days: 100, selfSigned: true, serviceKey:privateRsaKey }, (err, keys) => {
  if (err) throw err

  https.createServer({
    key: keys.serviceKey,
    cert: keys.certificate,
    requestCert: true,
    rejectUnauthorized: false
  }, app).listen(3000)
})
