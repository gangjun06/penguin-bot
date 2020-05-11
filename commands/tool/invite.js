const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "invite",
  category: "tool",
  description: "show Penguin Bot's invite link",
  run: async (client, message, args) => {
    const Embed = new MessageEmbed()
    .setTitle('https://shol.xyz/bot')
    .setURL("https://shol.xyz/bot")
    .setDescription("Penguin bot's invite link!")
    .setColor("#bedbe9")
    .setTimestamp()
    message.channel.send(Embed);
  },
};
