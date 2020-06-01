const { MessageEmbed, MessageCollector } = require('discord.js')
const DB = require('../../utils/knex')
const { promptMessage } = require('./../../utils/util')

module.exports = {
  name: ['customcmd', '커스텀명령어'],
  category: 'tool',
  description: ['Add custom Command', '커스텀 명령어를 추가합니다'],
  run: async (client, message, args) => {
    const msg = await message.channel.send(
      new MessageEmbed()
        .setColor('#bedbe9')
        .setTitle('CustomCommand')
        .setDescription('Add: A, ShowAll: B, Delete: C')
    )
    const emojiList = ['🇦', '🇧', '🇨']
    const emoji = await promptMessage(msg, message.author, 15, emojiList)
    let permission

    const CheckPermission = async () => {
      if (message.member.hasPermission('MANAGE_MESSAGES')) {
        return true
      } else {
        await message.channel.send(
          new MessageEmbed()
            .setColor('#CD1039')
            .setTitle('Custom Command')
            .setDescription('You Dont have a permission')
        )
        return false
      }
    }

    switch (emoji) {
      case emojiList[0]:
        permission = await CheckPermission()
        if (permission) {
          addCmd(message)
        }
        break
      case emojiList[1]:
        showAll(message)
        break
      case emojiList[2]:
        permission = await CheckPermission()
        if (permission) {
          deleteCmd()
        }
        break
    }
  }
}

const addCmd = async message => {
  const filter = m => m.author.id === message.author.id
  await message.channel.send(
    new MessageEmbed()
      .setColor('#bedbe9')
      .setTitle('Custom Command')
      .setDescription('Input the Question (cancel: c)')
  )
  let count = 0
  let command = ''
  const collector = new MessageCollector(message.channel, filter)
  collector.on('collect', async message => {
    const content = message.content
    if (content === 'c') {
      collector.stop()
      return await message.channel.send(
        new MessageEmbed().setColor('#bedbe9').setTitle('Canceled')
      )
    }

    if (count === 0) {
      if (content.length > 30) {
        return message.channel.send(
          new MessageEmbed()
            .setColor('#CD1039')
            .setTitle('Command must less than 30')
        )
      }
      command = content
      count += 1
      return message.channel.send(
        new MessageEmbed()
          .setColor('#bedbe9')
          .setTitle('Custom Command')
          .setDescription('Input the Answer')
      )
    } else {
      if (content.length > 500) {
        return message.channel.send(
          new MessageEmbed()
            .setColor('#CD1039')
            .setTitle('Question must less than 100')
        )
      }
      DB('custom_cmd')
        .insert({
          server_id: message.guild.id,
          command,
          answer: content
        })
        .then(async result => {
          collector.stop()
          return message.channel.send(
            new MessageEmbed()
              .setColor('#bedbe9')
              .setTitle('Custom Command')
              .setDescription('Command Added')
          )
        })
        .catch(error => {
          console.log(error)
          return message.channel.send(
            new MessageEmbed()
              .setColor('#CD1039')
              .setTitle('Error,,')
              .setDescription(error)
          )
        })
    }
  })
}

const showAll = async message => {
  let list = ''
  const result = await DB('custom_cmd')
    .select('*')
    .where({ server_id: message.guild.id })
  result.forEach(item => {
    if (item.answer.length > 10) {
      item.answer = item.answer('10') + '...'
    }
    list += `${item.command}: ${item.answer}\n`
  })
  message.channel.send(
    new MessageEmbed()
      .setColor('#bedbe9')
      .setTitle('Custom Command List!')
      .setDescription(list)
  )
}

const deleteCmd = async message => {}