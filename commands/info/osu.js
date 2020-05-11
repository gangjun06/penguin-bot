const { MessageEmbed } = require("discord.js");
const Axios = require("axios");
const { stripIndent } = require("common-tags");
const { config } = require("dotenv");
config({ path: __dirname + "/.env" });

const modes = ["osu!", "Taiko", "CtB", "osu!mania"];

module.exports = {
  name: "osu",
  category: "info",
  description: "showing osu profile",
  usage: "<username> [mode(0=osu!,1=Taiko,2=CtB,3=osu!mania)]",
  run: async (client, message, args) => {
    if (!args[0]) {
      return message.reply("please write username");
    }
    if (args[1] === undefined) {
      args[1] = "0";
    } else if (
      args[1] === "0" ||
      args[1] === "1" ||
      args[1] === "2" ||
      args[1] === "3"
    ) {
    } else {
      return message.reply(
        `${args[1]} is not correct mode. (0=osu!,1=Taiko,2=CtB,3=osu!mania)`
      );
    }
    Axios.get(
      `https://osu.ppy.sh/api/get_user?k=${process.env.OSU_API}&u=${args[0]}&m=${args[1]}`
    ).then((result) => {
      console.log("asdf");
      if (result.status !== 200) {
        return message.reply("cannot find user");
      } else {
        let data = result.data[0];
        console.log(data);
        let embed = new MessageEmbed()
          .setColor("#dd5d96")
          .setTitle(`osu! Info (mode=${modes[parseInt(args[1])]})`)
          .setFooter(args[0])
          .setTimestamp()
          .setThumbnail(`http://s.ppy.sh/a/${data.user_id}`)
          .addField(
            "user information",
            stripIndent`**\\> ID:** ${data.user_id}
      **\\> username:** ${data.username}
      **\\> join_date:** ${data.join_date}
      **\\> level:** ${parseFloat(data.level).toFixed(2)}
      **\\> country:** ${data.country}
      **\\> played_seconds:** ${data.total_seconds_played}
      `,
            true
          )
          .addField(
            "Counts",
            stripIndent`**\\> SS:** ${data.count_rank_ss}
      **\\> S:** ${data.count_rank_ss}
      **\\> A:** ${data.count_rank_a}
      **\\> count300:** ${data.count300}
      **\\> count100:** ${data.count100}
      **\\> count50:** ${data.count50}
      `,
            true
          )
          .addField(
            "Rank Info",
            stripIndent`**\\> ranking:** ${data.pp_rank}
      **\\> country_ranking:** ${data.pp_country_rank}
      **\\> ranked_score:** ${data.ranked_score}
      **\\> total_score:** ${data.total_score}
      `,
            true
          );
        return message.channel.send(embed);
      }
    });
  },
};
