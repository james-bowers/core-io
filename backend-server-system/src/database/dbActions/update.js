const _ = require('lodash')

const updateFunctionality = (transaction, key, data) => {
    return transaction.get(key)
        .then((getResult) => {

            const existing = getResult[0]

            if (existing === undefined) {
                throw new Error('Can\'t find thing to update')
            }

            const updateData = _.merge(existing, data)

            transaction.save({
                key: key,
                data: updateData
            })

        })
}



module.exports = (db) => (entity) => {

    const transaction = db.transaction()

    let key = db.key([...entity._key])

    return transaction.run()
        .then(() => updateFunctionality(transaction, key, entity))
        .then(() => transaction.commit())
        .catch((e) => {
            console.error(e)
            transaction.rollback()
            throw e
        })
}