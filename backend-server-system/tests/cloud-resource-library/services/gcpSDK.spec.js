const chai = require('chai');
const expect = chai.expect
const gcpSDK = require('../../../src/cloud-resource-library/services/gcpSDK.js')

describe('gcpSDK', () => {

    it('gets GCP storage SDK', done => {
        let storage = gcpSDK('Storage')
        expect(storage.packageJson.name).to.eql('@google-cloud/storage')
        done()
    })

    it('gets gcp CloudFunctions SDK', done => {
        let cloudFunctions = gcpSDK('CloudFunctions')        
        expect(cloudFunctions).to.haveOwnProperty('cloudFunctions')
        expect(cloudFunctions).to.haveOwnProperty('authClient')
        done()
    })

})