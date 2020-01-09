import axios from 'axios'

const post = async (url, data) => {
    return axios({
        method: 'POST',
        url: '/api/admin' + url,
        headers: {
            authtoken: '31c535a1d1a0826b39057dfd9a2dbdb8'
        },
        responseType: 'JSON',
        data: data
    })
}

const get = async (url, params) => {
    return axios({
        method: 'GET',
        url: '/api/admin' + url,
        headers: {
            authtoken: '31c535a1d1a0826b39057dfd9a2dbdb8'
        },
        responseType: 'JSON',
        params: params
    })
}

export default {
    post,
    get
}
