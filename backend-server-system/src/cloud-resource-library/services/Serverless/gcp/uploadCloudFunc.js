let fs = require('fs')

let getBucket = (gcp, gcpRegion) => {
    let storage = gcp('Storage')
    
    return storage.bucket(`serverless-core-io-${gcpRegion}`);
}

module.exports = {

    usingBuffer: (gcp, zipBuffer, functionId, gcpRegion) => {
        var file = getBucket(gcp, gcpRegion).file(`${functionId}.zip`);

        return file.save(zipBuffer).then(() => {
            return `serverless-core-io-${gcpRegion}/${functionId}.zip`
        })
    },

    usingFileName: (gcp, pathToZip, functionId, gcpRegion) => {
        return getBucket(gcp, gcpRegion).upload(pathToZip, { destination: `${functionId}.zip` }).then(() => {
            return `serverless-core-io-${gcpRegion}/${functionId}.zip`
        })
    }
}