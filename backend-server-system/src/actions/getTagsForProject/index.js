module.exports = ({ req, fingerprint }, cloudLibrary, database) => {
    let db = database.db()

    return database.dbActions(db)('query')(() => {
        let projectKey = database.keyBuilder({
            userId: fingerprint,
            projectId: req.params.project
        })('project')

        return db.createQuery(database.schema.tag).hasAncestor(db.key([...projectKey]))
    })
}