const { MessageEmbed } = require("discord.js");
const Axios = require("axios");

module.exports = {
  name: "neko",
  category: "fun",
  description: "showing very cute neko!",
  run: async (client, message, args) => {
    let image = await Axios.get("https://img.trinets.xyz/api/v1?type=url");
    const Embed = new MessageEmbed()
      .setTitle("neko!")
      .setURL("https://img.trinets.xyz")
      .setImage(`https://img.trinets.xyz/${image.data}`)
      .setColor("RANDOM");
    message.channel.send(Embed);
  },
};
