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

            let config = JSON.parse(response.body)

            // set the p12 path in the config            
            config.p12Path = params.certificate.p12Path
            utils.writeFile('core-io.config.json', JSON.stringify(config, null, 2))

            // p12Path: /Users/jamesbowers/Desktop/core-io-certificate.p12

        })


    }

}