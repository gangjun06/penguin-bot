/*
hey... this piece of code is really rubbish.
This is very bad for future, but this isn't a real function of penguin,
so dissolve wrote like this
*/

const { Client, Collection } = require("discord.js");
const { config } = require("dotenv");
config({ path: __dirname + "/.env" })
const mysql = require('mysql')
const client = new Client();
let prefix;
if (process.env.MODE === "DEV") prefix = process.env.TEST_PREFIX;
else prefix = process.env.PREFIX;
const db = require("./utils/db");

client.on("ready", async () => {
  console.log("Bot is Online");
  client.db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  })
  client.db.connect((err)=>{
    if(err){
      throw err
    }
    console.log("Successed to connect db")
  })
});

client.on("message", async (message) => {
  if (message.author.bot) return;
  if (!message.guild) return;
  if (!message.content.startsWith(prefix)) return;
  if (!message.member)
    message.member = await message.guild.fetchMember(message);
  if (!(message.author.id==='347025940033044480'||message.author.id==='476377109032599572')) return

  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();

  if(cmd === 'give') {
    if(message.mentions.members.size>=2) return
    if(message.mentions.members.size===1) {
    db.updateMoney(client.db, message.mentions.members.first().id, args[0]);
    message.channel.send('changed' + message.mentions.members.first().username + '\'s pang by ' + args[0])
    return
    }
    else { 
    db.updateMoney(client.db, message.author.id, args[0]);
    message.channel.send('changed' + message.author.username + '\'s pang by ' + args[0])
    return
    }
  }
});

if (process.env.MODE === "DEV") {
  client.login(process.env.TEST_TOKEN);
} else {
  client.login(process.env.TOKEN);
}
