const chai = require('chai');
const expect = chai.expect
const proxyquire = require('proxyquire');
proxyquire.noCallThru()

describe('getCloudVendorSDK', () => {
    let getCloudVendorSDK;

    beforeEach(() => {
        getCloudVendorSDK = proxyquire('../../src/cloud-resource-library/getCloudVendorSDK', {
            './../cloud-resource-library/services/awsSDK': 'aws-sdk-stub',
            './../cloud-resource-library/services/gcpSDK': 'gcp-sdk-stub'
        });
    })

    it('gets google cloud SDK', done => {

        let sdk = getCloudVendorSDK({
            provider: 'AWS'
        })

        expect(sdk).to.eql('aws-sdk-stub')

        done()
    })
})