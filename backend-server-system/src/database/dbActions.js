let insert = (db) => (entities) => {

    const transaction = db.transaction()

    entities.map(entity => {
        entity.key = db.key([...entity.key])
        return entity
    })

    return transaction.run()
        .then(() => {
            transaction.insert(entities)
        })
        .then(() => transaction.commit())
        .catch((e) => {
            transaction.rollback()
            throw e
        })
}


let get = (db) => (keysInArrFmt) => db.get(keysInArrFmt.map(idArr => db.key(idArr)));

module.exports = (db) => (type) => {
    return {
        insert,
        get
    }[type](db)
}