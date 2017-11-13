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

    it('creates an AWS bucket shizzle', done => {

        let program = require('./../../../src/cloud-library')
        // program(_configuration.projectConfiguration)('resource')('create')('tag-name')

        done()
    })

    it('gets signature to upload content', done => {

        let program = require('./../../../src/cloud-library')
        // program(_configuration.projectConfiguration)('resource')('deploy')('tag-name')

        done()
    })

})