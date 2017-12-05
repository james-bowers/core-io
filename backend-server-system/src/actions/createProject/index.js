const uuid = require('uuid')

module.exports = ({fingerprint, req}, cloudLibrary, database) => {
    let projectId = uuid.v4() 
    let projectTitle = req.body.title

    let projectKey = database.keyBuilder({
        userId:    fingerprint,
        projectId: projectId
    })('project')

    let entities = [
        {
            key: projectKey,
            data: {
                title: projectTitle
            }
        }
    ]

    let db = database.db()
    return database.dbActions(db)('insert')(entities)
    .then(dbResult => {
        return {
            title: projectTitle,
            project: projectId,
            environmentVariables: {},
            resources: []
        }
    })
}