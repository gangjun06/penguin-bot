const { Util } = require('discord.js')

const { config } = require('dotenv')
config({ path: __dirname + '/../.env' })
const ytdl = require('ytdl-core')
const YoutubeAPI = require('simple-youtube-api')
const youtube = new YoutubeAPI(process.env.YOUTUBE_API)
const { play } = require('../../utils/music.js')
const { getStr: _ } = require('../../utils/lang')

module.exports = {
  name: ['play', '재생'],
  category: 'music',
  description: ['add music to queue', '노래를 재생하거나 리스트에 추가합니다'],
  usage: ['<youtube video link | song name>', '<유튜브 영상 링크 | 노래제목>'],
  run: async (client, message, args, l) => {
    if (!args.length) {
      return message.channel.send("Enter url or song's name")
    }

    const { channel } = message.member.voice
    if (!channel) {
      return message.channel.send(_(l, 'MUSIC_ERR_VOICE'))
    }

    const targetsong = args.join(' ')
    const videoPattern = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/gi
    const playlistPattern = /^.*(youtu.be\/|list=)([^#\&\?]*).*/gi
    const urlcheck = videoPattern.test(args[0])

    if (!videoPattern.test(args[0]) && playlistPattern.test(args[0])) {
      return message.channel.send(_(l, 'MUSIC_ERR_PLAYLIST'))
    }

    const serverQueue = message.client.queue.get(message.guild.id)

    const queueConstruct = {
      textChannel: message.channel,
      channel,
      connection: null,
      songs: [],
      loop: false,
      volume: 100,
      playing: true
    }

    let songData = null
    let song = null

    if (urlcheck) {
      try {
        songData = await ytdl.getInfo(args[0])
        song = {
          title: songData.title,
          url: songData.video_url,
          duration: songData.length_seconds
        }
      } catch (error) {
        if (message.include === 'copyright') {
          return message
            .reply('THERE IS COPYRIGHT CONTENT IN VIDEO -_-')
            .catch(console.error)
        } else {
          console.error(error)
        }
      }
    } else {
      try {
        const result = await youtube.searchVideos(targetsong, 1)
        songData = await ytdl.getInfo(result[0].url)
        song = {
          title: songData.title,
          url: songData.video_url,
          duration: songData.length_seconds
        }
      } catch (error) {
        console.error(error)
      }
    }

    if (serverQueue) {
      serverQueue.songs.push(song)
      return serverQueue.textChannel
        .send(`\`${song.title}\`, Song Added to queue`)
        .catch(console.error)
    } else {
      queueConstruct.songs.push(song)
    }

    if (!serverQueue) { message.client.queue.set(message.guild.id, queueConstruct) }

    if (!serverQueue) {
      try {
        queueConstruct.connection = await channel.join()
        play(queueConstruct.songs[0], message, l)
      } catch (error) {
        console.error(`Could not join voice channel: ${error}`)
        message.client.queue.delete(message.guild.id)
        await channel.leave()
        return message.channel
          .send({
            embed: {
              description: `😭 | Could not join the channel: ${error}`,
              color: '#ff2050'
            }
          })
          .catch(console.error)
      }
    }
  }
}
