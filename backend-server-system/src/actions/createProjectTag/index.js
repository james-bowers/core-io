const uuid = require('uuid')

module.exports = ({ fingerprint, req }, cloudLibrary, database) => {
    let tagId = uuid.v4()
    let tagName = req.body.tagName
    let projectId = req.body.project

    let tagKey = database.keyBuilder({
        userId: fingerprint,
        projectId: projectId,
        tagId: tagId
    })('tag')


    let entities = [
        {
            key: tagKey,
            data: {
                title: tagName,
            }
        }
    ]

    let db = database.db()
    return database.dbActions(db)('insert')(entities)
        .then(dbResult => {
            return {
                error: false
            }
        })
}