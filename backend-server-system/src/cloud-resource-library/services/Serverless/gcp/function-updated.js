/**
 * HTTP Cloud Function.
 *
 * @param {Object} req Cloud Function request context.
 * @param {Object} res Cloud Function response context.
 */
exports.woop = function woop(req, res) {
    res.send('Serverless function ran - now been updated!');
};