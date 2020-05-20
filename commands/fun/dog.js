const { MessageEmbed } = require('discord.js')
const Axios = require('axios')

module.exports = {
  name: ['dog', '개'],
  category: 'fun',
  description: ['Shows cute dog!', '귀여운 강아지를 보여줍니다'],
  run: async (client, message, args) => {
    const result = await Axios.get('https://dog.ceo/api/breeds/image/random')
    const Embed = new MessageEmbed()
      .setTitle('dog from dog.ceo')
      .setURL(result.data.message)
      .setImage(result.data.message)
      .setColor('RANDOM')
    message.channel.send(Embed)
  }
}
