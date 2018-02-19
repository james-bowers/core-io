const utils = require('./Utils')
const getRequiredParams = require('./getRequiredParams')

module.exports = (argv) => {

    // has the user got a core-io config file
    let hasConfig = utils.fileExists('core-io.config.json')

    // if the user wants help, don't ask for passphrase or certificate path
    if (argv._[0] === 'help') return Promise.resolve()


    // ask user for certificate information
    return getRequiredParams(argv)
    .then(actionSpecificQuestions => {
        
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
        ].concat(actionSpecificQuestions))

    })
    .then(inputs => {

        // add inputs to argv
        argv = Object.assign(argv, inputs)

        argv.certificate = {
            passphrase: inputs.passphrase,
            p12Path: inputs.p12Path
        }

        if (hasConfig) {
            argv.config = JSON.parse(utils.readFile('core-io.config.json'))
            argv.certificate.p12Path = argv.config.p12Path // get the p12 path from the config
        }

        return argv
    })

}