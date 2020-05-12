const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "clear",
  category: "moderation",
  description: "Clear the chat",
  usage: "<num(max:100)>",
  run: async (client, message, args) => {
    if (!message.member.hasPermission("MANAGE_MESSAGES")) {
      return message.reply("You can't delete messages...");
    }

    if (isNaN(args[0]) || parseInt(args[0]) <= 0) {
      return message.reply("Input number");
    }

    if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) {
      return message.reply("Sorry.. I can't delete message");
    }

    let deleteAmount;
    if (parseInt(args[0]) > 99) {
      deleteAmount = 100;
    } else {
      deleteAmount = parseInt(args[0]) + 1;
    }

    message.channel
      .bulkDelete(deleteAmount, true)
      .then((deleted) =>
        message.channel
          .send(
            new MessageEmbed()
              .setTitle("Successful to delete")
              .addField("count", `${deleted.size}`)
              .setFooter("This message will delete after 15s")
          )
          .then((m) => m.delete({ timeout: 15000 }))
      )
      .catch((err) => message.reply(`something went wrong... ${err}`));
  },
};
