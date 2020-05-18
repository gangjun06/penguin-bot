const { getStr: _ } = require("../../utils/lang");
const moment = require("moment");
const { stripIndent } = require("common-tags");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: ["profile", "프로필"],
  category: "info",
  description: ["User's money", "유저의 돈을 보여줍니다"],
  run: async (client, message, args, l) => {
    client.db.query(
      `SELECT * FROM profile WHERE id=${message.author.id}`,
      (err, results) => {
        if (err) {
          message.channel.send("Error while load data");
          return;
        }
        results = results[0];
        if (results === undefined) {
          client.db.query(
            `INSERT INTO profile (id, money, lasttime, liking) VALUES (${
              message.author.id
            }, 0, ${new moment().subtract(30, "minutes").unix()}, 0)`
          );
          let embed = new MessageEmbed()
            .setThumbnail(message.author.displayAvatarURL({ format: "png" }))
            .setColor(
              client.user.displayHexColor === "#000000"
                ? "#ffffff"
                : client.user.displayHexColor
            )
            .addField(
              "UserInfo",
              stripIndent`**\\> Name:** ${message.author.username}
        **\\> Money:** 0Pang
        **\\> Liking:** Comming soom`,
              true
            );
          return message.channel.send(embed);
        } else {
          let embed = new MessageEmbed()
            .setThumbnail(message.author.displayAvatarURL({ format: "png" }))
            .setColor(
              client.user.displayHexColor === "#000000"
                ? "#ffffff"
                : client.user.displayHexColor
            )
            .addField(
              "UserInfo",
              stripIndent`**\\> Name:** ${message.author.username}
        **\\> Money:** ${results.money}Pang
        **\\> Liking:** Comming soom`,
              true
            );
          return message.channel.send(embed);
        }
      }
    );
  },
};
