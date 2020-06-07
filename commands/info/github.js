const { MessageEmbed } = require('discord.js')
const Axios = require('axios')

module.exports = {
  name: ['github', '깃허브'],
  category: 'info',
  description: [
    "Shows user's github info",
    '유저네임을 기반으로 깃허브 정보를 가져옵니다'
  ],
  usage: ['$github username', '$깃허브 유저이름'],
  run: async (client, message, args) => {
    const username = args.join(' ')
    try {
      const get1 = await Axios.get(
        'https://api.github.com/users/' + encodeURIComponent(username)
      )
      const get2 = await Axios.get(get1.data.repos_url)
      const result = {}
      result.avatar_url = get1.data.avatar_url
      result.nick = get1.data.name
      result.name = username
      result.followers = get1.data.followers
      result.birth = get1.data.created_at
      result.repos = get2.data.length
      result.url = get1.data.html_url
      result.stars = 0
      get2.data.forEach(e => {
        result.stars += e.stargazers_count
      })
      const embed = new MessageEmbed()
        .setColor('#24292e')
        .setTitle(`github info of ${result.name}`)
        .setURL(result.url)
        .setThumbnail(result.avatar_url)
        .setDescription(
          `**\\> username:** ${result.nick}
           **\\> user id:** ${result.name}
           **\\> followers:** ${result.followers}
           **\\> repositories:** ${result.repos}
           **\\> received stars:** ${result.stars}
           **\\> joined at:** ${result.birth}
          `
        )
      message.channel.send(embed)
    } catch (error) {
      console.log(error)
      message.channel.send('failed to find user `' + username + '`')
    }
  }
}
