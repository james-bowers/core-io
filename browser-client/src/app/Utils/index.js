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
    }
}