const { getMember, formatDate } = require("../../utils/util");
const { MessageEmbed } = require("discord.js");
const { stripIndent } = require("common-tags");

module.exports = {
  name: ["botinfo", "봇정보"],
  category: "info",
  description: ["shows bot info", "봇정보를 보여줍니다"],
  run: async (client, message, args) => {
    const member = getMember(message, args.join(" "));

    const joined = formatDate(member.joinedAt);
    const role =
      member.roles.cache
        .filter((r) => r.id !== message.guild.id)
        .map((r) => r)
        .join(", ") || "none";

    const embed = new MessageEmbed()
      .setThumbnail(client.user.displayAvatarURL({ format: "png" }))
      .setColor(
        member.displayHexColor === "#000000"
          ? "#ffffff"
          : member.displayHexColor
      )
      .addField(
        "Bot Info",
        stripIndent`**\\> Joined Servers:** ${client.guilds.cache.size}
        **\\> Bot Users:** ${client.users.cache.size}
        **\\> Available Bot Commands:** ${client.users.cache.size}`,
        true
      )
    message.channel.send(embed);
  },
};
