module.exports = {
  name: "np",
  category: "music",
  description: "send the name of on going song",
  run: async (client, message, args) => {
    const { channel } = message.member.voice;
    if (!channel) {
      return message.channel.send("**you need to be in voice channel**");
    }

    const serverQueue = message.client.queue.get(message.guild.id);

    if (!serverQueue) {
      return message.channel.send("Bot is not playing anything");
    }

    message.channel.send(serverQueue.songs[0].title);
  },
};
