const chai = require('chai');
const expect = chai.expect
const helper = require('../../src/cloud-resource-library/helper');

describe('getCloudVendorSDK', () => {
    
    it('genId starts with character', done => {
        let firstChar = helper.genId().substr(0, 1)
        expect(firstChar).to.eql('s')
        done()
    })

    it('buildKeyPath with folder', done => {
        let folderPath = 'some/path'
        let fileName = 'file.txt'
        let fullPath = helper.buildKeyPath(folderPath, fileName)
        expect(fullPath).to.eql('some/path/file.txt')
        done()
    })

    it('buildKeyPath without folder', done => {
        let folderPath = ''
        let fileName = 'file.txt'
        let fullPath = helper.buildKeyPath(folderPath, fileName)
        expect(fullPath).to.eql('file.txt')
        done()
    })

    it('buildResourceName', done => {
        
        let projectId = 'projectId'
        let tagName = 'tagName'
        let region = 'region'
        let resourceId = 'resourceId'
    
        let resourceName = helper.buildResourceName(
            projectId,
            tagName,
            region,
            resourceId
        )
        expect(resourceName).to.eql('projectId-region-resourceid-tagname')
        done()
    })

    describe('gets human readable regions', () => {

        describe('AWS', () => {
            it('eu-west-2', done => {
                let resource = {
                    provider: 'AWS'
                }
                let vendorRegion = 'eu-west-2'
                let humanReadableRegion = helper.getReadableRegion(resource, vendorRegion)
                expect(humanReadableRegion).to.eql('England')

                done()
            })

            it('eu-west-1', done => {
                let resource = {
                    provider: 'AWS'
                }
                let vendorRegion = 'eu-west-1'
                let humanReadableRegion = helper.getReadableRegion(resource, vendorRegion)
                expect(humanReadableRegion).to.eql('Ireland')

                done()
            })

            it('us-west-1', done => {
                let resource = {
                    provider: 'AWS'
                }
                let vendorRegion = 'us-west-1'
                let humanReadableRegion = helper.getReadableRegion(resource, vendorRegion)
                expect(humanReadableRegion).to.eql('California')

                done()
            })
        })

        describe('GCP', () => {
            it('europe-west2', done => {
                let resource = {
                    provider: 'GCP'
                }
                let vendorRegion = 'europe-west2'
                let humanReadableRegion = helper.getReadableRegion(resource, vendorRegion)
                expect(humanReadableRegion).to.eql('England')

                done()
            })

            it('europe-west1', done => {
                let resource = {
                    provider: 'GCP'
                }
                let vendorRegion = 'europe-west1'
                let humanReadableRegion = helper.getReadableRegion(resource, vendorRegion)
                expect(humanReadableRegion).to.eql('Belgium')

                done()
            })

            it('us-central1', done => {
                let resource = {
                    provider: 'GCP'
                }
                let vendorRegion = 'us-central1'
                let humanReadableRegion = helper.getReadableRegion(resource, vendorRegion)
                expect(humanReadableRegion).to.eql('Iowa')

                done()
            })
        })
    })    


    describe('gets region from human readable region & vendor', () => {

        describe('AWS', () => {
            it('eu-west-2', done => {
                let resource = {
                    provider: 'AWS'
                }
                let humanRegion = 'England'
                let humanReadableRegion = helper.getVendorFormattedRegion(resource, humanRegion)
                expect(humanReadableRegion).to.eql('eu-west-2')

                done()
            })

            it('eu-west-1', done => {
                let resource = {
                    provider: 'AWS'
                }
                let humanRegion = 'Ireland'
                let humanReadableRegion = helper.getVendorFormattedRegion(resource, humanRegion)
                expect(humanReadableRegion).to.eql('eu-west-1')

                done()
            })

            it('us-west-1', done => {
                let resource = {
                    provider: 'AWS'
                }
                let humanRegion = 'California'
                let humanReadableRegion = helper.getVendorFormattedRegion(resource, humanRegion)
                expect(humanReadableRegion).to.eql('us-west-1')

                done()
            })
        })

        describe('GCP', () => {
            it('europe-west2', done => {
                let resource = {
                    provider: 'GCP'
                }
                let humanRegion = 'England'
                let humanReadableRegion = helper.getVendorFormattedRegion(resource, humanRegion)
                expect(humanReadableRegion).to.eql('europe-west2')

                done()
            })

            it('europe-west1', done => {
                let resource = {
                    provider: 'GCP'
                }
                let vendorRegion = 'Belgium'
                let humanReadableRegion = helper.getVendorFormattedRegion(resource, vendorRegion)
                expect(humanReadableRegion).to.eql('europe-west1')

                done()
            })

            it('us-central1', done => {
                let resource = {
                    provider: 'GCP'
                }
                let vendorRegion = 'Iowa'
                let humanReadableRegion = helper.getVendorFormattedRegion(resource, vendorRegion)
                expect(humanReadableRegion).to.eql('us-central1')

                done()
            })
        })
    })
})