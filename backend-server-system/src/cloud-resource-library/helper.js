const uuid = require('uuid')

let getVendorFormattedRegion = (resource, region) => {
    return {
        "AWS": {
            "England": "eu-west-2",
            "Ireland": "eu-west-1",
            "California": "us-west-1"
        },
        "GCP": {
            "England": "europe-west2",
            "Belgium": "europe-west1",
            "Iowa": "us-central1" // only GCP serverless region
        }
    }[resource.provider][region]
}

let getReadableRegion = (resource, vendorRegion) => {
    return {
        "AWS": {
            "eu-west-2": "England",
            "eu-west-1": "Ireland",
            "us-west-1": "California"
        },
        "GCP":{
            "europe-west2": "England",
            "europe-west1": "Belgium",
            "us-central1": "Iowa"
        }
    }[resource.provider][vendorRegion]
}

const buildResourceName = (projectId, tagName, region, resourceId) => {
    let lowerCaseResourceId = resourceId.toLowerCase()
    let lowerCaseTagName = tagName.toLowerCase()
    return `${projectId}-${region}-${lowerCaseResourceId}-${lowerCaseTagName}`
}

const genId = () => 's' + uuid.v4().replace(/-/g, '')

module.exports = {
    getVendorFormattedRegion,
    buildResourceName,
    genId,
    getReadableRegion
}