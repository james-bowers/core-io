const chai = require('chai');
const expect = chai.expect
const AWS = require('aws-sdk')
const awsSDK = require('../../../src/cloud-resource-library/services/awsSDK.js')

describe('awsSDK', () => {

    it('gets s3 SDK', done => {

        let s3 = awsSDK('s3')

        expect(s3 instanceof AWS.S3).to.be.true

        done()
    })

    it('gets CloudFormation SDK', done => {

        let cf = awsSDK('cf')('eu-west-1')

        expect(cf instanceof AWS.CloudFormation).to.be.true

        done()
    })

    it('gets Lambda SDK', done => {

        let lambda = awsSDK('lambda')('eu-west-1')

        expect(lambda instanceof AWS.Lambda).to.be.true

        done()
    })

})