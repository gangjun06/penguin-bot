const { getStr: _ } = require("../../utils/lang");
const { MessageEmbed, MessageCollector } = require("discord.js");
const { promptMessage } = require("../../utils/util");
const db = require("../../utils/db");

module.exports = {
  name: ["updown", "업다운"],
  category: "fun",
  description: ["updown game!", "업다운 게임!"],
  run: async (client, message, args, l) => {
    await message.channel.send(
      new MessageEmbed()
        .setColor("#bedbe9")
        .setTitle("Updown game")
        .setDescription("The game is started!\nEnter number between 0 and 100")
    );
    let theNumber = Math.floor(Math.random() * 100);
    let life = 5;
    let win = false;
    let filter = (m) => m.author.id === message.author.id;
    let collector = new MessageCollector(message.channel, filter);
    collector.on("collect", async (message) => {
      let content = message.content;
      if (!content.match(/[^0-9]/g)) {
        --life;
        if (parseInt(content) === theNumber) {
          collector.stop();
          db.updateMoney(client.db, message.author.id, 40);
          return await message.channel.send(
            new MessageEmbed()
              .setColor("#bedbe9")
              .setTitle("Updown game")
              .setDescription(`You won! --- You got 40Pang`)
          );
        }
        if (life <= 0) {
          collector.stop();
          return await message.channel.send(
            new MessageEmbed()
              .setColor("#CD1039")
              .setTitle("Updown game")
              .setDescription(`failed.. The Answer is ${theNumber}`)
          );
        }
        if (parseInt(content) > theNumber) {
          await message.channel.send(
            new MessageEmbed()
              .setColor("#FFB0CF")
              .setTitle("DOWN!")
              .setDescription(`Opportunity left: ${life}`)
          );
        } else {
          await message.channel.send(
            new MessageEmbed()
              .setColor("#78EFAD")
              .setTitle("UP!")
              .setDescription(`Opportunity left: ${life}`)
          );
        }
      } else {
        await message.channel.send(
          new MessageEmbed()
            .setTitle("Updown game")
            .setDescription("You can input only NUMBER")
        );
      }
    });
  },
};
