const { MessageEmbed } = require('discord.js')
const math = require('mathjs')
const { getStr: _ } = require('../../utils/lang')

module.exports = {
  name: ['calc', '계산'],
  category: 'tool',
  description: ['a simple calcuator', '간단한 계산기'],
  usage: ['<Expression>', '<식>'],
  run: async (client, message, args, l) => {
    if (!args[0]) return message.channel.send(_(l, 'ERR_SYNTEX'))
    let resp

    try {
      resp = math.evaluate(args.join(' '))
    } catch (e) {
      return message.channel.send(_(l, 'ERROR_CORRECT', { key: 'expression' }))
    }

    const embed = new MessageEmbed()
      .setColor('#bedbe9')
      .setTitle('Math Calculation')
      .addField('Input', `\`\`\`js\n${args.join(' ')}\`\`\``)
      .addField('Output', `\`\`\`js\n${resp}\`\`\``)
    message.channel.send(embed)
  }
}
