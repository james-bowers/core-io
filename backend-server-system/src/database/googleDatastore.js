const Datastore = require('@google-cloud/datastore')

module.exports = () => {
    return Datastore({
        projectId: 'jovial-lamp-182608',
        endpoint: 'localhost:9000'
    })
}