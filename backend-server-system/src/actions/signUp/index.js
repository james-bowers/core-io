let uuid = require('uuid')

module.exports = ({ fingerprint, req, res }, cloudLibrary, database) => {

    let accountKey = database.keyBuilder({
        userId: fingerprint
    })('account')

    let entities = [
        {
            key: accountKey,
            data: {
                email: req.params.email,
                userId: fingerprint
            }
        }
    ]

    let db = database.db()
    return database.dbActions(db)('insert')(entities)
}