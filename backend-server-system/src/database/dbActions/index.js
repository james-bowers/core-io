module.exports = (db) => (type) => {
    return {
        insert: require('./insert'),
        get: require('./get'),
        query: require('./query'),
        update: require('./update')
    }[type](db)
}
