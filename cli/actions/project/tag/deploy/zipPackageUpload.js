const utils = require('./../../../../Utils')
const fs = require('fs')
let sendDeployPackage = require('./sendDeployPackage')

let createZipFile = (resolve, reject, directory) => {
    var file_system = require('fs');
    var archiver = require('archiver');

    let zipFileName = 'core-serverless-package.zip'
    var output = file_system.createWriteStream(zipFileName);
    var archive = archiver('zip');

    output.on('close', function () {
        utils.print('green', `${zipFileName} has been created, and will be deployed.`)
        resolve(zipFileName)
    });

    archive.on('error', function (err) {
        reject(err);
    });

    archive.pipe(output);

    archive.directory(directory, false)

    archive.finalize();
}

module.exports = (host, params, config, resource) => {
    return new Promise((resolve, reject) => {
        createZipFile(resolve, reject, resource.properties.directory)
    }).then((zipFileName) => {
        let formData = {
            serverless_zip: fs.createReadStream(zipFileName)
        }
        sendDeployPackage(host, config, params, formData)
    })
}