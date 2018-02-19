const utils = require('./../../../../Utils')
const fs = require('fs')
const path = require('path')

let deploy = (host, config, params, formData) => {
    return utils.fetch(host + `/project/${config.project}/tag/${params.tagId}/deploy`, {
        formData,
        method: 'POST',
    }, params.certificate)
        .then(responseBody => {
            utils.prettyPrintJson(responseBody.body, 'blue')
        })
}

let getResource = (config, resourceId) => {
    let resource;
    config.resources.forEach(_resource => {
        if (_resource.id === resourceId) resource = _resource
    })
    return resource
}

var getFilesRecursive = function (dir, filelist) {
    let files = fs.readdirSync(dir);
    filelist = filelist || [];
    files.forEach(function (file) {

        if (fs.statSync(dir + file).isDirectory()) {
            filelist = getFilesRecursive(dir + file + '/', filelist);
        }
        else {
            filelist.push({
                file,
                dir: dir.split('/').filter(folder => !!folder)
            });
        }
    });
    return filelist;
};

module.exports = (host, params, config, resource) => {

    let staticFilesDirectory = resource.properties.directory

    let files = getFilesRecursive(staticFilesDirectory)

    return Promise.all(files.map(file => {
        let localPath = [...file.dir].join('/')

        return deploy(host, config, params, {
            folderPath: localPath.replace(staticFilesDirectory, ''),
            static_file: fs.createReadStream(`${localPath}/${file.file}`)
        })

    }))
}