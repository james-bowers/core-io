module.exports = ({ fingerprint }, cloudLibrary, database) => {
    let db = database.db()

    return database.dbActions(db)('query')(() => {
        let accountKey = database.keyBuilder({
            userId: fingerprint
        })('account')

        return db.createQuery(database.schema.project).hasAncestor(db.key([...accountKey]))
    })
}