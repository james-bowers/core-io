const uuid = require('uuid')

let getVendorFormattedRegion = (resource, region) => {
    return {
        "AWS": {
            "England": "eu-west-2",
            "Ireland": "eu-west-1"
        },
        "GCP": {
            "England": "europe-west2",
            "Belgium": "europe-west1"
        }
    }[resource.provider][region]
}

const buildResourceName = (projectId, tagName, region, resourceId) => {
    let lowerCaseResourceId = resourceId.toLowerCase()
    let lowerCaseTagName = tagName.toLowerCase()
    return `${projectId}-${region}-${lowerCaseResourceId}-${lowerCaseTagName}`
}

const genId = () => uuid.v4()

module.exports = {
    getVendorFormattedRegion,
    buildResourceName,
    genId
}