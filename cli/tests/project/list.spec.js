const chai = require('chai')
const expect = chai.expect
const nock = require('nock')

const listProjects = require('../../actions/project/list')

describe('fetch user projects', () => {

    let nocks = {}
    let params = {}
    let host = 'http://localhost:8080'

    beforeEach(() => {
        params = {}
        nock.cleanAll()
        nocks['projects'] =
            nock(host)
            .get('/get-projects')
            .reply(200, "{}")
    })

    it('sends request to get the users account information', done => {

        listProjects(host, {}).then(() => {

            expect(nocks['projects'].isDone()).to.be.true

        }).then(done).catch(done)

    })

})