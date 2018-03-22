const chai = require('chai')
const expect = chai.expect
const nock = require('nock')

const getAccount = require('../../actions/account')

describe('account actions', () => {

    let nocks = {}
    let params = {}
    let host = 'http://localhost:8080'

    beforeEach(() => {
        params = {}
        nock.cleanAll()
        nocks['account'] =
            nock(host)
            .get('/account')
            .reply(200, "{}")
    })

    it('sends request to get the users account information', done => {

        getAccount(host, {}).then(() => {

            expect(nocks['account'].isDone()).to.be.true

        }).then(done).catch(done)

    })

})