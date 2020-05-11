const { MessageEmbed, MessageAttachment } = require("discord.js");
const { stripIndent } = require("common-tags");
const { promptMessage } = require("./../../utils/util");

module.exports = {
  name: "kick",
  category: "moderation",
  description: "kicks the member",
  usage: "<id | mention>",
  run: async (client, message, args) => {
    const logChannel =
      message.guild.channels.cache.get((c) => c.name === "p-logs") ||
      message.channel;

    if (message.deleteable) message.delete();

    if (!args[0]) {
      return message
        .reply("Please provide a reason to kick")
    }

    if (!args[1]) {
      return message
        .reply("Please provide a reason to kick")
    }

    if (!message.member.hasPermission("KICK_MEMBERS")) {
      return message
        .reply(
          "✘ You do not have permissions to kick members. Please contact a staff member"
        )
    }

    const toKick =
      message.mentions.members.first() || message.guild.members.cache.get(args[1]);

    if (!toKick) {
      return message
        .reply("Couldn't find that member, try again!")
    }

    if (message.author.id === toKick.id) {
      return message
        .reply("You want to kick yourself. Are you sure?")
    }

    const embed = new MessageEmbed()
      .setColor("#ff0000")
      .setThumbnail(toKick.user.displayAvatarURL())
      .setFooter(message.member.displayName, message.author.displayAvatarURL())
      .setTimestamp()
      .setDescription(stripIndent`**\\> kicked member:** ${toKick} (${toKick.id})
      **\\> kicked by:** ${message.author} (${message.author.id})
      **\\> reason:** ${args.slice(1).join(" ")}`);

    const promptEmbed = new MessageEmbed()
      .setColor("GREEN")
      .setAuthor("This verification becomes invaild after 15s")
      .setDescription(`Do You want to kick ${toKick}?`);

    await message.channel.send(promptEmbed).then(async msg => {
      const emoji = await promptMessage(msg, message.author, 15, ["✅", "❌"]);

      if (emoji === "✅") {
        msg.delete();
        toKick.kick(args.slice(1).join(" ")).catch((err) => {
          if (err) return message.channel.send(`Sorry, Something went wrong`);
        });
        logChannel.send(embed);
      } else if (emoji === "❌") {
        msg.delete();
        message
          .reply("Kick cancled...")
      }
    });
  },
};
