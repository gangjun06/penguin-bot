const { MessageEmbed } = require('discord.js')
const axios = require('axios')

const statusList = [
  'All Systems Operational',
  'Partial System Outage',
  'Major Service Outage'
]
const colorList = ['#43b581', '#faa31a', '#f15832']

module.exports = {
  name: ['status', '상태'],
  category: 'tool',
  description: ['Discord status', '디스코드 상태'],
  run: async (client, message, args) => {
    let status
    await axios
      .get('https://srhpyqt94yxb.statuspage.io/api/v2/status.json')
      .then((result) => {
        status = result.data.status.description
      })
    const Embed = new MessageEmbed()
      .setTitle(status)
      .setURL('https://status.discord.com/')

    statusList.forEach((item, index) => {
      if (item === status) {
        Embed.setColor(colorList[index])
      }
    })

    message.channel.send(Embed)
  }
}
