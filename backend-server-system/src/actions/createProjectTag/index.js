const uuid = require('uuid')

const buildResources = (cloudLibrary, configuration, tagName) => {

    return cloudLibrary(configuration)('create', tagName).then(createResult => {

        // add the creation information to the project config
        // to store in the DB
        configuration.resources.forEach(resource => {
            resource.cloudVendorInformation = createResult[resource.id]
        })

        return createResult
    })
}

module.exports = ({ fingerprint, req }, cloudLibrary, database) => {
    let tagId = uuid.v4()
    let tagName = req.body.tagName
    let projectId = req.body.project
    let configuration = req.body.config

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
                configuration
            }
        }
    ]

    let db = database.db()
    return buildResources(cloudLibrary, configuration, tagName)
        .then(x => database.dbActions(db)('insert')(entities))
        .then(dbResult => {
            return { error: false }
        })
}