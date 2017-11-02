const open = (string, obj) => console.log('\n\n', string, JSON.stringify(obj,null,2))
const Promise = require('bluebird');
const p = require('pem');
const pem = {
  createPrivateKey: Promise.promisify(p.createPrivateKey),
  checkCertificate: Promise.promisify(p.checkCertificate),
  createCSR: Promise.promisify(p.createCSR),
  createCertificate: Promise.promisify(p.createCertificate),
}

const express = require('express')
const cookieParser = require('cookie-parser')
const app = express()
var bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: false }))

const privateRsaKey = require('./settings').privateRsaKey

app.get('/', (req, res) => {
  let emailAddress = req.query.emailAddress;

  pem.createCSR({emailAddress})
  .then(csr => pem.createCertificate({csr: csr.csr, serviceKey: privateRsaKey, selfSigned:true}))
  .then(certificate => {
    open('Your certificate is: \n\n', certificate.certificate);
    p.checkCertificate(certificate.certificate, (err, valid) => {
      res.send(`Check the logs for your certificate.`);
    })
  })
})

app.post('/', (req, res) => {
  let certificate = req.body.certificate;
  p.checkCertificate(certificate, (err, valid) => {
    p.readCertificateInfo(certificate, (err, info) => {
      res.send(JSON.stringify(info,null,2));
    })
  })
})

app.listen(3000, function () {
  console.log('Certificate generating app listening on port 3000!')
})
