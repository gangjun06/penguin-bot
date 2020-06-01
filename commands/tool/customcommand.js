const { MessageEmbed } = require('discord.js')

module.exports = {
  name: ['customcmd', '커스텀명령어'],
  category: 'tool',
  description: ['Add custom Command', '커스텀 명령어를 추가합니다'],
  run: async (client, message, args) => {
    message.channel.send("")
  }
}
