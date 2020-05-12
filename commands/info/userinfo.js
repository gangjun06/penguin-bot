const { getMember, formatDate } = require("../../utils/util");
const { MessageEmbed } = require("discord.js");
const { stripIndent } = require("common-tags");

module.exports = {
  name: ["userinfo", "유저정보"],
  category: "info",
  description: ["shows user info", "유저정보를 보여줍니다"],
  usage: ["[username | id | mention]", "[유저이름 | id | 멘션]"],
  run: async (client, message, args) => {
    const member = getMember(message, args.join(" "));

    const joined = formatDate(member.joinedAt);
    const role =
      member.roles.cache
        .filter((r) => r.id !== message.guild.id)
        .map((r) => r)
        .join(", ") || "none";

    const created = formatDate(member.user.createdAt);

    const embed = new MessageEmbed()
      .setFooter(member.displayName, member.user.displayAvatarURL())
      .setThumbnail(member.user.displayAvatarURL({ format: "png" }))
      .setColor(
        member.displayHexColor === "#000000"
          ? "#ffffff"
          : member.displayHexColor
      )
      .addField(
        "member information",
        stripIndent`**\\> Display name:** ${member.displayName}
      **\\> Joined At:** ${joined}
      **\\> Roles:** ${role}`,
        true
      )
      .addField(
        "user information",
        stripIndent`**\\> ID:** ${member.user.id}
      **\\> Discord Tag:** ${member.user.tag}
      **\\> Created at:** ${created}`,
        true
      )
      .setTimestamp();
    if (member.user.presence.game)
      embed.addField(
        "Current Playing",
        `**\\> Name:** ${member.user.presence.game.name}`
      );
    message.channel.send(embed);
  },
};
