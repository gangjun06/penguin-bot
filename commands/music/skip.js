module.exports = {
  name: ["skip", "스킵"],
  category: "music",
  description: ["Skip the song or shift song to next", "노래를 다음곡으로 넘깁니다"],
  run: async (client, message, args) => {
    const { channel } = message.member.voice;

    if (!channel) {
      //IF AUTHOR IS NOT IN VOICE CHANNEL
      return message.channel.send("**you need to be in voice channel**");
    }

    const serverQueue = message.client.queue.get(message.guild.id);

    if (!serverQueue) {
      return message.channel.send("There is nothing playing that i could skip");
    }

    serverQueue.connection.dispatcher.end();
    message.channel.send("✔ | Skipping The Song");
  },
};
