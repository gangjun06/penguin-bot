const { MessageEmbed } = require("discord.js");
const Imageapi = require("imageapi.js");

module.exports = {
  name: "programmerhumor",
  category: "fun",
  description: "r/programmerhumor",
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
