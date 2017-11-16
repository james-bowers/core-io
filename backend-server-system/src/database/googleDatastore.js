const Datastore = require('@google-cloud/datastore')

module.exports = () => {
    console.log('RAN')
    return Datastore({
        projectId: 'jovial-lamp-182608', // process.env.CORE_IO_DATASTORE_PROJECT_ID
        endpoint: 'localhost:9000' // process.env.CORE_IO_DATASTORE_ENDPOINT
    })
}