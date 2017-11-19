let insert = (db) => (entities) => {

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

let get = (db) => (keysInArrFmt) => db.get(keysInArrFmt.map(idArr => db.key(idArr)));

let query = (db) => (createQueryFunc) => {
    return db.runQuery(createQueryFunc())
};

module.exports = (db) => (type) => {
    return {
        insert,
        get,
        query
    }[type](db)
}