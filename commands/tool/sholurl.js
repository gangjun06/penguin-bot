const Axios = require("axios");

module.exports = {
  name: "shurl",
  category: "tool",
  description: "make short url!",
  usage: "<longurl>",
  run: async (client, message, args) => {
    if (!args[0].includes(".") && !args[0].length > 6) {
        return message.reply("URL is not correct")
    }
    Axios.post(`https://shol.xyz/?url=${args[0]}`).then((result)=>{
        return message.reply(`<https://shol.xyz/${result.data.short}>`)
    }).catch(e => {
        return message.reply(`Sorry, something went wrong`)
    });
  },
};
