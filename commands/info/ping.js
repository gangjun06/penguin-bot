const { getStr: _ } = require('../../utils/lang')

module.exports = {
  name: ['ping', '핑'],
  category: 'info',
  description: ['ping', '핑'],
  run: async (client, message, args, l) => {
    const msg = await message.channel.send(_(l, 'PING_WAIT'))
    msg.edit(_(l, 'PING_RESULT', { ping: Math.floor(msg.createdAt - message.createdAt) }))
  }
}
