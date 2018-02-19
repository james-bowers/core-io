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

var walkSync = function (dir, filelist) {
    var fs = fs || require('fs'),
        files = fs.readdirSync(dir);
    filelist = filelist || [];
    files.forEach(function (file) {

        if (fs.statSync(dir + file).isDirectory()) {
            filelist = walkSync(dir + file + '/', filelist);
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

module.exports = (host, params) => {

    let config = params.config.projectConfig

    console.log('config', config)

    let resource = getResource(config, params.resourceId)

    if (resource.service === 'StaticFileStore'){
        
        let staticFilesDirectory = resource.properties.directory

        let files = walkSync(staticFilesDirectory)

        let deploys = []
        files.forEach(file => {
            console.log()

            let splitLocalPathDirs = staticFilesDirectory.split('/').filter(p => p)
            let staticFilesPathLength = splitLocalPathDirs.length // -1 as '/' is compulsory at end

            let localPath = [...file.dir].join('/')
            let staticFilePath = [...file.dir]
            staticFilePath.splice(0, staticFilesPathLength)
            

            // console.log('staticFilesPathLength', staticFilesPathLength)
            // console.log('file', JSON.stringify(file, null, 2))

            let newDeploy = deploy(host, config, params, {
                folderPath: staticFilePath.join('/'),
                static_file: fs.createReadStream(`${localPath}/${file.file}`)
            })
            deploys.push(newDeploy)
        })

        Promise.all(deploys).then(() => {
            console.log('all upload done')
        })
    }
    

    // get resource using params.resourceId from config

    // let fileParamName = '' || 'serverless_zip'

    /*
        for serverless, need to zip the src code, & upload using name 'serverless_zip'
        for static, need to upload using name 'static_file'
    */

}