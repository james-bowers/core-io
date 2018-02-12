const utils = require('./../../Utils')

module.exports = (host, params) => {

    let fileName = 'core-io-config.json'
    let configExists = utils.fileExists(fileName)
    
    if (configExists){
        utils.print('red', 'Config file already found at ' + utils.fullPath(fileName))
    } else {
        utils.print('green', 'Creating config file at ' + utils.fullPath(fileName))

        return utils.fetch(host + '/create-project', {
            method: 'POST',
            body: JSON.stringify({title: params.title})
        }, params.certificate)
        .then(response => {
            console.log('response', response)

        })


    }

}