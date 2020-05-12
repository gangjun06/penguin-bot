const { MessageEmbed } = require("discord.js");
const Axios = require("axios");

module.exports = {
  name: ["cat", "고양이"],
  category: "fun",
  description: ["Show cute cat!", "귀여운 고양이를 보여줍니다"],
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
