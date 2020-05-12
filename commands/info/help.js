const { MessageEmbed } = require("discord.js");
const { stripIndent } = require("common-tags");
const { locales, getStr: _ } = require("../../utils/lang");

let locale;
let l;

module.exports = {
  name: ["help", "도움"],
  category: "info",
  description: "bot commands",
  usage: ["[command]", "[명령어]"],
  run: async (client, message, args, lo) => {
    l = lo;
    locales.forEach((item, index) => {
      if (item === lo) locale = index;
    });
    if (args[0]) {
      getCMD(client, message, args[0]);
    } else {
      getAll(client, message);
    }
  },
};

function getAll(client, message) {
  const embed = new MessageEmbed().setColor("RANDOM");

  const commands = (category) => {
    let lastcmd;
    let cmds = [];
    client.commands
      .filter((cmd) => cmd.category === category)
      .forEach((cmd) => {
        let cmdName = cmd.name[locale];
        if (lastcmd !== cmdName){
          lastcmd = cmdName;
          cmds.push(`\`${cmdName}\``);
        }
      });
    return cmds;
  };

  const info = client.categories
    .map(
      (cat) =>
        stripIndent`**${cat[0].toUpperCase() + cat.slice(1)}**\n${commands(
          cat
        )}`
    )
    .reduce((string, category) => string + "\n" + category);

  return message.author.send(embed.setDescription(info)).then(() => {
    message.channel.send("check your DM!");
  });
}

function getCMD(client, message, input) {
  const embed = new MessageEmbed();

  const cmd =
    client.commands.get(input.toLowerCase()) ||
    client.commands.get(client.aliases.get(input.toLowerCase()));

  let info = `No Information found for command **${input.toLowerCase()}**`;

  if (!cmd) {
    return message.channel.send(embed.setColor("RED").setDescription(info));
  }
  if (cmd.name) info = `**Command name:** ${cmd.name[locale]}`;
  if (cmd.aliases)
    info += `\n**Aliases:** ${cmd.aliases
      .map((a) => `\`${a[locale]}\``)
      .join(", ")}`;
  if (cmd.description) info += `\n**Description:** ${cmd.description[locale]}`;
  if (cmd.usage) {
    info += `\n**Usage:** ${cmd.usage[locale]}`;
    embed.setFooter(_(l, "HELP_SYNTEX"));
  }

  return message.channel.send(embed.setColor("GREEN").setDescription(info));
}
