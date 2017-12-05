const uuid = require('uuid'),
      cloudLibrary = require('./../../cloud-library')

const buildResources = (configuration, entities, tagName) => {

    // TODO: iterate through the configuration, creating cloud resources, 
    // and then add to `entities` to store data about each resource in the db



    // projectConfiguration, resultAction

    // return cloudLibrary(configuration)('resource').then(result => {
    //     console.log('cloud result', result)
    // }) 

    return Promise.resolve({})
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
                configuration: configuration
            }
        }
    ]

    let db = database.db()
    return buildResources(configuration, entities, tagName)
        .then(x => database.dbActions(db)('insert')(entities))
        .then(dbResult => {
            return { error: false }
        })
}