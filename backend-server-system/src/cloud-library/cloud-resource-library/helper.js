let _ = require('lodash')

module.exports = {
    buildBucketName: (projectId, tagName, region, resourceId) => {
        let lowerCaseResourceId = resourceId.toLowerCase()
        let lowerCaseTagName = tagName.toLowerCase()
        return `${projectId}-${region}-${lowerCaseResourceId}-${lowerCaseTagName}`
    }
}