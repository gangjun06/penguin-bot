const { getStr: _ } = require('../../utils/lang')
const { MessageEmbed, MessageCollector } = require('discord.js')
const { promptMessage } = require('../../utils/util')

module.exports = {
  name: ['updown', '업다운'],
  category: 'fun',
  description: ['updown game!', '업다운 게임!'],
  run: async (client, message, args, l) => {
    await message.channel.send(
      new MessageEmbed()
        .setColor('#bedbe9')
        .setTitle(_(l, 'UD'))
        .setDescription(_(l, 'UD_GUIDE'))
    )
    const theNumber = Math.floor(Math.random() * 100)
    let life = 5
    const win = false
    const filter = (m) => m.author.id === message.author.id
    const collector = new MessageCollector(message.channel, filter)
    collector.on('collect', async (message) => {
      const content = message.content
      if (!content.match(/[^0-9]/g)) {
        --life
        if (parseInt(content) === theNumber) {
          collector.stop()
          return await message.channel.send(
            new MessageEmbed()
              .setColor('#bedbe9')
              .setTitle(_(l, 'UD'))
              .setDescription(_(l, 'UD_WIN'))
          )
        }
        if (life <= 0) {
          collector.stop()
          return await message.channel.send(
            new MessageEmbed()
              .setColor('#CD1039')
              .setTitle(_(l, 'UD'))
              .setDescription(_(l, 'UD_FAIL', { answer: theNumber }))
          )
        }
        if (parseInt(content) > theNumber) {
          await message.channel.send(
            new MessageEmbed()
              .setColor('#FFB0CF')
              .setTitle('DOWN!')
              .setDescription(_(l, 'UD_LEFT', { left: life }))
          )
        } else {
          await message.channel.send(
            new MessageEmbed()
              .setColor('#78EFAD')
              .setTitle('UP!')
              .setDescription(_(l, 'UD_LEFT', { left: life }))
          )
        }
      } else {
        await message.channel.send(
          new MessageEmbed()
            .setTitle(_(l, 'UD'))
            .setDescription(_(l, 'ERR_NUM'))
        )
      }
    })
  }
}
