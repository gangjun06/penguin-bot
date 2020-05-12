module.exports = {
  name: ["resume", '다시재생'],
  category: "music",
  description: ["Resume the paused Song", "노래를 다시 재생합니다"],
  execute(client, message, args) {
    const { channel } = message.member.voice;
    if (!channel) {
      //IF AUTHOR IS NOT IN VOICE CHANNEL
      return message.channel.send("**you need to be in voice channel**");
    }

    const serverQueue = message.client.queue.get(message.guild.id);
    if (serverQueue && !serverQueue.playing) {
      serverQueue.playing = true;
      serverQueue.connection.dispatcher.resume();

      return message.channel.send("✅ | Resumed the Paused Song");
    }

    message.channel.send("There is nothing paused that i can resume");
  },
};
