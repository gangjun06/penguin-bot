const { MessageEmbed } = require("discord.js");
const { stripIndent } = require("common-tags");

module.exports = {
  name: "help",
  category: "info",
  description: "bot commands",
  usage: "[command]",
  run: async (client, message, args) => {
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
    return client.commands
      .filter((cmd) => cmd.category === category)
      .map((cmd) => `- \`${cmd.name}\` ${cmd.description}`)
      .join("\n");
  };

  const info = client.categories
    .map(
      (cat) =>
        stripIndent`**${cat[0].toUpperCase() + cat.slice(1)}**\n${commands(
          cat
        )}`
    )
    .reduce((string, category) => string + "\n" + category);

  return message.author.send(embed.setDescription(info)).then(()=>{
    message.channel.send("check your DM!")
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
  if (cmd.name) info = `**Command name:** ${cmd.name}`;
  if (cmd.aliases)
    info += `\n**Aliases:** ${cmd.aliases.map((a) => `\`${a}\``).join(", ")}`;
  if (cmd.description) info += `\n**Description:** ${cmd.description}`;
  if (cmd.usage) {
    info += `\n**Usage:** ${cmd.usage}`;
    embed.setFooter(`Syntex: <> = required, [] = optional`);
  }

  return message.channel.send(embed.setColor("GREEN").setDescription(info));
}
