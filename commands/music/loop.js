module.exports = {
  name: ["loop", "반복"],
  category: "music",
  description: ["loop the musics in the queue", "리스트에 있는 곡들을 반복해서 재생합니다"],
  execute(client, message, args) {
    const { channel } = message.member.voice;
    if (!channel) {
      //IF AUTHOR IS NOT IN VOICE CHANNEL
      return message.channel.send("**you need to be in voice channel**");
    }

    const serverQueue = message.client.queue.get(message.guild.id);

    if (!serverQueue) {
      return message.channel.send("There is nothing playing that i could loop");
    }

    //OOOOF
    serverQueue.loop = !serverQueue.loop;

    message.channel.send(
      `Loop is now **${serverQueue.loop ? "Enabled" : "Disabled"}**`
    );
  },
};
