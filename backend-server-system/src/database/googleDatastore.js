const Datastore = require('@google-cloud/datastore')

module.exports = () => {
    console.log('RAN')
    process.env.DATASTORE_EMULATOR_HOST = 'localhost:9000'
    return Datastore({
        projectId: 'jovial-lamp-182608', // process.env.CORE_IO_DATASTORE_PROJECT_ID
        endpoint: process.env.DATASTORE_EMULATOR_HOST // process.env.CORE_IO_DATASTORE_ENDPOINT
    })
}