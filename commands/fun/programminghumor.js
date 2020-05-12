const { MessageEmbed } = require("discord.js");
const Imageapi = require("imageapi.js");

module.exports = {
  name: ["programmerhumor", "프로그래밍밈"],
  category: "fun",
  description: ["r/programmerhumor", "레딧에서 밈을 가져옵니다"],
  run: async (client, message, args) => {
    let img = await Imageapi("ProgrammerHumor");
    const Embed = new MessageEmbed()
      .setTitle("meme from r/programmerhumor")
      .setURL(`https://reddit.com/r/ProgrammerHumor`)
      .setImage(img)
      .setTimestamp()
      .setColor("RANDOM");
    message.channel.send(Embed);
  },
};
