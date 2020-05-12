const { MessageEmbed } = require("discord.js");

module.exports = {
  name: ["invite", "초대"],
  category: "tool",
  description: ["show Penguin Bot's invite link", "펭귄봇의 초대 링크를 보여줍니다"],
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
