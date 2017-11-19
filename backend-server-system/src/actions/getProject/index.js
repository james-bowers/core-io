let uuid = require('uuid')

module.exports = ({ req, fingerprint }, cloudLibrary, database) => {

    let projectKey = database.keyBuilder({
        userId: fingerprint,
        projectId: req.params.project
    })('project')


    let keysArray = [projectKey]

    let db = database.db()
    return database.dbActions(db)('get')(keysArray)
}