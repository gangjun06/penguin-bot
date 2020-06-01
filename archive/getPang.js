const { getStr: _ } = require('../utils/lang')
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
        if (row === undefined) {
          db.updateMoney(client.db, message.author.id, 100)
          return message.channel.send(
            new MessageEmbed()
              .setTitle('Get pang')
              .setDescription('Successful to get pang')
              .addField('Your Pang', `0 -> 100`)
          )
        }
        if (
          Math.abs(
            moment
              .duration(moment(row.lasttime * 1000).diff(moment()))
              .asMinutes()
          ) > 10
        ) {
          db.updateMoney(client.db, message.author.id, 100)
          return message.channel.send(
            new MessageEmbed()
              .setTitle('Get pang')
              .setDescription('Successful to get pang')
              .addField('Your Pang', `${row.money} -> ${row.money + 100}`)
          )
        } else {
          const waittime =
            row.lasttime - moment().subtract(10, 'minutes').unix()
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
