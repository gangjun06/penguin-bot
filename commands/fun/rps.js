const { MessageEmbed } = require("discord.js");
const { promptMessage } = require("../../utils/util");

const chooseArr = ["⛰️", "📰", "✂️"];

module.exports = {
  name: "rps",
  cateogry: "fun",
  description: "Rock Paper Scissors game",
  run: async (client, message, args) => {
    const embed = new MessageEmbed()
      .setColor("#FFFFFF")
      .setFooter(message.guild.me.displayName, client.user.displayAvatarURL())
      .setDescription("Add a reaction to one of these emojis to play the game!")
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
