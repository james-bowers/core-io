let schema = {
    project: 'project',
    tag: 'tag',
    resource: 'resource',
    deployment: 'deployment',
    account: 'account'
}

let account = (d) => [schema.account, d.userId]

let project = (d) => account(d).concat([schema.project, d.project])

let tag = (d) => project(d).concat([schema.tag, d.tagName])

let resource = (d) => tag(d).concat([schema.resource, d.resourceId]) // each resource holds the 'live' deployment number

module.exports = (d) => (type) =>  {
    return {
        project,
        tag,
        resource
    }[type](d)
}

/*
project // holds which tag is live
 - tag
    - environment variables
    - resources
*/