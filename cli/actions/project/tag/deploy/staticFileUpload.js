const fs = require('fs')
let sendDeployPackage = require('./sendDeployPackage')

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

        return sendDeployPackage(host, config, params, {
            resourceId: resource.id,
            folderPath: localPath.replace(staticFilesDirectory, ''),
            static_file: fs.createReadStream(`${localPath}/${file.file}`)
        })

    }))
}