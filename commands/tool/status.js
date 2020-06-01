const { MessageEmbed, MessageCollector } = require('discord.js')
const DB = require('../../utils/knex')
const { promptMessage } = require('./../../utils/util')

module.exports = {
  name: ['serverstatus', '서버상태'],
  category: 'tool',
  description: ['add Status Channel', '서버의 상태기능을 추가합니다'],
  run: async (client, message, args) => {
    if (!message.member.hasPermission('MANAGE_CHANNELS')) {
      await message.channel.send(
        new MessageEmbed()
          .setColor('#CD1039')
          .setTitle('Set Status')
          .setDescription('You Dont have a permission')
      )
      return false
    }

    const msg = await message.channel.send(
      new MessageEmbed()
        .setColor('#bedbe9')
        .setTitle('Set Status Server')
        .setDescription('user count: A, bot count: B, channel count: C')
    )
    const emojiList = ['🇦', '🇧', '🇨']
    const emoji = await promptMessage(msg, message.author, 15, emojiList)

    let data = await DB('server')
      .select('*')
      .where({ server_id: message.guild.id })
    data = data[0]
    if (data === undefined) {
      await DB('server').select('*').where({ server_id: message.guild.id })
      data = {
        server_id: message.guild.id,
        user: null,
        bot: null,
        channel: null
      }
    }
    switch (emoji) {
      case emojiList[0]:
        handler(message, 'user')
        break
      case emojiList[1]:
        handler(message, 'bot')
        break
      case emojiList[2]:
        handler(message, 'channel')
        break
    }
  }
}

const handler = async (message, name) => {
  const filter = m => m.author.id === message.author.id
  await message.channel.send(
    new MessageEmbed()
      .setColor('#bedbe9')
      .setTitle('Server Status')
      .setDescription('Enter Channel ID (delete: d, cancel: c)')
  )
  const obj = {}
  const collector = new MessageCollector(message.channel, filter)
  collector.on('collect', async message => {
    const content = message.content
    if (content === 'c') {
      collector.stop()
      return await message.channel.send(
        new MessageEmbed().setColor('#bedbe9').setTitle('Canceled')
      )
    } else if (content === 'd') {
      collector.stop()
      obj[name] = null
      console.log(obj)
      await DB('server').where({ server_id: message.guild.id }).update(obj)
      return await message.channel.send(
        new MessageEmbed().setColor('#bedbe9').setTitle('Deleted')
      )
    }
    if (parseInt(content).toString().length !== 18) {
      return await message.channel.send(
        new MessageEmbed()
          .setTitle('Custom Status')
          .setColor('#CD1039')
          .setDescription('Enter correct Server Id')
      )
    }
    collector.stop()
    obj[name] = content
    await DB('server').where({ server_id: message.guild.id }).update(obj)
    return message.channel.send(
      new MessageEmbed()
        .setTitle('Server Status')
        .setColor('#bedbe9')
        .setDescription('Successed To Add')
    )
  })
}
