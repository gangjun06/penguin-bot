module.exports = {
  name: ["stop"],
  category: "music",
  description: "stop music",
  run: async (client, message, args) => {
    const { channel } = message.member.voice;
    if (!channel) {
      return message.channel.send("**you need to be in voice channel**");
    }

    const serverQueue = message.client.queue.get(message.guild.id);

    if (!serverQueue) {
      return message.channel.send("There is nothing playing that i could stop");
    }

    serverQueue.songs = [];
    serverQueue.connection.dispatcher.end();

    serverQueue.textChannel.send("**Stoped the song form playing music**");
  },
};
