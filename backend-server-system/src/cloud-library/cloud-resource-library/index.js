// This library is designed to manage the creation of cloud resources

module.exports = (configuration) => (type) => {

    let create = require('./create')(configuration)
    let deploy = require('./deploy')(configuration)

    return {
        create,
        deploy
    }[type]
}