import _ from 'lodash'

module.exports = {
    api: (httpMethod, urlPath, sendData, headers={}) => {
        let host = 'https://localhost:5000'
        let url = host + urlPath
        let body = JSON.stringify(sendData)

        console.log(httpMethod, url, body)
        return fetch(url, {
            method: httpMethod,
            headers: _.merge({
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }, headers),
            'credentials': 'include',
            body: httpMethod === 'GET' ? undefined :  body
        })
    },
    download: (blob, fileName) => {
        let url = window.URL.createObjectURL(blob);
        let a = document.createElement('a')
        a.href = url;
        a.download = fileName;
        a.click();
        window.URL.revokeObjectURL(url);
    },
    getKeyInformation: (key) => {
        return {
            fingerprint: key[1],
            project: key[3],
            tagId: key[5],
        }
    }
}