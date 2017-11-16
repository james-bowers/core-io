import chai from 'chai'
const expect = chai.expect

describe('Tests db actions', () => {

    let program = require('./../../src/database/dbActions')

    it('creates ', done => {

        let dbSpy = {
            key: (keyArray) => {
                return ['ran key method'] // modify key to show this method was ran
            },
            transaction: () =>{
                return {
                    run: () => Promise.resolve({}),
                    insert: (entities) => {
                        expect(entities).to.deep.equal([{ key: ['ran key method'], data: { exampleField: 'yes' } }])
                        return Promise.resolve({})
                    },
                    commit: () => Promise.resolve({})
                }
            }
        }

        let entities = [
            {
                key: ['example', 'key'],
                data: {
                    exampleField: 'yes'
                }
            }
        ]

        program(dbSpy)('insert')(entities)
            .then(result => done())
            .catch(e => done(e))

        
    })

    it('gets', done => {

        let dbSpy = {
            key: (keyArray) => {
                return ['ran key method'] // modify key to show this method was ran
            },
            get: (keys) => {
                expect(keys).to.deep.equal([
                    ['ran key method']
                ])
                return Promise.resolve({})
            }
        }

        let keysArray = [
            ['example-key', 'yes']
        ]

        program(dbSpy)('get')(keysArray)
            .then(result => done())
            .catch(e => done(e))
    })

})