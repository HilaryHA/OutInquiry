/**
 * 云函数入口文件
 * 查询中国疫情
 */
const cloud = require('wx-server-sdk')

cloud.init()

// 使用第三方库，方便调用第三方API接口
var rp = require('request-promise');

var options = {
  uri: 'https://www.tianqiapi.com/api?version=epidemic&appid=wx3b328666f611d3d7&appsecret=8YvlPNrz',
  qs: {
    // access_token: 'xxxxx xxxxx' // -> uri + '?access_token=xxxxx%20xxxxx'
  },
  headers: {
    'User-Agent': 'Request-Promise'
  },
  json: true // Automatically parses the JSON string in the response
};

// 云函数入口函数
exports.main = async (event, context) => {
  return rp(options)
    .then(res => {
      console.log(`res=======::`, res)
      return res;
    })
    .catch(err => {
      console.error(err)
    })
}