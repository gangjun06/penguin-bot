const { MessageEmbed } = require("discord.js");
const Imageapi = require("imageapi.js");

module.exports = {
  name: "programminghumor",
  category: "fun",
  description: "show meme from r/programminghumor",
  run: async (client, message, args) => {
    let img = await Imageapi("ProgrammerHumor");
    const Embed = new MessageEmbed()
      .setTitle("meme from r/ProgrammingHumor")
      .setURL(`https://reddit.com/r/ProgrammingHumor`)
      .setImage(img)
      .setTimestamp()
      .setColor("RANDOM");
    message.channel.send(Embed);
  },
};
