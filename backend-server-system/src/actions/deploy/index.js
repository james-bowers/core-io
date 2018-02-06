const uuid = require('uuid'),
      getTag = require('./../getTag')

module.exports = ({ fingerprint, req }, cloudLibrary, database) => {

    return getTag({ fingerprint, req }, cloudLibrary, database)
            .then(tag => cloudLibrary(tag.configuration)('deploy', tag.title, {
                  zipBuffer: req.files.serverless_zip.data
            }))
}