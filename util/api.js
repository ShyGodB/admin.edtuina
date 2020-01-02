const axios = require('axios')

const request = async (type, url, data) => {
  return axios({
    method: type,
    url: url,
    responseType: 'JSON',
    data: data
  })
}

module.exports = request
