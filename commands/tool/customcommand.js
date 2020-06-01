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
        .setDescription(
          'add: A, show list: B, delete: C'
        )
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
          deleteCmd(message)
        }
        break
    }
  }
}

const addCmd = async message => {
  const filter = m => m.author.id === message.author.id
  const check = await DB('custom_cmd')
    .select('server_id')
    .where({ server_id: message.guild.id })
  message.channel.send(check.length)
  if(check.length >= 40) {
    message.channel.send('You have too much commands in this server. please delete some to add another one')
  }
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
            .setTitle('Maximum Command length is 30 letters')
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
      if (content.length > 100) {
        return message.channel.send(
          new MessageEmbed()
            .setColor('#CD1039')
            .setTitle('Maximum answer length is 100 letters')
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
  result.sort((a, b) => {
    if (a.command < b.command) {
      return -1
    }
    if (a.command > b.command) {
      return 1
    }
    return 0
  })
  result.forEach(item => {
    if (item.answer.length > 15) {
      item.answer = item.answer.substring('15') + '...'
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

const deleteCmd = async message => {
  const filter = m => m.author.id === message.author.id
  await message.channel.send(
    new MessageEmbed()
      .setColor('#bedbe9')
      .setTitle('Custom Command')
      .setDescription('Input the Delete Command (cancel: c)')
  )

  const collector = new MessageCollector(message.channel, filter)
  collector.on('collect', async msg => {
    if (msg.content === 'c') {
      collector.stop()
      return msg.channel.send(
        new MessageEmbed().setColor('#bedbe9').setTitle('Canceled')
      )
    }
    DB('custom_cmd')
      .where({ server_id: msg.guild.id, command: msg.content })
      .del()
      .then(result => {
        collector.stop()
        return msg.channel.send(
          new MessageEmbed().setColor('#bedbe9').setTitle('Deleted')
        )
      })
      .catch(error => {
        return msg.channel.send(
          new MessageEmbed()
            .setColor('#bedbe9')
            .setTitle('Custom Command')
            .setDescription(
              'Cannot find Command\nEnter correct command name (cancel: c)'
            )
        )
      })
  })
}
