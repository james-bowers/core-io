const utils = require('./Utils')

module.exports = (argv) => {

    // has the user got a core-io config file
    let hasConfig = utils.fileExists('core-io.config.json')

    // ask user for certificate information
    return utils.ask([
        {
            name: 'passphrase',
            type: 'input',
            message: 'Enter the passphrase for your core-io p.12 certificate',
        },
        {
            name: 'p12Path',
            type: 'input',
            message: 'Enter absolute path to your core-io p.12 certificate',
            when: !hasConfig // ask when the user hasn't set a config
        }
    ]).then(certificate => {

        argv.certificate = certificate

        if (hasConfig) {
            argv.config = utils.readFile('core-io.config.json')
            argv.certificate.p12Path = argv.config.p12Path // get the p12 path from the config
        }

        console.log('argv', argv)
        
        return argv
    })

}