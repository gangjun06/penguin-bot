const { getStr: _ } = require('../../utils/lang')
const moment = require('moment')
const { MessageEmbed } = require('discord.js')

const db = require('../../utils/db')

module.exports = {
  name: ['pang', '펭'],
  category: 'fun',
  description: ['Get Pang', '펭을 받습니다'],
  run: async (client, message, args, l) => {
    client.db.query(
      `SELECT * FROM profile WHERE id=${message.author.id}`,
      (err, row) => {
        if (err) return
        row = row[0]
        if (row.lasttime < moment().subtract(10, 'minutes').unix()) {
          client.db.query(
            `UPDATE profile SET money=${
              row.money + 100
            }, lasttime=${moment().unix()} WHERE id=${message.author.id}`
          )
          return message.channel.send(
            new MessageEmbed()
              .setTitle('Get pang')
              .setDescription('Successful to get pang')
              .addField('Your Pang', `${row.money} -> ${row.money + 100}`)
          )
        } else {
          const waittime = row.lasttime - moment().subtract(10, 'minutes').unix()
          return message.channel.send(
            new MessageEmbed()
              .setTitle('Get pang')
              .setDescription(
                `wait ${Math.floor(waittime / 60)}m ${waittime % 60}s`
              )
          )
        }
      }
    )
  }
}
