let uuid = require('uuid')

module.exports = ({ req, res }, cloudLibrary, database) => {

    let accountKey = database.keyBuilder({
        userId: uuid.v4()
    })('account')

    let entities = [
        {
            key: accountKey,
            data: {
                email: req.params.email
            }
        }
    ]

    let db = database.db()
    return database.dbActions(db)('insert')(entities)
}