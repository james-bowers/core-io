import proxyquire from 'proxyquire'
import chai from 'chai'
const expect = chai.expect

describe('Create static file store AWS', () => {

    let _tagName = 'testing';

    let _configuration = {
        cloudAccessCredentials: {
            aws: {},
            gcp: {}
        },
        projectConfiguration: {
            project: 'example-project-id',
            resources: [
                {
                    "id": "Images",
                    "provider": "AWS",
                    "service": "StaticFileStore",
                    "regions": ["England"],
                    "properties": {
                        "directory": "./images",
                        "accessibility": "public"
                    }
                }
            ]
        }
    }

    it('calls cloud resource library with correct paramaters', (done) => {
        let program = proxyquire('./../../../src/cloud-library', {
            './cloud-resource-library': (configuration) => (operation) => (tagName) => {
                expect(operation).to.eql('create')
                expect(_configuration.cloudAccessCredentials).to.have.property('aws').to.not.be.undefined
                expect(_configuration.cloudAccessCredentials).to.have.property('gcp').to.not.be.undefined
                expect(configuration.projectConfiguration).to.deep.equal(_configuration.projectConfiguration)
                expect(tagName).to.eql(_tagName)
            }
        })
        program(_configuration.projectConfiguration)('create')(_tagName)
        done();
    })

    it('calls AWS resource library', (done) => {
        let program = proxyquire('./../../../src/cloud-library/cloud-resource-library', {
            './aws': (cloudAccessCredentials) => {
                expect(cloudAccessCredentials).to.deep.eql({})
                return {
                    create: (tagName, region, resource) => {
                        expect(tagName).to.eql(_tagName)
                        expect(region).to.eql("England")
                        expect(resource).to.deep.eql(_configuration.projectConfiguration.resources[0])
                    }
                }
            },
            './gcp': (cloudAccessCredentials) => {
                expect(cloudAccessCredentials).to.deep.eql({})
                return {create: () => {}}
            }
        })
        program(_configuration, _tagName)
        done()
    })

    it('calls the AWS S3 api client with the correct paramaters', (done) => {
        let program = require('./../../../src/cloud-library/cloud-resource-library/aws/services/StaticFileStore')
    
        let tagName = _tagName;
        let awsRegion = 'eu-west-2'
        let resource = _configuration.projectConfiguration.resources[0]
        
        let aws = (service) => {
            return {
                createBucket: (params) => {
                    expect(params.Bucket).to.not.eql(undefined)
                    expect(params).to.have.property('CreateBucketConfiguration')
                    expect(params.Bucket).to.not.be.undefined
                    expect(params.CreateBucketConfiguration).to.deep.eql({
                        LocationConstraint: 'eu-west-2'
                    })

                    return {
                        promise: () => Promise.resolve({})
                    }
                }
            }
        }

        program(aws)(_configuration, tagName, awsRegion, resource)
        done()
    })

})