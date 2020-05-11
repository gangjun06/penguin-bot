const { MessageEmbed } = require("discord.js");
const math = require("mathjs");

module.exports = {
  name: "calc",
  category: "tool",
  description: "calculation expression",
  usage: "<expression>",
  run: async (client, message, args) => {
    if (!args[0]) return message.reply("Please input a calculation.");
    let resp;

    try {
      resp = math.evaluate(args.join(" "));
    } catch (e) {
      return message.reply("Sorry, Please input a valid calculation.");
    }

    const embed = new MessageEmbed()
      .setColor("#bedbe9")
      .setTitle("Math Calculation")
      .addField("Input", `\`\`\`js\n${args.join(" ")}\`\`\``)
      .addField("Output", `\`\`\`js\n${resp}\`\`\``);
    message.channel.send(embed);
  },
};
