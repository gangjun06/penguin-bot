const { MessageEmbed } = require("discord.js");
const Axios = require("axios");

module.exports = {
  name: "neko",
  category: "fun",
  description: "showing very cute neko!",
  run: async (client, message, args) => {
    let result = await Axios.get("https://neko-love.xyz/api/v1/neko");
    const Embed = new MessageEmbed()
      .setTitle("neko from neko-love.xyz")
      .setURL(result.data.url)
      .setImage(result.data.url)
      .setColor("RANDOM")
    message.channel.send(Embed);
  },
};

