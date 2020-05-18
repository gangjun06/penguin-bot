const { getStr: _ } = require("../../utils/lang");
const moment = require("moment-timezone");

module.exports = {
  name: ["time", "시간"],
  category: "tool",
  description: ["Can get now clock", "현재 시각을 알려줍니다!"],
  usage: ["<timezone>", "<타임존>"],
  run: async (client, message, args, l) => {
    if (!args[0]) return message.channel.send(_(l, "ERR_SYNTEX"));
    if (!moment.tz.names().includes(args[0]))
      return message.channel.send("This Name is not exist");
    message.channel.send(moment().tz(args[0]).format("YYYY-MM-DD H:m:s"));
  },
};
