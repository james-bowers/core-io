let uuid = require('uuid')

module.exports = ({ req, fingerprint }, cloudLibrary, database) => {

    let tagName = req.body.tagName
    let projectId = req.body.project
    let configuration = req.body.config
    let tagId = req.params.tagId

    let tagKey = database.keyBuilder({
        userId: fingerprint,
        projectId: projectId,
        tagId: tagId
    })('tag')

    let entity = {
        title: tagName,
        configuration: configuration,
        _key: tagKey
    }

    let db = database.db()
    return database.dbActions(db)('update')(entity)
}