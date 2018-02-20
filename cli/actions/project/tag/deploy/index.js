const utils = require('./../../../../Utils')
const staticFileUpload = require('./staticFileUpload')
const zipPackageUpload = require('./zipPackageUpload')

let getResource = (config, resourceId) => {
    let resource;
    config.resources.forEach(_resource => {
        if (_resource.id === resourceId) resource = _resource
    })
    return resource
}

module.exports = (host, params) => {

    let config = params.config.projectConfig

    let resource = getResource(config, params.resourceId)

    if (resource.service === 'StaticFileStore'){
        return staticFileUpload(host, params, config, resource)
    } else {
        return zipPackageUpload(host, params, config, resource)
    }
    

    // get resource using params.resourceId from config

    // let fileParamName = '' || 'serverless_zip'

    /*
        for serverless, need to zip the src code, & upload using name 'serverless_zip'
        for static, need to upload using name 'static_file'
    */

}