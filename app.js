const { Client, Collection } = require('discord.js')
const { config } = require('dotenv')
const DB = require('./utils/knex')
const { memberUpdate, channelUpdate } = require('./utils/serverstatus')
config({ path: __dirname + '/.env' })

const fs = require('fs')
const { getLocaleFromCommand } = require('./utils/lang')
const { chat } = require('./utils/chat')

const client = new Client()
client.commands = new Collection()
client.aliases = new Collection()
client.categories = fs.readdirSync('./commands')
client.queue = new Map()
;['command'].forEach(handler => {
  require(`./handler/${handler}`)(client)
})

let prefix
if (process.env.MODE === 'DEV') prefix = process.env.TEST_PREFIX
else prefix = process.env.PREFIX

client.on('ready', async () => {
  console.log('Bot is Online')
  client.user.setActivity(
    prefix +
      'help | ' +
      prefix +
      '도움 | ' +
      client.guilds.cache.size +
      ' servers'
  )
  if (process.env.MODE !== 'DEV') {
    client.channels.cache.get(`716883752793538601`).send(`Bot has rebooted`)
  }
})

client.on('guildCreate', g => {
  client.user.setActivity(
    prefix +
      'help | ' +
      prefix +
      '도움 | ' +
      client.guilds.cache.size +
      ' servers'
  )
})

client.on('guildDelete', g => {
  client.user.setActivity(
    prefix +
      'help | ' +
      prefix +
      '도움 | ' +
      client.guilds.cache.size +
      ' servers'
  )
})

client.on('guildMemberAdd', async member => {
  memberUpdate(client, member.guild)
})
client.on('guildMemberRemove', async member => {
  memberUpdate(client, member.guild)
})

client.on('channelCreate', async channel => {
  channelUpdate(client, channel.guild)
})

client.on('channelDelete', async channel => {
  channelUpdate(client, channel.guild)
})

client.on('message', async message => {
  if (message.author.bot) return
  if (!message.guild) return
  const customcmd = await DB('custom_cmd')
    .select('*')
    .where({ server_id: message.guild.id, command: message.content })
  if (customcmd[0] !== undefined) {
    message.channel.send(
      customcmd[Math.floor(Math.random() * customcmd.length)].answer
    )
  }
  if (message.content.startsWith('펭귄')) {
    const args = message.content.slice(prefix.length).trim().split(/ +/g)
    args.shift()
    chat(client, message, args)
    return
  }
  if (!message.content.startsWith(prefix)) return
  if (!message.member) {
    message.member = await message.guild.fetchMember(message)
  }

  const args = message.content.slice(prefix.length).trim().split(/ +/g)
  const cmd = args.shift().toLowerCase()

  if (cmd.length === 0) return
  let command = client.commands.get(cmd)
  if (!command) command = client.commands.get(client.aliases.get(cmd))

  if (command) {
    const locale = getLocaleFromCommand(command.name, cmd)
    command.run(client, message, args, locale)
  }
})

if (process.env.MODE === 'DEV') {
  client.login(process.env.TEST_TOKEN)
} else {
  client.login(process.env.TOKEN)
}
