module.exports = (callback) => (gcp) => (configuration, resource, gcpRegion, tagName) => {

    let storage = gcp('Storage')

    // Makes an authenticated API request.
    storage
    .getBuckets()
    .then((results) => {
        const buckets = results[0];

        console.log('Buckets:');
        buckets.forEach((bucket) => {
            console.log(bucket.name);
        });

        callback(null, {})
    })
    .catch((err) => {
        console.error('ERROR:', err);

        callback(err, null)
    });
    
}