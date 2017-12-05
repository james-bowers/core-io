module.exports = (db) => (entities) => {

    const transaction = db.transaction()

    entities.map(entity => {
        entity.data['_key'] = [...entity.key]
        entity.key = db.key([...entity.key])
        return entity
    })

    return transaction.run()
        .then(() => {
            transaction.insert(entities)
        })
        .then(() => transaction.commit())
        .catch((e) => {
            console.error(e)
            transaction.rollback()
            throw e
        })
}