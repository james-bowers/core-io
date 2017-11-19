let uuid = require('uuid')

module.exports = ({ fingerprint }, cloudLibrary, database) => {

    let accountKey = database.keyBuilder({
        userId: fingerprint
    })('account')


    let keysArray = [
        accountKey
    ]

    let db = database.db()
    return database.dbActions(db)('get')(keysArray)
}