const { MessageEmbed } = require("discord.js");
const Axios = require("axios");

module.exports = {
  name: "cat",
  category: "fun",
  description: "Show cute cat!",
  run: async (client, message, args) => {
    let result = await Axios.get("http://aws.random.cat/meow");
    const Embed = new MessageEmbed()
      .setTitle("cat from random.cat")
      .setURL(result.data.file)
      .setImage(result.data.file)
      .setColor("RANDOM")
    message.channel.send(Embed);
  },
};
