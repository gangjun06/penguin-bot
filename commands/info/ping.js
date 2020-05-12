const { getStr: _ } = require("../../utils/lang");

module.exports = {
  name: ["ping", "핑"],
  category: "info",
  description: ["ping", "핑"],
  run: async (client, message, args, l) => {
    const msg = await message.channel.send(_(l, "ping_wait"));
    msg.edit(_(l, "ping_result", {ping:Math.floor(msg.createdAt - message.createdAt)}));
  },
};
