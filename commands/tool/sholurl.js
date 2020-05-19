const Axios = require('axios')
const { getStr: _ } = require('../../utils/lang')

module.exports = {
  name: ['shurl', 'url단축'],
  category: 'tool',
  description: ['make short url!', '짧은 URL을 생성합니다'],
  usage: ['<longurl>', '<긴 URL>'],
  run: async (client, message, args, l) => {
    if (!args[0].includes('.') || !args[0].length > 6) {
      return message.channel.send(_(l, 'ERR_CORRECT', { name: 'URL' }))
    }
    Axios.post(`https://shol.xyz/?url=${args[0]}`)
      .then((result) => {
        return message.reply(`<https://shol.xyz/${result.data.short}>`)
      })
      .catch((e) => {
        return message.reply('Sorry, something went wrong')
      })
  }
}
