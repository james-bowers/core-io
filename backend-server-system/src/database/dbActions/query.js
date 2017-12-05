module.exports = (db) => (createQueryFunc) => {
    return db.runQuery(createQueryFunc())
};