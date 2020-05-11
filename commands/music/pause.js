module.exports = {
  name: "pause",
  category: "music",
  description: "pause the song",
  execute(client, message, args) {
    const { channel } = message.member.voice;
    if (!channel) {
      //IF AUTHOR IS NOT IN VOICE CHANNEL
      return message.channel.send("**you need to be in voice channel**");
    }

    const serverQueue = message.client.queue.get(message.guild.id);

    if (!serverQueue) {
      return message.channel.send(
        "There is nothing playing that i could pause"
      );
    }

    if (serverQueue && serverQueue.playing) {
      serverQueue.playing = false;
      serverQueue.connection.dispatcher.pause(true);

      return message.channel.send("✅ | Paused The Current Playing Song");
    }
  },
};
