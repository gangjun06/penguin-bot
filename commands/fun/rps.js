const { MessageEmbed } = require("discord.js");
const { promptMessage } = require("../../utils/util");

const chooseArr = ["⛰️", "📰", "✂️"];
const { getStr: _ } = require("../../utils/lang");

const db = require("../../utils/db");

module.exports = {
  name: ["rps", "가바보"],
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
    if (m.member.hasPermission("MANAGE_MESSAGES"))
      await m.reactions.removeAll();

    embed
      .setDescription(`**${result}**`)
      .addField("result", `YOU: ${reacted} vs BOT: ${botChoice}`);
    m.edit(embed);

    function getResult(me, clientChosen) {
      if (
        (me === chooseArr[0] && clientChosen === chooseArr[2]) ||
        (me === chooseArr[1] && clientChosen === chooseArr[0]) ||
        (me === chooseArr[2] && clientChosen === chooseArr[1])
      ) {
        db.updateMoney(client.db, message.author.id, 20);
        return "You Won! (+20Pang) ";
      } else if (me === clientChosen) {
        return "It's a tie!";
      } else {
        db.updateMoney(client.db, message.author.id, -20);
        return "You lost! (-20Pang)";
      }
    }
  },
};
