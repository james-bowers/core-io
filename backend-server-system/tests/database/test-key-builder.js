import chai from 'chai'
const expect = chai.expect

describe('Tests key builders for DB', () => {

    let program = require('./../../src/database/keyBuilder')

    it('builds the project key', done => {

        let data = {
            project: 'example-project-id',
            userId: 'user-id'
        }

        let result = program(data)('project')
        expect(result).to.deep.equal([
            'account',
            'user-id',
            'project',
            'example-project-id'
        ])
        done()
    })

    it('builds the tag key', done => {

        let data = {
            project: 'example-project-id',
            tagName: 'tag-for-system-version',
            userId: 'user-id'
        }

        let result = program(data)('tag')
        expect(result).to.deep.equal([
            'account',
            'user-id',
            'project',
            'example-project-id',
            'tag',
            'tag-for-system-version'
        ])
        done()
    })

    it('builds the resource key', done => {

        let data = {
            project: 'example-project-id',
            tagName: 'tag-for-system-version',
            resourceId: 'fb325740-d26f-422e-8db6-a1f326172c5c',
            userId: 'user-id'
        }

        let result = program(data)('resource')
        expect(result).to.deep.equal([
            'account',
            'user-id',
            'project',
            'example-project-id',
            'tag',
            'tag-for-system-version',
            'resource',
            'fb325740-d26f-422e-8db6-a1f326172c5c'
        ])
        done()
    })

})