const { Client, Collection } = require("discord.js");
const { config } = require("dotenv");
config({ path: __dirname + "/.env" });

const fs = require("fs");
const { getLocaleFromCommand } = require("./utils/lang");

const client = new Client();
client.commands = new Collection();
client.aliases = new Collection();
client.categories = fs.readdirSync("./commands");
client.queue = new Map();
["command"].forEach((handler) => {
  require(`./handler/${handler}`)(client);
});

client.on("ready", () => {
  console.log("Bot is Online");

  client.user.setActivity("&help");
});

client.on("message", async (message) => {
  const prefix = "&";

  if (message.author.bot) return;
  if (!message.guild) return;
  if (!message.content.startsWith(prefix)) return;
  if (!message.member)
    message.member = await message.guild.fetchMember(message);

  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();

  if (cmd.length === 0) return;
  let command = client.commands.get(cmd);
  if (!command) command = client.commands.get(client.aliases.get(cmd));

  if (command) {
    let locale = getLocaleFromCommand(command.name, cmd);
    command.run(client, message, args, locale);
  }
});

if (process.env.MODE === "DEV") {
  client.login(process.env.TEST_TOKEN);
} else {
  client.login(process.env.TOKEN);
}
