const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "play",
  category: "music",
  description: "play music in the voice channel",
  usage: "<youtube video link>",
  run: async (client, message, args) => {
    if (!args[0]) {
      return message
        .reply("please input url")
        .then((m) => m.delete({ timeout: 5000 }));
    }
    if (!args[0].includes(".") && !args[0].length > 6) {
      return message
        .reply("URL is not correct")
        .then((m) => m.delete({ timeout: 5000 }));
    }
    if (!message.member.voiceChannel) {
      return message
        .reply("You must be in a voice channel to play the bot!")
        .then((m) => m.delete({ timeout: 5000 }));
    }
  },
};
