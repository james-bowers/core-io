const fetch = require('node-fetch')

module.exports = (authClient, endpoint, content) => {
    
    console.log('content', content)
    console.log('request sent', endpoint)

    return authClient.authorize().then(token => {
        console.log('354783475938549 token', token)
        
        // authClient.setCredentials(token)

        return authClient.request({
            url: endpoint,
            method: 'PUT',
            headers: {
                "Authorization": token.access_token,
                "Content-Type": "application/zip",
                "x-google-content-length-range": "0,104857600"
            },
            body: content
        }).then(result => {
            console.log('result', result)
            // 546382492504@cloudservices.gserviceaccount.com
            return result
        })

    })




    // return fetch(endpoint, {
    //     method: 'PUT',
    //     headers: {

    //     },
    //     credentials: 'include',
    //     body: {
    //         file: content,
    //         key: '',
    //         bucket: 'gcf-upload-us-central1-6dbf8a4d-b8ad-4bc7-8eb9-f4f84a8c35f7',
    //         GoogleAccessId: '',
    //         policy: '',
    //         signature: '546382492504@cloudservices.gserviceaccount.com',
    //         'content-type': "application/zip"
    //     }
    // })
    // .then(response => {
    //     response.text().then(text => console.log(text))
    //     console.log('response', response)
    //     return response
    // })
    // .then(response => response.json())
    // .then(response => {
    //     console.log('response 2', response)
    //     return response
    // })

}