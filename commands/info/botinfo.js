const { getMember, formatDate } = require("../../utils/util");
const { MessageEmbed } = require("discord.js");
const { stripIndent } = require("common-tags");

module.exports = {
  name: ["botinfo", "봇정보"],
  category: "info",
  description: ["shows bot info", "봇정보를 보여줍니다"],
  run: async (client, message, args) => {
    const embed = new MessageEmbed()
      .setThumbnail(client.user.displayAvatarURL({ format: "png" }))
      .setColor(
        client.user.displayHexColor === "#000000"
          ? "#ffffff"
          : client.user.displayHexColor
      )
      .addField(
        "Bot Info",
        stripIndent`**\\> Joined Servers:** ${client.guilds.cache.size}
        **\\> Bot Users:** ${client.users.cache.size}
        **\\> Available Bot Commands:** ${client.commands.size/2}`,
        true
      )
    message.channel.send(embed);
  },
};
