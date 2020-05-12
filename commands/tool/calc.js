const { MessageEmbed } = require("discord.js");
const math = require("mathjs");

module.exports = {
  name: "calc",
  category: "tool",
  description: "식을 계산해줘요",
  usage: "<식>",
  run: async (client, message, args) => {
    if (!args[0]) return message.reply("식을 입력해주세요");
    let resp;

    try {
      resp = math.evaluate(args.join(" "));
    } catch (e) {
      return message.reply("식이 올바르지 않아서 계산을 할 수가 없어요 ㅠ");
    }

    const embed = new MessageEmbed()
      .setColor("#bedbe9")
      .setTitle("수학 계산")
      .addField("입력", `\`\`\`js\n${args.join(" ")}\`\`\``)
      .addField("출력", `\`\`\`js\n${resp}\`\`\``);
    message.channel.send(embed);
  },
};
