const axios = require('axios')
const { config } = require('dotenv')
config({ path: __dirname + '../.env' })

module.exports = {
  chat: function (client, message, args) {
    axios({
      url: `https://builder.pingpong.us/api/builder/5eba6181e4b0e921afb5175a/integration/v0.2/custom/${message.author.id}`,
      method: 'post',
      headers: { Authorization: `${process.env.PINGPONG_API}` },
      data: {
        request: { query: `${args.join(' ')}` }
      }
    }).then((result) => {
      if (result.status !== 200) message.channel.send('이런.. 알 수 없는 에러가 발생하였어요 ㅠ')
      return message.channel.send(result.data.response.replies[0].text)
    })
  }
}
