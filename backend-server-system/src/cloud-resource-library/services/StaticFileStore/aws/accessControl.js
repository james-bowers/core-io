module.exports = (coreIoAccessibilitySetting) => {
    return {
        "public": "public-read",
        "private": "private"
    }[coreIoAccessibilitySetting] || 'private'
}