const { MessageEmbed } = require("discord.js");
const { promptMessage } = require("../../utils/util");

const chooseArr = ["⛰️", "📰", "✂️"];
const { getStr: _ } = require("../../utils/lang");

module.exports = {
  name: ["rps", "가위바위보"],
  category: "fun",
  description: ["Rock Paper Scissors game", "가위바위보 게임"],
  run: async (client, message, args, l) => {
    const embed = new MessageEmbed()
      .setColor("#FFFFFF")
      .setFooter(message.guild.me.displayName, client.user.displayAvatarURL())
      .setDescription(_(l, "RPS_Q"))
      .setTimestamp();
    const m = await message.channel.send(embed);
    const reacted = await promptMessage(m, message.author, 30, chooseArr);

    const botChoice = chooseArr[Math.floor(Math.random() * chooseArr.length)];

    const result = await getResult(reacted, botChoice);
    await m.reactions.removeAll();

    embed.setDescription(`**${result}**`).addField("result", `${reacted} vs ${botChoice}`);
    m.edit(embed);

    function getResult(me, clientChosen) {
      if (
        (me === "⛰️️" && clientChosen === "✂") ||
        (me === "️📰" && clientChosen === "⛰️") ||
        (me === "️✂️" && clientChosen === "📰")
      )
        return "You Won!";
      else if (me === clientChosen) return "It's a tie!";
      else return "You lost!";
    }
  },
};
