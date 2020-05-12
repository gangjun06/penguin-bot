const { MessageEmbed } = require("discord.js");
const Axios = require("axios");

module.exports = {
  name: "네코",
  category: "fun",
  description: "귀여운 네코를 보여줘요!",
  run: async (client, message, args) => {
    let result = await Axios.get("https://neko-love.xyz/api/v1/neko");
    const Embed = new MessageEmbed()
      .setTitle("네코 from neko-love.xyz")
      .setURL(result.data.url)
      .setImage(result.data.url)
      .setColor("RANDOM")
    message.channel.send(Embed);
  },
};

