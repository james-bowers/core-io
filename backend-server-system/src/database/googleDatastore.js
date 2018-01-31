const Datastore = require('@google-cloud/datastore')

module.exports = () => {

    // environment var required by DataStore emulator
    process.env.DATASTORE_EMULATOR_HOST = 'localhost:9000'

    return Datastore({
        projectId: 'jovial-lamp-182608',
        endpoint: process.env.DATASTORE_EMULATOR_HOST
    })
}