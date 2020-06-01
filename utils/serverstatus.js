const DB = require('./knex')

module.exports = {
  memberUpdate: async (client, g) => {
    let find = await DB('server').select('*').where({ server_id: g.id })
    find = find[0]
    if (find === undefined) return
    if (find.user !== '') {
      client.channels.cache
        .get(find.user)
        .setName('User Count: ' + g.memberCount)
    }
    if (find.bot !== '') {
      client.channels.cache.get(find.bot).setName('Bot Count: ' + g.memberCount)
    }
  },
  channelUpdate: async (client, g) => {
    let find = await DB('server').select('*').where({ server_id: g.id })
    find = find[0]
    if (find === undefined) return

    if (find.channel !== '') {
      let channelCount = 0
      g.channels.cache.array().forEach(item => {
        if (item.type === 'category') {
          return
        }
        channelCount += 1
      })
      client.channels.cache
        .get(find.channel)
        .setName('Channel Count: ' + channelCount.toString())
      console.log(channelCount)
    }
  }
}
