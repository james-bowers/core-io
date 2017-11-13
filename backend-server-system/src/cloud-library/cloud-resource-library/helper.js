const getAwsRegion = (coreIoRegion) => {
    return {
        "England": "eu-west-2"
    }[coreIoRegion]
}

const buildResourceName = (projectId, tagName, region, resourceId) => {
    let lowerCaseResourceId = resourceId.toLowerCase()
    let lowerCaseTagName = tagName.toLowerCase()
    return `${projectId}-${region}-${lowerCaseResourceId}-${lowerCaseTagName}`
}

const getProjectId = (configuration) => configuration.projectConfiguration.project

module.exports = {
    getAwsRegion,
    buildResourceName,
    getProjectId
}