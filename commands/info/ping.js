module.exports = {
  name: "ping",
  category: "info",
  description: "ping",
  run: async (client, message, args) => {
    const msg = await message.channel.send("핑계산중...")

    msg.edit(`${Math.floor(msg.createdAt - message.createdAt)}ms 입니다!`);
  },
};
