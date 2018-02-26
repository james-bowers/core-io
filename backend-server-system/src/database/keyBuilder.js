let schema = require('./schema')

let account = (keyData) => [schema.account, keyData.userId]

let project = (keyData) => account(keyData).concat([schema.project, keyData.projectId])

let tag = (keyData) => project(keyData).concat([schema.tag, keyData.tagId])

let resource = (keyData) => tag(keyData).concat([schema.resource, keyData.resourceId])

module.exports = (keyData) => (type) =>  {
    return {
        project,
        tag,
        resource,
        account
    }[type](keyData)
}