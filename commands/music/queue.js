const { MessageEmbed } = require("discord.js");

module.exports = {
  name: ["queue", "리스트"],
  category: "music",
  description: ["showing this server's music queue", "노래 재생목록을 보여줍니다"],
  run: async (client, message, args) => {
    const { channel } = message.member.voice;
    if (!channel) {
      //IF AUTHOR IS NOT IN VOICE CHANNEL
      return message.channel.send("**you need to be in voice channel**");
    }

    const serverQueue = message.client.queue.get(message.guild.id);

    if (!serverQueue) {
      return message.channel.send("There is nothing in the queue");
    }

    let text = "";
    serverQueue.songs.forEach((song, index) => {
      text += `**${index + 1}.** ${song.title}\n`;
    });

    const embed = new MessageEmbed()
      .setTitle("Music Queue")
      .addField("list", text);

    message.channel.send(embed);
  },
};
